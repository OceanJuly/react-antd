import React, { useState, Suspense} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './index.css'
// const DashBoard = React.lazy(() => import('./pages/dashboard/dashboard.tsx'));
import Dashboard from "./pages/dashboard/dashboard";
import {routes} from '@/router'
import { RouterInterface } from './router/router';
import SubMenu from 'antd/es/menu/SubMenu';
import { BrowserRouter as Router, Route, Link, Redirect, useRoutes } from 'react-router-dom';
import Home from "./pages/home/index"

const { Header, Content, Footer, Sider } = Layout;

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

const items: MenuItem[] = [
    getItem('DashBoard', 'home', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const go2Page = (e: any) => {
    console.log(e);
}


// 渲染菜单
const renderMenu = (routes: Array<RouterInterface>) => {
    return routes.map((route: RouterInterface) => {
        if (route.children) {
            return (
                <SubMenu title={route.title} key={route.path}>
                    <Link to={route.path}></Link>
                    {renderMenu(route.children)}
                </SubMenu>
            )
        }
        return (
            <Menu.Item title={route.title} key={route.path}>
                <Link to={route.path}></Link>
            </Menu.Item>
        )
    })
}

// 渲染路由
const renderRouter: any = (routes: Array<RouterInterface>) => {
    return routes.map((route: RouterInterface) => {
        if (route.children) return (renderRouter(route.children) as Array<RouterInterface>);
        return <Route path={route.path} component={route.component}></Route>
    })
}

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // return (
    //     <Layout style={{ minHeight: '100vh' }}>
    //         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    //             <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
    //             <Menu onClick={go2Page} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    //         </Sider>
    //         <Layout className="site-layout">
    //             <Header style={{ padding: 0, background: colorBgContainer }} />
    //             <Content style={{ margin: '0 16px' }}>
    //                 <Breadcrumb style={{ margin: '16px 0' }}>
    //                     <Breadcrumb.Item>User</Breadcrumb.Item>
    //                     <Breadcrumb.Item>Bill</Breadcrumb.Item>
    //                 </Breadcrumb>
    //                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
    //                     <Dashboard></Dashboard>
    //                     <Routes>
    //                      {renderRouter(routes)}
    //                     </Routes>
    //                     {/*<Routes>*/}
    //                     {/*    <Route path="/home" element={<Dashboard />} />*/}
    //                     {/*</Routes>*/}
    //                 </div>
    //             </Content>
    //         </Layout>
    //     </Layout>
    // );
    const element = useRoutes(routes)
    return (
        <div>
            <Home></Home>
            {element}
        </div>
    )
};

export default App;