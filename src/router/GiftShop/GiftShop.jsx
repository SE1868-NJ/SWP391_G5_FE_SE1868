import React, { useState, useEffect } from "react";
import styles from "./GiftShop.module.css";
import axios from "axios";
import { useAuth } from "../../../src/globalContext/AuthContext";

function GiftShop() {
  const { customerID } = useAuth();
  const [chooseType, setChooseType] = useState("Tất cả");
  const [allVouchers, setAllVouchers] = useState([]);
  const [chooseVouchers, setChooseVouchers] = useState([]);
  const [savedVouchers, setSavedVouchers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [customerCoin, setCustomerCoin] = useState(0); // 🔹 Thêm state lưu số xu

  useEffect(() => {
    fetchVoucher();
    if (customerID) {
      fetchSavedVouchers();
      fetchCustomerCoin(); // 🔹 Lấy số xu khi tải trang
    }
  }, [customerID]);

  // 🔹 Lấy số xu của khách hàng
  const fetchCustomerCoin = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/customers/${customerID}`);
      setCustomerCoin(response.data.xu);
    } catch (error) {
      console.error("❌ Lỗi khi lấy số xu:", error);
    }
  };

  // Lấy danh sách tất cả voucher
  const fetchVoucher = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/Voucher/fetchAllVouchers");
      setAllVouchers(response.data);
      setChooseVouchers(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách voucher:", error);
    }
  };

  // Lấy danh sách voucher đã lưu của khách hàng
  const fetchSavedVouchers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/VoucherDetail/SavedVouchers/${customerID}`);
      setSavedVouchers(response.data.map((v) => v.VoucherID));
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách voucher đã lưu:", error);
    }
  };

  const changeType = (type) => {
    setChooseType(type);
    if (type === "Sàn") {
      setChooseVouchers(allVouchers.filter((item) => item.ShopID === null));
    } else if (type === "Cửa hàng") {
      setChooseVouchers(allVouchers.filter((item) => item.ShopID !== null));
    } else if (type === "Sản phẩm") {
      setChooseVouchers(allVouchers.filter((item) => item.type === "Sản phẩm"));
    } else if (type === "Giao hàng") {
      setChooseVouchers(allVouchers.filter((item) => item.type === "Giao hàng"));
    } else {
      setChooseVouchers(allVouchers);
    }
  };

  const searchVoucher = () => {
    const vouchers = allVouchers.filter((v) =>
      v.VoucherName.toLowerCase().includes(searchText.toLowerCase())
    );
    setChooseVouchers(vouchers);
  };

  // 🔹 Lưu voucher và trừ 30 xu
  const saveVoucher = async (voucherID) => {
    if (!customerID) {
      alert("Bạn cần đăng nhập để lưu voucher!");
      return;
    }
    if (customerCoin < 30) {
      alert("❌ Bạn không đủ xu để lưu voucher!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/VoucherDetail/SaveVoucherID", {
        saveVoucherID: voucherID,
        customerID: customerID,
      });

      await axios.put(`http://localhost:3001/customers/${customerID}`, {
        xu: customerCoin - 30, // 🔹 Trừ 30 xu
      });

      setCustomerCoin((prev) => prev - 30); // 🔹 Cập nhật UI ngay lập tức
      setSavedVouchers([...savedVouchers, voucherID]);
      alert("✅ Lưu voucher thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi lưu voucher:", error);
      alert("❌ Lưu voucher thất bại!");
    }
  };

  // 🔹 Hủy lưu voucher
  const unsaveVoucher = async (voucherID) => {
    if (!customerID) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này!");
      return;
    }

    try {
      await axios.delete("http://localhost:3001/api/VoucherDetail/DeleteVoucherID", {
        params: { deleteVoucherID: voucherID, customerID },
      });

      setSavedVouchers(savedVouchers.filter((id) => id !== voucherID)); //  Cập nhật UI ngay lập tức
      alert("✅ Hủy lưu voucher thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi hủy lưu voucher:", error);
      alert("❌ Hủy lưu voucher thất bại!");
    }
  };

  return (
    <div className={styles.giftShop}>
      <h1>🎁 Danh sách mã giảm giá</h1>

      {/* Hiển thị số xu của khách hàng */}
      <div className={styles.customerCoin}>
        <p>💰 Số xu của bạn: <strong>{customerCoin}</strong></p>
      </div>

      {/* Ô tìm kiếm */}
      <div className={styles.searchVoucherDiv}>
        <h2>Tìm kiếm mã giảm giá</h2>
        <div>
          <input
            type="text"
            placeholder="Nhập tên voucher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={searchVoucher}>🔍 Tìm kiếm</button>
        </div>
      </div>

      {/* Bộ lọc loại voucher */}
      <div className={styles.typeVoucherList}>
        {["Tất cả", "Sàn", "Cửa hàng", "Sản phẩm", "Giao hàng"].map((type) => (
          <span
            key={type}
            onClick={() => changeType(type)}
            className={chooseType === type ? styles.chooseType : ""}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Danh sách voucher */}
      <div className={styles.ListVoucher}>
        {chooseVouchers.length > 0 ? (
          chooseVouchers.map((item, index) => (
            <div className={styles.voucherDetail} key={index}>
            <img src={item.VoucherImg} alt={item.VoucherName} />
            <div className={styles.voucherInfo}>
                <p>{item.VoucherName}</p>
                <p>Hạn dùng: {new Date(item.EndDate).toLocaleDateString("en-GB")}</p>

                <div className={styles.buttonContainer}>
                {savedVouchers.includes(item.VoucherID) ? (
                    <button className={styles.unsaveButton} onClick={() => unsaveVoucher(item.VoucherID)}>
                     Hủy lưu
                    </button>
                ) : (
                    <button className={styles.saveButton} onClick={() => saveVoucher(item.VoucherID)}>
                     Lưu Voucher (-30 xu)
                    </button>
                )}
                </div>
            </div>
            </div>
          ))
        ) : (
          <div>❌ Không có mã giảm giá</div>
        )}
      </div>
    </div>
  );
}

export default GiftShop;
