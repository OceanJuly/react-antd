import React, {useEffect, useState} from 'react';
import { Space, Table, Tag, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../style/taskList.css'
import {
  getTaskList,
  completeTask
} from '@/api/dashboard';
import {to} from 'await-to-js'

interface DataType {
  key: string;
  event: string;
  formKey: string;
}

async function resTask(record: DataType) {
  // if (record.formKey) {}
  const [err, res]: any = await to(completeTask({
    id: record.key,
    params: {
      action: 'complete',
      variable: []
    },
    config: {
      headers: {
        Username: 'admin',
        Password: 'test'
      }
    }
  }))
  if (res) {
    message.success('处理成功')
  }
}

const columns: ColumnsType<DataType> = [
  {
    title: '处理项',
    dataIndex: 'event',
    key: 'event',
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
    event: 'John Brown',
    formKey: ''
  },
];

function TaskList () {
    const [tableData, setTableData] = useState(data)
    useEffect(() => {
      // 这里可以写一些需要在挂载时执行的操作，比如向服务器请求数据等等
      console.log('组件挂载完成');
      const fetchData = async () => {
        const [err, res]: any = await to(getTaskList({
          headers: {
            Username: 'admin',
            Password: 'test'
          }
        }))
        if (res) {
          setTableData(res.data.map((row: any) => {
            return {
              key: row.id,
              event: row.name,
              formKey: row.formKey || ''
            }
          }))
        }
      }
      fetchData();
    }, []);

    return (
        <>
            <div className="task-list-title">今日代办</div>
            <Table columns={columns} dataSource={tableData} />
        </>
    )
}

export const WrappedTaskList = React.memo(TaskList);