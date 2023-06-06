import '../style/layoutHeader.less'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { Props } from 'react-rnd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function LayoutHeader(props: Props) {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                // <Button type="text" onClick={logout}>登出</Button>
                <div onClick={logout}>登出</div>
            ),
        },
    
    ]
    function logout() {
        navigate('/login')
    }

    return (
        <>
            <div className="layout-header-wrap">
                <div className="layout-header-left-content">
                    <div className="collapse-btn" onClick={() => props.setCollapsed(!props.collapsed)}>
                    {
                        props.collapsed
                        ? <MenuUnfoldOutlined />
                        : <MenuFoldOutlined />
                    }
                    </div>
                </div>
                <div className="layout-header-right-content">
                    <Dropdown
                        menu={{ items }}
                        placement="bottomLeft"
                        overlayStyle={{width: '120px'}}>
                        <div className="user-menu-wrap">
                            <Avatar size="large" icon={<UserOutlined />} />
                            <div className="name">David</div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default LayoutHeader;