// record/addlist/addlist.js
import { formatDate } from '../../utils/helper/format'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: false, // 日历选择显隐
        addForm: {
            title:'',
            type:'购物',
            date:'',
            price:'',
            count:'',
            average: 0 //平均价
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
        const index = event.currentTarget.dataset.index || 0
        const type = this.data.types[index]
        this.setData({ ['addForm.type']: type });
    },
    //input输入
    updateForm(event){
        const name = event.currentTarget.dataset.name
        let detail = ''
        if(name==='price'){
            detail = + event.detail.replace(/[^\d.]/g, "");
        } else if(name ==='count'){
            detail = + event.detail.replace(/\D/g, "") || 1
        }
        else{
            detail = event.detail
        }
        this.setData({ [`addForm.${name}`]: detail });
    },
    // 日历显隐
    onDisplay(e){
        this.setData({ show: true });
    },
    onClose() {
        this.setData({ show: false });
    },

    onDateConfirm(event) {
        // const date = formatDate(event.detail)
        this.setData({
            show: false,
            ["addForm.date"]: new Date(event.detail).getTime()
        });
    },
    saveAction(){
        this.setData({ 
            ['addForm.average']: (this.data.addForm.price/ this.data.addForm.count).toFixed(2)
        },async ()=> {
            console.log(this.data.addForm)
            const adddata = this.data.addForm
            const cloudResult = await wx.cloud.callFunction({
                name: 'consumptionFun', // 云函数名称
                data:{ // 传给云函数的参数
                    action:'addlist',
                    data: adddata
                }
            })
            console.log("fetch cloudfunction success", cloudResult.result)
        });
    }
})