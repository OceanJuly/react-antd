import React, { useState, useEffect } from 'react';
import {
  Input,
  Modal,
  List,
  Tabs,
  Select,
  Tag
} from 'antd';
import { Props } from 'react-rnd';
import {
  SearchOutlined
} from '@ant-design/icons'
import {
  debounce
} from 'lodash'
import { getLogsDetail } from '@/api/logs';
import './index.less'
import to from 'await-to-js';
import moment from 'moment';
import { _filterObj, level2color, level2wrod } from './const';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

function LogDetailModal(props: Props) {
  const filterInfo = React.useRef(_filterObj)
  const [tabs, setTabs]: any = useState([])
  const [tabKey, setTabKey]: any = useState('')
  const [logList, setLogList]: any = useState([])
  const [resource, setResource]: any = useState([])
  const [logLogTypeOptions, setLogTypeOptions]: any = useState([])
  // 详细日志处理：区分 类型/来源/信息分级
  const [logMap, setLogMap]: any = useState({})
  const _logMap: any = {}
  const reff: any = React.createRef()

  useEffect(() => {
    async function fetchLogsDetail() {
      const [err, res]: any = await to(getLogsDetail(props.id))
      if (err) return
      const _logLogTypeOptions: Array<string> = []
      res.logs.forEach((item: any) => {
        const type: string = item.type
        const logLevel: string = item['log-level']
        if (!_logLogTypeOptions.includes(logLevel)) _logLogTypeOptions.push(logLevel)
        const logItem: any = {
          time: moment(item['@timestamp']).format('YYYY/MM/DD h:mm:ss'),
          timeStamp: moment(item['@timestamp']).valueOf(),
          id1: item.id1,
          id2: item.id2,
          logLevel,
          msg: item.message,
          resourceId: item.resourceId
        }
        if (_logMap[type]) _logMap[type].push(logItem)
        else _logMap[type] = [logItem]
      })
      const _tabs = Object.keys(_logMap).map((key: string) => {
        _logMap[key] = _logMap[key].sort((a: any, b: any) => a.timeStamp - b.timeStamp)
        return {
          label: key.toUpperCase(),
          key: key,
          children: null,
        } 
      })
      setLogMap(_logMap)
      setTabs(_tabs)
      if (_tabs.length) {
        setLogList(
          _logMap[_tabs[0].key]
        )
        setTabKey(_tabs[0].key)
      }
      // 日志来源多选框数据
      const _resource = res.resources.map((r: any) => {
        return {
          label: r.attributes?.ref || '未知',
          value: r.resourceId
        }
      })
      setResource(_resource)
      const _resVel = _resource.map((r: any) => r.value)
      filterInfo.current.resource = _resVel
      // 日志类型多选框数据
      setLogTypeOptions(_logLogTypeOptions.map((option: string) => {
        const _t: string = level2wrod[option]
        return {
          label: _t,
          value: option,
          color: level2color[option]
        }
      }))
      filterInfo.current.logType = _logLogTypeOptions
    }
    fetchLogsDetail()
  }, [])

  // 搜索防抖
  const searchDebounced = debounce(filterLogList, 200)

  function keywordChange(e: any) {
    const _keyword: string = e.target.value
    filterInfo.current.keyword = _keyword
    searchDebounced()
  }

  function tabChange(val: string) {
    setTabKey(val)
    setLogList(logMap[val])
    filterLogList()
  }

  function resourceChange(val: string[]) {
    filterInfo.current.resource = val
    filterLogList()
  }

  function logTypeChange(val: string[]) {
    filterInfo.current.logType = val
    filterLogList()
  }

  function filterLogList() {
    const {resource, logType, keyword} = filterInfo.current
    const _logs: Array<any> = logMap[tabKey]
    setLogList(_logs.filter((log: any) => {
      const msg = `${log.time} ${log.id1} ${log.id2} ${log.logLevel} ${log.msg}`
      return logType.includes(log.logLevel)
        && resource.includes(log.resourceId)
        && msg.indexOf(keyword) !== -1
    }))
  }

  function tagRender(props: CustomTagProps) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={level2color[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >{label}</Tag>
    );
  }

  return (
    <>
      <Modal
        title="详细日志"
        footer={null}
        maskClosable={false}
        width="80vh"
        open={props.show}
        onCancel={props.close}>
        <div className="log-detail-modal-wrap">
          <div className="header">
            <div className="info-filter-list">
              <div className="filter-item">
                <div className="label">日志来源：</div>
                <Select
                  ref={reff}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择日志来源"
                  defaultValue={resource.map((val: any) => val.value)}
                  onChange={resourceChange}
                  options={resource}
                />
              </div>
              <div className="filter-item">
                <div className="label">日志类型：</div>
                <Select
                  mode="multiple"
                  allowClear
                  showArrow
                  defaultValue={logLogTypeOptions.map((val: any) => val.value)}
                  onChange={logTypeChange}
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  options={logLogTypeOptions}
                />
              </div>
            </div>
            <div className="search-wrap">
              <Input
                onChange={keywordChange}
                allowClear={true}
                onPressEnter={searchDebounced}
                addonBefore={<SearchOutlined />}
                placeholder="请输入关键词" />
            </div>
          </div>
          <div className="logs">
            <Tabs
              type="card"
              items={tabs}
              activeKey={tabKey}
              onChange={tabChange}
            />
            <List
              header={null}
              footer={null}
              bordered
              dataSource={logList}
              renderItem={(item: any) => (
                <List.Item style={{color: level2color[item.logLevel]}}>
                  {`${item.time} ${item.id1} ${item.id2} ${item.logLevel} ${item.msg}`}
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LogDetailModal
