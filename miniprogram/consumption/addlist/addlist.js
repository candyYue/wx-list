// record/addlist/addlist.js
import { formatDate } from '../../utils/helper/format'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: false, // 日历选择显隐
        addForm: {
            title:1233,
            type:'购物',
            date:'',
            price:'描述',
            count:'描述',
        },
        activeType:0,
        types: [
            '购物', 
            '日用', 
            '餐饮', 
            '交通',
            '蔬菜水果',
            '零食', 
            '运动', 
            '娱乐社交', 
            '居家', 
            '孩子', 
            '旅行', 
            '烟酒'],
    },
    onTypeChange(event) {
        console.log(event)
        // this.setData({ active: event.detail });
    },
    onChange(event) {
        this.setData({
          checked: event.detail,
        });
    },
    onDisplay(e){
        this.setData({  show: true });
    },
    onClose() {
        this.setData({ show: false });
    },

    onDateConfirm(event) {
        const date = formatDate(event.detail)
        this.setData({
            show: false,
            ["addForm.date"]: date
        });
    },
    saveAction(){
        console.log(this.addForm)
        // await wx.cloud.callFunction({
        //     name: 'consumptionFun', // 云函数名称
        //     data:{ // 传给云函数的参数
        //         action:'addlist',
        //         data: {}
        //     }
        // })
    }
})