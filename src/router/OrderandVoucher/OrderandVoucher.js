import React,{useState} from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./OrderandVoucher.module.css";
import { useCustomer } from "../../Context";
import ViewOrder from "../../components/ViewOrder/ViewOrder";

function StatusOrrder() {
  const { customer } = useCustomer();
  const [chooseFunction, setChooseFunction] = useState("Đơn mua");

  return (
    <div>
      <Header></Header>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div className={styles.index}>
            <div className={styles.indexIntro}>
              <img alt="" src={customer.Avatar} />
              {customer.FirstName + " " + customer.LastName}
            </div>
            <div className={`${styles.function} ${chooseFunction === "Đơn mua" ? styles.choose :''}`}  onClick={() => setChooseFunction("Đơn mua")}>
              <img alt="" src='./orderIcon.png' />
              Đơn mua
            </div>
            <div className={`${styles.function} ${chooseFunction === "Kho voucher"?styles.choose:''}`} onClick={() => setChooseFunction("Kho voucher")}>
              <img alt="" src='./voucherIcon.png' />
              Kho voucher
            </div>
          </div>
          {chooseFunction === "Đơn mua" ? (<ViewOrder></ViewOrder>):''}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default StatusOrrder;
