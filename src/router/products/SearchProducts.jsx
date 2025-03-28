import { useEffect, useState } from "react";
import { ListProduct } from "../../components/products/ListProduct"
import { LayoutCommon } from "../../layout/layout-common/LayoutCommon";
import { getProductFavorite, searchProduct } from "../../service/product";
import { MenuSearch } from "./MenuSearch";
import './styles.css'
import { useSelector } from "react-redux";

function SearchProduct() {
    const [products,setProducts] = useState([])
    const [listFavorite,setListFavorite] = useState([])
    const [counts,setCounts] = useState([])

    const [valueFilter,setValueFilter] = useState([])
    const keywordRD = useSelector((state) => state.filterSearch.keyword);

    const handleGetData = async() =>{
      try {
        const storedUser = localStorage.getItem("user");
          const userData = JSON.parse(storedUser);
        const params = new URLSearchParams(window.location.search);
        const [res, resListFavorite] = await Promise.all([
            searchProduct({
                categoryName: valueFilter?.categoryName,
                pageIndex: valueFilter?.pageIndex || 1,
                keyword: keywordRD?.keyword || params.get("keyword") 
            }),
            getProductFavorite({
                CustomerId: userData.id
            })
        ]);
        setListFavorite(resListFavorite.data[0])
        setProducts(res.data.docs?.[0])
        setCounts(res.data.counts)

      } catch (error) {
      }
    }
    useEffect(()=>{
        handleGetData()
    },[valueFilter, window?.location?.search, keywordRD?.keyword])
    return (
        <LayoutCommon>
            <div className="container-list">
                <MenuSearch setValueFilter={setValueFilter}/>
                <div className="list-product">
                    <ListProduct products={products} setValueFilter={setValueFilter} listFavorite={listFavorite} counts={counts}/>
                </div>
            </div>
        </LayoutCommon>
    );
}

export default SearchProduct