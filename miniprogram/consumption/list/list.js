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
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // setTimeout(()=>{
        //     this.setData({
        //         loadingShow:false
        //     })
        // },1000)
        
        this.setData({  currentDate: formatDate(this.data.dateValue, 2) })
        this.getList()
    },
    chooseDate(){
        this.setData({ showChooseDate:true })
        this.getList()
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
    },
    addNewList(){
        wx.navigateTo({
            url:'../addlist/addlist'
        })
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
                action:'getlistbydate',
                data: { type: 1 ,start_time: date[0], end_time: date[1]}
            }
        })
        list = cloudResult.result.event.list
        this.setData({  menuList: list })
    },
    // onComfirm(){
    //     const { title,type,date,price,count} = this.data.addForm
    //     const addItem ={title,type,date,price,count}
    //     this.setData({ menuList: this.data.menuList.concat(addItem) });
    // },
    gotoStatistics(e){
        console.log(e)
        wx.navigateTo({
            url:'../statistics/statistics'
        })
    }
})