import React from 'react'
import { useState } from 'react'
import List from './components/List'
import {  Layout, Menu } from 'antd'
import './Dashboard.css'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { FaHome } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { PiUserListFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

function App() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
    <Layout style={{height:'100vh'}}>
      <Header style={{
        backgroundColor:'white',
      }}>
        <div style={{display:'flex',alignItems:'center'}}>
    <GiHamburgerMenu  
    onClick={() => setCollapsed(!collapsed)}
    size={20} style={{marginRight:'20'}} />
    <div className='brand'>
      CRUD -- TEST
    </div>
    </div>
      </Header>
      <Layout>
     <Sider 
     collapsed={collapsed}
     theme='light'>
      <Menu 
      mode='inline'
      items={[
        {
          label: "Home",
          key : "home",
          icon: <FaHome />
        },
        {
          label: "List",
          key: "list",
          icon: <FaThList/>,
          children:[{
            label: "All user",
            icon: <PiUserListFill/>
          },
        {
          label: "Add user",
          icon : <HiUserAdd/>
        }]
        }
      ]}  />
     </Sider>
     <Content>
     <List />
     </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default App