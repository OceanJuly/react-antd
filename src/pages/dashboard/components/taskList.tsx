import React, {useEffect} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../style/taskList.css'
import { getTaskList } from '@/api/dashboard';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

function resTask(record: DataType) {
    console.log(record)
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="text" onClick={() => resTask(record)}>处理</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
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