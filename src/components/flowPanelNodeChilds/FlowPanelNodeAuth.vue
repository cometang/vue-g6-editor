<template>
	<div>
		<el-tabs v-model="permissionTabActive">

			<el-tab-pane :label="item.title" :key="index" v-for="(item,index) in content" @click="permissionTabActive = index">

				<div class="permission-list" v-for="(item1,index1) in item.list" :key="index1">
					{{item1.name}}
				</div>

			</el-tab-pane>

		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: "FlowPanelNodeAuth",
		data(){
			return{
				permissionTabActive: 0,
			}
		},
		props: {
			content:Array
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.permission-list {
		width: auto;
		padding: 5px;
		background: #fff;
		margin-top: 2px;
		cursor: pointer;
	}

	.permission-list:hover {
		background: #cbe2fa;
	}

	.permission-list:active {
		background: #cbe2fa;
	}

	.permission-list-active {
		background: #cbe2fa
	}
</style>
