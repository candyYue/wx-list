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
function groupFn(arr,name){
  console.log(name)
  const list = []
  arr.forEach(element => {
    const groupName = element[name]
    const index = list.findIndex(v=>v[name]===groupName)
    if(index>-1){
      list[index].listItem.push(element),
      list[index].dailSpending = list[index].dailSpending + element.price
      list[index].dailIncome = list[index].dailIncome + element.income
    }else{
      list.push({
        [name]: groupName,
        listItem:[element],
        dailSpending:element.price,
        dailIncome:element.income || 0,
      })
    }
  })
  return list 
}
async function getlistbytype(event, wxContext) {
  //直接返回调取结果。
  let res =[]
  let list = []
  const { type, start_time, end_time } = event.data
  res = await consumptions.where({ 
    _openid: wxContext.OPENID,
    date: _.gte(start_time).lte(end_time)
  }).get()
  if(res.data&&res.data.length){
    if(type==='month'){ //按月筛选
      list = groupFn(res.data, 'date')
      list.sort(sortDownDate)
    }
    if(type==='type'){
      list = groupFn(res.data, 'type')
    }
  }
  return { list:list }
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
        case 'getlistbytype': {
          result = await getlistbytype(event, wxContext)
        }
        default: 
        return {
            event: { ...result, event},
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
        }
    }
}