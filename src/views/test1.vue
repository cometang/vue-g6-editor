<template>
    <div style="height: 100%;overflow: hidden">
        <el-container style="height: 100%">
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="300px" style="border:1px solid #eee;">
                    <el-button type="primary" @click="addBtn">新增节点</el-button>

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

        <div id="mountNode"></div>
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

            }
        },
        methods:{
            addBtn(){
                let model ={
                    id:G6.Util.uniqueId(),
                    x: 500,
                    y: 200,
                    label: '文本内容',
                }
                this.graph.addItem('node',model)

            },
            delItem(){
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem(){

                const item = this.graph.findById(this.graph_id)

                let  model =  item._cfg.model
                model.label = this.graph_lable


                this.graph.updateItem(item, model)
            }
        },
        mounted(){
            console.log(G6.Util.uniqueId())

            // G6.registerNode('round-rect', {
            //     draw(cfg, group) {
            //         const size = cfg.size || [80,40]; // 如果没有 size 时的默认大小
            //         const width = size[0];
            //         const height = size[1];
            //         const shape = group.addShape('path', {
            //             attrs: {
            //                 //  / 1 \
            //                 // 4     2
            //                 //  \ 3 /
            //                 // path中的M、L等是SVG中的概念
            //                 path: [
            //                     ['x', 50], // 上部顶点
            //                     ['y', 20], // 右侧点
            //                     ['rx',20], // 下部
            //                     ['ry', 20], // 左侧
            //                 ],
            //                 stroke: cfg.color // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
            //             }
            //         });
            //         if(cfg.label) { // 如果有文本
            //             // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            //             // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            //             // style.text = cfg.label;
            //             group.addShape('text', {
            //                 // attrs: style
            //                 attrs: {
            //                     x: 0, // 居中
            //                     y: 0,
            //                     textAlign: 'center',
            //                     textBaseline: 'middle',
            //                     text: cfg.label,
            //                     fill: '#666'
            //                 }
            //             });
            //         }
            //         return shape;
            //     }
            // })


            // G6.registerBehavior('click-add-node', {
            //     getEvents() {
            //         return {
            //             'canvas:click': 'onClick'
            //         };
            //     },
            //     onClick(ev) {
            //         console.log(ev)
            //         const graph = this.graph;
            //         const node = graph.addItem('node', {
            //             x: ev.x,
            //             y: ev.y,
            //             id: G6.Util.uniqueId()
            //         });
            //
            //
            //     }
            // });


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
            });

            const data = {
                nodes: [{
                    id: 'node1',
                    x: 100,
                    y: 200,
                    label: '节点1',
                },{
                    id: 'node2',
                    x: 300,
                    y: 200,
                    label: '节点2',
                },{
                    id: 'node3',
                    x: 300,
                    y: 300
                }],
                edges: [{
                    id: 'edge1',
                    target: 'node2',
                    source: 'node1'
                }]
            };

            const graph = new G6.Graph({
                container: 'mountNode',
                width: 1000,
                height: 1000,
                modes: {
                    default: ['click-add-node', 'click-select','click-add-edge','drag-node', 'click-select'],        //'click-add-edge' 新增先的behiver
                },
                edgeStyle: {
                    default: {
                        stroke: '#f44'
                    }
                },
            });

            graph.data(data);
            graph.render();
            graph.setMode('default')

            this.graph = graph


            graph.on('node:click', ev => {

                const shape = ev.target;
                const node = ev.item;
                this.graph_id = node._cfg.id;
                console.log(node._cfg.model.label)
                this.graph_lable = node._cfg.model.label;
                this.graph_type = node._cfg.type;

            });
            graph.on('edge:click', ev => {

                const shape = ev.target;
                const node = ev.item;
                console.log(node._cfg)
                this.graph_id = node._cfg.id;
                this.graph_lable = node._cfg.model.label;
                this.graph_type = node._cfg.type;


            });



        }
    }
</script>

<style scoped lang="scss">
    .center-box{
        float: left;
        width: 70%;

        height: 100%;
    }
    .right-box{
        float: left;
        width: 25%;
        height: 100%;
        background: #fff;
        border-left: 1px solid #eee;
    }
    #mountNode{
        width: 100%;
        height: 100%;
    }
</style>
