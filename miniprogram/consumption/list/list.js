// record/list/list.js
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
                date:"描述信息",
                price:"描述信息",
                count:"描述信息",
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // setTimeout(()=>{
        //     this.setData({
        //         loadingShow:false
        //     })
        // },1000)

        try {
            const cloudResult = await wx.cloud.callFunction({
              name: 'consumptionFun', // 云函数名称
              data:{ // 传给云函数的参数
                  action:'getlist',
                  data: {}
              }
            })
            console.log("fetch cloudfunction success", cloudResult.result)
        } catch (error) {
            console.log("fetch cloudfunction error", error)
        }
    },
    addNewList(){
        wx.navigateTo({
            url:'../addlist/addlist'
        })
    },
    getUserInfo(event) {
        console.log(event);
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