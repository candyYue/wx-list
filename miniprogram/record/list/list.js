// record/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingShow:true,
        menuList: [
            {
                title:"单元格", 
                type:"内容",
                date:"描述信息",
                price:"描述信息",
                count:"描述信息",
            }
        ],
        addShow:false,
        dateshow:false,
        addForm:{
            title:1233,
            type:'内容',
            date:'',
            price:'描述',
            count:'描述',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setTimeout(()=>{
            this.setData({
                loadingShow:false
            })
        },1000)
    },
    addNewList(){
        this.setData({ addShow: true });
    },
    getUserInfo(event) {
        console.log(event);
    },
    onComfirm(){
        const { title,type,date,price,count} = this.data.addForm
        const addItem ={title,type,date,price,count}
        this.setData({ menuList: this.data.menuList.concat(addItem) });
    },
    onClose() {
        this.setData({ addShow: false });
    },
    onDateDisplay(){
        this.setData({ dateshow: true });
    },
    onDateClose() {
        this.setData({ dateshow: false });
    },
    formatDate(date) {
        date = new Date(date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onDateConfirm(event) {
        const date = this.formatDate(event.detail)

        this.setData({
            dateshow: false,
            ["addForm.date"]: date
        });
    },
    gotoStatistics(e){
        console.log(e)
        wx.navigateTo({
            url:'../statistics/statistics'
        })
    }
})