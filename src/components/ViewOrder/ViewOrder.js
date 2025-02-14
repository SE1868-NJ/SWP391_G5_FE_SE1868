import React,{useState,useEffect} from 'react'
import styles from './ViewOrder.module.css'
import axios from 'axios'
import { useCustomer } from "../../Context";

function ViewOrder() {
  const { customer } = useCustomer();
  const [chooseStatus, setChooseStatus] = useState("Tất cả");
  const [orderList, setOrderList] = useState([]);
  const statusMap = {
    "Hoàn thành": "Đã giao hàng",
    "Vận chuyển": "Đang vận chuyển",
    "Hoàn đơn": "Đơn hàng đã bị hoàn",
    "Chờ thanh toán": "Chưa thanh toán",
  };
  
  const statusFunction = (status) => {
    return statusMap[status];
  }
  async function getAllOrder(){
    const response = await axios.post('http://localhost:3001/api/Order/OrderDetailCusID',{cusID: customer.CustomerID});
    await setOrderList(response.data);
  }
  useEffect(()=>{
    getAllOrder();
  },[])
  return (
    <div className={styles.viewOrder} >
      <div className={styles.orderStatus}>
        <div onClick={()=>setChooseStatus("Tất cả")} className={chooseStatus === "Tất cả" ? styles.choose : ''} >Tất cả</div>
        <div onClick={()=>setChooseStatus("Chờ thanh toán")} className={chooseStatus === "Chờ thanh toán" ? styles.choose : ''} >Chờ thanh toán</div>
        <div onClick={()=>setChooseStatus("Vận chuyển")} className={chooseStatus === "Vận chuyển" ? styles.choose : ''} >Vận chuyển</div>
        <div onClick={()=>setChooseStatus("Hoàn thành")} className={chooseStatus === "Hoàn thành" ? styles.choose : ''} >Hoàn thành</div>
        <div onClick={()=>setChooseStatus("Hoàn đơn")} className={chooseStatus === "Hoàn đơn" ? styles.choose : ''} >Hoàn đơn</div>
      </div>
      <div className={styles.listOrder}>
      {orderList.map((order,index)=>(
        <div className={styles.orderDetail} key={index}>
          <div className={styles.orderDetailTop}>
            <div>
              {order.category}
              <button>Xem shop</button>
            </div>
             {statusFunction(order.status)}
          </div>
          <div className={styles.orderDetailCenter}>
            <div style={{display: 'flex',width:'60%'}}>
              <img src={order.productImg} alt='product'/>
              <div>
                <p>{order.productName}</p>
                <p style={{color:'#bbbaba'}}>{order.description}</p>
                <p> x {order.quantity}</p>
              </div>
            </div>
            {Number(order.price * order.quantity).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}
          </div>
          <div className={styles.orderDetailBottom}>
            <button>Đánh Giá</button>
            <button>Liên Hệ Người Bán</button>
            <button>Mua Lại</button>
            <div>Thành tiền: <span></span></div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default ViewOrder
