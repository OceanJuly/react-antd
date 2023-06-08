import { useEffect, useState } from 'react'
import { getWorkSpaceDetail } from '@/api/dataModeler'
import {
  useParams
} from 'react-router-dom'
import to from 'await-to-js'

import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';

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
  })

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

  return (
    <>
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default WorkSpaceDetail