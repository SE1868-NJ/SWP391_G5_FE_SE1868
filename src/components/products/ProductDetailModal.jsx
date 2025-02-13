import React from "react";

import { ModalCustom } from "../modal/ModalCustom"
import styles from './stylesProduct.module.css'
import { formatMoney } from "../../utils";
import { Flex } from "antd";
import { Comments } from "../comment/Comments";

export const ProductDetailModal = ({ product, isOpen, setIsOpen }) => {
    return (
        <ModalCustom isOpen={isOpen} setIsOpen={setIsOpen} hindTitle>
            <div className={styles.productModal_container}>
                <div className={styles.product_container}>
                    <div className={styles.product_imageContainer} >
                        <img className={styles.product_image} src={product.ProductImg} onClick={() => setIsOpen(true)} />
                    </div>
                    <div className={styles.product_info}>
                        <div className={styles.product_infoContainer}>
                            <div className={styles.product_infoTitle}>
                                <span className={styles.product_infoTitleName} onClick={() => setIsOpen(true)}>{product.Category} - {product.ProductName}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: 'center' }}> <span className={styles.product_infoQuantity}>SL: {product.StockQuantity}</span>
                                <span className={styles.product_infoMoney}>{formatMoney(product.Price)} VND</span></div>
                        </div>
                    </div></div>
            <Comments/>
            </div>
        </ModalCustom>
    )
}