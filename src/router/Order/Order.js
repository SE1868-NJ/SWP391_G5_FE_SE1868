import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import {useNavigate} from 'react-router-dom'

function Order() {
  const navigate = useNavigate();
  const address =
    "Nguyễn Anh Đức (+84) 919824069    Xưởng may Cơ Xen, Xã Vũ Hòa, Huyện Kiến Xương, Thái Bình";
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucher, setVoucher] = useState(false);
  const [chooseVoucher, setChooseVoucher] = useState(0);
  const [paymentMethod,setPaymentMethod] = useState('Trả trước')
  const Orders = {
    shipFee: 32000,
  };
  const voucherDetail = [
    {
      voucherID: "1",
      VoucherName: "giảm 10k ship",
      type: "ship",
      discount: "10000",
      img: "./freeShipIcon.png",
    },
    {
      voucherID: "2",
      VoucherName: "giảm 20k tiền hàng",
      type: "tiền hàng",
      discount: "20000",
      img: "./freeShipIcon.png",
    },
  ];
  const Products = [
    {
      ProductID: 1,
      ProductName: "Sách",
      Category: "Sách",
      Weight: 1,
      Price: 100000,
      Quantity: 10,
      Description: "Sách hay",
      ShopID: 1,
      img: "https://pibook.vn/upload/news/T%C3%A2m%20l%C3%BD%20h%E1%BB%8Dc%20gi%E1%BA%A3i%20m%C3%A3%20t%C3%ACnh%20y%C3%AAu.jpg",
    },
    {
      ProductID: 2,
      ProductName: "xôi xéo",
      Category: "Xôi",
      Weight: 1,
      Price: 10000,
      Quantity: 10,
      Description: "Không ngon lắm",
      ShopID: 1,
      img: "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/09_2022/xoi-xeo-ha-noi-2.jpg",
    },
  ];
  useEffect(() => {
    var total = 0;
    Products.map((item) => {
      total = total + item.Price * item.Quantity;
    });
    setTotalPrice(total);
  }, []);
  function toggleVoucher() {
    setVoucher(!voucher);
  }
  function handleChooseVoucher(discount){
    setChooseVoucher(discount);
    toggleVoucher()
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
      <div className={styles.OrderDetail}>
        <table>
          <tr>
            <th style={{ width: "50%" }}>Product</th>
            <th style={{ width: "15%" }}>Unit Price</th>
            <th style={{ width: "10%", textAlign: "right" }}>Amount</th>
            <th style={{ width: "25%", textAlign: "right" }}>Total Price</th>
          </tr>
          {Products.map((item, index) => (
            <tr>
              <td className={styles.tdFirst}>
                <img alt="" src={item.img} /> <p>{item.ProductName}</p>{" "}
                <p style={{ width: "40%", textAlign: "center" }}>
                  {item.Description}
                </p>
              </td>
              <td>
                {Number(item.Price).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td style={{ width: "10%", textAlign: "right" }}>
                {item.Quantity}
              </td>
              <td style={{ width: "25%", textAlign: "right" }}>
                {Number(item.Price * item.Quantity).toLocaleString("vi-VI", {
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
          <div className={styles.ship}>
            <div>
              Shoping Fee{" "}
              <span>
                {Number(Orders.shipFee).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div style={{ paddingTop: "20px" }}>
              Total Order{" "}
              <span>
                {Number(Orders.shipFee + totalPrice).toLocaleString("vi-VI", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Voucher}>
        <img alt="" src="./voucherIcon.png" /> Voucher
        <button onClick={() => toggleVoucher()}>Select voucher</button>
      </div>
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
            {Number(chooseVoucher).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}
          </div>
          Total Payment
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            {Number(Orders.shipFee + totalPrice - chooseVoucher).toLocaleString(
              "vi-VI",
              { style: "currency", currency: "VND" }
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.paymentMethod}>
        Payment method :{paymentMethod}
        <select onChange={(event)=> setPaymentMethod(event.target.value)}>
          <option value='Trả trước'>Trả trước</option>
          <option value='Trả sau'>Trả sau</option>
        </select>
      </div>
      <div style={{width:'70%',backgroundColor:'white', position:'relative',height:'5vh'}}><button style={{position:'absolute',top:0,right:'20px',padding:'10px'}}>Checkout</button></div>
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
                onClick={() => handleChooseVoucher(item.discount)}
                className={styles.VoucherDetail}
              >
                <img alt="" src={item.img} />
                <div className={styles.inforVoucher}>
                  <p>{item.VoucherName}</p>
                  <p>{item.type}</p>
                  <p>
                    {Number(item.discount).toLocaleString("vi-VI", {
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
    </div>
  );
}

export default Order;
