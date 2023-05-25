import {useEffect, useState} from 'react';
import { Space, Table, Button, message, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../style/taskList.css'
import { useNavigate } from 'react-router-dom'
import {
  getTaskList,
  completeTask,
  getHistoryTask
} from '@/api/dashboard';
import {to} from 'await-to-js'
// import store from '@/store/todoStore';
// import { Observer } from 'mobx-react-lite'

interface DataType {
  key: string;
  event: string;
  formKey: string;
}

function TaskList () {
  const [taskType, setTaskType] = useState<string>('nowTask');
  const navigate = useNavigate()
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
    async function resTask(record: DataType) {
      // 如果有表单，需要跳转到表单页面填写
      if (record.formKey) return navigate(`/process/${record.key}`);
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
      if (!err) message.success('处理成功')
    }
    useEffect(() => {
      const fetchTaskList = async () => {
        const [err, res]: any = await to(getTaskList({
          headers: {
            Username: 'admin',
            Password: 'test'
          }
        }))
        if (res) {
          const arr: any = res.data.map((row: any) => {
            return {
              key: row.id,
              event: row.name,
              formKey: row.formKey || ''
            }
          })
          // todoListStore.updateTodoList(arr)
        }
      }
      const fetchHistoryTasks = async () => {
        const [err, res]: any = await to(getHistoryTask({
          headers: {
            Username: 'admin',
            Password: 'test'
          }
        }))
        if (res) {
          const arr: any = res.data.map((row: any) => {
            return {
              key: row.id,
              event: row.name,
              formKey: row.formKey || ''
            }
          })
          // todoListStore.updateTodoList(arr)
        }
      }
      if (taskType === 'historyTask') fetchHistoryTasks()
      else fetchTaskList();
    }, [taskType]);

    function changeTaskList(val: string) {
      setTaskType(val)
    }

    return (
        <>
            <Radio.Group value={taskType} onChange={(e) => changeTaskList(e.target.value)}>
              <Radio.Button value="nowTask">今日代办</Radio.Button>
              <Radio.Button value="historyTask">历史记录</Radio.Button>
            </Radio.Group>
            <Table columns={columns} dataSource={[]} />
        </>
    )
}

export default TaskList