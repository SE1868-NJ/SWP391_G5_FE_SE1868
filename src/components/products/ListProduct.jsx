
import { List } from 'antd';
import Card from './../Card';


export const ListProduct = () =>{
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    }, {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
    return (

    <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 4,
      xxl: 5,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
       <Card/>
      </List.Item>
    )}
  />)
}