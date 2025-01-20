// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="footer_wrapper">
      <div className="footer_container_first"></div>
      <div className="footer_container_second">
        Tìm địa điểm trên đường đi? Tải app FoodG5!
      </div>
      <div
        style={{
          maxHeight: "55vh",
          overflow: "hidden",
          width: "86%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="footer_container_third">
          <div className="footer_block_third_stats">
            <div
              style={{
                width: "12vw",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5vh",
              }}
            >
              Thống Kê
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                334,384 Địa điểm
              </div>
              <div className="footer_container_third_stats_content">
                toàn quốc
              </div>
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                38,630,265 người sử dụng
              </div>
              <div className="footer_container_third_stats_content">
                trong & ngoài nước
              </div>
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                1,481,841 bình luận
              </div>
              <div className="footer_container_third_stats_content">
                đã chia sẻ
              </div>
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                608,066 check-in
              </div>
              <div className="footer_container_third_stats_content">
                đã thực hiện
              </div>
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                10,232,333 hình ảnh
              </div>
              <div className="footer_container_third_stats_content">
                được tải lên
              </div>
            </div>
            <div className="footer_container_third_stats">
              <div className="footer_container_third_stats_number">
                24,623,376 Bộ sưu tập
              </div>
              <div className="footer_container_third_stats_content">
                bộ sưu tập được tạo
              </div>
            </div>
          </div>
        </div>
        <div className="footer_container_third_img_app">
          <div className="footer_container_third_img">
            <div
              style={{
                width: "12vw",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5vh",
              }}
            >
              iOS App
            </div>
            <img
              className="footer-img_first_and_third"
              src="img_first_app.png"
              alt=""
            />
          </div>
          <div className="footer_container_third_img">
            <div
              style={{
                width: "12vw",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5vh",
              }}
            >
              Android App
            </div>
            <img
              className="footer-img_first_and_third"
              src="img_second_app.png"
              alt=""
            />
          </div>
          <div className="footer_container_third_img">
            <div
              style={{
                width: "12vw",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5vh",
              }}
            >
              Windows App
            </div>
            <img src="img_third_app.png" alt="" />
          </div>
        </div>
      </div>
      <div className="footer_block_middle">
        <div className="footer_block_middle_box">
          <div className="footer_block_middle_box_above">Khám phá</div>
          <li>Ứng dụng Mobile</li>
          <li>Tạo bộ sưu tập</li>
          <li>Bảo mật thông tin</li>
          <li>Quy định</li>
        </div>
        <div className="footer_block_middle_box">
          <div className="footer_block_middle_box_above">Công ty</div>
          <li>Giới thiệu</li>
          <li>Trợ giúp</li>
          <li>Việc làm</li>
          <li>Quy chế</li>
          <li>Thỏa thuận sử dụng dịch vụ</li>
          <li>Liên hệ</li>
        </div>
        <div className="footer_block_middle_box">
          <div className="footer_block_middle_box_above">Tham gia trên</div>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Youtube</li>
          <li>Google</li>
          <li>Group5Food.vn - Ship tận nơi</li>
        </div>
        <div className="footer_block_middle_box">
          <div className="footer_block_middle_box_above">Giấy phép</div>
          <li>MXH 363/GP-BTTTT</li>
          <img className="bocongthuong_img" src="bocongthuong.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
