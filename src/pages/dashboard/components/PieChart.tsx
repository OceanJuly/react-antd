import React from "react";

const ReactEchartsLazy = React.lazy(() => import('echarts-for-react'));

function PieChartWidget() {
    const getPieChart = () => {
        return {
            color: ['#3AA1FF', '#36CBCB', '#4ECB73', '#FBD338'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            series: [{
                name: '消费能力',
                type: 'pie',
                radius: ['40%', '55%'],
                center: ['50%', '55%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    normal: {
                        borderColor: '#FFFFFF',
                        borderWidth: 2
                    }
                },
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    name: 'a',
                    value: '20'
                }, {
                    name: 'b',
                    value: '40'
                }, {
                    name: 'c',
                    value: '10'
                }, {
                    name: 'd',
                    value: '10'
                }]
            }]
        };
    }

    return (<React.Suspense>
        <ReactEchartsLazy
            option={getPieChart()}
            notMerge={true}
            lazyUpdate={true}
            style={{ width: '100%', height: '100%' }} />
    </React.Suspense>)
}

export default PieChartWidget