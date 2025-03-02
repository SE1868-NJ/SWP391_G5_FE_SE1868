import React, { useState, useEffect } from "react";
import './ActivityLog.module.css';

const ActivityLog = () => {
    const userID = 2; // Giả lập userID
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/activitylogs/${userID}`);
                const data = await response.json();
                console.log("Dữ liệu nhận được từ API:", data);
                setLogs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        fetchLogs();
    }, [userID]);

    return (
        <div className="activity-log-container">
            <h2 className="activity-log-title">Nhật ký hoạt động</h2>
            {logs.length === 0 ? (
                <p className="text-gray-500 text-center">Không có nhật ký hoạt động nào!</p>
            ) : (
                <ul className="activity-log-list">
                    {logs.map((log) => (
                        <li key={log.id} className="activity-log-item">
                            <p><strong>Hoạt động:</strong> {log.action}</p>
                            <p className="activity-log-time">
                                <strong>Thời gian:</strong> {new Date(log.timestamp).toLocaleString()}
                            </p>

                            {/* Hiển thị thông tin liên quan nếu có */}
                            {log.product_id && <p><strong>Sản phẩm ID:</strong> {log.product_id}</p>}
                            {log.order_id && <p><strong>Đơn hàng ID:</strong> {log.order_id}</p>}
                            {log.favorite_id && <p><strong>Yêu thích ID:</strong> {log.favorite_id}</p>}
                            {log.review_id && <p><strong>Đánh giá ID:</strong> {log.review_id}</p>}

                            {/* Hiển thị details nếu có */}
                            {log.details && typeof log.details === "string" && (
                                <pre className="activity-log-details">
                                    {log.details}
                                </pre>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActivityLog;