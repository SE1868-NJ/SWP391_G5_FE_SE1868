import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.css";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.fhs_footer_block_first}>
          <div className={styles.fhs_footer_first_text}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "white", paddingRight: "2vh" }}
            />
            Đăng Kí Nhận Bản Tin
            <div className={styles.fhs_search_footer}>
              <input placeholder="Nhập địa chỉ email của bạn..." />
              <button className={styles.fhs_footer_search_button}>Đăng ký</button>
            </div>
          </div>
        </div>
        <div className={styles.fhs_footer_block_second} style={{ paddingTop: "2vh" }}>
          <div className={styles.fhs_footer_second_text_left}>
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
              alt=""
              style={{ paddingBottom: "3vh", maxWidth: "100%", maxHeight: "100%" }}
            />
            <div>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</div>
            <div>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</div>
            <div>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</div>
            <div style={{ paddingTop: "1vh", width: "80%" }}>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
            </div>
            <img
              src="logo-bo-cong-thuong-da-thong-bao1.png"
              alt=""
              style={{ width: "40%", paddingTop: "2vh", paddingBottom: "1vh" }}
            />
          </div>
          <div className={styles.fhs_footer_second_text_right}>
            <div className={styles.fhs_footer_second_text_right_block_one}>
              <div className={styles.fhs_letter_big_and_bold}>Dịch Vụ</div>
              <p className={styles.fhs_letter_padding_fontSize}>
                <a href="https://www.fahasa.com/dieu-khoan-su-dung">Điều khoản sử dụng</a>
              </p>
              <p className={styles.fhs_letter_padding_fontSize}>
                <a href="https://www.fahasa.com/chinh-sach-bao-mat">Chính sách bảo mật</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.fhs_footer_block_three}>
        Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.
      </div>
    </>
  );
}

export default Footer;
