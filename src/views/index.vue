<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ms-header{
	background: no-repeat url($baseUrl+'ms_index.png') map-get($color,100);
	background-size: 100% 100%;
	background-position: 0 0 ;
	width: 100%;
	padding: 22.8% 0;
	position: relative;
	.ms-hinfo{
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		@include flexLayout(flex,center,center);
		.ms-hbox{
			width: 100%;
		}
		.ms-hicon{
			position: relative;
			width: 20.8%;
			margin: 0 auto 3.2%;
			padding: 10.4% 0;
			img{
				position: absolute;
				top:0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
			}
		}
		.ms-htext{
			text-align:center;
			width: 100%;
			@include textEllipsis(1);
			font-size: 14px;
			line-height: 1;
			color: map-get($color,200);
		}
	}
}
.ms-section{
	width: 100%;
	.ms-sgroup{
		width: 100%;
		@include flexLayout(flex,justify,center);
		padding: 3.2% 0 6.4%;
		background: map-get($color,200);
		border-bottom: 1px solid map-get($color,400);
	}
	.sg-item{
		flex: 0 0 50%;
		width: 50%;
		position: relative;
		.sg-icon{
			width: 44.8%;
			padding: 22.4% 0;
			position: relative;
			margin: 0 auto;
			img{
				position: absolute;
				top:0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
			}
		}
		.sg-text{
			font-size: 14px;
			line-height: 1;
			color: map-get($color,300);
			@include textEllipsis(1);
			text-align:center;
		}
		&+.sg-item::after{
			position: absolute;
			content: '';
			display:block;
			width: 1px;
			height: 90%;
			z-index: 1;
			pointer-events: none;
			top: 10%;
			left: 0;
			background: map-get($color,400);
		}
	}
}
.ask-view.index{
	background: map-get($color,200);
}
.ms-full{
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
<template>
	<div class="ask-view index" v-nav="$route.meta">
		<div class="ask-view-box">
			<div class="ms-full">
				<ask-scroll class="noscroll">
					<header class="ms-header">
						<div class="ms-hinfo">
							<div class="ms-hbox">
								<div class="ms-hicon">
									<img src="~@/assets/img_icon/icon_stores.png" alt="图标">
								</div>
								<div class="ms-htext" v-text="$user.user&&$user.user.name || '百货商店'"></div>
							</div>
						</div>
					</header>
					<!-- <ask-button @click.native="loginOut">loginOUt</ask-button> -->
					<section class="ms-section">
						<div class="ms-sgroup">
							<router-link to='/shoplist' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_shopping.png" alt="图标">
								</div>
								<div class="sg-text">购物</div>
							</router-link>
							<router-link to='/order/0' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_order.png" alt="图标">
								</div>
								<div class="sg-text">订单</div>
							</router-link>
						</div>
						<div class="ms-sgroup">
							<router-link to='/manage/staff' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_shop_assistant.png" alt="图标">
								</div>
								<div class="sg-text">店员管理</div>
							</router-link>
							<router-link to='/report/1' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_merchants_report.png" alt="图标">
								</div>
								<div class="sg-text">商户报表</div>
							</router-link>
						</div>
						<div class="ms-sgroup">
							<router-link to='/manage/store' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_store_management.png" alt="图标">
								</div>
								<div class="sg-text">门店管理</div>
							</router-link>
							<router-link to='/report/2' tag="div" class="sg-item">
								<div class="sg-icon">
									<img src="~@/assets/img_icon/icon_store_report.png" alt="图标">
								</div>
								<div class="sg-text">门店报表</div>
							</router-link>
						</div>
					</section>
				</ask-scroll>
			</div>
		</div>
	</div>
</template>
<script>
import {User} from "@/services";
export default {
	name: 'Index',
	components:{
	},
	data(){
		return {
		}
	},
	mounted(){
	},
	methods:{
		loginOut(){
			this.$user.loginOut();
		}
	}
}

</script>
