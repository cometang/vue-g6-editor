<template>
	<div>
		<div id="canvasBox" ref="canvasBox"></div>
	</div>
</template>

<script>
	import G6 from '@antv/g6';
	export default {
		name: "FlowEditor",
		data(){
			return{
				nodeData: {
					nodes: [{
						id: 'node1',
						label: 'node1',
						x: 100,
						y: 200,
						anchorPoints: [
							[0, 1],
							[0.5, 1]
						],
						shape: 'rect'
					}, ],
					edges: []
				},
			}
		},
		mounted() {
			let _this = this
			G6.registerNode('diamond', {
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
								['L', -width / 2, 0], // 左侧
								['Z'] // 封闭
							],

							getAnchorPoints() {
								return [
									[0, 0, {
										type: 'circle',
										style: {
											stroke: 'red',
											fill: 'white'
										}
									}],
									[0.5, 0, {
										type: 'circle',
										style: {
											stroke: 'red',
											fill: 'white'
										}
									}],
									[1, 0, {
										type: 'circle',
										style: {
											stroke: 'red',
											fill: 'white'
										}
									}],
									[1, 1, {
										type: 'circle',
										style: {
											stroke: 'red',
											fill: 'white'
										}
									}],
								]
							},

							stroke: '#5cdbd3', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
							fill: '#e8fffb',
							radius: 5,
						}
					});
					if (cfg.label) { // 如果有文本
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
						'node:click': 'onClick',
						mousemove: 'onMousemove',
						'edge:click': 'onEdgeClick' // 点击空白处，取消边
					};
				},
				onClick(ev) {
					const node = ev.item;
					const graph = _this.$store.state.flowData.graph
					const point = {
						x: ev.x,
						y: ev.y
					};
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
					const point = {
						x: ev.x,
						y: ev.y
					};
					if (this.addingEdge && this.edge) {
						_this.$store.state.flowData.graph.updateItem(this.edge, {
							target: point
						});
					}
				},
				onEdgeClick(ev) {
					const currentEdge = ev.item
					// 拖拽过程中，点击会点击到新增的边上
					if (this.addingEdge && this.edge == currentEdge) {
						_this.$store.state.flowData.graph.removeItem(this.edge)
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
					const graph = _this.$store.state.flowData.graph;
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
					_this.$store.state.flowData.graphActive.graphId = item._cfg.id;
					_this.$store.state.flowData.graphActive.graphLabel = item._cfg.model.label;
					_this.$store.state.flowData.graphActive.graphType = item._cfg.type;
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
					_this.$store.state.flowData.graphActive.graphId = '';
					_this.$store.state.flowData.graphActive.graphLabel = '';
					_this.$store.state.flowData.graphActive.graphType = '';
					_this.$store.state.flowData.graph.findAllByState('active').forEach(node => {
						_this.$store.state.flowData.graph.setItemState(node, 'active', false);
					});
				}
			})

			const graph = new G6.Graph({
				container: 'canvasBox',
				width: document.body.clientWidth - 540,
				height: document.body.clientHeight - 140,
				modes: {
					default: ['click-add-node', 'click-select', 'click-add-edge', 'drag-node', 'activate-node'], //'click-add-edge' 新增先的behiver
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

			graph.data(this.nodeData)
			graph.render()
			graph.setMode('default')

			_this.$store.state.flowData.graph = graph

		}
	}
</script>

<style scoped>

</style>
