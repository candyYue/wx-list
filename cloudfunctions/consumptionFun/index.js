// 云函数入口文件
const cloud = require('wx-server-sdk')
const consumptions = cloud.database().collection("consumptions")

cloud.init()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * event 参数包含小程序端调用传入的 data
 */
async function addlist(event) {
    return consumptions.add({
        // data 字段表示需新增的 JSON 数据
        data: event.data,
        success: function(res) {  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
           return res
        },
        fail(err){
          return err
        }
    })
}

async function getList(event) {
    //直接返回调取结果。
   return consumptions.get({
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
          result = addlist(event)
        }
        case 'getlist': {
          result = getList(event)
        }
        default: 
        return {
            event: { ...result, even},
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
        }
    }
}