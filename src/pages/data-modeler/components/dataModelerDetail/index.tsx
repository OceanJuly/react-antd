import { useEffect, useState } from 'react'
import { getWorkSpaceDetail } from '@/api/dataModeler'
import {
  useParams
} from 'react-router-dom'
import to from 'await-to-js'
import { tagList, tagProp } from './const'
import './data-modeler-detail.less'

import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
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

  function handleChange(treeData: any) {
    console.log(treeData)
    setTreeData(treeData)
    // setTreeData({ treeData })
  }
  // function CustomNode(node: any) {
  //   return (
  //     <div className="node">
  //       <span>{node.title}</span>
  //       <button onClick={() => alert(`Editing ${node.title}`)}>Edit</button>
  //     </div>
  //   )
  // }

  function renderTagList() {
    return tagList.map((tag: tagProp) => {
      return (
        <div
          className="node-wrap"
          draggable
          onDragStart={event => {
            event.dataTransfer.setData('text/plain', 'My draggable element');
            event.dataTransfer.setData('myNodeType', 'myNodeType');
          }}
        >{tag.name}</div>
      )
    })
  }

  function handleDrop(dropInfo: any) {
    console.log('1', dropInfo)
    const { node, path } = dropInfo;
    const draggedNodeData = JSON.parse(
      dropInfo.event.dataTransfer.getData('text/plain')
    );

    // 将拖拽元素添加到树中
    const newNode = { title: draggedNodeData };

    // 更新树的数据
  }

  return (
    <div className="work-space-detail-wrap">
      <div className="tag-list">
        {renderTagList()}
      </div>
      <div className="tree-wrap" style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={handleChange}
          dndType="myNodeType"
          onDrop={handleDrop}
          shouldCopyOnOutsideDrop={() => true}
        />
      </div>
    </div>
  )
}

export default WorkSpaceDetail