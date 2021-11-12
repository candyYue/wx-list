// components/typepercent.js
import { spendingType } from '../../utils/config/types'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: { // 属性名
            type: Array,
            value: ()=>{
                return []
            }
        },
        all:  { // 属性名
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        spendingType
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
