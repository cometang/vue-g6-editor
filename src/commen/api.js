import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';


let api = {};
console.log('开始调用ctrl');

//创建表结构
api.createTableSchema= function (cnt,callback) {
    util.call(baseUrl+'/flow/createTableSchema', cnt, callback)
}

export default api

