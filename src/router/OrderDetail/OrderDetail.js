import React from 'react'
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer'
import {useParams,useLocation} from 'react-router-dom'
import styles from './OrderDetail.module.css'
import {useEffect,useState} from 'react'
import axios from 'axios'

function OrderDetail() {
    const location = useLocation();
    const orderDetail = location.state || null;
    const {orderDetailID} = useParams();
    
    useEffect(()=>{
      console.log(orderDetail);
    },[])
  return (
    <div className={styles.page}>
        <Header></Header>
        <div className={styles.content}>
            <img alt='' src={orderDetail.productImg} />
            <div className={styles.infor}>
              <h2>{orderDetail.productName}</h2>
              <p style={{color:'#8f8f8f'}}>Mô tả: {orderDetail.description}</p>
              <p>Loại sản phẩm : {orderDetail.productCategory}</p>
              <p>Giá sản phẩm : {Number(orderDetail.productPrice).toLocaleString('vi',{style:'currency',currency:'VND'})}</p>
              <p>Số lượng : {orderDetail.Quantity}</p>
              <p>Phí vận chuyển : {Number(orderDetail.feeShip).toLocaleString('vi',{style:'currency',currency:'VND'})}</p>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default OrderDetail
