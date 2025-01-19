import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <div className="wrapper">
        <div className="fhs_footer_block_first">
          <div className="fhs_footer_first_text">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "white", paddingRight: "2vh" }}
            />
            Đăng Kí Nhận Bản Tin
            <div className="fhs_search_footer">
              <input placeholder="Nhập địa chỉ email của bạn..." />
              <button className="fhs_footer_search_button">Đăng ký</button>
            </div>
          </div>
        </div>
        <div className="fhs_footer_block_second" style={{ paddingTop: "2vh" }}>
          <div className="fhs_footer_second_text_left">
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
              alt=""
              style={{
                paddingBottom: "3vh",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
            <div>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</div>
            <div>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</div>
            <div>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</div>
            <div style={{ paddingTop: "1vh", width: "80%" }}>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
              trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả
              Hệ Thống Fahasa trên toàn quốc.
            </div>
            <img
              src="logo-bo-cong-thuong-da-thong-bao1.png"
              alt=""
              style={{ width: "40%", paddingTop: "2vh", paddingBottom: "1vh" }}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <a href="https://www.facebook.com/fahasa/" alt="">
                <img src="Facebook-on.png" alt="" />
              </a>
              <a href="https://www.instagram.com/fahasa_official/" alt="">
                <img src="Insta-on.png" alt="" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCUZcVOLSxK1q6RfgzQ9-HYQ"
                alt=""
              >
                <img src="Youtube-on.png" alt="" />
              </a>
              <a href="https://fahasa-blog.tumblr.com/" alt="">
                <img src="tumblr-on.png" alt="" />
              </a>
              <a href="https://twitter.com/Fahasa_com" alt="">
                <img src="twitter-on.png" alt="" />
              </a>
              <a href="https://www.pinterest.com/fahasavn/" alt="">
                <img src="pinterest.png" alt="" />
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.fahasa.android.fahasa&pli=1"
                alt=""
              >
                <img src="android1.png" alt="" style={{ width: "84%" }} />
              </a>
              <a
                href="https://wwhttps://apps.apple.com/us/app/fahasa-th%E1%BA%BF-gi%E1%BB%9Bi
                         -trong-t%E1%BA%A7m-tay/id1227597830w.pinterest.com/fahasavn/"
                alt=""
              >
                <img src="appstore1.png" alt="" style={{ width: "62%" }} />
              </a>
            </div>
          </div>
          <div
            style={{
              width: "0.2vh",
              height: "78%",
              backgroundColor: "rgb(125, 121, 121)",
            }}
          ></div>
          <div className="fhs_footer_second_text_right">
            <div className="fhs_footer_second_text_right_block_one">
              <div
                className="fhs_footer_second_text_right_block_one_text"
                style={{ paddingRight: "0vw", paddingLeft: "0vw" }}
              >
                <div className="fhs_letter_big_and_bold">Dịch Vụ</div>
                <p className="fhs_letter_padding_fontSize">
                  <a href="https://www.fahasa.com/dieu-khoan-su-dung" alt="">
                    Điều khoản sử dụng
                  </a>
                </p>
                <p className="fhs_letter_padding_fontSize">
                  <a href="https://www.fahasa.com/chinh-sach-bao-mat" alt="">
                    Chính sách bảo mật thông tin cá nhân
                  </a>
                </p>
                <p className="fhs_letter_padding_fontSize">
                  <a
                    href="https://www.fahasa.com/chinh-sach-bao-mat-thanh-toan"
                    alt=""
                  >
                    Chính sách bảo mật thanh toán
                  </a>
                </p>
                <p className="fhs_letter_padding_fontSize">
                  <a href="https://www.fahasa.com/gioi-thieu-fahasa" alt="">
                    Giới thiệu Fahasa
                  </a>
                </p>
                <p className="fhs_letter_padding_fontSize">
                  <a
                    href="https://www.fahasa.com/he-thong-trung-tam-nha-sach"
                    alt=""
                  >
                    Hệ thống trung tâm - nhà sách
                  </a>
                </p>
              </div>
            </div>
            <div className="fhs_footer_second_text_right_block_one_text">
              <div className="fhs_letter_big_and_bold">Hỗ trợ</div>
              <p className="fhs_letter_padding_fontSize">
                <a href="https://www.fahasa.com/doi-tra-hang" alt="">
                  Chính sách đổi-trả-hoàn tiền
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Chính sách bảo hành - bồi hoàn
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Chính sách vận chuyển
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Chính sách khách sỉ
                </a>
              </p>
            </div>
            <div
              className="fhs_footer_second_text_right_block_one_text"
              style={{ paddingRight: "0vw" }}
            >
              <div className="fhs_letter_big_and_bold">Tài khoản của tôi</div>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Điều khoản sử dụng
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Chính sách bảo mật thông tin cá nhân
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Chính sách bảo mật thanh toán
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Giới thiệu Fahasa
                </a>
              </p>
              <p className="fhs_letter_padding_fontSize">
                <a href="/" alt="">
                  Hệ thống trung tâm - nhà sách
                </a>
              </p>
            </div>
          </div>
          <div className="fhs_footer_second_text_right_block_two">
            <div className="fhs_letter_big_and_bold">Liên Hệ</div>
          </div>
          <div className="fhs_footer_second_text_right_block_three">
            <div style={{ flexDirection: "row", display: "flex" }}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ fontSize: "1.5vw", paddingRight: "0.7vw" }}
              />
              <div className="fhs_letter_padding_fontSize">
                {" "}
                60-62 Lê Lợi, Q.1, TP. HCM
              </div>
            </div>
            <div
              className="icon"
              style={{ flexDirection: "row", display: "flex" }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ fontSize: "1.8vw", paddingRight: "0.7vw" }}
              />
              <div className="fhs_letter_padding_fontSize">
                {" "}
                cskh@fahasa.com.vn
              </div>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ fontSize: "1.5vw", paddingRight: "0.7vw" }}
              />
              <div className="fhs_letter_padding_fontSize">1900636467</div>
            </div>
          </div>
          <div className="fhs_footer_second_text_right_block_four">
            <img src="icon_snappy1.png" alt="" style={{ width: "20%" }} />
            <img src="logo_lex.png" alt="" />
            <img src="Logo_ninjavan.png" alt="" />
            <img src="ahamove_logo3.png" alt="" />
            <img src="vnpost1.png" alt="" />
          </div>
          <div className="fhs_footer_second_text_right_block_four">
            <img src="vnpay_logo.png" alt="" />
            <img src="momopay.png" alt="" />
            <img src="shopeepay_logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="fhs_footer_block_three">
        Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu
        tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ
        10, ngày 20/05/2022.
      </div>
    </>
  );
}

export default Footer;
