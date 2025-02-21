import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// URL API của Backend (thay thế bằng URL thực tế)
const API_URL = "http://localhost:3001/customers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [customers, setCustomers] = useState([]);

    // Lấy danh sách Customers từ Backend khi ứng dụng khởi chạy
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data;                
                console.log("danh sách Customers: ", data);
                setCustomers(data);
                console.log("Customers: ",customers) // Lưu danh sách khách hàng vào state
            } catch (error) {
                console.error("Lỗi khi tải danh sách Customers:", error);
            }
        };

        fetchCustomers();

        // Kiểm tra trạng thái đăng nhập
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Đăng nhập với email và password từ CSDL
    const login = (email, password) => {
        const foundUser = customers.find(user => user.Email === email && user.password === password);
        console.log("Danh sách foundUser: ",foundUser)
        console.log("Keys của foundUser:", Object.keys(foundUser));
        if (foundUser) {
            const userData = { 
                id: foundUser.id, 
                name: `${foundUser.FirstName} ${foundUser.LastName}`, 
                email: foundUser.Email,
                avatar: foundUser.Avatar
            };
            console.log("danh scahs userData:",userData)
            
            localStorage.setItem("user", JSON.stringify(userData)); // Lưu vào localStorage
            setUser(userData);
            return { success: true, message: "Đăng nhập thành công!" };
        } else {
            return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
        }
    };

    // Đăng xuất
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
