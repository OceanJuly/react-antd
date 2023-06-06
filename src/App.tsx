import React, { useState, Suspense} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, theme } from 'antd';
import './index.css'
import {routes} from '@/router'
import { RouterInterface } from './router/router';
import SubMenu from 'antd/es/menu/SubMenu';
import { BrowserRouter as Router, Route, Link, useRoutes } from 'react-router-dom';
import Home from "./pages/home/index"

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
    getItem('Logs', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

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
// const renderRouter: any = (routes: Array<RouterInterface>) => {
//     return routes.map((route: RouterInterface) => {
//         if (route.children) return (renderRouter(route.children) as Array<RouterInterface>);
//         return <Route path={route.path} component={route.component}></Route>
//     })
// }

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const element = useRoutes(routes)
    return (
        <div>
            <Home></Home>
            {element}
        </div>
    )
};

export default App;