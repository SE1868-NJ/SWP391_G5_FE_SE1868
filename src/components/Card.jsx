import React, { useEffect, useState, useContext } from "react";
import { formatMoney } from "../utils";
import styles from "./card/styles.module.css";
import { iconFail, iconFavorite, iconFavoriteDefault, iconSuccess } from "./icon/Icon";
import { deleteProductFavorite, setProductFavorite } from "../service/product";
import { CustomerBehaviorContext } from "../globalContext/CustomerBehaviorContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../globalContext/AuthContext";
import { updateCart } from "../service/cart";
import { ModalNotify } from "./modal/ModalCustom";

const Card = ({ item, isFavoriteProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: "", icon: null });
  const navigate = useNavigate();
  const { fetchAddCustomerBehavior } = useContext(CustomerBehaviorContext);
  const { customerID } = useAuth();

  useEffect(() => {
    setIsFavorite(isFavoriteProduct);
  }, [isFavoriteProduct]);

  const handleGotoDetail = (id) => {
    navigate("/product/" + id);
  };

  const handleSetFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
      if (!isFavorite) {
        await setProductFavorite({ CustomerID: userData.id, ProductID: item.ProductID });
      } else {
        await deleteProductFavorite({ CustomerID: userData.id, ProductID: item.ProductID });
      }
    } catch (error) {
      console.error("Error handleSetFavorite: ", error);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Ngăn chặn event click lan rộng
  
    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
  
      const rs = await updateCart({
        customerID: userData.id,
        productID: item.ProductID,
        quantity: 1,
      });
  
      // Hiệu ứng bay vào giỏ hàng
      animateFlyToCart(e.target, item.ProductImg);
  
      setNotify({
        icon: rs.data?.status === 200 ? iconSuccess : iconFail,
        message: rs.data?.status === 200 ? rs.data?.message || "Thêm thành công" : "Thêm thất bại",
        isOpen: true,
      });
  
    } catch (error) {
      console.error("Error handleAddToCart: ", error);
      setNotify({
        icon: iconFail,
        message: "Thêm thất bại",
        isOpen: true,
      });
    }
  };
  
  const animateFlyToCart = (button, imgSrc) => {
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon) return;
  
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.position = "fixed";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50%";
    img.style.transition = "transform 1s ease-in-out, opacity 1s";
    img.style.zIndex = 1000;
  
    const buttonRect = button.getBoundingClientRect();
    img.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    img.style.top = `${buttonRect.top}px`;
  
    document.body.appendChild(img);
  
    setTimeout(() => {
      const cartRect = cartIcon.getBoundingClientRect();
      img.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(0)`;
      img.style.opacity = "0";
    }, 100);
  
    setTimeout(() => {
      img.remove();
    }, 1000);
  };
  

  return (
    <div 
      onClick={() => fetchAddCustomerBehavior(customerID, item.ProductID, item.Category, "view", item.ShopID)}
      className={styles.card_container}
    >
      <div className={styles.card_imageContainer}>
        <img className={styles.card_image} src={item.ProductImg} alt="" onClick={() => handleGotoDetail(item.ProductID)} />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_infoContainer}>
          <div className={styles.card_infoTitle}>
            <span className={styles.card_infoTitleName} onClick={() => handleGotoDetail(item.ProductID)}>{item.ProductName}</span>
            <p className={styles.card_infoQuantity}>SL: {item.StockQuantity}</p>
          </div>
          <div className={styles.card_infoRight}>
            <span className={styles.card_infoMoney}>{formatMoney(item.Price)} VND</span>
            <div onClick={handleSetFavorite} className={styles.card_infoRight_favorite}>
              {isFavorite ? iconFavorite : iconFavoriteDefault}
            </div>
          </div>
        </div>
        <button className={styles.card_button} onClick={handleAddToCart}>Add to cart</button>
      </div>
      <ModalNotify notify={notify} setNotify={setNotify} />
    </div>
  );
};


const animateFlyToCart = (button, imgSrc) => {
  const cartIcon = document.getElementById("cart-icon");
  if (!cartIcon) return;

  const img = document.createElement("img");
  img.src = imgSrc;
  img.style.position = "fixed";
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.borderRadius = "50%";
  img.style.transition = "transform 1s ease-in-out, opacity 1s";
  img.style.zIndex = 1000;

  const buttonRect = button.getBoundingClientRect();
  img.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
  img.style.top = `${buttonRect.top}px`;

  document.body.appendChild(img);

  setTimeout(() => {
    const cartRect = cartIcon.getBoundingClientRect();
    img.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(0)`;
    img.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    img.remove();
  }, 1000);
};

export default Card;
