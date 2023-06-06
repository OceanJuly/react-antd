import react, { useEffect, useState } from 'react'
import { Table, Tag, Button } from "antd"
import { getLogRecords } from '@/api/logAPI'
import to from 'await-to-js'
import moment from 'moment'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

function Logs() {
    const cols: ColumnsType<any>  = [
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime'
        },
        {
            title: '用例ID',
            dataIndex: 'id',
            key: 'id',
            render: (_, { dataCorrelationId, id }) => (
                <>
                    <Button type="link" onClick={() => go2detail(dataCorrelationId)}>{id}</Button>
                </>
            ),
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '结果',
            dataIndex: 'msg',
            key: 'msg',
            render: (_, { msg }) => (
                <>
                    <Tag color={msg.color}>{msg.text}</Tag>
                </>
            ),
        },
        {
            title: '失败原因',
            dataIndex: 'reason',
            key: 'reason'
        },
        {
            title: '测试人员',
            dataIndex: 'user',
            key: 'user'
        },
        {
            title: '测试时间',
            dataIndex: 'endTime',
            key: 'endTime'
        }
    ]
    const [tableData, setTableData] = useState([])
    const navigate = useNavigate()

    function msg2keyword(msg: string) {
        const obj: any = {
            'Test failed': {
                color: '#D54C71',
                text: 'FAILED'
            },
            'Test passed': {
                color: '#3e9779',
                text: 'PASSED'
            },
            'Test started': {
                color: '#108ee9',
                text: 'START'
            }
        }
        return obj[msg]
    }

    function go2detail(id: string) {
        navigate('/logs/detail/' + id)
    }

    useEffect(() => {
        async function getTableData() {
            const [err, res]: any = await to(getLogRecords())
            if (err) return console.log('获取logs记录失败')
            const arrs: any = res.map((a: any) => {
                return {
                    startTime: moment(a.startTime).format('YYYY/MM/DD h:mm:ss'),
                    id: a.id,
                    description: a.description,
                    msg: msg2keyword(a.msg),
                    reason: a.reason,
                    user: a.executionContext.user,
                    endTime: ((a.endTime - a.startTime) / 1000).toFixed(2) + '秒',
                    dataCorrelationId: a.dataCorrelationId
                }
            })
            setTableData(arrs)
        }
        getTableData()
    }, [])

    return (
        <>
            <Table rowKey="dataCorrelationId" dataSource={tableData} columns={cols}></Table>
        </>
    )
}

export default Logs