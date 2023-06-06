import React from 'react';
import { List, Typography } from 'antd';
import '../style/selectList.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'


function SelectionList(props: any){
    const { dashboardWidget } = useStore()
    return (
        <>
            <List
                bordered
                dataSource={dashboardWidget.widgetList}
                renderItem={(item) => (
                    <List.Item onClick={props.handleClick} id={item.widgetName}>
                        <Typography.Text mark></Typography.Text> {item.title}
                    </List.Item>
                )}
            />
        </>
    )
}

export default observer(SelectionList)