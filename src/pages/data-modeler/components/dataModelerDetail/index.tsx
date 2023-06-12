import { useEffect, useState } from 'react'
import { getWorkSpaceDetail } from '@/api/dataModeler'
import {
  useParams
} from 'react-router-dom'
import to from 'await-to-js'
import { tagList, tagProp } from './const'
import './data-modeler-detail.less'

import { Button } from 'antd'

const initialTreeData = [
  {
    id: 1,
    title: 'Node 1',
    children: [
      { id: 2, title: 'Child 1' },
      { id: 3, title: 'Child 2' },
    ],
  },
  {
    id: 4,
    title: 'Node 2',
    children: [
      { id: 5, title: 'Child 3' },
      { id: 6, title: 'Child 4' },
    ],
  },
]

function WorkSpaceDetail() {
  const [treeData, setTreeData] = useState(initialTreeData)
  const params = useParams()
  
  useEffect(() => {
    async function getDataMOdelerDetail() {
      const name = params.name
      if (!name) return
      const [err, res]: any = await to(getWorkSpaceDetail(name))
      if (err) return
      console.log(res)
    }
    getDataMOdelerDetail()
  }, [])

  function renderTagList() {
    return tagList.map((tag: tagProp) => {
      return (
        <div
          className="node-wrap"
          draggable
        >{tag.name}</div>
      )
    })
  }

  return (
    <div className="work-space-detail-wrap">
      <div className="tag-list">
        {renderTagList()}
      </div>
      <div className="tree-wrap" style={{ height: 400 }}>
      </div>
    </div>
  )
}

export default WorkSpaceDetail