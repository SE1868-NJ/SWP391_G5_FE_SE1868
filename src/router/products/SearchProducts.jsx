import { ListProduct } from "../../components/products/ListProduct"
import { LayoutCommon } from "../../layout/layout-common/LayoutCommon";
import { MenuSearch } from "./MenuSearch";
import './styles.css'
function SearchProduct() {
    return (
        <LayoutCommon>
            <div className="container-list">
                <MenuSearch/>
                <div className="list-product">
                    <ListProduct />
                </div>
            </div>
        </LayoutCommon>
    );
}

export default SearchProduct