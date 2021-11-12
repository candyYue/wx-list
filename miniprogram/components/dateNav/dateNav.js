// components/dateNav/dateNave.js
import { formatWeek, formatDate ,formatMonth} from '../../utils/helper/format'
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        income:{
            type: Number,
            value: 0
        },
        spending:{
            type: Number,
            value: 0
        },
        showMoney:{
            type: Boolean,
            value: true
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showChooseDate:false,
        dateValue: app.globalData.dateValue, // 时间戳
        currentDate: '', // 年/月
        maxDate: new Date().getTime(),
    },
    pageLifetimes:{
        show(){
            this.setData({  
                dateValue: app.globalData.dateValue,
                currentDate: formatDate(app.globalData.dateValue, 2) 
            })
            
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        chooseDate(){
            this.setData({ showChooseDate:true })
        },
        chooseDateInput(event){
            const date = formatDate(event.detail, 2)
            app.globalData.dateValue = event.detail
            this.setData({
                dateValue: event.detail,
                currentDate: date,
            });
        },
        chooseDateConfirm(){
            this.setData({ showChooseDate:false })
            this.triggerEvent('updateList', app.globalData.dateValue)
        }
    }
})
