import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function Order() {
  const location = useLocation();
  const order = location.state;
  const cusID = 2;
  const navigate = useNavigate();
  const address =
    "Nguyễn Anh Đức (+84) 919824069    Xưởng may Cơ Xen, Xã Vũ Hòa, Huyện Kiến Xương, Thái Bình";
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucher, setVoucher] = useState(false);
  const [chooseVoucher, setChooseVoucher] = useState({
    Discount: 0,
    voucher: null,
  });
  const [typeVoucher,setTypeVoucher] = useState();
  const [voucherShop,setVoucherShop] = useState([]);
  const [bestVoucherShop, setBestVoucherShop] = useState([]);
  const [status, setStatus] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Trả sau");
  const [mess, setMess] = useState(false);
  const [totalAmountProduct, setTotalAmountProduct] = useState([]);
  const [voucherDetail, setVoucherDetail] = useState([]);
  const [products, setProducts] = useState([]);
  const [listVoucher, setListVoucher] = useState([]);
  
  useEffect(() => {
    getCartCheckOut();
  }, []);
  async function getCartCheckOut() {
    const response = await axios.post("http://localhost:3001/api/Cart/cusID", {
      cusID: cusID,
    });
    const productss = [...response.data,order]     
    console.log(productss)                                                        
    await setProducts(productss);
  }
  useEffect(() => {
    let newTotal = products.reduce((sum, item) => sum + item.totalAmount, 0);
    setTotalPrice(newTotal);
  }, [products]);

  useEffect(() => {
    getVoucher();
  }, [totalPrice]);

  async function getVoucher() {
    const response = await axios.post(
      "http://localhost:3001/api/Voucher/getVoucherByCusID",
      { cusID, totalPrice }
    );
    const shop = products.map((item) => {
      return {
        shopID: item.ShopID,
        total : item.totalAmount - item.feeShip,
      }
    });
    const responseShop = await axios.post("http://localhost:3001/api/Voucher/getVoucherByShopID",{shop,cusID});
    await setVoucherDetail(response.data);
    await setVoucherShop(responseShop.data);
  }

  useEffect(() => {
    updateVoucherShop();
  },[voucherShop])

  async function updateVoucherShop() {
    const tmp = [];
    const tmp1 = [];
    await products.map(async (item,index) => {
      const totalShip = item.feeShip;
      const bestVoucher = await getBestVoucher(item.totalAmount - item.feeShip,totalShip,voucherShop[index]);
      tmp.push(bestVoucher);
      tmp1.push(item.totalAmount -bestVoucher.Discount );
    });
    await setBestVoucherShop(tmp);
    await setTotalAmountProduct(tmp1);
  }

  useEffect(() => {
    updateVoucherAll();
  },[totalAmountProduct]);
    

  async function updateVoucherAll() {
    const totalShip = products.reduce((sum, item) => sum + item.feeShip, 0);
    const bestVoucher = await getBestVoucher(totalPrice,totalShip,voucherDetail);
    await setChooseVoucher(bestVoucher);
  }
  const getBestVoucher = async(totalPrice,totalShip,voucherList)=> {
    const discountVoucher = {
      Discount: 0,
      voucher: null,
    };
    {voucherList && voucherList.map((item) => {
      let discountTmp = 0;
      if (item.type === "Sản phẩm") {
        if (item.Discount === 0) {
          discountTmp = (totalPrice * item.DiscountPercent) / 100;
        } else {
          discountTmp = item.Discount < totalPrice ? item.Discount : totalPrice;
        }
      } else {
        discountTmp = totalShip;
      }
      if (discountTmp > discountVoucher.Discount) {
        discountVoucher.Discount = discountTmp;
        discountVoucher.voucher = item;
      }
    });}
    return discountVoucher;
  }

  async function selectVoucherShop(index) {
    await setListVoucher(voucherShop[index]);
    await setTypeVoucher(index);
    await setVoucher(!voucher);
  }
  async function selectVoucherAll() {
    
    await setListVoucher(voucherDetail);
    await setTypeVoucher(-1);
    await setVoucher(!voucher);
  }
  async function handleChooseVoucher(voucher) {
    let feeShip;
    let price;
    if(typeVoucher === -1){
       feeShip = products.reduce((sum, item) => sum + item.feeShip, 0);
      price = totalPrice;
    }else{
      price = products[typeVoucher].totalAmount - products[typeVoucher].feeShip;
      feeShip = products[typeVoucher].feeShip;
    }
    let discountTmp = 0;
    if (voucher.type === "Sản phẩm") {
      if (voucher.Discount === 0) {
        discountTmp = (price * voucher.DiscountPercent) / 100;
      } else {
        discountTmp =
          voucher.Discount < price ? voucher.Discount : price;
      }
    } else {
      
      discountTmp = feeShip;
    }
    const discountVoucher = {
      Discount: discountTmp,
      voucher: voucher,
    };
    if(typeVoucher === -1){
      await setChooseVoucher(discountVoucher);
    }else{
      setBestVoucherShop(prevItems => prevItems.map((item,index)=>
        index === typeVoucher ? discountVoucher : item
      ))
    }
    setVoucher(!voucher);
  }
  async function checkout() {
    if (paymentMethod === "Trả trước") {
      navigate("/Prepay");
    } else {
      const totalPayment = totalPrice - chooseVoucher.Discount;
      const OrderInfor = [];
      products.map((item) =>
        OrderInfor.push({
          feeShip:item.feeShip,
          productID: item.productID,
          Quantity: item.Quantity,
          CartDetailID: item.cartID,
          distance: Math.random() * 6
        })
      );
      const voucherChoose = [...bestVoucherShop,chooseVoucher];
      const response = await axios.post(
        "http://localhost:3001/api/Order/CheckOut",
        { OrderInfor, voucherChoose, totalPayment, cusID }
      );
      if (response.status === 200) {
        await setStatus(true);
      } else await setStatus(false);
      await setMess(true);
    }
  }
  function checkOutSuccess() {
    setMess(false);
    navigate("/");
  }
  return (
    <div className={styles.Order}>
      <Header></Header>
      <div className={styles.link}>
        <a href="/">Home</a> {"  "}&gt;{"  "}
        <a href="/cart">Cart</a>
        {"  "} &gt;{"  "}
        <a>Order Check Out</a>
      </div>
      <div className={styles.address}>
        <img alt="" src="./addressIcon.png" />
        Địa chỉ
        <p>{address}</p>
      </div>
      {/* BẢNG PRODUCT */}
      <div className={styles.OrderDetail}>
        <table style={{ padding: "20px 20px 0", backgroundColor: "white" }}>
          <tr>
            <th style={{ width: "35%" }}>Sản phẩm</th>
            <th className={styles.t2}>Giá thành</th>
            <th className={styles.t3}>Số lượng</th>
            <th className={styles.t4}>Phí vận chuyển</th>
            <th className={styles.t5}>Tổng tiền</th>
          </tr>
        </table>
        {products.map((item,index) => (
          <div className={styles.product}>
            <table>
              <tr>
                <td className={styles.tdFirst}>
                  <img alt="" src={item.productImg} />
                  <p>
                    {item.productName}
                    <br /> <span>{item.productCategory}</span>
                  </p>
                </td>
                <td className={styles.t2}>
                  {Number(item.productPrice).toLocaleString("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className={styles.t3}>{item.Quantity}</td>
                <td className={styles.t4}>
                  {Number(item.feeShip).toLocaleString("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className={styles.t5}>
                  {Number(item.totalAmount).toLocaleString("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            </table>
            <div className={styles.shopVoucher}>
              <div
                style={{
                  padding: "0 20px 0 0",
                  borderRight: "2px solid rgb(175, 175, 175)",
                }}
              >
                <button onClick={()=>selectVoucherShop(index)}>Chọn mã giảm giá của cửa hàng</button>
                <p>{Number(bestVoucherShop[index] ? bestVoucherShop[index].Discount : 0).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}</p>
              </div>
              <div style={{ paddingLeft: " 20px" }}>
                <p>Tổng tiền sản phẩm</p>
                <p style={{color:'red',fontWeight:'500'}}>{Number(totalAmountProduct[index] ? totalAmountProduct[index] : 0 ).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* VOUCHER  */}
      <div className={styles.Voucher}>
        <img alt="" src="./voucherIcon.png" /> Mã giảm giá
        <button onClick={() => selectVoucherAll()}>Chọn mã giảm giá </button>
      </div>
      {/* HIỆN VOUCHER */}
      {chooseVoucher !== 0 ? (
        <div
          style={{
            width: "82%",
            position: "relative",
            backgroundColor: "white",
            padding: " 0 20px ",
            boxSizing: "border-box",
          }}
        >
          <div style={{ height: "5vh" }}>
            Giảm giá
            <div style={{ position: "absolute", right: "20px", top: "0" }}>
              {chooseVoucher? Number(chooseVoucher.Discount).toLocaleString("vi-VI", {
                style: "currency",
                currency: "VND",
              }): ""}
            </div>
          </div>
          <div style={{ height: "5vh", position: "relative" }}>
            Tổng thanh toán
            <div style={{ position: "absolute", right: "0", top: "0" }}>
              {chooseVoucher? Number(totalPrice - chooseVoucher.Discount).toLocaleString("vi-VI", {
                style: "currency",
                currency: "VND",
              }):''}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* pHƯƠNG THỨC TRẢ TIỀN */}
      <div className={styles.paymentMethod}>
        Phương thức thanh toán :{paymentMethod}
        <select onChange={(event) => setPaymentMethod(event.target.value)}>
          <option value="Trả sau">Trả sau</option>
          <option value="Trả trước">Trả trước</option>
        </select>
      </div>
      <div
        style={{
          width: "82%",
          backgroundColor: "white",
          position: "relative",
          height: "13vh",
        }}
      >
        <button
          onClick={() => checkout()}
          style={{
            position: "absolute",
            bottom: "3vh",
            right: "20px",
            padding: "10px",
            border: "2px solid rgb(175, 175, 175)",
          }}
        >
          Xác nhận mua
        </button>
      </div>
      {/* VOUCHER POPUP */}
      {voucher ? (
        <div
          onClick={(e) =>
            e.currentTarget === e.target ? setVoucher(false) : ""
          }
          className={styles.voucherPopup}
        >
          <div className={styles.voucherInner}>
            <h1>Chọn Voucher</h1>
            {listVoucher.length === 0 ? (<h2 style={{textAlign:'center'}}>Không có mã giảm giá </h2>):''}
            {listVoucher.map((item) => (
              <div
                className={styles.VoucherDetail}
                onClick={() => handleChooseVoucher(item)}
              >
                <div className={styles.VoucherImg}>
                  <p>{item.type} Voucher</p>
                </div>
                <div className={styles.inforVoucher}>
                  <p>{item.VoucherName}</p>
                  <p>Loại: {item.type}</p>
                  <p>
                    Giảm: {"  "}
                    {item.Discount === 0
                      ? item.DiscountPercent + "%"
                      : Number(item.Discount).toLocaleString("vi-VI", {
                          style: "currency",
                          currency: "VND",
                        })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {mess ? (
        <div
          onClick={() => checkOutSuccess()}
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "30px",
              backgroundColor: "orange",
              width: "40vw",
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>{status ? "CHECKOUT THÀNH CÔNG" : "CHECKOUT THẤT BẠI"}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer></Footer>
    </div>
  );
}

export default Order;                      