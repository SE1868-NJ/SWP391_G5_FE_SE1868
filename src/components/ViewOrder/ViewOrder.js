import React,{useState,useEffect} from 'react'
import styles from './ViewOrder.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useCustomer } from "../../Context";

function ViewOrder() {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const [allOrder,setAllOrder] = useState([]);
  const [chooseStatus, setChooseStatus] = useState("Tất cả");
  const [orderList, setOrderList] = useState([]);
  const [reviewPopup,setReviewPopup] = useState(null);
  const [messPopup,setMessPopup] = useState(null);
  const [chooseQuantity,setChooseQuantity] = useState(null)
  const [buyOrder,setBuyOrder] = useState(null);
  const [favorites,setFavorites] = useState([]);
  const [formReview, setFormReview] = useState({
    category: "",
    reviewText: "",
    rating:0
  });
  
  const statusMap = {
    "Hoàn thành": "Đã giao hàng",
    "Vận chuyển": "Đang vận chuyển",
    "Hoàn đơn": "Đơn hàng đã bị hoàn",
    "Chờ thanh toán": "Chưa thanh toán",
  };
  useEffect(()=>{
    getAllOrder();
  },[])
  async function getAllOrder(){
    const response = await axios.post('http://localhost:3001/api/Order/OrderDetailCusID',{cusID: customer.CustomerID});
    await setAllOrder(response.data)
    await setOrderList(response.data);
    const response1 = await axios.post('http://localhost:3001/api/Products/getFavorite',{cusID: customer.CustomerID});
    console.log(response1.data)
    await setFavorites(response1.data);
  }
  const statusFunction = (status) => {
    return statusMap[status];
  }
  useEffect(()=>{
    changeStatus();
  },[chooseStatus])
  async function changeStatus(){
    if(chooseStatus !== "Tất cả"){
      await setOrderList(allOrder.filter(item => item.status === chooseStatus));
    }else{
      await setOrderList(allOrder);
    }
  }
  const chooseQuantityPopup = async(order)=>{
    await setBuyOrder(order);
    await setChooseQuantity(1);
  }
  const changeQuantity = async (e)=>{
    console.log(e.target.value)
    await setChooseQuantity(e.target.value);
    
  }
  useEffect(()=>{
    console.log(chooseQuantity)
  },[chooseQuantity])
  const buyAgain = async()=>{
    const order = {...buyOrder, Quantity : chooseQuantity,totalAmount: chooseQuantity * buyOrder.productPrice + 32000,}
    console.log(order);
    navigate('/OrderCheckOut',{state:order})
  }
  const handleChange =async (e) => {
    if(e.target.name === 'rating' && (e.target.value <0 || e.target.value >5)){
      alert('Số sao chỉ từ 0 đến 5');
      await setFormReview({ ...formReview, rating: 0});
    }
    if(e.target.value === 'shipper' && orderList[reviewPopup].shipperID == null){
      alert('Sản phẩm này chưa có người giao hàng nên không thể đánh giá');
      await setFormReview({ ...formReview, category: ''});
    }
    setFormReview({ ...formReview, [e.target.name]: e.target.value });
  };

  const closeReviewPopup = async()=>{
    await setReviewPopup(null)
    await setFormReview({
      category: "",
      reviewText: "",
      rating:0
    })
  }

  const handleSubmit=async()=>{
    if(formReview.category === '' || formReview.reviewText === ""){
      alert('hãy nhập đủ thông tin')
      return;
    }
    const cusID = customer.CustomerID 
    let categoryID;
    if(formReview.category === 'product'){
      categoryID = orderList[reviewPopup].productID;
    }else if(formReview.category === 'shop'){
      categoryID = orderList[reviewPopup].shopID;
    }else{
      categoryID = orderList[reviewPopup].shipperID;
    }
    const response = await axios.post('http://localhost:3001/api/Review/review',{formReview,cusID,categoryID})
    if(response.status === 200){
      await setMessPopup("thành công");
    }else{
      await setMessPopup("thất bại");
    }
    closeReviewPopup();
  }
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
      <div>
      {orderList.map((order,index)=>(
        <div className={styles.orderDetail} key={index}>
          <div className={styles.orderDetailTop}>
            <div>
              {order.productCategory}
              <button onClick={()=> navigate('/')} >Xem shop</button>
            </div>
             {statusFunction(order.status)}
          </div>
          <div className={styles.orderDetailCenter}>
            <div style={{display: 'flex',width:'60%'}}>
              <img src={order.productImg} alt='product'/>
              <div>
                <p>{order.productName}</p>
                <p style={{color:'#bbbaba'}}>{order.description}</p>
                <button onClick={()=>setReviewPopup(index)} >Đánh Giá</button>
              <button onClick={()=> chooseQuantityPopup(order)}>Mua Lại</button>
              </div>
              
            </div>
            <div className={styles.paymentProduct}>
              <p>{Number(order.productPrice).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})} <span style={{paddingLeft: '10px'}}> x  {order.Quantity}</span></p>
              <p>Mã giảm giá: {Number(order.discount).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}</p>
              <p>Thành tiền: <span>{Number(order.productPrice * order.Quantity - order.discount).toLocaleString('vi-VI',{style:'currency',currency:'VND'})}</span></p>
            </div>
            
          </div>
          <div className={styles.orderDetailBottom}>
            
          </div>
        </div>
      ))}
      </div>
      <div className={styles.favorite}>
        <h2>Các sản phẩm bạn thích </h2>
        {favorites.length !== 0 ? favorites.map((item)=>(
          <div className={styles.favoriteItem}>
            <img alt='' src={item.ProductImg} />
            <div>
              <p>{item.ProductName}</p>
              <p>{item.Description}</p>
              <p>Giá: {item.Price}</p>
              <p>Khối lượng: {item.Weight}g</p>
              <p>Còn: {item.StockQuantity} sản phẩm</p>
            </div>
          </div>
        )): (<h3>Bạn chưa thích sản phẩm nào</h3>)}
      </div>
      </div>
      {reviewPopup !== null ?(
        <div className={styles.popup} onClick={(e)=>e.target === e.currentTarget? closeReviewPopup():''}>
          <div className={styles.innerPopup}>
            <h2>Đánh giá sản phẩm {orderList[reviewPopup].productName}</h2>
            <label>Chọn danh mục:</label>
            <select name="category" value={formReview.category} onChange={handleChange}>
              <option value="">-- Chọn --</option>
              <option value="product">Sản phẩm</option>
              <option value="shipper">Người giao hàng</option>
              <option value="shop">Cửa hàng</option>
            </select>
            <label>Chọn số sao (1 đến 5):</label>
            <input
              type="number"
              name="rating"
              value={formReview.rating}
              onChange={handleChange}
              min="1"
              max="5"
            />
            <label>Nhập đánh giá:</label>
            <textarea
              name="reviewText"
              value={formReview.reviewText}
              onChange={handleChange}
              rows="5"
            ></textarea>
            <button className='' onClick={handleSubmit}>Gửi Đánh Giá</button>
          </div>
        </div>
      ):''}
      {messPopup !== null ? (
        <div className={styles.popup} onClick={(e)=>e.target === e.currentTarget? setMessPopup(null):''}>
          <div className={styles.innerPopup}>
            <h2 style={{marginTop:'50%',transform:'translateY(-50%)',textAlign:'center'}}>Đánh giá {messPopup}</h2>
          </div>
        </div>
      ):''}
      {chooseQuantity !== null ? (
        <div className={styles.popup} onClick={(e)=>e.target === e.currentTarget? setChooseQuantity(null):''}>
          <div className={styles.poupQuantity}>
          <label>Chọn số lượng:</label><br/><br/>
            <input
              type="number"
              name="quantity"
              value={chooseQuantity}
              onChange={changeQuantity}
            /><br/><br/>
            <button onClick={()=>buyAgain()}>Mua lại</button>
          </div>
        </div>
      ):''}
    </div>
  )
}

export default ViewOrder
