// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command
const consumptions = db.collection("consumptions")

function sortDownDate(a, b) {
   return Date.parse(a.date) - Date.parse(b.date);
}
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * event 参数包含小程序端调用传入的 data
 */
async function addlist(event, wxContext) {
  return consumptions.add({
    // data 字段表示需新增的 JSON 数据
    data: {...event.data, _openid: wxContext.OPENID,},
    success: (res)=> {  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        return res
    },
    fail: (err)=>{
      return err
    }
  })
}

async function getlist(event, wxContext) {
    //直接返回调取结果。
   return consumptions.where({
    _openid: wxContext.OPENID,
  }).get({
    success: (res)=> {
      return res
    },
    fail: (err)=> {
      return err
    }
  })
}

async function getlistbydate(event, wxContext) {
  //直接返回调取结果。
  let res =[]
  if(event.data && event.data.type){
    const { type, start_time, end_time } = event.data
    if(type===1){ //按月筛选
      res = await consumptions.where({ 
        _openid: wxContext.OPENID,
        date: _.gte(start_time).lte(end_time)
      }).get()
    }else{ //按日期筛选

    }
  }else{
    res = await consumptions.where({ _openid: wxContext.OPENID}).get()
  }
  const list = []
  if(res.data&&res.data.length){
    res.data.forEach(element => {
      const date = element.date
      const index = list.findIndex(v=>v.date===date)
      if(index>-1){
        list[index].listItem.push(element)
      }else{
        list.push({
          date,
          listItem:[element]
        })
      }
    })
  }
  return {list:list.sort(sortDownDate)}
}
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let result = {}
    switch (event.action) {
        case 'addlist': {
          result = await addlist(event, wxContext)
        }
        case 'getlist': {
          result = await getlist(event, wxContext)
        }
        case 'getlistbydate': {
          result = await getlistbydate(event, wxContext)
        }
        console.log(result)
        default: 
        return {
            event: { ...result, event},
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
        }
    }
}