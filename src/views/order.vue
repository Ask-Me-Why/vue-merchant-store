<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ms-order-nav{
		width: 100%;
		// padding: 3.2% 0;
		@include flexLayout(flex,justify,center);
		background: map-get($color,200);
		border-bottom: 1px solid map-get($color,400S1);
		height: 54px;
		.ms-ononce{
			flex: 0 0 50%;
			width: 50%;
			text-align: center;
			color: map-get($color,300);
			font-size: 16px;
			line-height: 1.8;
			white-space: nowrap;
			&+.ms-ononce{
				border-left: 1px solid map-get($color,400S1);
			}
			&.active{
				color: map-get($color,1002);
				transition: color .3s linear;
			}
		}
	}

	.ms-order-body{
		width: 100%;
		height: calc(100% - 54px);
		position: relative;
	}
	@media only screen and (max-width: 350px) {
		.ms-order-nav{
			height: 50px;
		}
		.ms-order-body{
			height: calc(100% - 50px);
		}
	}
</style>
<template>
	<div class="ask-view" v-nav="$route.meta">
		<div class="ask-view-box">
			<div class="ms-order-nav" ref="navEl">
				<div class="ms-ononce" @click="onClick(0)" :class="{active: currentActive == 0}">
					待付款
				</div>
				<div class="ms-ononce" @click="onClick(1)" :class="{active: currentActive == 1}">
					已支付
				</div>
			</div>
			<ask-swiper class="ms-order-body" :options="swoptions">
				<ask-slide>
					<order-group 
						:show = "currentActive == 0"
						:type = "1"
					></order-group>
				</ask-slide>
				<ask-slide>
					<order-group 
						:show = "currentActive == 1"
						:type = "2"
					></order-group>
				</ask-slide>
			</ask-swiper>
		</div>
	</div>
</template>
<script >
import { merge } from '@/utils'
import OrderGroup from '@core/order/order-group.vue';
	export default{
		name: "Order",
		components:{
			'order-group': OrderGroup
		},
		data(){
			return{
				defaultActive: 0,
				swiper: null
			}
		},
		computed:{
			currentActive(){
				return this.defaultActive;
			},
			swoptions(){
				let self = this;
				return {
					initialSlide: this.defaultActive,
					on:{
						init:function(){
							self.defaultActive = this.activeIndex;
							self.swiper = this;
						},
						slideChangeTransitionStart:function(){
							self.defaultActive = this.activeIndex;
							self.swiper = this;
						}
					}
				}
			}
		},
		mounted(){
			if(this.$route.params.type == 0 || this.$route.params.type == 1){
				this.defaultActive = this.$route.params.type;
			}
		},
		methods:{
			onClick(index){
				this.defaultActive = index;
				this.swiper&&this.swiper.slideTo(this.defaultActive);
			}
		}
	}
</script>