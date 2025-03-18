import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./AffiliatePage.module.css";
import Header from "../../layout/Header/Header";

const AffiliatePage = () => {
    const { customerId } = useParams(); // Lấy CustomerID từ URL
    const [stats, setStats] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customCode, setCustomCode] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchAffiliateData();
        fetchAffiliateHistory();
    }, [customerId]);

    const fetchAffiliateData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/affiliate/stats/${customerId}`);
            setStats(res.data);
        } catch {
            setMessage("Không có dữ liệu tiếp thị");
        } finally {
            setLoading(false);
        }
    };

    const fetchAffiliateHistory = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/affiliate/history/${customerId}`);
            setHistory(res.data);
        } catch {
            setMessage("Không có lịch sử tiếp thị");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Đang xử lý...");

        try {
            const res = await axios.post("http://localhost:3001/api/affiliate/track", { customerId, customCode });
            setMessage(res.data.message);
            setSuccess(true);
            fetchAffiliateData();
            fetchAffiliateHistory();
        } catch {
            setMessage("Mã không hợp lệ hoặc đã được sử dụng!");
            setSuccess(false);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Chương trình Tiếp thị Liên Kết</h2>

                {loading ? <p className={styles.loading}>Đang tải...</p> : (
                    <>
                        <h3 className={styles.subtitle}>Thống kê tiếp thị</h3>
                        <div className={styles.statsBox}>
                            {stats.map((item, index) => (
                                <div key={index} className={styles.statsItem}>
                                    <img src="/ma.png" className={styles.icon} />
                                    <div className={styles.label}>Mã:</div> {item.CustomCode}

                                    <img src="/cham.png" className={styles.icon} />
                                    <div className={styles.label}>Click:</div> {item.Clicks}

                                    <img src="/xu.png" className={styles.icon} />
                                    <div className={styles.label}>Xu:</div> {item.xu ?? "0"}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <h3 className={styles.subtitle}>Nhập mã tiếp thị</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" placeholder="Nhập mã..." value={customCode} onChange={(e) => setCustomCode(e.target.value)} className={styles.input} />
                    <button type="submit" className={styles.button}>Gửi</button>
                </form>

                {message && <p className={success ? styles.success : styles.error}>{message}</p>}

                <h3 className={styles.subtitle}>Lịch sử tiếp thị</h3>
                <div className={styles.historyBox}>
                    {history.map((item, index) => (
                        <p key={index} className={styles.historyItem}>
                            <b>{item.FirstName} {item.LastName}</b> đã nhập mã <b>{item.CustomCode}</b> vào <span className={styles.date}>{item.CreatedAt}</span>
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AffiliatePage;
