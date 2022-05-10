// record/addlist/addlist.js
import { spendingType ,incomeType} from '../../utils/config/types'
import { formatDate } from '../../utils/helper/format'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        formType:'0',
        show: false, // 日历选择显隐
        addForm: {
            title:'',
            type: 0,
            date:new Date().getTime(),
            price:'',
            count:1,
            // average: 0, //平均价
            income: 0
        },
        chooseDate:formatDate(new Date().getTime()),
        addType: []
    },
    onLoad(){
        this.setData({
            addType: spendingType
        })
    },
    onFormTypeChange(event) {
        const type = {
            0: spendingType,
            1: incomeType
        }
        this.setData({
            formType: event.detail,
            addType:type[+event.detail]
        });
    },
    onTypeChange(event) {
        const index = event.currentTarget.dataset.index || 0
        // const type = this.data.types[index]
        this.setData({ ['addForm.type']: index });
    },
    //input输入
    updateForm(event){
        console.log(event)
        const name = event.currentTarget.dataset.name
        let detail = ''
        if(name==='price'){
            detail = event.detail.replace(/[^\d.]/g, "");
        } else{
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
        const chooseDate = formatDate(event.detail)
        const date = new Date(event.detail).getTime()
        this.setData({
            show: false,
            ["addForm.date"]: date,
            chooseDate: chooseDate
        });
    },
    async saveAction(){
        //收入或支出
        if((this.data.formType==='0'||this.data.formType==='1')&&!this.data.addForm.price){
            Notify({ type: 'warning', message: '请输入金额' });
            return false
        }
        const adddata = {
            ...this.data.addForm,
            // average: this.data.formType==='0'?(this.data.addForm.price/ this.data.addForm.count).toFixed(2):0,
            formType: this.data.formType
        }
        console.log(adddata)
        const cloudResult = await wx.cloud.callFunction({
            name: 'consumptionFun', // 云函数名称
            data:{ // 传给云函数的参数
                action:'addlist',
                data: adddata
            }
        })
        console.log("fetch cloudfunction success", cloudResult.result)
        Notify({ type: 'success', message: '保存成功' });
        setTimeout(()=>{
            wx.switchTab({
                url: this.data.formType==='3'? '/pages/memo/memo' : '/pages/list/list'
            })
        },1000)
    }
})