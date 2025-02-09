
import Header from "../../../../layout/Header/Header";
import styles from "./Category.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";


const categoryDetails = {
    food: {
        title: "Đặt Đồ Ăn & Đi Chợ",
        link: "/category/food",
        items: [
            "Giới Thiệu Về Dịch Vụ",
            "Vấn Đề Về Món Nhận Được",
            "Thay Đổi Hoặc Hủy Đơn Hàng",
            "Vấn Đề Về Tài Xế",
            "Vấn Đề Tiến Độ Đơn Hàng",
            "Nhận Lại Đơn Hàng Hủy",
            "Lỗi Ứng Dụng/Lỗi Thanh Toán",
            "Đánh Giá Đơn Hàng",
            "Vấn Đề Về Quán",
            "Cảnh Báo Lừa Đảo"
        ],
    },
    delivery: {
        title: "Đặt Giao Hàng",
        link: "/category/delivery",
        items: [
            "Giới Thiệu Về Dịch Vụ Đặt Giao Hàng",
            "Các Loại Dịch Vụ Giao Hàng",
            "Phí Giao Hàng"
        ],
    },
    promo: {
        title: "Khuyến Mãi",
        link: "/category/promo",
        items: [
            "Mã Khuyến Mãi",
            "Cách Sử Dụng Mã Giảm Giá",
            "Điều Kiện Sử Dụng"
        ],
    },
    payment: {
        title: "Thanh Toán & Hoàn Tiền",
        link: "/category/payment",
        items: [
            "Phương Thức Thanh Toán",
            "Thanh Toán Khi Nhận Hàng",
            "Thanh Toán Online"
        ],
    },
    account: {
        title: "Tài Khoản",
        link: "/category/account",
        items: [
            "Quản Lý Tài Khoản",
            "Thay Đổi Thông Tin Cá Nhân",
            "Bảo Mật Tài Khoản"
        ],
    },
    info: { title: "Thông Tin Chung", link: "/category/info", items: [] },
};

function Category() {
    const params = useParams();
    const category = params.category;
    const normalizedCategory = category?.toLowerCase();
    const details = categoryDetails[normalizedCategory] || { title: "Danh Mục Không Tồn Tại", items: [] };
    const [expanded, setExpanded] = useState(true);
    const [selectedItem, setSelectedItem] = useState(details.items.length > 0 ? details.items[0] : null);

    useEffect(() => {
        if (details.items.length > 0) {
            setSelectedItem(details.items[0]);
        }
    }, [category]);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.searchBanner}>
                <h1>Chúng Tôi Có Thể Giúp Gì Cho Bạn?</h1>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Nhập Nội Dung Cần Tìm" />
                    <button>Tìm Kiếm</button>
                </div>
            </div>
            <div className={styles.categoryContainer}>
                <div className={styles.sidebar}>
                    <h2 className={styles.mainCategory} onClick={() => setExpanded(!expanded)}>
                        {details.title} <img src={expanded ? '/up.png' : '/down.png'} alt='toggle' className={styles.dropdownIcon} />
                    </h2>
                    {expanded && details.items.length > 0 && (
                        <ul className={styles.subcategoryList}>
                            {details.items.map((item, i) => (
                                <li
                                    key={i}
                                    className={`${styles.subcategoryItem} ${selectedItem === item ? styles.active : ''}`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.contentArea}>
                    {selectedItem ? <h3 className={styles.selectedItemTitle}>{selectedItem}</h3> : <p>Chọn Một Mục Để Xem Thông Tin</p>}
                </div>
            </div>
        </div>
    );
}

export default Category;
