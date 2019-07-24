<template>
	<div>

		<div class="tab-box">

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
</template>

<script>

	export default {
		name: "FlowNodePanel",
		props: ['graph_id', 'graph_lable', 'graph_type'],
		components: {
		},
		methods: {
		},
		data() {
			return {
			}
		}
	}
</script>

<style scoped>
	/** 右侧tab样式*/

	.tab-title {
		float: left;
		width: 30px;
		height: 400px;
		border-right: 1px solid #e8e8e8;
	}

	.tab-active {
		background: #409eff;
		color: #fff;
	}

	.tab-item {
		float: left;
		width: 265px;
		height: 400px;
	}

	.tab-item-title {
		width: 30px;
		text-align: center;
		font-size: 16px;
		color: #666;
		padding: 10px 0;
		width: auto;
		height: 300px;
		overflow-y: auto;
	}

	.search-box {
		width: auto;
		height: 50px;
		cursor: pointer;
		border-bottom: 1px solid #e8e8e8;
		transition: all .8s;
	}

	.tab-item-content {
		line-height: 50px;

	}

	.check-btn {
		width: auto;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

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
