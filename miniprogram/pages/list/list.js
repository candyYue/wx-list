// record/list/list.js
import { formatWeek ,formatMonth} from '../../utils/helper/format'
import { spendingType ,incomeType} from '../../utils/config/types'

var app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        loadingShow:false,
        menuList: [
            {
                title:"单元格", 
                type:"内容",
                date:"日期",
                price:"价格",
                count:"数量",
            }
        ],
        income: 0,
        spending: 0,
        spendingType,
        incomeType,
        workingSrc:'../../assets/icon/working.png',
        noteSrc:'../../assets/icon/note.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
        // setTimeout(()=>{
        //     this.setData({
        //         loadingShow:false
        //     })
        // },1000)
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0,
            })
        }
        this.getList()
    },
    
    getUserInfo(event) {
        console.log(event);
    },
    async getList(value){
        let list = []
        const date = value ? formatMonth(value.detail) : formatMonth(app.globalData.dateValue)
        const cloudResult = await wx.cloud.callFunction({
            name: 'consumptionFun', // 云函数名称
            data:{ // 传给云函数的参数
                action:'getlistbytype',
                data: { type: 'month' ,start_time: date[0], end_time: date[1]}
            }
        })
        list = cloudResult.result.event.list
        list.forEach(v=>{
            v.dateTime = formatWeek(v.date)
            v.work = v.listItem.some(item=>item.formType==='2')
            v.note = v.listItem.some(item=>item.formType==='3')
        })
        console.log(list)
        if(list&&list.length){
            const spending = list.reduce(function (prev, cur) {
                return prev + cur.dailSpending;
            },0);
            const income = list.reduce(function (prev, cur) {
                return prev + cur.dailIncome;
            },0);
            this.setData({ 
                spending: spending,
                income: income
            })
        }else{
            this.setData({ 
                spending: 0,
                income: 0
            })
        }
        this.setData({  
            menuList: list
        })
    },
})