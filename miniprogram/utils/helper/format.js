const formatDate  = (date,type=1) => { //type默认年月日  type:2 年月
    date = new Date(date);
    if(type===2){
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
    }else{
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}
const formatMonth  = (date) => { //返回格式  => [月初时间戳，月末时间戳]
    date = new Date(date);
    const year1 = date.getFullYear()
    const month1 = date.getMonth()
    const startMonth = `${year1}/${month1 + 1}/1`
    let year2 = month1 === 11 ? year1 + 1 : year1
    let month2 = month1 === 11 ? 1 : month1 + 2
    const endMonth = `${year2}/${month2}/1`
    return [new Date(startMonth).getTime(), new Date(endMonth).getTime() - 1];
}
const formatWeek = (date)=>{
    date = new Date(date);
    const dateStr = formatDate(date)
    const arr = ['日','一','二','三','四','五','六']
    const week = arr[date.getDay()]
    return `${dateStr}  星期${week}`
}
export {
    formatDate,
    formatMonth,
    formatWeek
}