import React from "react";

const ReactEchartsLazy = React.lazy(() => import('echarts-for-react'));

function BarChartWidget() {

    const getBarChart = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['2014', '2015', '2016', '2017', '2018', '2019'],
                axisLine: {
                    lineStyle: {
                        color: '#8FA3B7',//y轴颜色
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#6D6D6D',
                    }
                },
                axisTick: { show: false }
            }],
            yAxis: [{
                type: 'value',
                splitLine: { show: false },
                //max: 700,
                splitNumber: 3,
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: '#8FA3B7',//y轴颜色
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#6D6D6D',
                    }
                },
            }],
            series: [

                {
                    name: 'a',
                    type: 'bar',
                    barWidth: '40%',
                    itemStyle: {
                        normal: {
                            color: '#FAD610'
                        }
                    },
                    stack: '信息',
                    data: [320, 132, 101, 134, 90, 30]
                },
                {
                    name: 'b',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#27ECCE'
                        }
                    },
                    stack: '信息',
                    data: [220, 182, 191, 234, 290, 230]
                },
                {
                    name: 'c',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#4DB3F5'
                        }
                    },
                    stack: '信息',
                    data: [150, 132, 201, 154, 90, 130]
                }
            ]
        };
    }

    return (
        <React.Suspense>
            <ReactEchartsLazy
                option={getBarChart()}
                notMerge={true}
                lazyUpdate={true}
                style={{ width: '100%', height: '100%' }} />
        </React.Suspense>)
}


export default BarChartWidget