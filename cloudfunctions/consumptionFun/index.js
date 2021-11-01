// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const consumptions = cloud.database().collection("consumptions")
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * event 参数包含小程序端调用传入的 data
 */
async function addlist(event, wxContext) {
    return consumptions.add({
        // data 字段表示需新增的 JSON 数据
        data: {...event.data, _openid: wxContext.OPENID,},
        success: function(res) {  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
           return res
        },
        fail(err){
          return err
        }
    })
}

async function getList(event, wxContext) {
    //直接返回调取结果。
   return consumptions.where({
    _openid: wxContext.OPENID,
  }).get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let result = {}
    switch (event.action) {
        case 'addlist': {
          result = addlist(event, wxContext)
        }
        case 'getlist': {
          result = getList(event, wxContext)
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