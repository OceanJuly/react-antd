import '../style/layoutHeader.less'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function LayoutHeader() {
    const navigate = useNavigate()
    function logout() {
        navigate('/login')
    }
    return (
        <>
            <div className="layout-header-wrap">
                <div className="layout-header-left-content"></div>
                <div className="layout-header-right-content">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="name">David</div>
                    <Button type="text" onClick={logout}>登出</Button>
                </div>
            </div>
        </>
    )
}

export default LayoutHeader;