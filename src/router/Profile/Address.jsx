import React, { useEffect, useState, useCallback } from "react";
import { 
    getAddressByCustomerId, 
    addAddress, 
    updateAddressById, 
    removeAddress 
} from "./services/user.services";
import "./CustomerProfile.css";

const AREA_OPTIONS = ["Khu A", "Khu B", "Khu C", "Khu D"];

const Address = ({ customerID }) => {
    const [addresses, setAddresses] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        houseAddress: "",
        area: "Khu A"
    });

    // Lấy danh sách địa chỉ từ server
    const fetchAddresses = useCallback(async () => {
        try {
            const response = await getAddressByCustomerId(customerID);
            setAddresses(response);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách địa chỉ:", error);
        }
    }, [customerID]);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  
    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!formData.houseAddress || !formData.area) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            await addAddress(customerID, formData.houseAddress, formData.area);
            await fetchAddresses();
            setFormData({ houseAddress: "", area: "Khu A" });
            setError("");
            setIsAdding(false);
        } catch (err) {
            setError("Có lỗi khi thêm địa chỉ!");
            console.error("Lỗi từ API:", err);
        }
    };

   
    const handleEditAddress = (address) => {
        setIsEditing(address.AddressID);
        setFormData({ houseAddress: address.HouseAddress, area: address.Area });
    };

   
    const handleUpdateAddress = async (e, addressID) => {
        e.preventDefault();
        if (!formData.houseAddress || !formData.area) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            await updateAddressById(addressID, {
                houseAddress: formData.houseAddress,
                area: formData.area
            });

            await fetchAddresses();
            setIsEditing(null);
            setError("");
        } catch (err) {
            setError("Có lỗi khi cập nhật địa chỉ!");
            console.error(err);
        }
    };

    
    const handleDeleteAddress = async (addressID) => {
        try {
            await removeAddress(addressID, customerID);
            await fetchAddresses();
        } catch (error) {
            console.error("Lỗi khi xóa địa chỉ:", error);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="info-container">
                    <h2>Địa chỉ của bạn</h2>

                    {addresses.length === 0 ? (
                        <p>Chưa có địa chỉ nào.</p>
                    ) : (
                        addresses.map((address) =>
                            isEditing === address.AddressID ? (
                                <form 
                                    key={address.AddressID} 
                                    onSubmit={(e) => handleUpdateAddress(e, address.AddressID)} 
                                    className="profile-form"
                                >
                                    {error && <p className="error-message">{error}</p>}
                                    <label>Địa chỉ:</label>
                                    <input
                                        type="text"
                                        name="houseAddress"
                                        value={formData.houseAddress}
                                        onChange={handleInputChange}
                                    />
                                    <label>Khu vực:</label>
                                    <select name="area" value={formData.area} onChange={handleInputChange}>
                                        {AREA_OPTIONS.map((area) => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                    <button type="submit">Lưu</button>
                                    <button type="button" onClick={() => setIsEditing(null)}>Hủy</button>
                                </form>
                            ) : (
                                <div key={address.AddressID} className="profile-info">
                                    <p><strong>Địa chỉ:</strong> <span>{address.HouseAddress}</span></p>
                                    <p><strong>Khu vực:</strong> <span>{address.Area}</span></p>
                                    <button onClick={() => handleEditAddress(address)}>Chỉnh sửa</button>
                                    <button onClick={() => handleDeleteAddress(address.AddressID)}>Xóa</button>
                                </div>
                            )
                        )
                    )}

                    {isAdding && (
                        <form onSubmit={handleAddAddress} className="profile-form">
                            {error && <p className="error-message">{error}</p>}
                            <label>Địa chỉ:</label>
                            <input
                                type="text"
                                name="houseAddress"
                                value={formData.houseAddress}
                                onChange={handleInputChange}
                            />
                            <label>Khu vực:</label>
                            <select name="area" value={formData.area} onChange={handleInputChange}>
                                {AREA_OPTIONS.map((area) => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                            <button type="submit">Thêm địa chỉ</button>
                        </form>
                    )}
 
                        <button 
                            onClick={() => setIsAdding(!isAdding)}
                            className={`toggle-button ${isAdding ? "close" : "add"}`}
                        >
                            {isAdding ? " Đóng" : " Thêm địa chỉ mới"}
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Address;
