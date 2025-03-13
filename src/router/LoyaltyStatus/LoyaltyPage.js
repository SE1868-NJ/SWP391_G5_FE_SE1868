import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LoyaltyPage.css';

const LoyaltyPage = () => {
    const { customerId } = useParams();
    const [loyaltyInfo, setLoyaltyInfo] = useState(null);
    const [loyaltyHistory, setLoyaltyHistory] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/loyalty/${customerId}`)
            .then(res => {
                const data = res.data;

                setLoyaltyInfo(data.loyaltyInfo || null);
                setLoyaltyHistory(Array.isArray(data.loyaltyHistory) ? data.loyaltyHistory : []);
            })
            .catch(err => {
                console.error("Lỗi khi lấy dữ liệu:", err);
                setLoyaltyInfo(null);
                setLoyaltyHistory([]);
            });
    }, [customerId]);

    if (!loyaltyInfo) return <div className="loading">Loading...</div>;

    return (
        <div className="loyalty-container">
            <div className="loyalty-card">
                <h2>Thông tin Khách hàng</h2>
                <p><strong>Tên:</strong> {loyaltyInfo.name}</p>
                <p><strong>Email:</strong> {loyaltyInfo.email}</p>
                <p><strong>Cấp độ:</strong> {loyaltyInfo.currentTier}</p>
                <p><strong>Điểm hiện tại:</strong> {loyaltyInfo.currentPoints}</p>
                <p><strong>Cần thêm:</strong> {loyaltyInfo.pointsToNextTier} điểm để lên cấp</p>
                <p><strong>Cập nhật lần cuối:</strong> {new Date(loyaltyInfo.lastUpdated).toLocaleDateString()}</p>
            </div>

            <div className="loyalty-card">
                <h2>Lịch sử tích điểm</h2>
                {loyaltyHistory.length > 0 ? (
                    <table className="loyalty-table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Mã Đơn hàng</th>
                                <th>Giá trị đơn</th>
                                <th>Điểm tích lũy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loyaltyHistory.map((item) => (
                                <tr key={item.historyId}>
                                    <td>{new Date(item.transactionDate).toLocaleDateString()}</td>
                                    <td>#{item.orderId}</td>
                                    <td>{item.totalAmount.toLocaleString()}₫</td>
                                    <td>{item.pointsEarned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không có lịch sử tích điểm nào.</p>
                )}
            </div>
        </div>
    );
};

export default LoyaltyPage;
