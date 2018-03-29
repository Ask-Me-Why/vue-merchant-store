<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ms-order-success{
		width:100%;
		padding: 21.6% 0 0;
		.ms-os-icon{
			width: 100%;
			text-align: center;
			font-size: 66px;
			line-height: 1;
			color: map-get($color,800);
			overflow: hidden;
			.iconfont{
				font: inherit;
				color: inherit;
			}
		}
		.ms-os-text{
			width: 100%;
			text-align: center;
			font-size: 16px;
			line-height: 1.8;
			color: map-get($color,300); 
		}
		.ms-os-btn{
			width: 100%;
			text-align:center;
			padding: 8% 0 0;
			.ask-button{
				width: 81.6%;
				text-align: center;
				color: map-get($color,200);
				background: map-get($color,100);
			}
		}
	}
</style>
<template>
	<div class="ask-view" v-nav="nav_meta">
		<div class="ask-view-box">
			<div class="ms-order-success">
				<div class="ms-os-icon">
					<i class="iconfont icon-chenggong"></i>
				</div>
				<div class="ms-os-text">交易成功!</div>
				<div class="ms-os-btn">
					<ask-button @click.native="onClick">确认</ask-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script >
import { merge } from '@/utils'
	export default{
		name: "OrderSuccess",
		components:{
		},
		computed:{
			nav_meta(){
				var _obj = {};
				_obj['onBack'] = this.onClick;
				return merge(true,this.$route.meta,_obj);
			}
		},
		data(){
			return{
			}
		},
		mounted(){
		},
		methods:{
			onClick(){
				this.$router.go(-2);
			}
		}
	}
</script>