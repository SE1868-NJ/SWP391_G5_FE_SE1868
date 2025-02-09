import { useEffect, useState } from "react";
import { ListProduct } from "../../components/products/ListProduct"
import { LayoutCommon } from "../../layout/layout-common/LayoutCommon";
import { searchProduct } from "../../service/product";
import { MenuSearch } from "./MenuSearch";
import './styles.css'
function SearchProduct() {
    const [products,setProducts] = useState([])
    const [valueFilter,setValueFilter] = useState([])

    const handleGetData = async() =>{
        const res = await searchProduct({
            categoryName: valueFilter?.categoryName,
            pageIndex: valueFilter?.pageIndex || 1
        });
       setProducts(res.data)
        
    }
    useEffect(()=>{
        handleGetData()
    },[valueFilter])
    return (
        <LayoutCommon>
            <div className="container-list">
                <MenuSearch setValueFilter={setValueFilter}/>
                <div className="list-product">
                    <ListProduct products={products} setValueFilter={setValueFilter}/>
                </div>
            </div>
        </LayoutCommon>
    );
}

export default SearchProduct