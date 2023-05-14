import React from 'react';
import { Divider, List, Typography } from 'antd';
import '../style/selectList.css'

const data = [
    '折线图',
    '圆饼图',
    '表格',
    '数据'
];

const App: React.FC = () => (
    <>
        <List
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                </List.Item>
            )}
        />
    </>
);

export default App;