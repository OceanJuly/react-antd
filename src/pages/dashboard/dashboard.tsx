import React, { useState } from "react";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { Button } from "antd";
import { findIndex } from 'lodash'
import './dashboard.less'
import {
    CloseOutlined,
    LockOutlined,
    QuestionCircleOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import { LStorage } from "@/utils/storage";
import ToolTipBtn from "@/components/basic/toolTip-btn";
const BarChartWidgetLazy = React.lazy(() => import('./components/BarChartWidget'));
const PieChartWidgetLazy = React.lazy(() => import('./components/PieChart'));
const WidgetList = React.lazy(() => import('./components/widgetList'));
const TaskList = React.lazy(() => import('./components/taskList'));
const StatisticCom = React.lazy(() => import('./components/statistic'));
const ProgressCom = React.lazy(() => import('./components/progress'))
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardWidgetInfo {
    widgetName: string,
    layout: Layout
}

function DashboardGird() {
    let a: any = 0

    const [widgets, setWidgets] = useState<DashboardWidgetInfo[]>(getWidgetList);
    const [currentCols, setCurrentCols] = useState<number>(12);

    const getLayouts: any = () => {
        return widgets.map(item => item.layout);
    }

    function getWidgetList() {
        return LStorage.get('dashboardWidget')?.widgets || [
            {
                widgetName: 'BarChartWidget',
                layout: { i: 'BarChartWidget', x: 0, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
            },
            {
                widgetName: 'PieChartWidget',
                layout: { i: 'PieChartWidget', x: 3, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
            },
            {
                widgetName: 'ProgressCom',
                layout: { i: 'ProgressCom', x: 6, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
            },
            {
                widgetName: 'StatisticCom',
                layout: { i: 'StatisticCom', x: 9, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
            }
        ]

    }

    const setLayoutStatic = (widget: DashboardWidgetInfo, staticFlag: boolean) => {
        const index = findIndex(widgets, (w: any) => w.widgetName === widget.widgetName);
        if (index !== -1) {
            const updateWidget = widgets[index];
            updateWidget.layout.static = staticFlag;
            widgets.splice(index, 1, { ...updateWidget });
            const newWidgets = [...widgets];
            setWidgets(newWidgets);
        }
    }

    const lockWidget = (widget: DashboardWidgetInfo) => {
        setLayoutStatic(widget, true);
    }

    const unlockWidget = (widget: DashboardWidgetInfo) => {
        setLayoutStatic(widget, false);
    }

    const onRemoveWidget = (widget: DashboardWidgetInfo) => {
        const widgetIndex = findIndex(widgets, (w: any) => w.layout.i === widget.layout.i);
        if (widgetIndex !== -1) {
            widgets.splice(widgetIndex, 1);
            const newWidgets = [...widgets];
            setWidgets(newWidgets);
        }
    }

    const getWidgetComponent = (widgetName: string) => {
        console.log(widgetName)
        if (widgetName === 'PieChartWidget') { //可以改成策略
            return (<React.Suspense>
                <PieChartWidgetLazy />
            </React.Suspense>);
        } else if (widgetName === 'BarChartWidget') {
            return (<React.Suspense>
                <BarChartWidgetLazy />
            </React.Suspense>);
        } else if (widgetName === 'StatisticCom') {
            return (<React.Suspense>
                <StatisticCom />
            </React.Suspense>)
        } else if (widgetName === 'ProgressCom') {
            return (<React.Suspense>
                <ProgressCom />
            </React.Suspense>)
        }
    }

    const createWidget = (widget: DashboardWidgetInfo) => {
        const key = widget.widgetName || a++
        return (
            <div className={'dashboard-widget-wrapper'} key={key} data-grid={widget.layout}>
                <span className='dashboard-widget-header'>
                    <QuestionCircleOutlined className={'dashboard-widget-header-icon'} />
                    {widget.layout.static ? <LockOutlined className={'dashboard-widget-header-icon'} onClick={() => unlockWidget(widget)} /> : (
                        <UnlockOutlined className={'dashboard-widget-header-icon'} onClick={() => lockWidget(widget)} />)}
                    <CloseOutlined className={'dashboard-widget-header-icon'} onClick={() => onRemoveWidget(widget)} />
                </span>
                {getWidgetComponent(widget.widgetName)}
            </div>
        );
    }

    const onAddWidget = () => {
        const obj: any = {
            0: 'BarChartWidget',
            1: 'PieChartWidget',
            2: 'table',
            3: 'data'
        }
        const x = (widgets.length * 3) % (currentCols);
        const widgetName = obj[widgets.length]
        if (!widgetName) return
        const newWidgets = [...widgets, {
            widgetName: widgetName,
            layout: { i: widgetName, x: x, y: Infinity, w: 3, h: 2, static: false, isBounded: true }
        }] as DashboardWidgetInfo[];
        setWidgets(newWidgets);
    }

    const onBreakpointChange = (newBreakpoint: string, newCols: number) => {
        setCurrentCols(newCols);
    }

    const onLayoutChange = (layouts: any[]) => {
        for (const layout of layouts) {
            const updateIndex = findIndex(widgets, (w: any) => w.layout.i === layout.i);
            if (updateIndex !== -1) {
                const updateWidget = widgets[updateIndex];
                updateWidget.layout = layout;
                widgets.splice(updateIndex, 1, { ...updateWidget });
            }
        }
        const newWidgets = [...widgets];
        setWidgets(newWidgets);
    }

    function saveDashboardCom() {
        const saveData = {
            widgets: widgets,
            id: 'tokenId'
        }
        LStorage.set('dashboardWidget', saveData)
    }

    return (
        <div className="dashboard-wrap">
            <div style={{margin: '16px 0'}}>
                <div style={{fontSize: '16px', margin: '16px 0'}}>
                    dashboard component
                    <ToolTipBtn tip="保存此次调整" btnProps={{type: 'text'}}>
                        <i onClick={saveDashboardCom} className="iconfont icon-Save-toCloud"></i>
                    </ToolTipBtn>
                </div>
                <ResponsiveReactGridLayout
                    layouts={getLayouts()}
                    className={'layouts'}
                    margin={[16, 16]}
                    useCSSTransforms={true}
                    onLayoutChange={onLayoutChange}
                    onBreakpointChange={onBreakpointChange}>
                    {widgets?.map(item => createWidget(item))}
                </ResponsiveReactGridLayout>
            </div>
            <div style={{display: 'grid',  gridTemplateColumns: '70% 30%', gridGap: '24px', marginRight: '24px'}}>
                <div>
                    <div style={{fontSize: '16px', margin: '16px 0'}}>今日待办</div>
                    <TaskList></TaskList>
                </div>
                <div style={{minWidth: 0}}>
                    <div style={{fontSize: '16px', margin: '16px 0'}}>组件列表</div>
                    <WidgetList></WidgetList>
                </div>
            </div>
            {/* <Button onClick={onAddWidget}>add widget</Button>
            {/* <SelectList handleClick={handleClick}></SelectList> */}
        </div>
    );
}

export default DashboardGird