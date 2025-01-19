import './MenuHeader.css';
function MenuHeader() {
    return (
            <div className="fhs_option_header">
                <div className="fhs_option_header_span">
                    <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg"
                        alt=""
                        style={{ width: '36px', cursor: 'pointer' }}
                    />
                    <img
                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_seemore_gray.svg"
                        alt=""
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
    );
}

export default MenuHeader;
