import React, { useState } from "react";
const BarChartWidgetLazy = React.lazy(() => import('./components/BarChartWidget'));
const PieChartWidgetLazy = React.lazy(() => import('./components/PieChart'));
const TableWidgetLazy = React.lazy(() => import('./components/tableCom'));
const DataWidgetLazy = React.lazy(() => import('./components/dataCom'));
const SelectList = React.lazy(() => import('./components/selectList'));

import './style/customBoard.css'

interface DashboardWidgetInfo {
    widgetName: string
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
    const key = widget.widgetName
    console.log(key)
    return (
        <div className={'dashboard-widget-wrapper'} key={key}>
            {getWidgetComponent(widget.widgetName)}
        </div>
    );
}

function CustomBoard() {
    const [widgets, setWidgets] = useState<DashboardWidgetInfo[]>([
        {
            widgetName: 'PieChartWidget'
        },
        {
            widgetName: 'table'
        }
    ]);
    // const defaultWidgets = ['PieChartWidget', 'PieChart', 'table', 'data']
    // const newWidgets = defaultWidgets.map((widgetName) => {
    //     return {
    //         widgetName
    //     }
    // })
    // setWidgets(newWidgets)
    function handleClick(e: any) {
        const id = e.target.id
        if (!widgets.includes(id)) {
            setWidgets([...widgets, {
                widgetName: id
            }])
        }
    }
    return (
        <>
            <SelectList handleClick={handleClick}></SelectList>
            <div className="item-wrap">
                {widgets.map((widget) => createWidget(widget))}
            </div>
        </>
    )
}

export default CustomBoard;