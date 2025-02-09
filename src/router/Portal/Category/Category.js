
import Header from "../../../layout/Header/Header";
import styles from "./Category.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


const categoryDetails = {
    food: {
        title: "Đặt Đồ Ăn & Đi Chợ",
        link: "/category/food",
        items: {
            "Giới thiệu về dịch vụ": {
                subItems: [
                    "Quán Đối Tác là gì?",
                    "Quán Yêu Thích trên Group5Group5Food là gì?",
                    "Hướng dẫn thêm địa chỉ đặt hàng trên Ứng dụng ShopeeFood",
                    "Làm thế nào để thông báo nếu tôi có yêu cầu đặc biệt về món?",
                    "Làm thế nào để đặt món từ ShopeeFood?",
                    "Hướng dẫn đặt đơn nhóm trên ShopeeFood",
                    "Mart là gì?",
                    "ShopeeFood là gì?"
                ]
            },
            "Vấn đề về món nhận được": { subItems: ["Báo cáo lỗi món ăn", "Hoàn tiền món bị lỗi"] },
            "Thay đổi hoặc hủy đơn hàng": { subItems: ["Hướng dẫn hủy đơn", "Điều kiện thay đổi đơn"] },
            "Vấn đề về Tài xế": { subItems: ["Liên hệ tài xế", "Phản hồi về tài xế"] },
            "Vấn đề tiến độ đơn hàng": { subItems: ["Theo dõi đơn hàng", "Chậm trễ đơn hàng"] },
            "Nhận lại đơn hàng hủy": { subItems: ["Yêu cầu nhận lại đơn"] },
            "Lỗi ứng dụng/Lỗi thanh toán": { subItems: ["Khắc phục lỗi ứng dụng", "Hỗ trợ thanh toán"] },
            "Đánh giá đơn hàng": { subItems: ["Cách đánh giá", "Quản lý đánh giá"] },
            "Vấn đề về Quán": { subItems: ["Liên hệ quán", "Phản hồi chất lượng món"] },
            "Cảnh báo lừa đảo": { subItems: ["Các hình thức lừa đảo", "Bảo vệ tài khoản"] }
        }
    },
    delivery: {
        title: "Đặt Giao Hàng",
        link: "/category/delivery",
        items: {
            "Giới thiệu về dịch vụ đặt giao hàng": { subItems: ["Các loại dịch vụ giao hàng", "Phí giao hàng"] }
        }
    },
    promo: {
        title: "Khuyến Mãi",
        link: "/category/promo",
        items: {
            "Mã khuyến mãi": { subItems: ["Cách sử dụng mã giảm giá", "Điều kiện sử dụng"] }
        }
    },
    payment: {
        title: "Thanh Toán & Hoàn Tiền",
        link: "/category/payment",
        items: {
            "Phương thức thanh toán": { subItems: ["Thanh toán khi nhận hàng", "Thanh toán online"] }
        }
    },
    account: {
        title: "Tài Khoản",
        link: "/category/account",
        items: {
            "Quản lý tài khoản": { subItems: ["Thay đổi thông tin cá nhân", "Bảo mật tài khoản"] }
        }
    },
    info: { title: "Thông Tin Chung", link: "/category/info", items: {} }
};

function Category() {
    const params = useParams();
    const category = params.category;
    const normalizedCategory = category?.toLowerCase();
    const details = categoryDetails[normalizedCategory] || { title: "Danh Mục Không Tồn Tại", items: {} };
    const [expanded, setExpanded] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubItem, setSelectedSubItem] = useState(null);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.categoryContainer}>
                <div className={styles.sidebar}>
                    <h2 className={styles.mainCategory} onClick={() => setExpanded(!expanded)}>
                        {details.title} <img src={expanded ? '/up.png' : '/down.png'} alt='toggle' className={styles.dropdownIcon} />
                    </h2>
                    {expanded && (
                        <ul className={styles.subcategoryList}>
                            {Object.keys(details.items).map((item, i) => (
                                <li key={i} className={`${styles.subcategoryItem} ${selectedCategory === item ? styles.active : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(item);
                                        setSelectedSubItem(null);
                                    }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.contentArea}>
                    {selectedSubItem ? (
                        <div className={styles.detailContent}>
                            <h3>{selectedSubItem}</h3>
                            <p>Chi tiết nội dung cho {selectedSubItem}</p>
                        </div>
                    ) : (
                        selectedCategory && (
                            <>
                                <h3 className={styles.selectedItemTitle}>{selectedCategory}</h3>
                                <ul className={styles.itemList}>
                                    {details.items[selectedCategory]?.subItems?.map((subItem, i) => (
                                        <li key={i} className={`${styles.item} ${selectedSubItem === subItem ? styles.active : ''}`}
                                            onClick={() => setSelectedSubItem(subItem)}>
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Category;
