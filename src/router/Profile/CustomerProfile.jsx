import { useState, useEffect, useContext } from "react";
import { updateCustomerById } from "./services/user.services";
import styles from "./CustomerProfile.module.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const CustomerProfile = ({ customer, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState(customer?.Avatar || "");
    const { theme } = useContext(ThemeContext); 
    const [formData, setFormData] = useState({
        CustomerID: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Email: "",
        PhoneNumber: "",
        Gender: "",
        Avatar: null,
    });
    


    const [validationErrors, setValidationErrors] = useState({
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Email: "",
    });
    

    useEffect(() => {
        if (customer) {
            const date = customer.DateOfBirth ? new Date(customer.DateOfBirth) : null;
            const formattedDate = date
                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                : "";

            setFormData({
                CustomerID: customer.CustomerID || "",
                FirstName: customer.FirstName || "",
                LastName: customer.LastName || "",
                DateOfBirth: formattedDate,
                Email: customer.Email || "",
                PhoneNumber: customer.PhoneNumber || "",
                Gender: customer.Gender || "",
                Avatar: null,
            });

            setPreviewAvatar(customer.Avatar || "");
        }
    }, [customer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, Avatar: file });

        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();

        let errors = {
            FirstName: "",
            LastName: "",
            PhoneNumber: "",
        };

        // Kiểm tra các trường FirstName, LastName, PhoneNumber không được để trống
        if (!formData.FirstName) errors.FirstName = "Vui lòng nhập First Name!";
        if (!formData.LastName) errors.LastName = "Vui lòng nhập Last Name!";
        if (!formData.PhoneNumber) errors.PhoneNumber = "Vui lòng nhập Phone Number!";
        if (!formData.Email) errors.Email = "Vui lòng nhập Email!";

        // Kiểm tra PhoneNumber chỉ chứa chữ số
        const phoneNumberRegex = /^[0-9]+$/;
        if (formData.PhoneNumber && !phoneNumberRegex.test(formData.PhoneNumber)) {
            errors.PhoneNumber = "Phone Number chỉ được chứa các chữ số!";
        }

        // Kiểm tra FirstName và LastName không có số
        const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;

        if (!formData.FirstName) {
            errors.FirstName = "Vui lòng nhập First Name!";
        } else if (!nameRegex.test(formData.FirstName)) {
            errors.FirstName = "First Name không được chứa số!";
        }

        if (!formData.LastName) {
            errors.LastName = "Vui lòng nhập Last Name!";
        } else if (!nameRegex.test(formData.LastName)) {
            errors.LastName = "Last Name không được chứa số!";
        }

        // Kiểm tra ngày sinh hợp lệ
        const today = new Date();
        const birthDate = new Date(formData.DateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();

        if (!formData.DateOfBirth) {
            errors.DateOfBirth = "Vui lòng nhập Date of Birth!";
        } else if (age > 150) {
            errors.DateOfBirth = "Tuổi không được quá 150!";
        } else if (age < 0) {
            errors.DateOfBirth = "Ngày sinh không hợp lệ!";
        }

        // Nếu có lỗi, set errors và không gửi form
        if (Object.values(errors).some((error) => error !== "")) {
            setValidationErrors(errors);
            return;
        }

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });

            await updateCustomerById(customer.CustomerID, formDataToSend);
            onUpdate({ ...formData, Avatar: previewAvatar });
            setIsEditing(false);
            setError("");
        } catch (err) {
            setError("Có lỗi xảy ra khi cập nhật: " + err?.response?.data?.message);
            console.error(err);
        }
    };

    const maskEmail = (email) => {
        if (!email) return "";
        const [name, domain] = email.split("@");
        const maskedName = name.length > 3 ? name.substring(0, 3) + "*****" : "*****";
        return `${maskedName}@${domain}`;
    };

    const maskPhoneNumber = (phone) => {
        if (!phone) return "";
        return phone.slice(0, 3) + "*****" + phone.slice(-2);
    };

    return (
        <div className={`${styles.profileWrapper} ${theme === "dark" ? styles.dark : ""}`}>
            <div className={`${styles.profileContainer} ${theme === "dark" ? styles.darkContainer : ""}`}>
                <div className={styles.avatarContainer}>
                    <img src={previewAvatar} alt="Avatar" className={styles.avatar} />
    
                    {isEditing && (
                        <label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className={styles.hidden} />
                        </label>
                    )}
                </div>
    
                <div className={styles.infoContainer}>
                    {isEditing ? (
                        <form onSubmit={handleUpdateCustomer} className={styles.profileForm}>
                            <label>Họ:</label>
                            <input
                                type="text"
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleInputChange}
                                placeholder={validationErrors.FirstName || "Nhập Họ"}
                                className={theme === "dark" ? styles.darkInput : ""}
                            />
    
                            <label>Tên:</label>
                            <input
                                type="text"
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleInputChange}
                                placeholder={validationErrors.LastName || "Nhập Tên"}
                                className={theme === "dark" ? styles.darkInput : ""}
                            />
    
                            <label>Ngày Sinh:</label>
                            <input
                                type="date"
                                name="DateOfBirth"
                                value={formData.DateOfBirth}
                                onChange={handleInputChange}
                                placeholder={validationErrors.DateOfBirth || "Chọn Ngày Sinh"}
                                className={theme === "dark" ? styles.darkInput : ""}
                            />
    
                            <label>Số Điện Thoại:</label>
                            <input
                                type="text"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleInputChange}
                                placeholder={validationErrors.PhoneNumber || "Nhập số điện thoại"}
                                className={theme === "dark" ? styles.darkInput : ""}
                            />
    
                            <label>Giới Tính:</label>
                            <select
                                name="Gender"
                                onChange={handleInputChange}
                                className={theme === "dark" ? styles.darkSelect : ""}
                            >
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>
    
                            <label>Email:</label>
                            <div className={styles.profileInfo}>
                                <p> <span className={styles.infoText}>{maskEmail(customer.Email)}</span></p>
                            </div>
    
                            <button type="submit" className={theme === "dark" ? styles.darkButton : ""}>Cập nhật</button>
                            <button type="button" onClick={() => setIsEditing(false)} className={theme === "dark" ? styles.darkButton : ""}>Hủy bỏ</button>
                        </form>
                    ) : (
                        <div className={styles.profileInfo}>
                            <p><strong>Họ:</strong> <span className={styles.infoText}>{customer.FirstName}</span></p>
                            <p><strong>Tên:</strong> <span className={styles.infoText}>{customer.LastName}</span></p>
                            <p><strong>Ngày Sinh:</strong> <span className={styles.infoText}>{new Date(customer.DateOfBirth).toLocaleDateString("vi-VN")}</span></p>
                            <p><strong>Số Điện Thoại:</strong> <span className={styles.infoText}>{maskPhoneNumber(customer.PhoneNumber)}</span></p>
                            <p><strong>Giới Tính:</strong> <span className={styles.infoText}>{customer.Gender === "1" ? "Nam" : "Nữ"}</span></p>
                            <p><strong>Email:</strong> <span className={styles.infoText}>{maskEmail(customer.Email)}</span></p>
                            <button onClick={() => setIsEditing(true)} className={theme === "dark" ? styles.darkButton : ""}>Sửa</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );    
};

export default CustomerProfile;
