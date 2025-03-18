import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển trang
import axios from "axios";
import "./LoyaltyPage.css";
import Header from "../../layout/Header/Header";
import Breadcrumb from "../Portal/Breadcrumb/Breadcrumb";

const tierThresholds = {
    Silver: { orders: 3, spent: 1000000 },
    Gold: { orders: 6, spent: 3000000 },
    Diamond: { orders: 10, spent: 5000000 }
};

const tierIcons = {
    Bronze: "/bronze.png",
    Silver: "/silver.png",
    Gold: "/gold.png",
    Diamond: "/diamond.png"
};

const LoyaltyPage = () => {
    const { customerId } = useParams();
    const navigate = useNavigate(); // Hook để chuyển trang
    const [loyaltyInfo, setLoyaltyInfo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/loyalty/${customerId}`)
            .then(res => {
                console.log("Dữ liệu API nhận được:", res.data);
                setLoyaltyInfo(res.data || null);
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu:", err);
                setLoyaltyInfo(null);
            });
    }, [customerId]);

    if (!loyaltyInfo) return <div className="loading">Loading...</div>;

    const { currentTier, totalOrders, totalSpent, name, email, rewards } = loyaltyInfo;

    // Xác định tier tiếp theo
    const nextTier = currentTier === "Bronze" ? "Silver" :
        currentTier === "Silver" ? "Gold" :
            currentTier === "Gold" ? "Diamond" : null;

    const nextTierGoal = nextTier ? tierThresholds[nextTier] : null;
    const ordersProgress = nextTierGoal ? (totalOrders / nextTierGoal.orders) * 100 : 100;
    const spentProgress = nextTierGoal ? (totalSpent / nextTierGoal.spent) * 100 : 100;

    return (
        <>
            <Header />
            <div className="loyalty-container">
                <Breadcrumb />

                {/* Thẻ Loyalty */}
                <div className="loyalty-card loyalty-status">
                    <div className="loyalty-status-header">
                        <img src={tierIcons[currentTier]} alt={currentTier} className="tier-icon" />
                        <h2>{currentTier.toUpperCase()} MEMBER</h2>
                        <p>{name}</p>
                    </div>

                    {nextTier && (
                        <div className="next-tier">
                            <h3>Tiến trình nâng hạng lên {nextTier}</h3>
                            <div className="progress-bar">
                                <p>Đơn hàng ({totalOrders}/{nextTierGoal.orders})</p>
                                <div className="bar">
                                    <div className="fill" style={{ width: `${ordersProgress}%` }}></div>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <p>Chi tiêu ({totalSpent.toLocaleString()}₫ / {nextTierGoal.spent.toLocaleString()}₫)</p>
                                <div className="bar">
                                    <div className="fill" style={{ width: `${spentProgress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Nút bấm chuyển sang lịch sử Loyalty */}
                    <button className="history-button" onClick={() => navigate(`/loyalty-history/${customerId}`)}>
                        Xem Lịch Sử Loyalty
                    </button>
                </div>

                {/* Thông tin khách hàng - Chuyển xuống dưới lịch sử */}
                <div className="loyalty-card loyalty-history">
                    <h2>Thông tin Khách hàng</h2>
                    <p><strong>Tên:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Đơn hàng đã mua:</strong> {totalOrders}</p>
                    <p><strong>Tổng chi tiêu:</strong> {totalSpent.toLocaleString()}₫</p>
                </div>

                {/* Phần thưởng */}
                <div className="loyalty-card loyalty-rewards">
                    <h2>Ưu đãi dành cho bạn</h2>
                    <ul className="reward-list">
                        {rewards.map((reward, index) => (
                            <li key={index} className="reward-item">
                                <img src={`${reward.icon}`} alt={reward.reward_name} className="reward-icon" />
                                <div className="reward-details">
                                    <strong>{reward.reward_name}</strong>: {reward.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LoyaltyPage;
