import React from 'react';
import { List, Typography } from 'antd';
import '../style/selectList.css'

const data = [
    '折线图',
    '圆饼图',
    '表格',
    '数据'
];

const obj: any = {
    '折线图': 'BarChartWidget',
    '圆饼图': 'PieChartWidget',
    '表格': 'table',
    '数据': 'data'
}

function SelectionList(props: any){
    return (
        <>
            <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item onClick={props.handleClick} id={obj[item]}>
                        <Typography.Text mark></Typography.Text> {item}
                    </List.Item>
                )}
            />
        </>
    )
}

export default SelectionList;