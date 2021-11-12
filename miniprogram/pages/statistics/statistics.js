// record/trend/trend.js
import * as echarts from "../../components/ec-canvas/echarts"
import { formatMonth} from '../../utils/helper/format'
var app = getApp()

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
        },
        all:0,
    },
    async onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
        this.getList()
        this.setData({
            ['ec.initChart']: this.initChart(),
        })
    },
    async initChart() {
        this.selectComponent('#mychart-dom-bar').init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: 400,
                height: 400,
                // devicePixelRatio: dpr // 像素
            });
            canvas.setChart(chart);
            chart.setOption(this.data.option);
            return chart;
        })
    },
    async getList(value){
        const date = value ? formatMonth(value.detail) : formatMonth(app.globalData.dateValue)
        const cloudResult = await wx.cloud.callFunction({
            name: 'consumptionFun', // 云函数名称
            data:{ // 传给云函数的参数
                action:'getlistbytype',
                data: { start_time: date[0], end_time: date[1]}
            }
        })
        const list = cloudResult.result.event.list
        console.log(list)
        if(list&&list.length){
            const spending = list.reduce(function (prev, cur) {
                return prev + cur.dailSpending;
            },0);
            list.forEach(v=>{
                v.value=Math.ceil(v.dailSpending/spending*100)
            })
            this.setData({ 
                all: spending,
                percentlist:list
            })
        }
    }
    
})