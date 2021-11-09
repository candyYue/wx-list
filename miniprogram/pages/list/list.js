// record/list/list.js
import { formatDate ,formatMonth} from '../../utils/helper/format'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingShow:false,
        showChooseDate:false,
        dateValue: new Date().getTime(),
        currentDate: '',
        maxDate: new Date().getTime(),
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
        spending: 0
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
                selected: 0
            })
        }
        this.setData({  currentDate: formatDate(this.data.dateValue, 2) })
        this.getList()
    },
    chooseDate(){
        this.setData({ showChooseDate:true })
    },
    chooseDateInput(event) {
        const date = formatDate(event.detail, 2)
        this.setData({
            dateValue: event.detail,
            currentDate: date,
        });
    },
    chooseDateConfirm(){
        this.setData({ showChooseDate:false })
        this.getList()
    },
    
    getUserInfo(event) {
        console.log(event);
    },
    async getList(){
        let list = []
        const date = formatMonth(this.data.dateValue)
        const cloudResult = await wx.cloud.callFunction({
            name: 'consumptionFun', // 云函数名称
            data:{ // 传给云函数的参数
                action:'getlistbytype',
                data: { type: 'month' ,start_time: date[0], end_time: date[1]}
            }
        })
        list = cloudResult.result.event.list
        if(list&&list.length){
            const spending = list.reduce(function (prev, cur) {
                return prev + cur.dailSpending;
            },0);
            this.setData({ 
                spending: spending
            })
        }
        console.log('list', cloudResult)
        this.setData({  
            menuList: list
        })
    },
    // onComfirm(){
    //     const { title,type,date,price,count} = this.data.addForm
    //     const addItem ={title,type,date,price,count}
    //     this.setData({ menuList: this.data.menuList.concat(addItem) });
    // },
    gotoStatistics(e){
        // wx.navigateTo({
        //     url:'../statistics/statistics'
        // })
    }
})