import { useState, useEffect } from "react";
import { updateCustomerById } from "./services/user.services";
import "./CustomerProfile.css";


const CustomerProfile = ({ customer, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState(customer?.Avatar || "");
    const [formData, setFormData] = useState({
        CustomerID: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Email: "",
        PhoneNumber: "",
        Gender: "",
        password:"",
        Avatar: null,
    });


    const [oldPassword, setOldPassword] = useState("");

    const [validationErrors, setValidationErrors] = useState({
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Email: "",
        password:"",
        oldPassword: "",
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
                password :customer.password || "",
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
            Email: "",
            Password:"",
            oldPassword: "",
        };

        if (!oldPassword) {
            errors.oldPassword = "Vui lòng nhập mật khẩu !";
        } else if (oldPassword !== customer.password) {
            errors.oldPassword = "Mật khẩu không chính xác!";
        }

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
        } else if (age > 100) {
            errors.DateOfBirth = "Tuổi không được quá 100!";
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
        <div className="profile-wrapper">
            <div className="profile-container">
            <div className="avatar-container">
                <img src={previewAvatar} alt="Avatar" className="avatar" />

                {isEditing && (
                 <label className="edit-icon">
                 <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                 </label>
                )}
            </div>

                <div className="info-container">
                    {isEditing ? (
                        <form onSubmit={handleUpdateCustomer} className="profile-form">
                            {error && <p className="error-message">{error}</p>}
                            <label>Họ:</label>
                            <input 
                                type="text" 
                                name="FirstName" 
                                value={formData.FirstName} 
                                onChange={handleInputChange} 
                            />
                            {validationErrors.FirstName && <span className="error-message">{validationErrors.FirstName}</span>}

                            <label>Tên:</label>
                            <input 
                                type="text" 
                                name="LastName" 
                                value={formData.LastName} 
                                onChange={handleInputChange} 
                            />
                            {validationErrors.LastName && <span className="error-message">{validationErrors.LastName}</span>}

                            <label>Ngày Sinh:</label>
                            <input 
                                type="date" 
                                name="DateOfBirth" 
                                value={formData.DateOfBirth} 
                                onChange={handleInputChange} 
                            />
                            {validationErrors.DateOfBirth && <span className="error-message">{validationErrors.DateOfBirth}</span>}

                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="Email" 
                                value={maskEmail(formData.Email)} 
                                onChange={handleInputChange} 
                                placeholder={formData.Email ? "" : "Nhập email mới"} 
                            />
                            {validationErrors.Email && <span className="error-message">{validationErrors.Email}</span>}

                            <label>Số Điện Thoại:</label>
                            <input 
                                type="text" 
                                name="PhoneNumber" 
                                value={maskPhoneNumber(formData.PhoneNumber)} 
                                onChange={handleInputChange} 
                                placeholder="Nhập số mới"
                            />
                            {validationErrors.PhoneNumber && <span className="error-message">{validationErrors.PhoneNumber}</span>}

                            <label>Giới Tính:</label>
                            <select 
                                name="Gender" 
                                value={formData.Gender} 
                                onChange={handleInputChange}
                            >
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>

                            <label>Mật Khẩu:</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Nhập mật khẩu "
                            />
                            {validationErrors.oldPassword && <span className="error-message">{validationErrors.oldPassword}</span>}
                   

                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className="profile-info">
                        <p><strong>Họ:</strong> <strong2>{customer.FirstName}</strong2></p>
                        <p><strong>Tên:</strong> <strong2>{customer.LastName}</strong2></p>
                        <p><strong>Ngày Sinh:</strong> <strong2>{new Date(customer.DateOfBirth).toLocaleDateString("vi-VN")}</strong2></p>
                        <p><strong>Email:</strong> <strong2>{maskEmail(customer.Email)}</strong2></p>
                        <p><strong>Số Điện Thoại:</strong> <strong2>{maskPhoneNumber(customer.PhoneNumber)}</strong2></p>
                        <p><strong>Giới Tính:</strong> <strong2>{customer.Gender === "1" ? "Nam" : "Nữ"}</strong2></p>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
