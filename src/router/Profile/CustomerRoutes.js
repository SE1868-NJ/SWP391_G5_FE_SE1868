import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import Password from './Password';
import { getCurrentCustomerById } from './services/user.services';
import './CustomerRoutes.css';
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function CustomerRoutes() {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

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
        <div>
            <Header/>
            <div className="App">
                <nav className="sidebar">
                    <ul>
                        <li><Link to="/customers/customer-info">Thông tin khách hàng</Link></li>
                        <li><Link to="/customers/password">Mật Khẩu</Link></li>
                        <li><Link to="/customers/address">Địa Chỉ</Link></li>
                        <li><Link to="/customers/bank">Ngân Hàng</Link></li>
                        <li><Link to="/customers/setting">Cài Đặt</Link></li>
                    </ul>
                </nav>

                <div className="content">
                    <Routes>
                        <Route path="customer-info" element={
                            <>
                                <h1 className="header-title">Customer Information</h1>
                                {error && <p className="error-text">{error}</p>}
                                {customer ? (
                                    <CustomerProfile customer={customer} onUpdate={setCustomer} />
                                ) : (
                                    <p className="loading-text">Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="password" element={
                            <>
                                <h1 className="header-title">Change Password</h1>
                                {customer ? (
                                    <Password customer={customer} onUpdate={setCustomer} />
                                ) : (
                                    <p className="loading-text">Đang tải dữ liệu...</p>
                                )}
                            </>
                        } />
                        <Route path="address" element={<h1 className="header-title">Địa Chỉ</h1>} />
                        <Route path="bank" element={<h1 className="header-title">Ngân Hàng</h1>} />
                        <Route path="setting" element={<h1 className="header-title">Cài Đặt</h1>} />
                    </Routes>
                </div>
            </div>
            <Footer/>
        </div>    
    );
}

export default CustomerRoutes;
