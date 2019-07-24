<template>
	<div style="height: 100%">
		<el-container style="height: 100%">
			<el-header class="header-box">Header</el-header>
			<el-container style="height: 100%;">
				<el-aside width="200px" class="item-box">
					<item-list></item-list>
				</el-aside>
				<el-container>
					<el-main class="main-box">
						<div class="center-box">
							<flow-editor></flow-editor>
						</div>

						<div class="info-box">
							<div class="tab-box">

							<flow-panel-node></flow-panel-node>
							</div>

							<div class="show-box">
								<flow-panel-node-value></flow-panel-node-value>
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


	import FlowEditor from '@/components/FlowEditor'
	import ItemList from  '@/components/ItemList'
	import FlowPanelNode from '@/components/FlowPanelNode'
	import FlowPanelNodeValue from '@/components/FlowPanelNodeValue'
	export default {
		name: "flowDesign",
		components: {
			FlowEditor,
			ItemList,
			FlowPanelNode,
			FlowPanelNodeValue
		},
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {}
	}
</script>

<style scoped lang="scss">
	.header-box {
		background: beige;
	}

	.footer {
		background: beige;
	}

	.main-box {
		padding: 0;
		width: auto;
		height: 100%;
	}

	.info-box {
		float: right;
		width: 300px;
		height: 100%;
		background: #fafafa;
		border-left: 1px solid #e8e8e8;
	}

	.center-box {
		float: left;
		width: auto;
	}

	.item-box {
		background: #fafafa;
		border-right: 1px solid #e8e8e8;
	}


	.nav-box {
		margin-top: 20px;
		text-align: center;
		width: auto;
	}

	/*右侧内容样式*/
	.tab-box {
		width: 100%;
		height: 400px;
	}

	.show-box {
		width: 100%;
		height: 200px;
		background: #fff;
		border-top: 1px solid #e8e8e8;
		padding: 10px 0;

	}

	/** 右侧tab样式*/
	.tab-title {
		float: left;
		width: 30px;
		height: 400px;
		border-right: 1px solid #e8e8e8;
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
		cursor: pointer;
		border-bottom: 1px solid #e8e8e8;
		transition: all .8s;
	}

	.tab-active {
		background: #409eff;
		color: #fff;
	}

	.tab-item-content {
		width: auto;
		height: 300px;
		overflow-y: auto;
	}

	.search-box {
		width: auto;
		height: 50px;
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
