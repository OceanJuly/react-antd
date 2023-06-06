import { useState } from 'react'
import { Props } from "react-rnd"
import {
    Tree
} from 'antd'
import './fn-tree.less'

function FnTree(props: Props) {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  
    const onExpand = (expandedKeysValue: React.Key[]) => {
      console.log('onExpand', expandedKeysValue);
      setExpandedKeys(expandedKeysValue);
    };
  
  
    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
      console.log('onSelect', info);
      setSelectedKeys(selectedKeysValue);
    };

    return (
        <Tree
            defaultExpandAll
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={true}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={props.treeData}
            rootClassName="fn-tree-wrap"
        />
    )
}

export default FnTree