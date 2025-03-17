import React from "react";
import styles from "./PayBills.module.css"; // Import module CSS

function PayBills() {
  return (
    <div className={styles.paymentPage}>
      <h2 className={styles.title}>Hóa Đơn Thanh Toán: Hóa Đơn Điện Tháng 10/2025</h2>
      <div className={styles.invoiceDetails}>
        <div className={styles.invoiceRow}>
          <strong>Số Tiền Hóa Đơn:</strong> <span>2,345,000 VNĐ</span>
        </div>
        <div className={styles.invoiceRow}>
          <strong>Tên Người Thanh Toán:</strong> <span>Nguyễn Văn A</span>
        </div>
        <div className={styles.invoiceRow}>
          <strong>Tổng Tiền Thanh Toán:</strong> <span>2,345,000 VNĐ</span>
        </div>
      </div>
      <div className={styles.qrSection}>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?data=MoMoPaymentLinkHere&size=150x150"
          alt="QR Momo"
        />
      </div>
      <button className={styles.payButton}>Thanh Toán</button>
    </div>
  );
}

export default PayBills;
