<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.product-item{
		width: 100%;
		@include flexLayout(flex,normal,normal);
		padding: 4.3%;
		border-bottom: 1px solid map-get($color, 400);
		&:first-of-type{
			padding-top: 0;
		}
		.cover{
			width: 80px;
			flex: 0 0 80px;
			padding: 0 10px 0 6px;
			.box{
				position:relative;
				width: 100%;
				padding: 57.82% 0;
				img{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
		.info{
			flex: 0 0 calc(100% - 80px);
			width: calc(100% - 80px);
			@include flexLayout(flex,justify,normal);
			flex-flow: column ;
			.detail{
				width: 100%;
			}
			.title{
				padding: 9px 0;
				font-size: 14px;
				line-height: 1;
				color: map-get($color,300);
				@include textEllipsis(1);
			}
			.text{
				font-size: 12px;
				line-height: 1;
				color: map-get($color,300S2);
			}
			.other{
				width: 100%;
				@include flexLayout(flex,justify,bottom);
				.price{
					color: map-get($color,600);
					font-size: 16px;
					line-height: 1;
					i{
						font-style: normal;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="product-item">
		<div class="cover">
			<div class="box">
				<img :src="product.pic" alt="封面">
			</div>
		</div>
		<div class="info">
			<div class="detail">
				<div class="title">{{product.name}}</div>
				<div class="text gray">库存{{product.store_nums}}</div>
			</div>
			<div class="other">
				<div class="price"><i>￥</i>{{twoFloat(product.price).split('\.')[0]}}<i>.{{twoFloat(product.price).split('\.')[1]}}</i></div>
				<input-number :product="product"></input-number>
			</div>
		</div>
	</div>
</template>
<script>
	import InputNumber from './input-number.vue';
	import { amountFormat,twoFloat } from '@/utils';
	export default{
		name:"ProductItem",
		props:['product'],
		components: {
			'input-number': InputNumber
		},
		computed:{
			twoFloat(){
				return twoFloat;
			}
		}
	}
</script>