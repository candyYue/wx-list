Page({
  data: {
    noteList:[]
  },
  onShow(options) {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
            selected: 2,
        })
    }
    this.getNoteList()
  },
  async getNoteList(value){
    let list = []
    const cloudResult = await wx.cloud.callFunction({
        name: 'consumptionFun', // 云函数名称
        data:{ // 传给云函数的参数
            action:'getnotelist',
            data: { type: 'notelist'}
        }
    })
    list = cloudResult.result.event.list
    console.log(list)
    // this.setData({  
    //     noteList: list
    // })
},
})
