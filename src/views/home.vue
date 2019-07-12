<template>
    <div>
        <div id="mountNode"></div>

    </div>
</template>

<script>

    export default {
        name: "home",
        data(){
            return{

            }
        },
        mounted(){
            const data = {
                nodes: [{
                    id: 'node1',
                    x: 100,
                    y: 200
                },{
                    id: 'node2',
                    x: 300,
                    y: 200
                }],
                edges: [{
                    source: 'node1',
                    target: 'node2'
                }]
            };
            const graph = new this.G6.Graph({
                container: 'mountNode',
                width: 500,
                height: 500
            });
            graph.data(data);
            graph.render();
        }
    }
</script>

<style scoped lang="scss">

</style>
