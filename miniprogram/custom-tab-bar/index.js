Component({
    options: {
      addGlobalClass:true
    },
    data: {
      selected: 0,
      selectedColor: "#c4cafd",
      list: [{
        pagePath: "../list/list",
        iconPath: "",
        selectedIconPath: "",
        text: "列表",
        middle:false
      }, {
        pagePath: "../statistics/statistics",
        iconPath: "",
        selectedIconPath: "",
        text: "+",
        middle:true
      }, {
        pagePath: "../statistics/statistics",
        iconPath: "",
        selectedIconPath: "",
        text: "统计",
        middle:false
      }]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        
        this.setData({
          selected: data.index
        })
        if(data.index===1){
          this.addNewList()
        }else{
          wx.switchTab({url})
        }
      },
      addNewList(){
        wx.navigateTo({
            url:'/consumption/addlist/addlist'
        })
      },
    }
  })