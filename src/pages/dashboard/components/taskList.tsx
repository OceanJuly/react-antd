import React, {useEffect} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../style/taskList.css'
import { getTaskList } from '@/api/dashboard';

interface DataType {
  key: string;
  name: string;
  days: number;
  reason: string;
}

function resTask(record: DataType) {
    console.log(record)
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '天数',
    dataIndex: 'days',
    key: 'days',
  },
  {
    title: '请假原因',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => resTask(record)}>处理</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    days: 32,
    reason: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    days: 42,
    reason: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    days: 32,
    reason: 'Sydney No. 1 Lake Park'
  },
];

function TaskList () {
    useEffect(() => {
      console.log('组件挂载完成');
      // 这里可以写一些需要在挂载时执行的操作，比如向服务器请求数据等等
    }, []);

    return (
        <>
            <div className="task-list-title">今日代办</div>
            <Table columns={columns} dataSource={data} />
        </>
    )
}

export default TaskList;