<template>
	<div>


			<!-- 面板左侧导航菜单 -->
			<div class="tab-title">

				<div :class="tabActive==index?'tab-item-title tab-active':'tab-item-title'"
					 v-for="(item,index) in tabList" :key="index"
				 	 @click="onTabItemChange(index)">
					{{item.title}}
				</div>
			</div>

			<div class="tab-item">
				<!--资源配置右侧-->
				<div v-if="tabActive == 0">
					<flow-panel-node-res :content="tabList[tabActive].content"></flow-panel-node-res>
				</div>
				<!--权限配置右侧-->
				<div v-if="tabActive == 1">
					<flow-panel-node-auth :content="tabList[tabActive].content"></flow-panel-node-auth>
				</div>
				<!--行为配置-->
				<div v-if="tabActive ==2">
					<flow-panel-node-action></flow-panel-node-action>
				</div>

			</div>
		</div>


</template>

<script>
	import FlowPanelNodeRes from './flowPanelNodeChilds/FlowPanelNodeRes'
	import FlowPanelNodeAuth from './flowPanelNodeChilds/FlowPanelNodeAuth'
	import FlowPanelNodeAction from './flowPanelNodeChilds/FlowPanelNodeAction'

	export default {
		name: "FlowNodePanel",
		data(){
			return{
				tabList: [{
					title: '资源配置',
					content: [{
						text: '资产数据表',
						field: [{
							key: 'id',
							text: '序号'
						}, {
							key: 'name',
							text: '资产名'
						}, {
							key: 'address',
							text: '资产地址'
						}, {
							key: 'val',
							text: '资产价值'
						}, {
							key: 'num',
							text: '资产数量'
						}, ]
					},
						{
							text: '公共设备表',
							field: [{
								key: 'id',
								text: '序号'
							}, {
								key: 'name',
								text: '设备名'
							}, {
								key: 'address',
								text: '设备地址'
							}, {
								key: 'val',
								text: '设备价值'
							}, {
								key: 'num',
								text: '设备数量'
							}, ]
						},
						{
							text: '财务分析表',
							field: [{
								key: 'id',
								text: '序号'
							}, {
								key: 'year',
								text: '分析年份'
							}, {
								key: 'sum',
								text: '总交易金额'
							}, {
								key: 'profit',
								text: '总利润'
							}]
						},
						{
							text: '项目统计表',
							field: [{
								key: 'id',
								text: '序号'
							}, {
								key: 'name',
								text: '项目名称'
							}, {
								key: 'date',
								text: '项目申报年份'
							}, {
								key: 'profit',
								text: '项目目前利润'
							}, {
								key: 'amount ',
								text: '申报金额'
							}, {
								key: ' delivery',
								text: '交付金额'
							}]
						},
					],
					contentActive: 0
				},
					{
						title: '权限配置',
						content: [{
							type: '0',
							title: '部门权限',
							list: [{
								id: '12',
								name: '财政局'
							}, {
								id: '13',
								name: '农业农村局'
							}, {
								id: '14',
								name: '国土资源局'
							}, {
								id: '121',
								name: '财政局1'
							}, {
								id: '131',
								name: '农业农村局1'
							}, {
								id: '141',
								name: '国土资源局1'
							}]
						},
							{
								type: '1',
								title: '角色权限',
								list: [{
									id: '102',
									name: '超级管理员'
								}, {
									id: '103',
									name: '管理用户'
								}, {
									id: '104',
									name: '局级干部'
								}, {
									id: '101',
									name: '科级干部'
								}, {
									id: '111',
									name: '普通科员'
								}, {
									id: '122',
									name: '项目申报人'
								}]
							},
							{
								type: '2',
								title: '用户权限',
								list: [{
									id: '102',
									name: '李宁'
								}, {
									id: '103',
									name: '张三'
								}, {
									id: '104',
									name: '六五'
								}, {
									id: '101',
									name: '李四'
								}, {
									id: '111',
									name: '王五'
								}, {
									id: '122',
									name: '陈是'
								}, {
									id: '141',
									name: '照照'
								}, {
									id: '141',
									name: '刘德'
								}, {
									id: '146',
									name: '陈武'
								}]
							},
						],
						contentActive: 0
					},
					{
						title: '行为配置',
						content: [{
							rule: '',
							nextNode: {}
						},
							{
								rule: '',
								nextNode: {}
							}
						]
					}
				],
				tabActive: 0,

				defaultProps: {
					children: 'field',
					label: 'text'
				},

				permissionTabActive: 0,
			}
		},
		components: {
			FlowPanelNodeRes,
			FlowPanelNodeAuth,
			FlowPanelNodeAction,
		},
		methods: {
			onTabItemChange(index) {
				this.tabActive = index;
			},
			delItem() {
				const item = this.graph.findById(this.graph_id)
				this.graph.removeItem(item)
			},
			changeItem() {
				const item = this.graph.findById(this.graph_id)
				let model = item._cfg.model
				model.label = this.graph_lable
				this.graph.updateItem(item, model)
			},
		},

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
		background: #fff;
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






</style>
