import React, { useState } from 'react';
import { formatMoney } from '../utils';
import styles from './card/styles.module.css'
import { ProductDetailModal } from './products/ProductDetailModal';
const Card = ({item}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className={styles.card_container}>
      <div className={styles.card_imageContainer} >
        <img className={styles.card_image} src={item.ProductImg} onClick={()=> setIsOpen(true)}/>
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_infoContainer}>
          <div className={styles.card_infoTitle}>
            <span className={styles.card_infoTitleName} onClick={()=> setIsOpen(true)}>{item.ProductName}</span>
            <p className={styles.card_infoQuantity}>SL: {item.StockQuantity}</p>
          </div>
          <span className={styles.card_infoMoney}>{formatMoney(item.Price)} VND</span>
        </div>
        <button className={styles.card_button}>Add to cart</button>
      </div>
      <ProductDetailModal isOpen={isOpen}  setIsOpen={setIsOpen} product={item} />

    </div>
  );
}

export default Card;
