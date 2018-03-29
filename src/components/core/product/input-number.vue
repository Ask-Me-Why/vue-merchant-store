<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-input-number{
		@include flexLayout(inline-flex,normal,center);
		.ask-inreduce{
			width: 22px;
			height: 22px;
			border: 1px solid map-get($color,1002);
			border-radius: 100%;
			position: relative;
			z-index: 2;
			&::after{
				content:'';
				display:block;
				width: 40%;
				height: 2px; 
				background: map-get($color,1002);
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -1px;
				margin-left: -20%;
				z-index: 1;
				pointer-events: none;
			}
		}
		.ask-ininput{
			padding: 4px 6px;
			font-size: 12px;
			line-height: 1;
			color: map-get($color,300);
			white-space: nowrap;
		}
		.ask-inadd{
			line-height: 1.1;
			font-size: 22px;
			width: 24px;
			text-align: center;
			height: 24px;
			color: map-get($color,1002);
			font-style:normal;
			overflow: hidden;
			&.disabled{
				color: map-get($color,300S1);
			}
			.iconfont{
				font: inherit;
				color: inherit;
				pointer-events: none;
			}
		}
	}
	.islide-enter-active{
		transition: opacity .3s linear,transform .3s cubic-bezier(.18,.89,.32,1.27);
	}
	.islide-leave-active{
		transition: opacity .3s linear,transform .3s ease-out;
	}
	.islide-enter{
		opacity: 0;
		transform: translate3d(12px,0,0);
	}
	.islide-leave-to{
		opacity: 0;
		transform: translate3d(-4px,0,0);
	}

	.ifade-enter-active{
		transition: opacity .3s linear,transform .3s cubic-bezier(.18,.89,.32,1.27);
	}
	.ifade-leave-active{
		transition: opacity .3s linear,transform .3s ease-out;
	}
	.ifade-enter,
	.ifade-leave-to{
		opacity: 0;
		transform: scale(.5);
	}
	
</style>
<template>
	<div class="ask-input-number">
		<transition name="islide">
			<div class="ask-inreduce" @click="reduce" v-show="cartInfo.count > 0"></div>
		</transition>
		<transition name="ifade">
			<div class="ask-ininput" v-show="cartInfo.count > 0">
				{{cartInfo.count}}
			</div>
		</transition>
		<div class="ask-inadd" @click="add" :class="{'disabled': cartInfo.store_nums <= 0 || cartInfo.count == cartInfo.store_nums}"> 
			<i class="iconfont icon-tianjiagouwuche"></i>
		</div>
	</div>
</template>
<script>
	import channel from '@/components/channel.js';
	import {askDialogToast} from '@/utils';
	export default{
		name:"InputNumber",
		props:{
			product: "",
			cartAnimation: {
				default: true,
				type: Boolean
			}
		},
		computed:{
			cartInfo(){
				return this.$store.getters['cartModule/getCartById'](this.product);
			}
		},
		methods:{
			add(){
				if(this.cartInfo.store_nums <= 0 || this.cartInfo.count == this.cartInfo.store_nums) return;
				this.$store.dispatch('cartModule/joinCart',this.cartInfo);
				if(this.cartAnimation) {
					channel.$emit('JoinCartAnimation', this.$el.querySelector('.ask-inadd'),this.cartInfo.pic);
				}
			},
			reduce(){
				this.$store.dispatch('cartModule/removeCart',this.cartInfo.id);
			}
		}
	}
</script>