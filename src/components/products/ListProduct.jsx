
import { List, Pagination } from 'antd';
import Card from './../Card';
import './styles.css'


export const ListProduct = ({ products, setValueFilter, listFavorite }) => {
  return (
    <> <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      dataSource={products?.docs?.[0]}
      renderItem={(item) => {
        return (
          <List.Item>
            <Card item={item} isFavoriteProduct={!!listFavorite?.find(i => i.ProductID === item.ProductID)}/>
          </List.Item>
        )
      }}


    />
      <Pagination showSizeChanger={false} pageSize={12} defaultCurrent={1} total={products.counts} align='end' style={{ marginBottom: 24 }} onChange={(page) => {
        setValueFilter(pre => {
          return (
            {
              ...pre,
              pageIndex: page
            }
          )

        })
      }} />
    </>)
}