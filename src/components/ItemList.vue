<template>
    <div>

        <div class="nav-box"
             v-for="(item,index) in itemList" :key="index"
             @click="checkItem(index)">
            <img
                    draggable="false"
                    :src="item.src"
                    class="getItem"
                    :label="item.label"
            >
        </div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    export default {
        name: "ItemList",
        data(){
            return{
                itemList: [{
                    type: 'node',
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg',
                    label: '起止节点',
                    model: {
                        id: '',
                        x: 300,
                        y: 200,
                        size: 60,
                        label: '起止节点',
                        shape: 'circle',
                        style: {
                            stroke: '#ffc069',
                            fill: '#fff3ea'
                        }
                    }
                },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg',
                        label: '常规节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '常规节点',
                            shape: 'rect',
                            style: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
                                radius: 5,
                            }
                        }
                    },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg',
                        label: '分叉节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [60, 60],
                            label: '分叉节点',
                            shape: 'diamond',
                        }
                    },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg',
                        label: '模型节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '模型节点',
                            shape: 'rect',
                            style: {
                                stroke: '#b37feb',
                                fill: '#f9f1ff',
                                radius: 18
                            }
                        }
                    },
                ],
            }
        },
        methods:{
            checkItem(_index){
                this.itemList[_index].model.id = G6.Util.uniqueId()
                let model = JSON.parse(JSON.stringify(this.itemList[_index].model))
                this.$store.state.flowData.graph.addItem('node', model)
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    .nav-box {
        margin-top: 20px;
        text-align: center;
        width: auto;
    }
</style>
