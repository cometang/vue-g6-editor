<template>
    <div style="height: 100%;overflow: hidden">
        <el-container style="height: 100%">
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="300px" style="border:1px solid #eee;">
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
                    <!--<el-button type="primary" @click="addBtn">新增节点</el-button>-->
                </el-aside>
                <el-container>
                    <el-main style="border: 1px solid #eee;border-radius: 5px">
                        <div class="center-box">

                            <div id="mountNode"></div>



                        </div>
                        <div class="right-box">
                            <el-form ref="form" label-width="80px">

                                <el-form-item label="节点/边 文本内容">
                                    <el-input v-model="graph_lable"></el-input>
                                </el-form-item>
                            </el-form>

                            <el-button type="primary" @click="changeItem">确认修改</el-button>
                            <el-button type="danger" style="margin-left: 15px" @click="delItem">删除选中</el-button>
                        </div>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>

    </div>

</template>

<script>
    import G6 from '@antv/g6';
    export default {
        name: "test1",

        data(){
            return{
                graph:'',
                graph_id:'',
                graph_lable:'',
                graph_type:'',



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
                ]
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
            }
        },
        mounted(){
            //画图 菱形
           let  _this = this

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
                        graph.removeItem(this.edge)
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



            const data = {
                nodes: [],

                edges: []
            }

            const graph = new G6.Graph({
                container: 'mountNode',
                width: 800,
                height: 800,
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

            graph.data(data)
            graph.render()
            graph.setMode('default')

            this.graph = graph

            // graph.addShape('path', {
            //     attrs: {
            //         startArrow: {
            //             path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            //             d: 10
            //         },
            //         endArrow: {
            //             path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            //             d: 10
            //         },
            //         path: [
            //             [ 'M', 100, 100 ],
            //             [ 'L', 200, 200 ]
            //         ],
            //         stroke: '#000',
            //         lineWidth: 8
            //     }
            // });


            // graph.on('canvas:click', ev => {
            //     console.log(ev)
            //     console.log('2222')
            //     const shape = this.shape
            //
            // });
            // graph.on('node:click', ev => {
            //     console.log(ev)
            //     console.log('2222')
            //     const shape = ev.target;
            //     const node = ev.item;
            //
            //     if (node.hasState('active')) {
            //         graph.setItemState(node, 'active', false);
            //         return;
            //     }
            //     // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
            //     if (!this.multiple) {
            //         this.removeNodesState();
            //     }
            //     // 置点击的节点状态为active
            //     graph.setItemState(node, 'active', true);
            //
            //
            //
            //     this.graph_id = node._cfg.id;
            //     this.graph_lable = node._cfg.model.label;
            //     this.graph_type = node._cfg.type;
            //     console.log(node._cfg.id)
            // });
            //
            // graph.on('edge:click', ev => {
            //     const shape = ev.target;
            //     const node = ev.item;
            //     this.graph_id = node._cfg.id;
            //     this.graph_lable = node._cfg.model.label;
            //     this.graph_type = node._cfg.type;
            //
            // });



        }
    }
</script>

<style scoped lang="scss">
    .center-box{
        float: left;
        width:70%;
        height: 100%;
    }
    .right-box{
        float: left;
        width: 20%;
        height: 100%;
        background: #fff;
        border-left: 1px solid #eee;
    }
    #mountNode{
        width: 100%;
        height: 100%;
    }
    .nav-box{
        margin-top: 20px;
        text-align: center;
        width: auto;
    }
</style>
