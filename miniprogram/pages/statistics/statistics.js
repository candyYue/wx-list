// record/trend/trend.js
import * as echarts from "../../components/ec-canvas/echarts"

Page({
    /**
     * 页面的初始数据
     */
    data: {
        option:{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        },
        ec: {
            lazyLoad: true, // 延迟加载
        }
    },
    async onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
        const date = [1635696000000, 1638287999999]
        const cloudResult = await wx.cloud.callFunction({
            name: 'consumptionFun', // 云函数名称
            data:{ // 传给云函数的参数
                action:'getlistbytype',
                data: { type:'type',start_time: date[0], end_time: date[1]}
            }
        })
        console.log('statistics', cloudResult)
        this.setData({
            ['ec.initChart']: this.initChart()
        })
    },
    async initChart() {
        this.selectComponent('#mychart-dom-bar').init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // 像素
            });
            canvas.setChart(chart);
            chart.setOption(this.data.option);
            return chart;
        })
    }
})