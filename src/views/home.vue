<template>
	<div class="box">
		<video autoplay loop id="bgvid" muted>
			<source src="http://datavision.oss-cn-hangzhou.aliyuncs.com/bg.mp4" type="video/mp4">
		</video>
		<div id="polina">
			<h1 style="text-align: center">让数据栩栩如生</h1>
			<p style="text-align: center;margin-top: 20px">致力于表单引擎与数据可视化分析引擎</p>
			<div style="margin-top: 60px;width: 100%;height: 60px;text-align: center;position:relative;background: none">
				<router-link to="/formDesign">
					<button class="btn" style="left: 50%;position: absolute;margin-left: -210px">表单引擎</button>
				</router-link>
				<router-link to="/g6Editor">
					<button class="btn" style="margin-left: 50%;position: absolute;left: -60px;">流程图引擎</button>
				</router-link>

				<router-link to="/formDesign">
					<button class="btn" style="position:absolute;margin-left: 50%;left: 100px;">数据可视化</button>
				</router-link>

				<router-link to="/flowDesign">
					<button class="btn" style="margin-left: 50%;position: absolute;left: 260px;">流程图引擎2</button>
				</router-link>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "home"
	}
</script>

<style scoped lang="scss">
	body {
		margin: 0;
		background: transparent;
	}

	video {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		z-index: -100;
		background-size: cover;
	}

	.box {
		font-family: Agenda-Light, Agenda Light, Agenda, Arial Narrow, sans-serif;
		font-weight: 100;
		background: rgba(0, 0, 0, 0.3);
		color: white;
		width: 100%;
		height: 100%;
		float: right;
		font-size: 1.2rem;
	}

	h1 {
		font-size: 3rem;
		text-transform: uppercase;
		margin-top: 0;
		letter-spacing: .3rem;
	}

	a {
		display: inline-block;
		color: #fff;
		text-decoration: none;
		background: rgba(0, 0, 0, 0.5);
		padding: .5rem;
		transition: .6s background;
	}

	a:hover {
		background: rgba(0, 0, 0, 0.9);
	}

	@media screen and (max-width: 500px) {
		div {
			width: 70%;
		}
	}

	@media screen and (max-device-width: 800px) {
		#bgvid {
			display: none;
		}
	}

	#polina {
		width: 100%;
		margin-top: 20%;
	}

	.btn {
		float: left;
		border: none;
		outline: none;
		color: #fff;
		padding: 8px 26px;
		font-size: 14px;
		background: linear-gradient(-135deg, #935EFF, #625EFF);
		border-radius: 4px;
		cursor: pointer;

	}
</style>
