import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer'

function Order() {
  const cusID = 2;
  const navigate = useNavigate();
  const address =
    "Nguyễn Anh Đức (+84) 919824069    Xưởng may Cơ Xen, Xã Vũ Hòa, Huyện Kiến Xương, Thái Bình";
    const [totalPrice, setTotalPrice] = useState(0);

  const [voucher, setVoucher] = useState(false);
  const [chooseVoucher, setChooseVoucher] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [status,setStatus] = useState(false);
  const [paymentMethod,setPaymentMethod] = useState('Trả sau')
  const [mess,setMess]= useState(false);
  const [shipFee,setShipFee]= useState(32000);
  const [voucherDetail,setVoucherDetail]= useState([]);
  const [products, setProducts] = useState([]);
  async function toggleVoucher() {
    setVoucher(!voucher);
  }
  async function handleChooseVoucher(voucher){
    let discountTmp =0;
    if(voucher.type === 'Sản phẩm'){
      if(voucher.Discount === 0){
        discountTmp = totalPrice * voucher.DiscountPercent / 100;
      }else{
        discountTmp = voucher.Discount < totalPrice ? voucher.Discount : totalPrice;
      }

    }else{
      if(voucher.Discount === 0){
        discountTmp = shipFee * voucher.DiscountPercent / 100;
      }else{
        discountTmp = voucher.Discount < shipFee ? voucher.Discount : shipFee;
      }
    }
    await setChooseVoucher(voucher)
    await setDiscount(discountTmp)
    toggleVoucher()
  }
  async function getCartCheckOut(){
    const response = await axios.post('http://localhost:3001/api/Cart/cusID',{cusID : cusID});
    await setProducts(response.data)
  }
  async function getVoucher(){
    console.log(cusID,totalPrice)
    const response = await axios.post('http://localhost:3001/api/Voucher/getVoucherByCusID',{cusID,totalPrice});
    console.log(response.data)
    await setVoucherDetail(response.data);
    const discountVoucher = {
      Discount:0,
      voucher:null
    };
    console.log(voucherDetail);
    response.data.filter(item => item.Discount <= shipFee).map((item)=> {
      let discountTmp =0;
    if(item.type === 'Sản phẩm'){
      if(item.Discount === 0){
        discountTmp = totalPrice * item.DiscountPercent / 100;
      }else{
        discountTmp = item.Discount < totalPrice ? item.Discount : totalPrice;
        console.log(voucher.Discount)
      }

    }else{
      if(voucher.Discount === 0){
        discountTmp = shipFee * item.DiscountPercent / 100;
      }else{
        discountTmp = item.Discount;
      }
    }
    if(discountTmp > discountVoucher.Discount){
      discountVoucher.Discount = discountTmp;
      discountVoucher.voucher = item;
    }})
    await setChooseVoucher(discountVoucher.voucher)
    await setDiscount(discountVoucher.Discount)
    console.log(discountVoucher.voucher)
  }
  useEffect(() => {
    getVoucher();
  },[totalPrice])
  useEffect(() => {
    let newTotal = products.reduce((sum, item) => sum + item.totalAmount, 0 );
    setTotalPrice(newTotal);
  }, [products]);
  useEffect( ()=>{
    getCartCheckOut();  
  },[])
  async function checkout(){
    if(paymentMethod === "Trả trước"){
      navigate('/Prepay');
    }else{
      const totalPayment = shipFee + totalPrice - discount;
      const OrderInfor = [];
      products.map((item)=> OrderInfor.push({
        productID:item.productID,
        Quantity: item.Quantity,
        CartDetailID: item.cartID
      }));
      const voucherChoose = chooseVoucher ? chooseVoucher.VoucherID : null;
      const response = await axios.post('http://localhost:3001/api/Order/CheckOut',{OrderInfor,voucherChoose,totalPayment,cusID});
      if(response.status === 200){
        await setStatus(true)
      }else await setStatus(false)
      await setMess(true);
    }
  }
  function checkOutSuccess(){
    setMess(false);
    navigate('/Order');
  }
  return (
    
    <div className={styles.Order}>
      <Header></Header>
      <div className={styles.address}>
        <img alt="" src="./addressIcon.png" />
        Địa chỉ
        <p>{address}</p>
      </div>
      {/* BẢNG PRODUCT */}
      <div className={styles.OrderDetail}>
        <table>
          <tr>
            <th style={{ width: "50%" }}>Sản phẩm</th>
            <th style={{ width: "15%" }}>Giá thành</th>
            <th style={{ width: "10%", textAlign: "right" }}>Số lượng</th>
            <th style={{ width: "25%", textAlign: "right" }}>Tổng tiền</th>
          </tr>
          {products.map((item, index) => (
            <tr>
              <td className={styles.tdFirst}>
                <img alt="" src={item.productImg} /> <p style={{paddingLeft:'20px'}}>{item.productName}</p>
                
              </td>
              <td>
                {Number(item.productPrice).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td style={{ width: "10%", textAlign: "right" }}>
                {item.Quantity}
              </td>
              <td style={{ width: "25%", textAlign: "right" }}>
                {Number(item.totalAmount).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td
              style={{
                borderTop: "2px solid black",
                height: "5vh",
                textAlign: "right",
              }}
            >
              {Number(totalPrice).toLocaleString("vi-VI", {
                style: "currency",
                currency: "VND",
              })}
            </td>
          </tr>
        </table>

        <div className={styles.Option}>
        {/* TIỀN SHIP */}
          <div className={styles.ship}>
            <div>
              Phí giao hàng{" "}
              <span>
                {Number(shipFee).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div style={{ paddingTop: "20px" }}>
              Tổng tiền đơn hàng{" "}
              <span>
                {Number(shipFee + totalPrice).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* VOUCHER  */}
      <div className={styles.Voucher}>
        <img alt="" src="./voucherIcon.png" /> Voucher
        <button onClick={() => toggleVoucher()}>Chọn voucher</button>
      </div>
      {/* HIỆN VOUCHER */}
      {chooseVoucher !== 0 ? (
        <div
          style={{
            width: "70%",
            position: "relative",
            backgroundColor: "white",
            padding: " 0 20px ",
            boxSizing: "border-box",
          }}
        >
          <div style={{height:'5vh'}}>
          Giảm giá 
          <div style={{ position: "absolute", right: "20px", top: "0" }}>
            {Number(discount).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}
          </div>
          </div>
          <div style={{height:'5vh',position:'relative'}}>
          Tổng thanh toán
          <div style={{ position: "absolute", right: "0", top: "0" }}>
            {Number(shipFee + totalPrice - discount).toLocaleString(
              "vi-VI",
              { style: "currency", currency: "VND" }
            )}
          </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* pHƯƠNG THỨC TRẢ TIỀN */}
      <div className={styles.paymentMethod}>
        Phương thức thanh toán :{paymentMethod}
        <select onChange={(event)=> setPaymentMethod(event.target.value)}>
          <option value='Trả sau'>Trả sau</option>
          <option value='Trả trước'>Trả trước</option>
        </select>
      </div>
      <div style={{width:'70%',backgroundColor:'white', position:'relative',height:'13vh'}}><button onClick = {()=> checkout()} style={{position:'absolute',bottom:'3vh',right:'20px',padding:'10px',border: '2px solid rgb(175, 175, 175)'}}>Xác nhận mua</button></div>
      {/* VOUCHER POPUP */}
      {voucher ? (
        <div
          onClick={(e) => (e.currentTarget === e.target ? toggleVoucher() : "")}
          className={styles.voucherPopup}
        >
          <div className={styles.voucherInner}>
            <h1>Chọn Voucher</h1>
            {voucherDetail.map((item) => (
              <div
                onClick={() => handleChooseVoucher(item)}
                className={styles.VoucherDetail}
              >
                <div className={styles.VoucherImg}><p>{item.type} Voucher</p></div>
                <div className={styles.inforVoucher}>
                  <p>{item.VoucherName}</p>
                  <p>Loại: {item.type}</p>
                  <p>Giảm: {"  "}
                    {item.Discount === 0 ? item.DiscountPercent + '%' :Number(item.Discount).toLocaleString("vi-VI", {
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
      {mess?(
        <div onClick={()=>checkOutSuccess()} style={{width:'100vw',height:'100vh',position:'fixed',top :'0',left:'0',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style={{color:'white',fontSize:'30px',backgroundColor:'orange',width:'40vw',height:'30vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div>{status?"CHECKOUT THÀNH CÔNG":"CHECKOUT THẤT BẠI"}</div>
          </div>
        </div>
      ):''}
      <Footer></Footer>
    </div>
  );
}

export default Order;
