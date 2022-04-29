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
        text: "账单",
        middle:false
      },{
        pagePath: "../memo/memo",
        iconPath: "",
        selectedIconPath: "",
        text: "备忘录",
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
        // if(data.index===1){
        //   this.addNewList()
        // }else{
          wx.switchTab({url})
        // }
      },
      addNewList(){
        wx.navigateTo({
            url:'/consumption/addlist/addlist'
        })
      },
    }
  })