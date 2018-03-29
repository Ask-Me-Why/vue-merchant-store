<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-shop-cart{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		background: transparent;
		left: 0;
		z-index: 30;
		pointer-events: none;
		.asc-body{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 30;
			background: rgba(map-get($color,300D3),.8);
			pointer-events: auto;
			@include flexLayout(flex,justify,center);
			.asc-cart-icon{
				width: 25.6%;
				flex: 0 0 25.6%;
				.icon-box{
					margin-left: auto;
					margin-right: 14px;
					position: relative;
					width: 56px;
					height: 56px;
					border-radius: 100%;
					background: map-get($color,400S2);
					transform: translateY(-12px);
					font-size: 30px;
					color: map-get($color,300S2);
					line-height: .84;
					@include flexLayout(flex,center,center);
					.iconfont{
						font:inherit;
						color:inherit;
					}
					.asc-cibadge{
						position: absolute;
						top: 0;
						right: 0;
						min-width:20px;
						padding: 0 4px;
						height: 20px;
						border-radius: 50%/50%;
						text-align:center;
						color: map-get($color,200);
						transform: translate(0%,-30%);
						pointer-events: none;
						background: map-get($color,600);
						font-size: 12px;
						line-height: 1.7;
						white-space: nowrap; 
					}
				}
			}
			.asc-cart-btns{
				width: 102px;
				flex: 0 0 102px;
				.ask-button{
					padding: 20px 0;
					text-align:center;
					min-width: auto;
					width: 100%;
					background: map-get($color,1002);
					color: map-get($color,200);
					font-size: 16px;
					line-height: 1;
					border-radius: 0;
				}
			}
			.asc-cart-tip{
				flex: 0 0 74.4%;
				width: 74.4%;
				.text{
					word-break:break-all;
					font-size: 14px;
					color: map-get($color,200);
					line-height: 1.2;
					span{
						word-break:break-all;
						font-size: 20px;
					}
				}
			}
			&.active{
				.asc-cart-tip{
					flex: 0 0 calc(74.4% - 102px);
					width: calc(74.4% - 102px);
				}
				.asc-cart-icon{
					.icon-box{
						background: map-get($color,1002);
						color: map-get($color,200);
						transition: color .3s linear, background .3s linear;
					}
				}
			}
		}
		.asc-overlay{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			pointer-events: auto;
			background: rgba(map-get($color,300D3),.4);
		}
		.asc-list-modal{
			position: absolute;
			z-index: 20;
			left: 0;
			top: calc(100% - 56px);
			width: 100%;
			transform:translate3d(0,-100%,0);
			background: map-get($color,200);
			pointer-events: auto;
			.asc-lmtitle{
				width: 100%;
				background: map-get($color,500);
				padding: 2.4% 3.2%;
				@include flexLayout(flex,justify,center);
				.caption{
					flex: 0 0 auto;
					font-size: 16px;
					color: map-get($color,300S2);
					line-height: 1;
					position: relative;
					padding: 0 0 0 10px;
					&::after{
						content: '';
						display: block;
						width: 6px;
						height: 6px;
						background: map-get($color, 300S2);
						border-radius: 100%;
						position: absolute;
						top: 50%;
						left: 0;
						margin-top: -3px;
					}
				}
				.ask-button{
					flex: 0 0 auto;
					font-size: 14px;
					color: map-get($color,300S2);
					line-height: 1;
					padding: 4px 0;
					vertical-align: middle;
					.iconfont{
						font-size: 18px;
						color: inherit;
						line-height: 1;
						vertical-align: middle;
					}
				}
			}
			.asc-lminfo{
				width: 100%;
				background: map-get($color,200);
				.limit-box{
					width: 100%;
					max-height: 240px;
					overflow: auto;
					-webkit-overflow-scrolling: touch;
					&::-webkit-scrollbar {
						display:none;
					}
				}
				.list{
					width: 100%;
					.once{
						padding: 4% 3.2% 3.2% 6.4%;
						border-bottom: 1px solid map-get($color,500D1);
						@include flexLayout(flex,justify,center);
						.o-info{
							flex: 0 0 auto;
							width: 70%;
							.o-itext{
								font-size: 14px;
								color: map-get($color,300);
								line-height: 1;
								@include textEllipsis(1);
								&.price{
									color: map-get($color,600);
									padding-top: 10px;
								}
							}
						}
					}
				}
			}
		}
	}

	.shop-cart-fade-enter-active{
		transition: opacity .3s linear;
	}
	.shop-cart-fade-leave-active{
		transition: opacity .3s linear;
	}
	.shop-cart-fade-enter,
	.shop-cart-fade-leave-to{
		opacity: 0;
	}

	/* 进入过渡的状态 */
	.shop-cart-slide-enter-active{
        animation: shop-cart-slide-enter .3s ease-in 1 both;
	}
	@keyframes shop-cart-slide-enter{
		0%{
			transform:translate3d(0,0,0);
		}
		100%{
			transform:translate3d(0,-100%,0);
		}
	}
	/* 离开过渡的状态 */
	.shop-cart-slide-leave-active{
        animation: shop-cart-slide-leave .3s ease-out 1 both;
		overflow: hidden;
	}
	@keyframes shop-cart-slide-leave{
		0%{
			transform:translate3d(0,-100%,0);
		}
		100%{
			transform:translate3d(0,0,0);
		}
	}

	.ask-shop-verball{
		width: 24px;
		height: 24px;
		pointer-events: none;
		border-radius: 50%/50%;
		position: absolute;
		background: transparent;
		bottom: 28px;
		right: calc(78.2% + 14px);
		z-index: 12;
		transition: transform 0ms cubic-bezier(.32,-0.52,.89,.57);
		.ask-shop-horball{
			width: 100%;
			height: 100%;
			border-radius: inherit;
			overflow: hidden;
			background: map-get($color,1002);
			transition: transform 0ms linear;
			img{
				width: 100%;
				height: 100%;
				vertical-align: bottom;
			}
		}
	}
</style>
<template>
	<div class="ask-shop-cart">
		<div class="asc-body" :class="{'active': cartNum > 0}">
			<div class="asc-cart-icon" @click="toggleModal">
				<div class="icon-box">
					<i class="iconfont icon-gouwuche"></i>
					<div class="asc-cibadge" v-show="cartNum > 0" v-text="cartNum"></div>
				</div>
			</div>
			<div class="asc-cart-tip" @click="toggleModal">
				<div class="text" v-show="cartNum == 0">购物车空空的，赶快添加一点宝贝吧...</div>
				<div class="text" v-show="cartNum > 0">￥<span>{{allPrice}}</span></div>
			</div>
			<div class="asc-cart-btns" v-show="cartNum > 0">
				<router-link :to="{ name: 'clearing', query: this.$route.query}">
					<ask-button :hover="false" text="立即下单"></ask-button>
				</router-link>
			</div>
		</div>
		<transition name="shop-cart-fade">
			<div class="asc-overlay" v-show="cartListModal" @click="closeModal"></div>
		</transition>
		<transition name="shop-cart-slide">
			<div class="asc-list-modal" v-show="cartListModal">
				<div class="asc-lmtitle">
					<div class="caption">购物车</div>
					<ask-button :hover="false" :ripple="false" @click.native="clearCart">
						<i class="iconfont icon-shanchu"></i>
						清空购物车
					</ask-button>
				</div>
				<div class="asc-lminfo">
					<div class="limit-box">
						<ul class="list">
							<template v-for="(cart,$i) in cartList">
								<li class="once" :key="$i">
									<div class="o-info">
										<div class="o-itext">{{cart.name}}</div>
										<div class="o-itext price">￥{{shopTwoFloat(cart.price)}}</div>
									</div>
									<input-number :product="cart" :cartAnimation="false"></input-number>
								</li>
							</template>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	const TRANSITION_DURATION = 300;
	import InputNumber from './input-number.vue';
	import channel from '@/components/channel.js';
	import { Order } from '@/services';
	import {
		hasClass,
		addClass,
		removeClass,
		askDialogConfirm,
		amountFormat,
		twoFloat
	} from '@/utils';
	export default{
		name:"ShopCart",
		inject:['rootMain'],
		components: {
			'input-number': InputNumber
		},
		computed:{
			cartNum(){
				return this.$store.getters['cartModule/getCartNum'];
			},
			cartListModal(){
				return this.cartNum > 0 && this.modalShow;
			},
			cartList(){
				return this.$store.getters['cartModule/getAllCart'];
			},
			allPrice(){
				let p = 0;
				if(this.cartList.length > 0){
					p = this.cartList.reduce((sum,val)=>{
						return sum + val.count * Number(twoFloat(val.price));
					},0);
				}
				return amountFormat(twoFloat(p));
			},
			shopTwoFloat(){
				return twoFloat;
			}
		},
		watch:{
			cartNum(n,o){
				if(n == 0) this.modalShow = false;
			}
		},
		data(){
			return{
				modalShow: false
			}
		},
		mounted() {
			channel.$on('JoinCartAnimation', this.joinCartAnimation);
		},
		beforeDestroy() {
			channel.$off('JoinCartAnimation', this.joinCartAnimation);
		},
		methods:{
			joinCartAnimation(el,img){
				const opt = el.getBoundingClientRect();
				let ballVerEl = document.createElement('div'), //垂直运动小球
					ballHorEl = document.createElement('div'); //水平运动小球
				addClass(ballVerEl,'ask-shop-verball');
				addClass(ballHorEl,'ask-shop-horball');
				if(img){
					let imgEl = document.createElement('img');
					imgEl.src = img ;
					ballHorEl.appendChild(imgEl);
				}
				ballVerEl.appendChild(ballHorEl);
				this.$el.appendChild(ballVerEl);
				const endOpt = this.$el.querySelector('.asc-cart-icon>.icon-box').getBoundingClientRect();
				let _top = endOpt.top + endOpt.height/2;
				let _left = endOpt.left + endOpt.width/2;

				ballVerEl.style.transform = `translate3d(0,-${Math.floor(_top - opt.top + opt.height/2)}px,0)`;
				ballHorEl.style.transform = `translate3d(${Math.floor(opt.left - _left + opt.width/2)}px,0,0)`;

				window.getComputedStyle(ballVerEl).getPropertyValue('opacity');
				window.getComputedStyle(ballHorEl).getPropertyValue('opacity');

				ballVerEl.style.transitionDuration = `${TRANSITION_DURATION}ms`;
				ballVerEl.style.transform = 'translate3d(0,0,0)';

				ballHorEl.style.transitionDuration = `${TRANSITION_DURATION}ms`;
				ballHorEl.style.transform = 'translate3d(0,0,0)';
				setTimeout(() => {
				   ballVerEl.remove();
				}, TRANSITION_DURATION)
			},
			closeModal(){
				this.modalShow = false;
			},
			showModal(){
				this.modalShow = true;
			},
			toggleModal(){
				if(this.cartNum == 0){
					this.closeModal();
					return;
				}
				if(this.modalShow) this.closeModal();
				else this.showModal();
			},
			clearCart(){
				askDialogConfirm({
					title: '提示',
					theme: 'accent',
					content:'是否清空购物车内所有商品？',
					sure: "清空",
					shadeClick: false,
					showClose: false
				},(vm)=>{
					this.$store.dispatch('cartModule/clearCart');
					this.closeModal();
					vm.close();
				},(vm)=>{
				})
			}
		}
	}
</script>