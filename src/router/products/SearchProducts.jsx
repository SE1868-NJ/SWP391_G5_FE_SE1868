import { useEffect, useState } from "react";
import { ListProduct } from "../../components/products/ListProduct"
import { LayoutCommon } from "../../layout/layout-common/LayoutCommon";
import { searchProduct } from "../../service/product";
import { MenuSearch } from "./MenuSearch";
import './styles.css'
import { useSelector } from "react-redux";

function SearchProduct() {
    const [products,setProducts] = useState([])
    const [valueFilter,setValueFilter] = useState([])
    const keywordRD = useSelector((state) => state.filterSearch.keyword);

    const handleGetData = async() =>{
       const params = new URLSearchParams(window.location.search);
        const res = await searchProduct({
            categoryName: valueFilter?.categoryName,
            pageIndex: valueFilter?.pageIndex || 1,
            keyword: keywordRD?.keyword || params.get("keyword") 
        });
       setProducts(res.data)
        
    }
    
    useEffect(()=>{
        handleGetData()
    },[valueFilter, window?.location?.search, keywordRD?.keyword])
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