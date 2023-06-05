import { LStorage } from '@/utils/storage'
import { makeAutoObservable } from 'mobx'

interface WidgetProp {
  widgetName: string,
  title: string,
  layout: {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    static: boolean,
    isBounded: boolean,
  }
}
// dashboard 组件合集，后续改成自动化识别
const dashboardWidgets: Array<WidgetProp> = [
  {
    widgetName: 'BarChartWidget',
    title: '柱状图',
    layout: { i: 'BarChartWidget', x: 0, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
  },
  {
    widgetName: 'PieChartWidget',
    title: '园型图',
    layout: { i: 'PieChartWidget', x: 3, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
  },
  {
    widgetName: 'ProgressCom',
    title: '进度条',
    layout: { i: 'ProgressCom', x: 6, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
  },
  {
    widgetName: 'StatisticCom',
    title: '数据统计',
    layout: { i: 'StatisticCom', x: 6, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
  }
]

class DashboardWidget {
  widgetList = dashboardWidgets
  constructor() {
    makeAutoObservable(this)
    // this.getWidgetList()
  }
  private async getWidgetList() {
    const widgetInfo = LStorage.get('widgetList')
    let res = []
    const id = 'tokenId'
    if (widgetInfo?.widgets?.length > 0 && widgetInfo?.tokenId === id) {
      res =  widgetInfo.widgets
    } else {
      // api 请求
      res = []
    }
    this.updateWidgetList(res)
  }
  updateWidgetList(val: any) {
    this.widgetList = val
  }
}

export default DashboardWidget