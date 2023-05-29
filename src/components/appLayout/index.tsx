import { Layout, Menu, theme, MenuProps, MenuRef } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { RefAttributes, useEffect, useState } from 'react';
import { routes as routers } from '@/router';
import LayoutHeader from './components/layoutHeader';
import './style/appLayout.css'
import { useNavigate } from 'react-router-dom'

const { Header, Content, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
      key,
      icon,
      children,
      label,
  } as MenuItem;
}

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItemList = [
      getItem('DashBoard', '/dashboard', <PieChartOutlined />),
      getItem('Logs', '/logs', <DesktopOutlined />),
      getItem('User', 'sub1', <UserOutlined />, [
          getItem('Tom', '3'),
          getItem('Bill', '4'),
          getItem('Alex', '5'),
      ]),
      getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
      getItem('Files', '9', <FileOutlined />),
  ]

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr: string[] = [];
    if(routes !== null) {
      routes.forEach((item) => {
      const path = item.route.path;
        if(path) {
          pathArr.push(path);
        }
      })
    }
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);
  if(!isInit) {
    return null;
  }

  function go2Page(e: MenuProps & RefAttributes<MenuRef>) {
    const path: any = e.key || ''
    navigate(path)
  }

  return (
    <>
      <Layout
        className="app-layout"
        style={{ height: '100vh', position: 'relative'}}>
        <Sider
            className="site-layout-sider"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100vh',
              overflow: 'hide'
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}>
              <div className="logo" style={{ height: 32, margin: 16, background: '#CCC' }}>MBT</div>
              <Menu
                mode="inline"
                theme="dark"
                // 根据url地址实现选中高亮
                defaultSelectedKeys={defaultSelectedKeys}   
                defaultOpenKeys={defaultOpenKeys}
                style={{ height: '100%', borderRight: 0 }}
                items={getItemList}
                onClick={go2Page}
              >
              </Menu>
        </Sider>
        <Layout style={{ display: 'flex', marginLeft: '200px' }}>
          <Header className="header" style={{ padding: 0, background: colorBgContainer, height: '60px' }}>
            <LayoutHeader></LayoutHeader>
          </Header>
          <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                flex: 1
              }}
            >
              <Outlet />
            </Content>
        </Layout>
      </Layout>
    </>
  )
}