
const commen={}

/** @getFormulaResult 根据计算公式返回计算完成的值
 *  @item  一行的对应数据数据 Object (键值对)
 *  @formula 对应的计算公式  String
 *  @return 计算完成的数值
 * */
commen.getFormulaResult=function (item,formula) {
    /** 获取第一个变量的位置*/
    let start = formula.indexOf('{{')
    let end = formula.indexOf('}}')

    while (start !=-1){
        let variable = formula.substring(start+2,end)
        let str = ''
        /** 获取变量对应的值*/
        let val = item[variable]
        if(val == undefined || val ==null || val == ''){
            val = 0
        }
        /**如果起点是0 的情况*/
        if(start == 0){
            str =  formula.substr(end+2)
            str = val+str
        }else{
        /** 起点不是0的情况 拼接 左--中(对应的值)--右 字符串 */
            let str1 = formula.substring(0,start)
            let str2 = val
            let str3 = formula.substr(end+2)
            str = str1+str2+str3
        }
        /** 重置字符串替换变量为对应值*/
        formula = str
        start = formula.indexOf('{{')
        end = formula.indexOf('}}')
    }
    /** 返回计算完成的值*/
    let value = eval(formula)
    return value
}


export default {
    commen
}
