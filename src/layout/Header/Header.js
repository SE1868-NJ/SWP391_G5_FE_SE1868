import "./Header.css"
import { useNavigate } from 'react-router-dom';
import MenuHeader from "../MenuHeader/MenuHeader";
import Search from "../Search/Search";

function Header() {
    const navigate = useNavigate();

    // Hàm điều hướng
    const handleNavigate = (path) => {
        navigate(path); // Điều hướng đến đường dẫn được chỉ định
    };

    return (

        <header className="wrapper">
                        <img
                            src="logo.png"
                            alt="logo-header"
                            style={{ height: '6vh', width: '8%', cursor: 'pointer' }}
                            
                            onClick={() => handleNavigate('/')}
                        />
 
                    <MenuHeader/>

                    <Search/>

                    <div className="fhs_center_space_header">
                        <div className="fhs_noti_header">
                            <img
                                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_noti_gray.svg"
                                alt=""
                                className="fhs_noti_icon_header"
                            />
                            <div className="fhs_top_menu_labe">Thông Báo</div>
                        </div>
                        <div className="fhs_noti_header">
                            <img
                                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg"
                                alt=""
                                className="fhs_noti_icon_header"
                            />
                            <div className="fhs_top_menu_labe">Giỏ Hàng</div>
                        </div>
                        <div onClick={() => handleNavigate('/login')} className="fhs_noti_header">
                            <img
                                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_account_gray.svg"
                                alt=""
                                className="fhs_noti_icon_header"
                            />
                            <div className="fhs_top_menu_labe">Tài Khoản</div>
                        </div>
                        <div className="fhs_language_header_second_bar">
                            <div className="fhs_top_language">
                                <img
                                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/default.svg"
                                    alt=""
                                    style={{ width: '80%' }}
                                />
                            </div>
                        </div>
                    </div>
        </header>
    );
   
}

export default Header;
