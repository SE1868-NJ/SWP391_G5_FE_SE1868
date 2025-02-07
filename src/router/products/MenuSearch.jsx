
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import './styles.css'
const { Sider } = Layout;

export const MenuSearch = () =>{

    const [collapsed, setCollapsed] = useState(false);

    return(   <Sider trigger={null} collapsible collapsed={collapsed} className='side-bar-search' width={250}>
        <div className="demo-logo-vertical" />
        <Menu
        className='menu-side-bar-search'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: '',
              label: 'Loại món A',
              children: [
                {
                    key: '11',
                    icon: '',
                    label: 'Loại món A 1',
                    
                  },{
                    key: '12',
                    icon: '',
                    label: 'Loại món A 2',
                  }
              ]
            },
            {
              key: '2',
              icon: '',
              label: 'Loại món B',
            },
            {
              key: '3',
              icon: '',
              label: 'Loại món C',
            },
          ]}
        />
      </Sider>)
}