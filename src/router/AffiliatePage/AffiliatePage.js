import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./AffiliatePage.module.css";
import Header from "../../layout/Header/Header";

const AffiliatePage = () => {
    const { customerId } = useParams(); // Lấy CustomerID từ URL
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customCode, setCustomCode] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // Lấy dữ liệu tiếp thị
    useEffect(() => {
        axios.get(`http://localhost:3001/api/affiliate/stats/${customerId}`)
            .then(res => {
                setStats(res.data);
            })
            .catch(() => setMessage("Không có dữ liệu tiếp thị"))
            .finally(() => setLoading(false));
    }, [customerId]);

    // Xử lý nhập mã tiếp thị
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Đang xử lý...");

        axios.post("http://localhost:3001/api/affiliate/track", { customCode })
            .then(res => {
                setMessage(res.data.message);
                setSuccess(true);
            })
            .catch(() => {
                setMessage("Mã không hợp lệ hoặc đã được sử dụng!");
                setSuccess(false);
            });
    };

    return (
        <>
            <Header />
            <div className={styles.container}>

                <h2 className={styles.title}>Chương trình Tiếp thị Liên kết</h2>

                {loading ? <p className={styles.loading}>Đang tải...</p> : (
                    <>
                        <h3 className={styles.subtitle}>Thống kê tiếp thị</h3>
                        <ul className={styles.list}>
                            {stats.map((item, index) => (
                                <li key={index} className={styles.item}>
                                    {[
                                        { label: "Mã", value: item.CustomCode, color: "#007bff" },
                                        { label: "Click", value: item.Clicks, color: "#ff9800" },
                                        { label: "Xu", value: item.Xu, color: "#28a745" }
                                    ].map((data, idx) => (
                                        <span key={idx} style={{ color: data.color, fontWeight: "bold" }}>
                                            {data.label}: {data.value}
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>

                    </>
                )}

                <h3 className={styles.subtitle}>Nhập mã tiếp thị</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nhập mã..."
                        value={customCode}
                        onChange={(e) => setCustomCode(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Gửi</button>
                </form>

                {message && <p className={success ? styles.success : styles.error}>{message}</p>}
            </div>
        </>
    );
};

export default AffiliatePage;
