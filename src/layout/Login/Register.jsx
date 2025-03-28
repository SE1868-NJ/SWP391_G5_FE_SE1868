import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";
import Footer from "../Footer/Footer";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/customers/register", {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                DateOfBirth: dateOfBirth,
                BankAccount: bankAccount,
                password: password
            });

            if (response.status === 201) {
                navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            }
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            setError("Đăng ký không thành công. Vui lòng thử lại!");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <h1>Đăng ký</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleRegister} className={styles.form}>
                    <input type="text" placeholder="Họ" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className={styles.input} />
                    <input type="text" placeholder="Tên" value={lastName} onChange={(e) => setLastName(e.target.value)} required className={styles.input} />
                    <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                    <input type="date" placeholder="Ngày sinh" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required className={styles.input} />
                    <input type="text" placeholder="Số tài khoản ngân hàng" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} required className={styles.input} />
                    <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                    <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={styles.input} />
                    <button type="submit" className={styles.button}>Đăng ký</button>
                    <button type="button" className={styles.loginButton} onClick={() => navigate("/login")}>
                        Đăng nhập
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
