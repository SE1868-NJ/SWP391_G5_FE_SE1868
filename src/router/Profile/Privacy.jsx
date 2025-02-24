import React, { useState, useContext } from "react";
import styles from "./Privacy.module.css";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import ThemeContext

const PrivacySettings = () => {
  const [showName, setShowName] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext); // Lấy trạng thái theme và hàm toggleTheme

  const toggleShowName = () => {
    setShowName(!showName);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản không?")) {
      alert("Tài khoản của bạn sẽ bị xóa!");
    }
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.setting}>
        <span>Chế độ tối</span>
        <div
          className={`${styles.toggle} ${theme === "dark" ? styles.active : ""}`}
          onClick={toggleTheme}
        ></div>
      </div>

      {/* Hiển thị tên khi comment */}
      <div className={styles.setting}>
        <span>Hiển thị tên khi comment</span>
        <div
          className={`${styles.toggle} ${showName ? styles.active : ""}`}
          onClick={toggleShowName}
        ></div>
      </div>

      {/* Nhật ký hoạt động */}
      <div className={styles.setting}>
        <span>Nhật ký hoạt động</span>
        <button className={styles.button}>Xem nhật ký</button>
      </div>

      {/* Xóa tài khoản */}
      <div className={styles.setting}>
        <span>Xóa tài khoản</span>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDeleteAccount}
        >
          Xóa tài khoản
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
