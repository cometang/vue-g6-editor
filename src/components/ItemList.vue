<template>
    <div>
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
    </div>
</template>

<script>
    export default {
        name: "ItemList",

        mounted(){

        }
    }
</script>

<style scoped>

</style>
