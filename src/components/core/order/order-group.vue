<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.order-group {
	width: 100%;
	overflow: hidden;
	.og-once {
		width: 100%;
		background: map-get($color, 200);
		margin-top: 1.6%;
		.og-otitle {
			width: 100%;
			padding: 3.2% 4.8%;
			@include flexLayout(flex, justify, center);
			.name {
				flex: 0 0 auto;
				width: auto;
				font-size: 16px;
				line-height: 1;
				color: map-get($color, 300);
				@include textEllipsis(1);
			}
			.state {
				flex: 0 0 auto;
				width: auto;
				font-size: 16px;
				line-height: 1;
				color: map-get($color, 1002);
				@include textEllipsis(1);
				&.pay {
					color: map-get($color, 800);
				}
			}
		}
		.og-oinfo {
			width: 100%;
			padding: 0;
			.og-ogroup {
				width: 100%;
				padding: 2.4% 3.2% 2.4% 4.8%;
				margin-top: 1.6%;
				background: map-get($color, 500D1);
				@include flexLayout(flex, normal, normal);
				&:first-of-type {
					margin-top: 0;
				}
			}
		}
		.og-ogroup {
			.cover {
				flex: 0 0 24.4%;
				width: 24.4%;
				margin-right: 2.4%;
				.cover-box {
					width: 100%;
					padding: 50% 0;
					position: relative;
					img {
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
			.detail {
				flex: 0 0 73.2%;
				width: 73.2%;
				@include flexLayout(flex, justify, normal);
				flex-flow: column;
				.title {
					width: 100%;
					@include textEllipsis(2);
					font-size: 14px;
					line-height: 1.8;
					color: map-get($color, 300);
				}
				.other {
					width: 100%;
					@include flexLayout(flex, justify, bottom);
					.price {
						font-size: 20px;
						color: map-get($color, 600);
						line-height: 1;
					}
					.num {
						font-size: 12px;
						color: map-get($color, 300S2);
						line-height: 1;
					}
				}
			}
		}
		.og-ofooter {
			position: relative;
			width: 100%;
			padding: 4% 5.6%;
			@include flexLayout(flex, right, bottom);
			/* &::after{
					content:'';
					display:block;
					width: 93.6%;
					height: 1px;
					background: map-get($color,400S1);
					position: absolute;
					top: 0;
					left: 3.2%;
					pointer-events: none;
					z-index: 1;
				} */
			.og-otext {
				font-size: 12px;
				line-height: 1;
				color: map-get($color, 300S1);
				margin-left: 8px;
				&.large {
					font-size: 16px;
					span {
						color: map-get($color, 600);
					}
				}
			}
		}
		.og-obtns {
			width: 100%;
			padding: 2.4% 4%;
			@include flexLayout(flex, right, center);
			position: relative;
			&::after {
				content: '';
				display: block;
				width: 93.6%;
				height: 1px;
				background: map-get($color, 400S1);
				position: absolute;
				top: 0;
				left: 3.2%;
				pointer-events: none;
				z-index: 1;
			}
			.ask-button {
				min-width: 84px;
				border: 1px solid map-get($color, 400S1);
				background: map-get($color, 200);
				color: map-get($color, 300);
				font-size: 16px;
				line-height: 1;
				padding: 9px 0;
				margin-left: 6px;
				border-radius: 4px;
				&.default {
					border: 1px solid map-get($color, 400S1);
					background: map-get($color, 200);
					color: map-get($color, 300);
				}
				&.primary {
					border: 1px solid map-get($color, 1002);
					background: map-get($color, 1002);
					color: map-get($color, 200);
				}
			}
		}
	}
}

</style>
<template>
	<ask-scroll v-show="show" class="noscroll" :on-infinite="onInfinite">
		<div class="order-group">
			<template v-for="(o,$i) in orders">
				<div class="og-once" :key="$i">
					<div class="og-otitle">
						<div class="name">订单号:{{o.order_id}}</div>
						<div class="state" :class="{pay: type == 2}" v-text="type == 1 ? '待付款':'已支付'"></div>
					</div>
					<div class="og-oinfo">
						<template v-for="(good,$g) in o.good_info">
							<div class="og-ogroup">
								<div class="cover">
									<div class="cover-box">
										<img :src="good.pic" alt="封面图">
									</div>
								</div>
								<div class="detail">
									<div class="title">{{good.name}}</div>
									<div class="other">
										<div class="price">￥{{twoFloat(good.price)}}</div>
										<div class="num">x{{good.count}}</div>
									</div>
								</div>
							</div>
						</template>
					</div>
					<div class="og-ofooter">
						<div class="og-otext">共{{o.good_info.length}}件商品</div>
						<div class="og-otext large">需付:
							<span>￥{{o.my_total}}</span>
						</div>
					</div>
					<div class="og-obtns" v-if="type == 1">
						<ask-button class="default" text="取消订单" @click.native="removeOrder(o)"></ask-button>
						<ask-button class="primary" text="付款" @click.native="payOrder(o)"></ask-button>
					</div>
				</div>
			</template>
		</div>
		<ask-inline-loader :show="loader"></ask-inline-loader>
		<template v-if="!infiniteMore" slot="infinite">
			<div class="bottom-line-text">
				<span>
					<template v-if="orders.length == 0 ">暂无数据</template>
					<template v-else>已加载全部数据</template>
				</span>
			</div>
		</template>
	</ask-scroll>
</template>
<script>
import { BigNumber } from 'bignumber.js';
import { Order } from '@/services';
import { twoFloat, askDialogConfirm, askDialogToast } from '@/utils';
export default {
	name: "OrderGroup",
	inject: ['rootMain'],
	props: {
		show: false,
		type: {
			default: 1,
			type: String | Number
		}
	},
	data() {
		return {
			orders: [],
			loader: false,
			offset: 0,
			infiniteMore: false,
			orderServer: new Order()
		}
	},
	computed: {
		twoFloat() {
			return twoFloat;
		}
	},
	mounted() {
		if (this.show) {
			this.getOrder();
		}
	},
	methods: {
		getOrder() {
			this.loader = true;
			this.orderServer.all({
				status: this.type,
				offset: this.offset
			}).then(r => {
				this.loader = false;
				if (!r.data.ok || !this.show) {
					this.infiniteMore = false;
					return;
				}
				let _o = [];
				if (r.data.list.length > 0) {
					r.data.list.map(index => {
						let total = 0;
						if (index.good_info.length > 0) {
							total = index.good_info.reduce((sum, val) => {
								return (sum*100 + val.count * val.price * 100)/100;
							}, 0);
						}
						let _realTotal = new BigNumber(total);
						
						index['my_total'] = _realTotal.minus(index.yh).toFixed(2);
						
						_o.push(index);
					})
					this.orders = [...this.orders, ..._o];
				}

				this.infiniteMore = r.data.hasmore;
				this.offset++;
			}, error => {
				this.loader = false;
				this.infiniteMore = false;
			});
		},
		async onInfinite(done) {
			if (!this.infiniteMore || this.loader){
				done();
				return;
			} 
			await this.getOrder();
			done();
		},
		removeOrder(order) {
			askDialogConfirm({
				title: '提示',
				theme: 'accent',
				content: `确认取消订单号为"${order.order_id}"的订单？`,
				shadeClick: false,
				showClose: false
			}, (vm) => {
				this.rootMain.loader(true);
				this.orderServer.remove(order.order_id).then(r => {
					this.rootMain.loader(false);
					if (!r.data.ok) return;
					let index = this.orders.findIndex(o => o.order_id == order.order_id);
					index != -1 && this.orders.splice(index, 1);
					this.$nextTick(() => {
						this.needRequest();
					})
				}, error => {
					this.rootMain.loader(false);
				})
				vm.close();
			}, (vm) => {})
		},
		needRequest() {
			let boxHeight = this.$el.offsetHeight,
				infoEl = this.$el.querySelector('.ask-scroll-body');
			let infoHeight = infoEl && infoEl.offsetHeight || 0;
			if (infoHeight - boxHeight < 100) this.getOrder();
		},
		payOrder(order) {
			this.$jsBridge.callHandler('pospay', {
				"orderid": order.order_id,
				"type": (!order.xuid || order.xuid == 0) ? "webshoppt" : "webshophy"
			}, (res)=>{
				if (typeof res == "string") res = JSON.parse(res);
				if (res.retcode == 1) {
					askDialogToast({ msg: "支付成功", class: "success", time: 2000 });
					let index = this.orders.findIndex(o => o.order_id == order.order_id);
					index != -1 && this.orders.splice(index, 1);
					this.$nextTick(() => {
						this.needRequest();
					})
				} else {
					askDialogToast({ msg: "支付失败", class: "danger", time: 2000 });
				}
			})
			// posPay(order.order_id,order.my_total,order.good_xuid && order.good_xuid > 0);
		}
	},
	watch: {
		show(n, o) {
			this.offset = 0;
			this.infiniteMore = true;
			this.orders = [];
			if (n) {
				this.getOrder();
			}
		}
	}
}

</script>
