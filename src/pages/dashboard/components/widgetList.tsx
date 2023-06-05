import { List } from "antd"
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import '../style/widget-list.less'

function WidgetList() {
  const { dashboardWidget } = useStore()
  return (
    <div className='widget-list-wrap'>
      {/* <div>组件列表</div> */}
      <List
        header={null}
        footer={null}
        bordered
        className="widget-list"
        dataSource={dashboardWidget.widgetList}
        renderItem={(item: any) => (
          <List.Item className="widget-item-wrap">
            <div className="widget-list-item">
              {item.title}
            </div>  
          </List.Item>
        )}
      />
    </div>
  )
}

export default observer(WidgetList)