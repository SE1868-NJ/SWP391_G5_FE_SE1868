import { ListProduct } from "../../components/products/ListProduct"
import { LayoutCommon } from "../../layout/layout-common/LayoutCommon";
import './styles.css'
function SearchProduct() {
    return (
        <LayoutCommon>
            <div className="container-list">
                <div className="list-product">
                    <ListProduct />
                </div>
            </div>
        </LayoutCommon>
    );
}

export default SearchProduct