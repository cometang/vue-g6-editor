<template>
    <div style="height: 100%">


        <div class="left-box">
            左侧操作区
        </div>
        <div class="right-box">
            <div class="nav-box">
                顶部区域
            </div>
            <div class="center-box">
                <div id="mountNode"></div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                graph:'',
            }
        },
        methods:{

            canvasEvent(){

            },

            /** 画图的svg方法*/




    },
        mounted(){
            this.G6.registerNode('diamond', {
                draw(cfg, group) {
                    if(cfg.color == undefined){
                        cfg.color = '#000'
                    }
                    const shape = group.addShape('path', {
                        attrs: {
                            path: this.getPath(cfg,group), // 因为增加了 update 所以要把共用方法提取出来
                            fill: cfg.color // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
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
                },
                getPath(cfg,group){
                    const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
                    const width = size[0];
                    const height = size[1];

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

                        }
                    });
                    return shape
                },


                update(cfg, node) {
                    console.log('1111112222')
                    const group = node.getContainer(); // 获取容器
                    const shape = group.get('children')[0]; // 按照添加的顺序
                    const style = {
                        path: this.getPath(),
                        stroke: cfg.color
                    };
                    shape.attr(style); // 更新属性
                    // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
                    // 通过 label.attr() 更新文本属性即可
                }



            });
            // this.G6.registerNode('inner-animate', {
            //     afterDraw(cfg, group) {
            //         const size = cfg.size;
            //         const width = size[0] - 14;
            //         const height = size[1] - 14;
            //         // 添加图片
            //         const image = group.addShape('image', {
            //             attrs: {
            //                 x: - width / 2,
            //                 y: - height / 2,
            //                 width: width,
            //                 height: height,
            //                 img: cfg.img
            //             }
            //         });
            //         // 执行旋转动画
            //         image.animate({
            //             onFrame(ratio) {
            //                 const matrix = Util.mat3.create();
            //                 const toMatrix = Util.transform(matrix, [
            //                     ['r', ratio * Math.PI * 2]
            //                 ]) ;
            //                 return {
            //                     matrix: toMatrix
            //                 };
            //             },
            //             repeat: true
            //         }, 3000, 'easeCubic');
            //     }
            // }, 'rect');
            this.G6.registerEdge('hvh', {
                draw(cfg, group) {
                    const startPoint = cfg.startPoint;
                    const endPoint = cfg.endPoint;
                    const shape = group.addShape('path', {
                        attrs: {
                            stroke: '#333',
                            path: [
                                ['M', startPoint.x, startPoint.y],
                                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y],
                                ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],
                                ['L', endPoint.x, endPoint.y]
                            ]
                        }
                    });
                    return shape;
                }
            });
            this.G6.registerEdge('line-growth', {
                afterDraw(cfg, group) {
                    const shape = group.get('children')[0];
                    const length = shape.getTotalLength();
                    shape.animate({
                        onFrame(ratio) {
                            const startLen = ratio * length;
                            const cfg = {
                                lineDash: [startLen, length - startLen]
                            };
                            return cfg;
                        },
                        repeat: true
                    }, 2000);
                },
                setState(name, value, item) {
                    const group = item.getContainer();
                    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
                    if(name === 'active') {
                        if(value) {
                            shape.attr('stroke', 'red');
                        } else {
                            shape.attr('stroke', '#333');
                        }
                    }
                    if (name === 'selected') {
                        if(value) {
                            shape.attr('lineWidth', 3);
                        } else {
                            shape.attr('lineWidth', 2);
                        }
                    }
                }
            }, 'cubic');

            const data = {
                nodes: [{
                    id: 'node1',
                    x: 100,
                    y: 200,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                },{
                    id: 'node2',
                    x: 200,
                    y: 100,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                },{
                    id: 'node3',
                    x: 200,
                    y: 300,
                    anchorPoints:[
                        [0, 0.5],  [1, 0.5]
                    ]
                }],
                edges: [{
                    id: 'edge1',
                    target: 'node2',
                    source: 'node1',
                    shape: 'line-growth'
                },{
                    id: 'edge2',
                    target: 'node3',
                    source: 'node1',
                    shape: 'line-growth'
                }]
            };




            const graph = new this.G6.Graph({
                container: 'mountNode',
                width: 800,
                height: 800,
                modes: {
                    default: ['click-select','drag-canvas', 'zoom-canvas',],
                    // edit: ['']
                }
            });

            graph.data(data);
            graph.render();



            // graph.on('click', ev => {
            //     const item = ev.item;
            //     console.log(item)
            //
            // })
            graph.on('node:click', ev => {
                const shape = ev.target;
                console.log(shape)
                const node = ev.item;
                let cfg = {x: 250, y: 100, color: '#ff6', shape: 'diamond'} // 添加颜色
                console.log(cfg)
                console.log(node)
                graph.update(cfg,node)

                console.log('111111')
            });

            graph.on('edge:mouseenter' ,ev=> {
                const edge = ev.item;
                graph.setItemState(edge, 'active', true);
            });

            graph.on('edge:mouseleave' , ev=> {
                const edge = ev.item;
                graph.setItemState(edge, 'active', false);
            });


        }
    }
</script>

<style scoped lang="scss">

    /** 顶部区域*/
    .nav-box{
        width: 100%;
        height: 60px;
        background: azure;
    }
    .left-box{
        float: left;
        width: 200px;
        height: 100%;
        background: azure;
    }
    .right-box{
        margin-left: 200px;
        width: auto;
        height: 100%;
    }
    .center-box{
        width: 100%;
        height:100%;

    }

</style>
