import { useEffect, useState } from 'react';
import styles from './stylesProduct.module.css'
import { getProductDetail } from '../../service/product';
import { useParams } from 'react-router-dom';
import { formatMoney } from '../../utils';
import { Comments } from '../comment/Comments';
import { LayoutCommon } from '../../layout/layout-common/LayoutCommon';


export const ProductDetail = ({ product, setIsOpen, isPage }) => {
    if (!product) return (<></>)
    return (
        <div className={isPage ? styles.productModal_container_page : styles.productModal_container}>
            <div className={isPage ? styles.product_container_page : styles.product_container}>
                <div className={styles.product_imageContainer} >
                    <img className={styles.product_image} src={product?.ProductImg} onClick={() => { if (setIsOpen) setIsOpen(true) }} />
                </div>
                <div className={styles.product_info}>
                    <div className={styles.product_infoContainer}>
                        <div className={styles.product_infoTitle}>
                            <span className={styles.product_infoTitleName} onClick={() => { if (setIsOpen) setIsOpen(true) }}>{product.Category} - {product.ProductName}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center' }}> <span className={styles.product_infoQuantity}>SL: {product.StockQuantity}</span>
                            <span className={styles.product_infoMoney}>{formatMoney(product.Price)} VND</span></div>
                    </div>
                </div></div>
            <Comments isPage={isPage} product={product}/>
        </div>
    )
}

export const PageProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState()
    const getData = async () => {

        if (!id) return
        const rs = await getProductDetail({ productID: id })
        setProduct(rs.data[0]?.[0])
    }
    useEffect(() => {
        getData()
    }, [id])
    return (
        <LayoutCommon>
            <div>
                <ProductDetail product={product} isPage/>
            </div>
        </LayoutCommon>
    )
}