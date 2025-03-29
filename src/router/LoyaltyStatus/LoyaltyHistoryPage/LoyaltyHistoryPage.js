import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import Header from "../../../layout/Header/Header";
import styles from "./LoyaltyHistoryPage.module.css"; // Import CSS Module

// Hàm định dạng tiền VNĐ
const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

// Hàm định dạng ngày (DD/MM/YYYY)
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const LoyaltyHistoryPage = () => {
    const { customerId } = useParams();
    const [history, setHistory] = useState([]);
    const [tiers, setTiers] = useState([]);

    useEffect(() => {
        if (!customerId) {
            console.error("❌ customerId is undefined! Kiểm tra URL của bạn.");
            return;
        }

        axios.get(`http://localhost:3001/api/loyalty-history/${customerId}`)
            .then((response) => {
                const formattedData = response.data.orderHistory.map(order => ({
                    ...order,
                    transactionDate: formatDate(order.transactionDate),
                    amountSpent: order.pointsEarned
                }));
                setHistory(formattedData);
            })
            .catch((error) => {
                console.error("❌ Error fetching loyalty history:", error);
                setHistory([]);
            });

        // Fetch tiers data
        axios.get("http://localhost:3001/api/loyalty-history/tiers/all")
            .then((res) => {
                setTiers(res.data);
            })
            .catch((err) => console.error("❌ Error fetching tiers:", err));

    }, [customerId]);

    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;
        const tier = tiers.find(t => t.spent === payload.value);

        return (
            <g transform={`translate(${x},${y})`}>
                {tier && (
                    <image
                        href={tier.icon}
                        className={styles.tierIcon}
                    />
                )}
                <text className={styles.yAxisText}>
                    {formatCurrency(payload.value)}
                </text>
            </g>
        );
    };

    return (
        <>
            <Header />
            <div className={styles.loyaltyHistoryContainer}>
                <div className={styles.loyaltyCard}>
                    <h2>Biểu đồ chi tiêu</h2>
                    {history.length === 0 ? (
                        <p>Không có lịch sử chi tiêu nào.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={450}>
                            <BarChart data={history} margin={{ top: 20, right: 30, left: 120, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="transactionDate" />
                                <YAxis
                                    tick={<CustomizedAxisTick />}
                                    domain={[0, Math.max(...tiers.map(t => t.spent)) * 1.2]}
                                    ticks={tiers.map(t => t.spent)}
                                    interval={0}
                                />
                                <Tooltip formatter={(value) => formatCurrency(value)} />
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