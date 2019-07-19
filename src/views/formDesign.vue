<template>
    <div style="height: 100%;">
        <el-container style="height: 100%;">
            <el-header style="background: bisque">表单设计器</el-header>
            <el-container>
                <el-aside width="200px" style="background: azure">表单左侧边栏</el-aside>
                <el-container>
                    <el-main>

                        <div class="center-box" :style="centerBoxStyle">
                            <div class="form-title">
                                <span>2019年年报数据表单</span> 配置
                            </div>

                            <div class="form-table">
                                <table class="table-design">
                                    <thead>
                                    <th>字段名</th>
                                    <th>字段别名</th>
                                    <th>是否必填</th>
                                    <th>字段类别</th>
                                    <th>数据类型</th>
                                    <th>计算公式</th>
                                    <th>操作</th>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(item,index) in tableData" :key="index">
                                            <td>{{item.name}}</td>
                                            <td>{{item.alias}}</td>
                                            <td>
                                                {{necessaryFilter(item.necessary)}}
                                            </td>
                                            <td>
                                                {{columnTypeFilter(item.columnType)}}
                                            </td>
                                            <td>
                                                {{dataTypeFilter(item.dataType)}}
                                            </td>
                                            <td>{{item.formula}}</td>

                                            <td>
                                                <el-button type="primary" size="mini" @click="checkDataBtn(index)">编辑</el-button>
                                                <el-button type="danger" size="mini" @click="delDataBtn(index)" style="margin-left: 20px">删除</el-button>
                                            </td>
                                        </tr>
                                    </tbody>


                                </table>

                            </div>
                            <div class="form-table-btn">
                                <el-button type="primary" size="small" @click="saveBtn" style="width: 20%">提交数据配置</el-button>
                            </div>
                        </div>
                        <div class="menu-box" ref="menuBox">
                            <div class="menu-title">
                                <span style="margin-left: 20px">字段配置</span>
                                <el-button type="primary" icon="el-icon-plus" size="mini"
                                           style="float: right;margin-right: 20px"
                                            @click="addFiledBtn">新增字段
                                </el-button>
                            </div>
                            <div :style="menuForm" class="menu-form">
                                <el-form label-width="100px" style="width: 90%;margin: 0 auto;margin-top: 20px">
                                    <el-form-item label="字段名">
                                        <el-input v-model="data.name" size="mini" placeholder="字段名（必须英文）"></el-input>
                                    </el-form-item>
                                    <el-form-item label="字段别名">
                                        <el-input v-model="data.alias" size="mini"  placeholder="字段别名（建议中文）"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否必填">
                                        <el-radio-group v-model="data.necessary">
                                            <el-radio label="0"> 必填</el-radio>
                                            <el-radio label="1"> 非必填</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="数据类型">
                                        <el-select v-model="data.dataType"
                                                   @change="changeDataType"
                                                   placeholder="请选择数据类型" size="mini">
                                            <el-option
                                                    v-for="(item,index) in dataTypeList" :key="index"
                                                    :label="item.val" :value="item.key">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="字段类别">
                                        <el-radio-group v-model="data.columnType">
                                            <el-radio label="data" :disabled="data.dataType != 'int' && data.dataType != 'decimal' && data.dataType != 'money' "> 数据</el-radio>
                                            <el-radio label="compute" :disabled="data.dataType != 'int' && data.dataType != 'decimal' && data.dataType != 'money' "> 运算</el-radio>
                                        </el-radio-group>
                                    </el-form-item>



                                    <!--根据数据类型不同 分支数据-->
                                    <!--运算规则设置-->
                                    <span v-if="data.columnType == 'compute'">
                                        <el-form-item label="计算公式">
                                            <el-button type="primary" size="mini" style="width: 100%" @click="setPormulaBtn">设置计算公式</el-button>
                                        </el-form-item>
                                    </span>

                                    <!--整型/字符串-->
                                    <span v-if="data.dataType == 'int' || data.dataType == 'string'">
                                        <el-form-item label="数据长度">
                                            <el-input v-model="data.rule.length" size="mini"  placeholder="请输入数据长度"></el-input>
                                        </el-form-item>
                                    </span>
                                    <!--小数-->
                                    <span v-if="data.dataType == 'decimal'">
                                         <el-form-item label="保留位数">
                                            <el-input v-model="data.rule.decimals" size="mini" @change="changeIntRules" placeholder="请输入小数保留位数"></el-input>
                                         </el-form-item>
                                         <el-form-item label="取整规则">
                                            <el-select v-model="data.rule.intRules"
                                                       @change="changeDecimals"
                                                       placeholder="请选择取整规则" size="mini">
                                                <el-option
                                                        v-for="(item,index) in intRulesList" :key="index"
                                                        :label="item.val" :value="item.key">
                                                </el-option>
                                            </el-select>
                                         </el-form-item>
                                    </span>

                                    <!--日期/日期时间-->
                                    <span v-if="data.dataType == 'date'">
                                          <el-form-item label="起始日期">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.rule.start"
                                                        type="date"
                                                        style="width: 100%"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                         </el-form-item>
                                         <el-form-item label="截止日期">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.rule.end"
                                                        type="date"
                                                        style="width: 100%"
                                                        placeholder="截止日期">
                                                </el-date-picker>
                                         </el-form-item>
                                    </span>
                                    <span v-if="data.dataType == 'time'">
                                          <el-form-item label="起始时间">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.rule.start"
                                                        type="datetime"
                                                        style="width: 100%"
                                                        placeholder="选择起始时间">
                                                </el-date-picker>
                                         </el-form-item>
                                         <el-form-item label="截止时间">
                                                <el-date-picker
                                                        size="mini"
                                                        v-model="data.rule.end"
                                                        type="datetime"
                                                        style="width: 100%"
                                                        placeholder="选择截止时间">
                                                </el-date-picker>
                                         </el-form-item>
                                    </span>
                                    <span v-if="data.dataType == 'money'">
                                        <el-form-item label="金额单位">
                                            <el-input v-model="data.rule.dataUnit" size="mini"  placeholder="请输入金额单位（元/万元）"></el-input>
                                         </el-form-item>
                                    </span>

                                    <el-form-item label="备注信息">
                                        <el-input type="textarea" v-model="data.remark"  placeholder="请输入备注信息"  :rows="3"></el-input>
                                    </el-form-item>



                                </el-form>
                                <div class="add-btn-box">
                                    <el-button type="success" @click="completeBtn" size="small" style="width: 90%">完成数据</el-button>
                                </div>
                            </div>
                        </div>
                    </el-main>
                    <el-footer style="background: bisque">Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>

        <el-dialog title="设置计算公式" :visible.sync="showFormula">
            <div class="data-list-box">
                <el-form >
                    <el-form-item label="可选数据列" label-width="120px" >
                        <span v-if="computeList.length >0">
                            <el-tag v-for="(item,index) in computeList" :key="index"
                                    class="tag-item"
                                    style="">
                                {{item.name}}:{{item.alias}}
                            </el-tag>
                        </span>
                        <span v-else>
                            暂无可选数据列
                        </span>

                    </el-form-item>
                    <el-form-item label="计算符选择" label-width="120px" >
                        <el-tag v-for="(item,index) in signList" :key="index"
                                class="tag-sign"
                                type="danger" size="small" >
                            {{item}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="生成计算公式" label-width="120px" >

                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showFormula = false">取 消</el-button>
                <el-button type="primary" @click="showFormula = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "formDesign",
        data() {
            return {
                centerBoxStyle: {
                    width: document.body.clientWidth - 600 + 'px',
                    height: document.body.clientHeight - 200 + 'px'
                },
                menuForm: {
                    width: '100%',
                    height: '0px'
                },
                dataTypeList: [
                    {key: 'int', val: '整型'}, {key: 'decimal', val: '小数'}, {key: 'string', val: '字符串'}, {key: 'date', val: '日期'}, {key: 'time', val: '日期时间'}, {key: 'money', val: '金额'}, {key: 'bool', val: '布尔型'}
                ],
                intRulesList: [
                    {key: 0, val: '不取整'}, {key: 1, val: '直接取整'}, {key: 2, val: '四舍五入'}, {key: 3, val: '向上取整'}, {key: 4, val: '向下取整'},
                ],
                signList:['+','-','*','/'],
                data: {
                    name: '',              //字段名
                    alias: '',             //字段别名
                    necessary:'0',        //是否必填 0：必填 1：非必填
                    columnType: 'data',   //数据列还是计算列
                    dataType: '',          //数据类型
                    remark:'',            //备注
                    formula:'',            //公式
                    rule: {
                        length: '',      //数据位数
                        decimals: '',    //小数位数
                        intRules: '',    //取整规则
                        start: '',       //开始日期
                        end: '',         //截止日期
                        dataUnit:'',      //金额单位
                    },
                },
                tableData:[],
                changeIndex:-1,

                showFormula:false,
                computeList:[],
            }
        },
        methods: {
            /** 重置变量值*/
            resetData(){
                let obj = {
                    name: '',              //字段名
                    alias: '',             //字段别名
                    necessary:'0',        //是否必填 0：必填 1：非必填
                    columnType: 'data',   //数据列还是计算列
                    dataType: '',          //数据类型
                    remark:'',            //备注
                    formula:'',            //公式
                    rule: {
                        length: '',      //数据位数
                        decimals: '',    //小数位数
                        intRules: '',    //取整规则
                        start: '',       //开始日期
                        end: '',         //截止日期
                        dataUnit:''     //金额单位
                    }
                }
                this.data = JSON.parse(JSON.stringify(obj))
            },
            /** 小数 规则配置
             * 改变取整规则
             * */
            changeIntRules(){
                if( this.data.rule.decimals != 0){
                    this.data.rule.intRules = 0
                }
            },
            /** 改变小数位*/
            changeDecimals(){
                if( this.data.rule.intRules != 0){
                    this.data.rule.decimals = 0
                }
            },
            /** 更改数据类型改变默认值*/
            changeDataType(){
                this.data.rule.length = ''
                this.data.rule.decimals = ''
                this.data.rule.intRules = ''
                this.data.rule.start = ''
                this.data.rule.end = ''
                this.data.rule.dataUnit = ''
                this.data.columnType = 'data'
                this.data.formula = ''
            },
            /** 完成字段配置 更改原表配置 进行赋值*/
            completeBtn(){
                if(this.data.name == '' || this.data.alias == '' || this.data.necessary == '' || this.data.columnType == '' || this.data.dataType == '' ){
                    this.$message.error('请将必填项填写完整')
                }else{
                    let nameKey = -1
                    if(this.tableData.length >0){
                        for(let i =0;i<this.tableData.length;i++){
                            if(this.tableData[i].name ==this.data.name){
                                nameKey = i
                                break
                            }
                        }
                    }
                    if(this.changeIndex == -1){
                            if(nameKey != -1){
                                this.$message.error('字段名不能够重复，请修改字段名')
                            }else{
                                let obj = JSON.parse(JSON.stringify(this.data))
                                this.tableData.push(obj)
                            }
                    }else{
                        let obj = JSON.parse(JSON.stringify(this.data))
                        this.tableData.splice(this.changeIndex,1,obj)
                        this.changeIndex = -1
                    }
                    this.resetData()
                }
            },

            /** 数据过滤器*/
            /** 是否必填*/
            necessaryFilter(key){
                if(key == '0'){
                    return '必填'
                }else if( key == '1'){
                    return '非必填'
                }
            },
            /** 字段类别*/
            columnTypeFilter(key){
                if(key == 'data'){
                    return '数据列'
                }else if(key == 'compute'){
                    return '计算列'
                }
            },
            /** 数据类型*/
            dataTypeFilter(key){
                for(let i=0;i<this.dataTypeList.length;i++){
                    if(this.dataTypeList[i].key == key){
                        return this.dataTypeList[i].val
                    }
                }
            },
            /** 编辑按钮*/
            checkDataBtn(_index){
                console.log(_index)
                this.changeIndex =  _index
                this.data = JSON.parse(JSON.stringify(this.tableData[_index]))
            },

            /** 删除一行数据*/
            delDataBtn(_index){
                console.log(_index)
            },

            /** 设置公式弹出层*/
            setPormulaBtn(){
                for(let i =0;i<this.tableData.length;i++){
                    if(this.tableData[i].dataType == 'int' || this.tableData[i].dataType == 'decimal' || this.tableData[i].dataType == 'money'){
                        let obj = JSON.parse(JSON.stringify(this.tableData[i]))
                        /** 需要满足 当前字段没有成为 其他的字段中的计算公式的 子项*/
                        this.computeList.push(obj)
                    }
                }
                this.showFormula = true
                console.log(this.computeList)
            },

            /** 新增字段*/
            addFiledBtn(){
                this.changeIndex = -1
                this.resetData()
            },

            /** 保存数据配置*/
            saveBtn(){

                console.log(this.tableData)
            }


        },
        mounted() {
            this.menuForm.height = this.$refs.menuBox.offsetHeight - 30 + 'px'
            this.tableData=[
                { name: 'time', alias: '季度', necessary:'0', columnType: 'data', dataType: 'string', remark:'', formula:'', rule: {length: '20', decimals: '', intRules: '', start: '', end: '', dataUnit:''}},
                {name: 'pop', alias: '单价', necessary:'0', columnType: 'data', dataType: 'decimal', remark:'', formula:'', rule: {length: '', decimals: '2', intRules: '', start: '', end: '', dataUnit:''}},
                {name: 'sum', alias: '销售量', necessary:'0', columnType: 'data', dataType: 'int', remark:'', formula:'', rule: {length: '5', decimals: '', intRules: '', start: '', end: '', dataUnit:''}},
                {name: 'pp', alias: '成本', necessary:'0', columnType: 'data', dataType: 'decimal', remark:'', formula:'', rule: {length: '', decimals: '2', intRules: '', start: '', end: '', dataUnit:''}},

            ]
        }
    }
</script>

<style scoped lang="scss">
    .center-box {
        float: left;

    }

    .menu-box {
        float: right;
        width: 300px;
        height: 100%;
        background: #f8f8f8;
        border-radius: 5px;
    }

    .form-title {
        width: auto;
        height: 40px;
        background: #fff;
        line-height: 40px;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #eee;
    }

    .form-table {
        margin-top: 20px;
    }

    /** 表格相关样式*/
    .table-design {
        width: 100%;
        font-family: verdana, arial, sans-serif;
        font-size: 11px;
        color: #333333;
        border: 1px solid #e8e8e8;
        border-collapse: collapse;
        thead th {
            height: 40px;
            padding: 8px;
            border: 1px solid #e8e8e8;
            background-color: rgb(240, 249, 235);
        }
        tbody tr td {
            padding: 8px;
            color: #666;
            border: 1px solid #e8e8e8;
            background-color: #ffffff;
            text-align: center;
        }
    }

    /** 配置器相关*/
    .menu-title {
        width: auto;
        height: 30px;
        color: #666;
        font-size: 16px;
        font-weight: 600;
        padding: 5px;
        line-height: 30px;

        border-bottom: 1px solid #b3d8ff
    }

    .menu-icon-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .menu-item {
        width: 100%;
    }

    .menu-form {
        overflow-y: auto;
    }
    .add-btn-box{
        margin-top: 30px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .form-table-btn{
        width: auto;
        height: 40px;
        margin-top: 40px;
        line-height: 40px;
        text-align: center;

    }


    /** 计算公式弹出窗*/
    .data-list-box{
        width: 100%;
    }
    .tag-sign{
        font-size: 16px;
        font-weight: 600;
        margin:10px 0 0 10px;
        cursor:pointer;
    }
    .tag-sign:hover{
        background: #f56c6c;
        color: #fff;
    }
    .tag-sign:active{
        background:#fef0f0;
        color: #fff;
    }
    .tag-item{
        margin: 10px 0 0 10px;
        cursor:pointer;
    }
    .tag-item:hover{
        background: #409EFF;
        color: #fff;

    }
    .tag-item:active{
        background: #d9ecff;
        color: #fff;
    }
</style>
