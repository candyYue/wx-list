// pages/map.js
var amapFile = require('../../libs/amap-wx');
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '', //纬度
    longitude: '', //经度
    textData: {},
    tips: {},
    distance: '',
    cost: '',
    polyline: [],
    destination:''
  },
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData,id);
    that.changeMarkerColor(markersData,id);
  },
  onLoad: function() {
    this.getAround('','','init')
  },
  getAround(keywords,location,type){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'49bd570bb29257689e293db32a0e9f84'}); //你的key
    //检索周边的POI
    myAmapFun.getPoiAround({
      iconPathSelected: '..­/..­/assets/img/marker_checked.png', //选中 marker 图标的相对路径
      iconPath: '..­/..­/assets­/img/marker.png',
      querykeywords: keywords || '',
      location: location || '',
      success: function(data){
        markersData = data.markers;
        console.log('getAround',markersData)
        that.setData({
          markers: markersData
        });
        that.showMarkerInfo(markersData,0);
        if(type==='init'){
          that.setData({
            latitude: markersData[0].latitude,
            longitude: markersData[0].longitude //获取当前位置
          });
        }
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  },
  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function(data,i){
    var that = this;
    var markers = [];
    for(var j = 0; j < data.length; j++){
      if(j==i){
        data[j].iconPath = '..­/..­/assets­/img/marker_checked.png' //选中 marker 图标的相对路径
      }else{
        data[j].iconPath = "..­/..­/assets­/img/marker.png";
      }
      markers.push(data[j]);
    }
    console.log('changeMarkerColor',markers)
    that.setData({
      markers: markers,
    });
  },
  bindInput: function(e){
    var that = this;
    var keywords = e.detail.value;
    var myAmapFun = new amapFile.AMapWX({key: '49bd570bb29257689e293db32a0e9f84'});
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function(data){
        if(data && data.tips){
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function(e){
    var keywords = e.target.dataset.keywords;
    this.getAround(keywords)
    this.setData({
      tips: []
    });
    // this.goToCar()
  },
  getDriveRoute(routeType){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: '49bd570bb29257689e293db32a0e9f84'});
    const end = {
      latitude: this.data.markers[0].latitude,
      longitude: this.data.markers[0].longitude,
    }
    const routeMarker = [{
      iconPath: "..­/..­/assets/img/marker.png",
      id: 0,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      width: 23,
      height: 33
    },{
      iconPath: "..­/..­/assets/img/marker_checked.png",
      id: 0,
      latitude: end.latitude,
      longitude: end.longitude,
      width: 24,
      height: 34
    }]
    this.setData({
      markers: routeMarker
    })
    myAmapFun[routeType.name]({
      origin: `${that.data.markers[0].longitude},${that.data.markers[0].latitude}`,
      destination: `${that.data.markers[1].longitude},${that.data.markers[1].latitude}`,
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        console.log(points)
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(routeType.type===0&&data.taxi_cost){ //打车
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
        if(routeType.type===1&&data.paths[0] && data.paths[0].duration){ //步行
          that.setData({
            cost: parseInt(data.paths[0].duration/60) + '分钟'
          });
        }
      },
      fail: function(info){
      }
    })
  },
  goDetail: function(){
  },
  goToCar: function (e) {
    const name = 'getDrivingRoute';
    this.getDriveRoute({
      name,
      type:0
    })
  },
  goToWalk: function (e) {
    const name = 'getWalkingRoute';
    this.getDriveRoute({
      name,
      type:1
    })
  }
})