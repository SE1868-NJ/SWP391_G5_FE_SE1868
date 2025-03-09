import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const LoyaltyStatus = () => {
    const { customerId } = useParams();  // Lấy customerId từ URL
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!customerId) {
            setError("Không tìm thấy ID khách hàng");
            return;
        }

        axios.get(`http://localhost:3000/api/loyalty/${customerId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError("Lỗi khi tải dữ liệu khách hàng");
                console.error("Axios Error:", err);
            });
    }, [customerId]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!data) return <p>Đang tải dữ liệu...</p>;

    return (
        <div>
            <h2>Thông tin khách hàng thân thiết</h2>
            <p>Họ tên: {data.username}</p>
            <p>Số đơn hàng: {data.total_orders}</p>
            <p>Tổng tiền đã chi tiêu: {data.total_spent} VND</p>
            <p>Cấp độ: {data.tier}</p>
        </div>
    );
};

export default LoyaltyStatus;
