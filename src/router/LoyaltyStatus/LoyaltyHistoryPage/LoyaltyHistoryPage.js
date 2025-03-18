import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import Header from "../../../layout/Header/Header";
import Breadcrumb from "../../Portal/Breadcrumb/Breadcrumb";
import styles from "./LoyaltyHistoryPage.module.css"; // Import CSS Module

// Các cấp bậc loyalty và ngưỡng chi tiêu
const tierThresholds = [
    { tier: "Bronze", spent: 0, icon: "/bronze.png" },
    { tier: "Silver", spent: 1000000, icon: "/silver.png" },
    { tier: "Gold", spent: 3000000, icon: "/gold.png" },
    { tier: "Diamond", spent: 5000000, icon: "/diamond.png" }
];

// Hàm định dạng tiền VNĐ
const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

// Hàm định dạng ngày (DD/MM/YYYY)
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

// Custom tick component để hiển thị icon loyalty TRÊN số tiền
const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    const tier = tierThresholds.find(t => t.spent === payload.value);

    return (
        <g transform={`translate(${x},${y})`}>
            {/* Hiển thị icon loyalty ở TRÊN số tiền */}
            {tier && (
                <image
                    href={tier.icon}
                    className={styles.tierIcon} // Dùng class từ CSS Module
                />
            )}

            {/* Hiển thị số tiền ngay bên dưới icon */}
            <text className={styles.yAxisText}>
                {formatCurrency(payload.value)}
            </text>
        </g>
    );
};

const LoyaltyHistoryPage = () => {
    const { customerId } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!customerId) {
            console.error("❌ customerId is undefined! Kiểm tra URL của bạn.");
            return;
        }

        console.log(`📌 Fetching loyalty history for customerId: ${customerId}`);

        axios.get(`http://localhost:3001/api/loyalty-history/${customerId}`)
            .then((response) => {
                console.log("✅ Lịch sử loyalty:", response.data);
                const formattedData = response.data.orderHistory.map(order => ({
                    ...order,
                    transactionDate: formatDate(order.transactionDate), // Chuyển đổi ngày
                    amountSpent: order.pointsEarned // Đổi tên key để phản ánh giá trị tiền
                }));
                setHistory(formattedData);
            })
            .catch((error) => {
                console.error("❌ Error fetching loyalty history:", error);
                setHistory([]);
            });
    }, [customerId]);

    return (
        <>
            <Header />
            <div className={styles.loyaltyHistoryContainer}>
                <Breadcrumb />
                <div className={styles.loyaltyCard}>
                    <h2>Lịch sử Đơn Hàng</h2>
                    {history.length === 0 ? (
                        <p>Không có lịch sử đơn hàng nào.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={450}>
                            <BarChart data={history} margin={{ top: 20, right: 30, left: 120, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />

                                {/* Trục ngang: Hiển thị ngày giao dịch */}
                                <XAxis dataKey="transactionDate" />

                                {/* Trục dọc: Hiển thị số tiền chi tiêu kèm theo hình ảnh loyalty */}
                                <YAxis
                                    tick={<CustomizedAxisTick />}
                                    domain={[0, 6000000]} // Giới hạn trên 6 triệu để có khoảng trống
                                    ticks={tierThresholds.map(t => t.spent)} // Các mốc giá tiền
                                    interval={0} // Đảm bảo hiển thị đầy đủ các mức
                                />

                                {/* Tooltip hiển thị giá trị tiền */}
                                <Tooltip formatter={(value) => formatCurrency(value)} />

                                {/* Cột dữ liệu - số tiền đã chi tiêu */}
                                <Bar dataKey="amountSpent" fill="#4CAF50" name="Tiền đã chi" />

                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>


            </div>
        </>
    );
};

export default LoyaltyHistoryPage;
