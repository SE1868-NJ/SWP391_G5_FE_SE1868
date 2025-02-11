import { useState } from "react";
import { updateCustomerById } from "./services/user.services";
import "./Password.css";

const Password = ({ customer }) => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (passwordData.oldPassword !== customer.password) {
            setError("Mật khẩu cũ không chính xác!");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Xác nhận mật khẩu mới không khớp!");
            return;
        }

        try {
            await updateCustomerById(customer.CustomerID, { password: passwordData.newPassword });
            setSuccess("Đổi mật khẩu thành công!");
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setError("Có lỗi xảy ra: " + err?.response?.data?.message);
        }
    };

    return (
        <div className="password-container">
            <h2>Đổi mật khẩu</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleUpdatePassword}>
                <label>Mật khẩu cũ:</label>
                <input 
                    type="password" 
                    name="oldPassword" 
                    value={passwordData.oldPassword} 
                    onChange={handleChangePassword} 
                />

                <label>Mật khẩu mới:</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    value={passwordData.newPassword} 
                    onChange={handleChangePassword} 
                />

                <label>Xác nhận mật khẩu mới:</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={passwordData.confirmPassword} 
                    onChange={handleChangePassword} 
                />

                <button type="submit">Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default Password;
