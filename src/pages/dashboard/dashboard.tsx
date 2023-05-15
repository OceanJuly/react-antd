import React, { useState } from "react";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { Button } from "antd";
import { findIndex } from 'lodash'
import '../../assets/dashboard.css'
import { CloseOutlined, LockOutlined, QuestionCircleOutlined, UnlockOutlined } from "@ant-design/icons";
const BarChartWidgetLazy = React.lazy(() => import('./components/BarChartWidget'));
const PieChartWidgetLazy = React.lazy(() => import('./components/PieChart'));
const TableWidgetLazy = React.lazy(() => import('./components/tableCom'));
const DataWidgetLazy = React.lazy(() => import('./components/dataCom'));
const SelectList = React.lazy(() => import('./components/selectList'));
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardWidgetInfo {
    widgetName: string,
    layout: Layout
}

function DashboardGird() {
    let a: any = 0

    const [widgets, setWidgets] = useState<DashboardWidgetInfo[]>([]);
    const [currentCols, setCurrentCols] = useState<number>(12);

    const getLayouts: any = () => {
        return widgets.map(item => item.layout);
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
        if (widgetName === 'PieChartWidget') { //可以改成策略
            return (<React.Suspense>
                <PieChartWidgetLazy />
            </React.Suspense>);
        } else if (widgetName === 'BarChartWidget') {
            return (<React.Suspense>
                <BarChartWidgetLazy />
            </React.Suspense>);
        } else if (widgetName === 'table') {
            return (<React.Suspense>
                <TableWidgetLazy />
            </React.Suspense>)
        } else if (widgetName === 'data') {
            return (<React.Suspense>
                <DataWidgetLazy />
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
            layout: { i: widgetName, x: x, y: Infinity, w: 3, h: 2, static: false }
        }] as DashboardWidgetInfo[];
        setWidgets(newWidgets);
    }

    const handleClick = (e: any) => {
        let widgetName = e.target.id
        console.log(e.target.id)
        const x = (widgets.length * 3) % (currentCols);
        
        console.log(widgetName)
        const newWidgets = [...widgets, {
            widgetName: widgetName,
            layout: { i: widgetName, x: x, y: Infinity, w: 3, h: 2, static: false }
        }] as DashboardWidgetInfo[];
        setWidgets(newWidgets)
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

    return (
        <>
            <Button onClick={onAddWidget}>add widget</Button>
            {/*<ul onClick={showCompItem}>*/}
            {/*    <li><Button id="1">折线图</Button></li>*/}
            {/*    <li><Button id="2">圆饼图</Button></li>*/}
            {/*    <li><Button id="3">表格</Button></li>*/}
            {/*    <li><Button id="4">数据</Button></li>*/}
            {/*</ul>*/}
            <SelectList handleClick={handleClick}></SelectList>
            <ResponsiveReactGridLayout
                layouts={getLayouts()}
                className={'layouts'}
                onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}>
                {widgets?.map(item => createWidget(item))}
            </ResponsiveReactGridLayout>
            {/*<div className="item-wrap">*/}
            {/*    {widgets?.map(item => createWidget(item))}*/}
            {/*</div>*/}
        </>
    );
}

export default DashboardGird