import React, { useEffect, useState } from 'react';
import { formatMoney } from '../utils';
import styles from './card/styles.module.css'
import { ProductDetailModal } from './products/ProductDetailModal';
import { iconFavorite, iconFavoriteDefault, iconSuccess } from './icon/Icon';
import { deleteProductFavorite, setProductFavorite } from '../service/product';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../globalContext/AuthContext';
import { updateCart } from '../service/cart';
import { ModalCustom, ModalNotify } from './modal/ModalCustom';
const Card = ({ item, isFavoriteProduct }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    icon: null
  })

  const handleSetFavorite = async () => {
    setIsFavorite(!isFavorite)
    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
      if (!isFavorite) {
        const rs = await setProductFavorite({
          CustomerID: userData.id,
          ProductID: item.ProductID
        })
      } else {
        const rs = await deleteProductFavorite({
          CustomerID: userData.id,
          ProductID: item.ProductID
        })
      }


    } catch (error) {
      console.error("error handleSetFavorite: ", error);

    }
  }

  const handleGotoDetail = (id) => {
    navigate("/product/" + id)
  }

  const handleAddToCart = async () => {

    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
   
        const rs = await updateCart({
          customerID: userData.id,
          productID: item.ProductID,
          quantity: 1
        })
      
        setNotify({
          icon: iconSuccess,
          message: rs.data?.status === 200 ? rs.data?.message || 'Thêm thành công' :  rs?.data?.message || 'Thêm thất bại',
          isOpen: true
        })

    } catch (error) {
      console.error("error handleSetFavorite: ", error);
      setNotify({
        icon: iconSuccess,
        message:  'Thêm thất bại',
        isOpen: true
      })
    }
  }
  useEffect(() => {
    setIsFavorite(isFavoriteProduct)
  }, [isFavoriteProduct])

  return (
    <div className={styles.card_container}>
      <div className={styles.card_imageContainer} >
        <img className={styles.card_image} src={item.ProductImg} onClick={() => handleGotoDetail(item.ProductID)} />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_infoContainer}>
          <div className={styles.card_infoTitle}>
            <span className={styles.card_infoTitleName} onClick={() => handleGotoDetail(item.ProductID)} style={{ margin: 0 }}>{item.ProductName}</span>
            <p className={styles.card_infoQuantity}>SL: {item.StockQuantity}</p>
          </div>
          <div className={styles.card_infoRight}>
            <span className={styles.card_infoMoney} >{formatMoney(item.Price)} VND</span>
            <div onClick={handleSetFavorite} className={styles.card_infoRight_favorite}>{isFavorite ? iconFavorite : iconFavoriteDefault}</div>
          </div>

        </div>
        <button className={styles.card_button} onClick={handleAddToCart}>Add to cart</button>
      </div>
      {/* <ProductDetailModal isOpen={isOpen} setIsOpen={setIsOpen} product={item} /> */}
      <ModalNotify notify={notify} setNotify={setNotify}/>
    </div>
  );
}

export default Card;
