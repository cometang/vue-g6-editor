<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-header class="header-box">Header</el-header>
            <el-container style="height: 100%;">
                <el-aside width="200px" class="item-box">
                    <div class="nav-box"
                         v-for="(item,index) in itemListL" :key="index"
                         @click="checkItem(index)">
                        <img
                                draggable="false"
                                :src="item.src"
                                class="getItem"
                                :label="item.label"
                        >
                    </div>

                    <div class=" nav-box">
                        <el-button type="primary" size="small" @click="saveBtn"> 提交数据</el-button>
                    </div>
                </el-aside>
                <el-container>
                    <el-main class="main-box">
                        <div class="center-box">
                            <div id="canvasBox"  ref="canvasBox"></div>
                        </div>
                        <div class="info-box">

                            <div class="tab-box">
                                <div class="tab-title">
                                    <div :class="tabActive==index?'tab-item-title tab-active':'tab-item-title'"
                                         v-for="(item,index) in tabList"
                                         :key="index"
                                         @click="tabActive = index"
                                    >
                                        {{item.title}}
                                    </div>

                                </div>
                                <div class="tab-item">
                                    <!--资源配置右侧-->
                                    <div v-if="tabActive == 0">
                                            <div class="search-box">
                                                <el-input
                                                        size="small"
                                                        placeholder="输入关键字进行过滤"
                                                        v-model="searchTableData">
                                                </el-input>
                                            </div>
                                            <div class="tab-item-content">
                                                <el-tree
                                                        class="filter-tree"
                                                        :data="tabList[0].content"
                                                        :props="defaultProps"
                                                        default-expand-all
                                                        :filter-node-method="filterNode"
                                                        ref="tree">
                                                </el-tree>
                                            </div>
                                            <div class="check-btn">
                                                <el-button type="primary" size="mini" >选中当前值</el-button>
                                            </div>
                                        </div>
                                    <!--权限配置右侧-->
                                    <div v-if="tabActive == 1">

                                        <el-tabs v-model="permissionTabActive" >

                                            <el-tab-pane :label="item.title"
                                                         :key="index"
                                                         v-for="(item,index) in tabList[1].content"
                                                        @click="permissionTabActive = index">

                                                    <div class="permission-list"
                                                        v-for="(item1,index1) in item.list"
                                                        :key="index1">
                                                           {{item1.name}}
                                                    </div>

                                            </el-tab-pane>

                                        </el-tabs>
                                        <!--<div :class="permissionTabActive==index?'permission-tab-item-title tab-active':'tab-item-title'"-->
                                             <!--v-for="(item,index) in tabList[1].content"-->
                                             <!--:key="index"-->
                                             <!--@click="permissionTabActive = index"-->
                                        <!--&gt;-->
                                            <!--{{item.title}}-->
                                        <!--</div>-->
                                    </div>
                                    <!--行为配置-->
                                    <div v-if="tabActive ==2">
                                        进行规则配置 展示所有节点 选择下一节点跳转
                                    </div>

                                </div>
                            </div>
                            <div class="show-box">
                                <el-form ref="form" label-width="80px">
                                    <el-form-item label="修改值">
                                        <el-input v-model="graph_lable"></el-input>
                                    </el-form-item>
                                </el-form>
                                <el-button type="primary" @click="changeItem" size="small">确认修改</el-button>
                                <el-button type="danger" style="margin-left: 15px" @click="delItem" size="small">删除选中</el-button>
                            </div>

                        </div>


                    </el-main>
                    <el-footer class="footer">


                    </el-footer>
                </el-container>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import G6 from '@antv/g6';

    export default {
        name: "home",
        data(){
            return{
                itemListL:[
                    {
                        type:'node',
                        src:'https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg',
                        label:'起止节点',
                        model:{
                            id:'',
                            x: 300,
                            y: 200,
                            size: 60,
                            label: '起止节点',
                            shape:'circle',
                            style: {
                                stroke: '#ffc069',
                                fill: '#fff3ea'
                            }
                        }
                    },
                    {
                        type:'node',
                        src:'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg',
                        label:'常规节点',
                        model:{
                            id:'',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '常规节点',
                            shape:'rect',

                            style: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
                                radius: 5
                            }
                        }
                    },
                    {
                        type:'node',
                        src:'https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg',
                        label:'分叉节点',
                        model:{
                            id:'',
                            x: 300,
                            y: 200,
                            size: [60,60],
                            label: '分叉节点',
                            shape:'diamond',
                        }
                    },
                    {
                        type:'node',
                        src:'https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg',
                        label:'模型节点',
                        model:{
                            id:'',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '模型节点',
                            shape:'rect',
                            style: {
                                stroke: '#b37feb',
                                fill: '#f9f1ff',
                                radius: 5
                            }
                        }
                    },
                ],
                nodeData:{
                    nodes: [
                        {
                            id: 'node1',
                            label: 'node1',
                            x: 100,
                            y: 200,
                            anchorPoints: [[0, 1], [0.5, 1]],
                            shape: 'rect'
                        },
                    ],
                    edges: []
                },
                graph:'',
                graph_id:'',
                graph_lable:'',
                graph_type:'',

                tabList:[
                    {
                        title:'资源配置',
                        content:[
                            {
                                text:'资产数据表',
                                field:[
                                    {key:'id',text:'序号'},{key:'name',text:'资产名'},{key:'address',text:'资产地址'},{key:'val',text:'资产价值'},{key:'num',text:'资产数量'},
                                ]
                            },
                            {
                                text:'公共设备表',
                                field:[
                                    {key:'id',text:'序号'},{key:'name',text:'设备名'},{key:'address',text:'设备地址'},{key:'val',text:'设备价值'},{key:'num',text:'设备数量'},
                                ]
                            },
                            {
                                text:'财务分析表',
                                field:[
                                    {key:'id',text:'序号'},{key:'year',text:'分析年份'},{key:'sum',text:'总交易金额'},{key:'profit',text:'总利润'}
                                ]
                            },
                            {
                                text:'项目统计表',
                                field:[
                                    {key:'id',text:'序号'},{key:'name',text:'项目名称'},{key:'date',text:'项目申报年份'},{key:'profit',text:'项目目前利润'},{key:'amount ',text:'申报金额'},{key:' delivery',text:'交付金额'}
                                ]
                            },
                        ],
                        contentActive:0
                    },
                    {
                        title:'权限配置',
                        content:[
                            {type:'0',title:'部门权限',
                                list:[{id:'12',name:'财政局'},{id:'13',name:'农业农村局'},{id:'14',name:'国土资源局'}, {id:'121',name:'财政局1'},{id:'131',name:'农业农村局1'},{id:'141',name:'国土资源局1'}]
                            },
                            {type:'1',title:'角色权限',
                                list:[{id:'102',name:'超级管理员'},{id:'103',name:'管理用户'},{id:'104',name:'局级干部'}, {id:'101',name:'科级干部'},{id:'111',name:'普通科员'},{id:'122',name:'项目申报人'}]
                            },
                            {type:'2',title:'用户权限',
                                list:[{id:'102',name:'李宁'},{id:'103',name:'张三'},{id:'104',name:'六五'}, {id:'101',name:'李四'},{id:'111',name:'王五'},{id:'122',name:'陈是'},{id:'141',name:'照照'},{id:'141',name:'刘德'},{id:'146',name:'陈武'}]
                            },
                        ],
                        contentActive:0
                    },
                    {
                        title:'行为配置',
                        content:[
                            {rule:'',nextNode:{}},
                            {rule:'',nextNode:{}}
                        ]
                    }
                ],
                tabActive:1,

                searchTableData:'',
                defaultProps: {
                    children: 'field',
                    label: 'text'
                },

                permissionTabActive:0,
            }
        },
        watch: {
            searchTableData(val) {
                console.log(val)
                this.$refs.tree.filter(val);
            }
        },
        methods:{
            delItem(){
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem(){
                const item = this.graph.findById(this.graph_id)
                let  model =  item._cfg.model
                model.label = this.graph_lable
                this.graph.updateItem(item, model)
            },
            checkItem(_index){
                console.log(_index);
                this.itemListL[_index].model.id = G6.Util.uniqueId()
                let model = JSON.parse(JSON.stringify(this.itemListL[_index].model))

                this.graph.addItem('node',model)
            },

            searchtable(){

            },
            filterNode(value, data) {
                console.log('111')
                console.log(value)
                console.log(data)
                if (!value) return true;
                return data.text.indexOf(value) !== -1;
            },

            saveBtn(){
                console.log(this.nodeData)
                console.log(this.graph)
            }
        },
        mounted(){

            let  _this = this
            console.log( document.body.clientWidth)
            G6.registerNode('diamond',{
                draw(cfg, group) {
                    const size = cfg.size || [60, 60]; // 如果没有 size 时的默认大小
                    const width = size[0];
                    const height = size[1];
                    console.log('222222')
                    console.log(cfg)
                    const shape = group.addShape('path', {
                        attrs: {
                            //  / 1 \
                            // 4     2
                            //  \ 3 /
                            // path中的M、L等是SVG中的概念
                            path: [
                                ['M', 0, 0 - height / 2], // 上部顶点
                                ['L', width / 2, 0], // 右侧点
                                ['L', 0, height / 2], // 下部
                                ['L', - width / 2, 0], // 左侧
                                ['Z'] // 封闭
                            ],

                            getAnchorPoints() {
                                return  [
                                    [0, 0, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                                    [0.5, 0, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                                    [1, 0, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                                    [1, 1, {type: 'circle', style: {stroke: 'red', fill: 'white'}}],
                                ]
                            },

                            stroke:'#5cdbd3',   // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
                            fill:'#e8fffb',
                            radius: 5 ,
                        }
                    });
                    if(cfg.label) { // 如果有文本
                        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                        // style.text = cfg.label;
                        group.addShape('text', {
                            // attrs: style
                            attrs: {
                                x: 0, // 居中
                                y: 0,
                                textAlign: 'center',
                                textBaseline: 'middle',
                                text: cfg.label,
                                fill: '#666'
                            }
                        });
                    }
                    return shape;
                }
            })
            G6.registerBehavior('click-add-edge', {
                getEvents() {
                    return {
                        'node:click': 'onClick' ,
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick' // 点击空白处，取消边
                    };
                },
                onClick(ev) {
                    const node = ev.item;
                    const graph = this.graph;
                    const point = {x: ev.x, y: ev.y};
                    const model = node.getModel();
                    if (this.addingEdge && this.edge) {
                        graph.updateItem(this.edge, {
                            target: model.id
                        });

                        this.edge = null;
                        this.addingEdge = false;
                    } else {
                        this.edge = graph.addItem('edge', {
                            source: model.id,
                            target: point
                        });
                        this.addingEdge = true;
                    }


                },
                onMousemove(ev) {
                    const point = {x: ev.x, y: ev.y};
                    if (this.addingEdge && this.edge) {
                        this.graph.updateItem(this.edge, {
                            target: point
                        });
                    }
                },
                onEdgeClick(ev) {
                    const currentEdge = ev.item
                    // 拖拽过程中，点击会点击到新增的边上
                    if (this.addingEdge && this.edge == currentEdge) {
                        this.graph.removeItem(this.edge)
                        this.edge = null
                        this.addingEdge = false
                    }
                }
            })
            G6.registerBehavior('activate-node', {
                getDefaultCfg() {
                    return {
                        multiple: true
                    };
                },
                getEvents() {
                    return {
                        'node:click': 'onNodeClick',
                        'canvas:click': 'onCanvasClick'
                    };
                },
                onNodeClick(e) {
                    const graph = this.graph;
                    const item = e.item;
                    console.log('1111')
                    if (item.hasState('active')) {
                        graph.setItemState(item, 'active', false);
                        return;
                    }
                    // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
                    if (!this.multiple) {
                        this.removeNodesState();
                    }
                    // 置点击的节点状态为active
                    _this.graph_id = item._cfg.id;
                    _this.graph_lable = item._cfg.model.label;
                    _this.graph_type = item._cfg.type;
                    graph.setItemState(item, 'active', true);
                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    console.log('2223333')

                    if (this.shouldUpdate(e)) {
                        this.removeNodesState();
                    }
                },
                removeNodesState() {
                    _this.graph_id ='';
                    _this.graph_lable = '';
                    _this.graph_type = '';
                    _this.graph.findAllByState('active').forEach(node => {
                        this.graph.setItemState(node, 'active', false);
                    });
                }
            })

            const graph = new G6.Graph({
                container: 'canvasBox',
                width:  document.body.clientWidth-540,
                height:  document.body.clientHeight-140,
                modes: {
                    default: ['click-add-node', 'click-select','click-add-edge','drag-node','activate-node'],        //'click-add-edge' 新增先的behiver
                },
                defaultEdge: {
                    shape: 'quadratic',
                    size: 1,
                    endArrow: true
                },
                edgeStyle: {
                    default: {
                        stroke: '#aaa',
                        endArrow: true
                    }
                },
            });

            graph.data(this.nodeData)
            graph.render()
            graph.setMode('default')

            this.graph = graph


        }
    }
</script>

<style scoped lang="scss">
    .header-box{
        background: beige;
    }
    .footer{
        background: beige;
    }
    .main-box{
        padding: 0;
        width: auto;
        height: 100%;
    }
    .info-box{
        float: right;
        width: 300px;
        height: 100%;
        background: #fafafa;
        border-left:1px solid #e8e8e8 ;
    }
    .center-box{
        float: left;
        width: auto;
    }
    .item-box{
        background: #fafafa;
        border-right:1px solid #e8e8e8 ;
    }


    .nav-box{
        margin-top: 20px;
        text-align: center;
        width: auto;
    }

    /*右侧内容样式*/
    .tab-box{
        width: 100%;
        height: 400px;
    }
    .show-box{
        width: 100%;
        height: 200px;
        border-top: 1px solid #e8e8e8;
        padding: 10px 0;
    }

    /** 右侧tab样式*/
    .tab-title{
        float: left;
        width: 30px;
        height:400px;
        border-right: 1px solid #e8e8e8;
    }
    .tab-item{
        float: left;
        width: 265px;
        height: 400px;
    }
    .tab-item-title{
        width: 30px;
        text-align: center;
        font-size: 16px;
        color: #666;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 1px solid #e8e8e8;
        transition: all .8s;
    }
    .tab-active{
        background: #409eff;
        color: #fff;
    }
    .tab-item-content{
        width: auto;
        height: 300px;
       overflow-y: auto;
    }
    .search-box{
        width: auto;
        height: 50px;
        line-height: 50px;

    }
    .check-btn{
        width: auto;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .permission-list{
        width: auto;
        padding: 5px;
        background: #fff;
        margin-top: 2px;
        cursor: pointer;
    }
    .permission-list:hover{
        background: #cbe2fa;
    }
    .permission-list:active{
        background: #cbe2fa;
    }
    .permission-list-active{
        background:#cbe2fa
    }



</style>
