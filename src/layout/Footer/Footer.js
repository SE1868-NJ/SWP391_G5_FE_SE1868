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
    </div>
  );
}

export default Footer;
