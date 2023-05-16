import { Layout, Menu, Breadcrumb, theme, MenuProps } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routes as routers } from '@/router';
import './appLayout.css'

import SubMenu from 'antd/es/menu/SubMenu';
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
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItemList = [
      getItem('DashBoard', 'home', <PieChartOutlined />),
      getItem('Option 2', '2', <DesktopOutlined />),
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

  return (
    <>
      <Layout style={{ minHeight: '100vh', position: 'relative'}}>
        <Sider
            className="site-layout-sider"
            collapsible collapsed={collapsed}
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
            >
              {/* <SubMenu key="/user" icon={<UserOutlined />} title="用户管理">
                <Menu.Item key="/user/list">
                  <Link to='/user/list'>用户信息</Link>
                </Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
        <Layout>
          <Header className="header" style={{ padding: 0, background: colorBgContainer }}></Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={[
              {
                title: 'Home'
              }, {
                title: 'List',
              }, {
                title: 'App'
              }
            ]}>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}