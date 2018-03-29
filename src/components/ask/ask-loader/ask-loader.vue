<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
$bg: rgba(0, 0, 0, 0);
.ask-loader-box {
	position: fixed;
	z-index: 300;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	width: 100vw;
	height: 100%;
	height: 100vh;
	/* pointer-events: none; */
	.ask-loader-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: $bg;
	}
	.ask-lodaer-body {
		position: absolute;
		z-index: 3;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		@include flexLayout(flex, center, center);
		.asb-circle {
			width: 60px;
			height: 60px;
			background: rgba(0, 0, 0, .6);
			border-radius: 4px;
			overflow: hidden;
			.asb-rotatebox {
				display: block;
				width: 100%;
				height: 100%;
				animation: ask-loader-rotate 2s linear infinite;
			}
			circle {
				stroke-dasharray: 125, 125;
				stroke-dashoffset: 0;
				animation: circle-dash 2s linear infinite;
				stroke: map-get($loader, 100S1);
			}
		}
	}
}

@keyframes circle-dash {
	0% {
		stroke-dasharray: 10, 125;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 120, 125;
		stroke-dashoffset: -25px;
	}
	100% {
		stroke-dasharray: 120, 125;
		stroke-dashoffset: -125px;
	}
}

@keyframes ask-loader-rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

</style>
<template>
	<div class="ask-loader-box" v-if="show">
		<div class="ask-loader-overlay"></div>
		<div class="ask-lodaer-body">
			<div class="asb-circle">
				<div class="asb-rotatebox">
					<svg class="asb-circular" viewBox="0 0 50 50">
						<circle cx="25" cy="25" r="18" fill="none" stroke="#106CFA" stroke-width="6%" />
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "askLoader",
	props: ["show"],
	mounted() {
		this.$nextTick(() => {
			document.body.appendChild(this.$el);
		})
	}
}

</script>
