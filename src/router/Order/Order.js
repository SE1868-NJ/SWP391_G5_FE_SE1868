import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Order() {
  const cusID = 1;
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
    const response = await axios.post('http://localhost:3001/api/Voucher/getVoucherByCusID',{cusID,totalPrice});
    await setVoucherDetail(response.data)
    setVoucher(!voucher);
  }
  async function handleChooseVoucher(voucher){
    let discountTmp =0;
    if(voucher.type === 'Order'){
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
    console.log(response.data)
    await setProducts(response.data)
  }
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
      const cartDetailID = [];
      products.map((item)=> cartDetailID.push(item.CartDetailID));
      const voucherChoose = chooseVoucher ? chooseVoucher.VoucherID : null;
      const response = await axios.post('http://localhost:3001/api/Order/CheckOut',{cartDetailID,voucherChoose,totalPayment,cusID});
      if(response.status === 200){
        setStatus(true)
      }else setStatus(false)
      setMess(true);
    }
  }
  function checkOutSuccess(){
    setMess(false);
    navigate('/Order');
  }
  return (
    
    <div className={styles.Order}>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
      {/* HEADER */}
        <div className={styles.header}>
          <img alt="" src="./logo.png" onClick={()=>navigate('./')}/>
          <p>Order checkout</p>
        </div>
      </div>
      <div className={styles.address}>
        <img alt="" src="./addressIcon.png" />
        Delivery Address
        <p>{address}</p>
      </div>
      {/* BẢNG PRODUCT */}
      <div className={styles.OrderDetail}>
        <table>
          <tr>
            <th style={{ width: "50%" }}>Product</th>
            <th style={{ width: "15%" }}>Unit Price</th>
            <th style={{ width: "10%", textAlign: "right" }}>Amount</th>
            <th style={{ width: "25%", textAlign: "right" }}>Total Price</th>
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
              Shoping Fee{" "}
              <span>
                {Number(shipFee).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div style={{ paddingTop: "20px" }}>
              Total Order{" "}
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
        <button onClick={() => toggleVoucher()}>Select voucher</button>
      </div>
      {/* HIỆN VOUCHER */}
      {chooseVoucher !== 0 ? (
        <div
          style={{
            width: "70%",
            position: "relative",
            backgroundColor: "white",
            fontSize: "30px",
            padding: "20px",
            boxSizing: "border-box",
            
          }}
        >
          Discount voucher <br />
          <br />
          <div style={{ position: "absolute", right: "20px", top: "20px" }}>
            {Number(discount).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}
          </div>
          Total Payment
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            {Number(shipFee + totalPrice - discount).toLocaleString(
              "vi-VI",
              { style: "currency", currency: "VND" }
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* pHƯƠNG THỨC TRẢ TIỀN */}
      <div className={styles.paymentMethod}>
        Payment method :{paymentMethod}
        <select onChange={(event)=> setPaymentMethod(event.target.value)}>
          <option value='Trả sau'>Trả sau</option>
          <option value='Trả trước'>Trả trước</option>
        </select>
      </div>
      <div style={{width:'70%',backgroundColor:'white', position:'relative',height:'5vh'}}><button onClick = {()=> checkout()} style={{position:'absolute',top:0,right:'20px',padding:'10px'}}>Checkout</button></div>
      {/* VOUCHER POPUP */}
      {voucher ? (
        <div
          onClick={(e) => (e.currentTarget === e.target ? toggleVoucher() : "")}
          className={styles.voucherPopup}
        >
          <div className={styles.voucherInner}>
            <h1>Select Voucher</h1>
            <div className={styles.inputVoucher}>
              <input type="text" placeholder="Code voucher" />
              <input type="submit" value="Apply" />
            </div>
            {voucherDetail.map((item) => (
              <div
                onClick={() => handleChooseVoucher(item)}
                className={styles.VoucherDetail}
              >
                <div className={styles.VoucherImg}><p>{item.type} Voucher</p></div>
                <div className={styles.inforVoucher}>
                  <p>{item.VoucherName}</p>
                  <p>Loại: {item.type}</p>
                  <p>Discount: {"  "}
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
    </div>
  );
}

export default Order;
