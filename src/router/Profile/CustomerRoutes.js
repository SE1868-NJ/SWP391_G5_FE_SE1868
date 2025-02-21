import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import Password from './Password';
import { getCurrentCustomerById } from './services/user.services';
import styles from './CustomerRoutes.module.css';
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Address from './Address';
import Setting from './Setting';
import Privacy from './Privacy';
import { ThemeContext } from "../../contexts/ThemeContext"; // Chỉ import ThemeContext, không bọc lại ThemeProvider

function CustomerRoutes() {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);  // Lấy theme từ Context

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const customerData = await getCurrentCustomerById(2);
                setCustomer(customerData);
            } catch (err) {
                setError('Không thể tải dữ liệu khách hàng. ' + err?.response?.data?.message);
                console.error(err);
            }
        };

        fetchCustomer();
    }, []);

    return (
        <div className={` ${theme === "dark" ? "dark" : ""}`}>
            <Header />

            <div className={`${styles.app} ${theme === "dark" ? styles.dark : ""}`}>
                <nav className={`${styles.sidebar} ${theme === "dark" ? styles.dark : ""}`}>
                    <ul>
                        <li><Link to="/customers/customer-info">Thông tin khách hàng</Link></li>
                        <li><Link to="/customers/password">Mật Khẩu</Link></li>
                        <li><Link to="/customers/address">Địa Chỉ</Link></li>
                        <li><Link to="/customers/setting">Cài Đặt Thông Báo</Link></li>
                        <li><Link to="/customers/privacy">Quyền Riêng Tư</Link></li>
                    </ul>
                </nav>

                <div className={`${styles.content} ${theme === "dark" ? styles.darkContent : ""}`}>
                    <Routes>
                        <Route path="customer-info" element={
                            <>
                                <h1 className={styles.headerTitle}>Hồ sơ của tôi</h1>
                                {error && <p className={styles.errorText}>{error}</p>}
                                {customer ? (
                                    <CustomerProfile customer={customer} onUpdate={setCustomer} />
                                ) : (
                                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="password" element={
                            <>
                                <h1 className={styles.headerTitle}>Đổi Mật Khẩu</h1>
                                {customer ? (
                                    <Password customer={customer} onUpdate={setCustomer} />
                                ) : (
                                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="address" element={
                            <>
                                <h1 className={styles.headerTitle}>Địa Chỉ</h1>
                                {error && <p className={styles.errorText}>{error}</p>}
                                {customer ? (
                                    <Address customerID={customer.CustomerID} />
                                ) : (
                                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="setting" element={
                            <>
                                <h1 className={styles.headerTitle}>Cài Đặt Thông Báo</h1>
                                {error && <p className={styles.errorText}>{error}</p>}
                                {customer ? (
                                    <Setting customerID={customer.CustomerID} />
                                ) : (
                                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="privacy" element={
                            <>
                                <h1 className={styles.headerTitle}>Quyền Riêng Tư</h1>
                                {error && <p className={styles.errorText}>{error}</p>}
                                {customer ? (
                                    <Privacy customerID={customer.CustomerID} />
                                ) : (
                                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CustomerRoutes;
