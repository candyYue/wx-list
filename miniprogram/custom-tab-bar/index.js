Component({
    data: {
      selected: 0,
      color: "#7A7E83",
      selectedColor: "#3cc51f",
      list: [{
        pagePath: "/list/list",
        iconPath: "",
        selectedIconPath: "",
        text: "列表"
      }, {
        pagePath: "/statistics/statistics",
        iconPath: "",
        selectedIconPath: "",
        text: "统计"
      }]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  })