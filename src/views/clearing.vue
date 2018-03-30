<style src="./clearing.scss" lang="scss"></style>
<template>
	<div class="ask-view" v-nav="nav_meta">
		<div class="ask-view-box" :style="infoStyle">
			<header class="ms-clearing-header">
				<div class="ms-chbar">
					<div class="text" v-text="member.tip"></div>
					<div class="btn">
						<ask-button :hover="false" :text="member.btn" @click.native="changeType"></ask-button>
					</div>
				</div>
				<slide-sub :show="member.type == 2" class="ms-chinfo">
					<div class="ms-chonce">
						<div class="name">姓名：</div>
						<div class="value" v-text="member.name"></div>
					</div>
					<div class="ms-chonce">
						<div class="name">电话：</div>
						<div class="value" v-text="member.phone"></div>
					</div>
				</slide-sub>
			</header>
			<section class="ms-clearing-body">
				<div class="ms-cbtitle">
					<div class="icon">
						<i class="iconfont icon-dianpu"></i>
					</div>
					<div class="name">苏银商户</div>
				</div>
				<div class="ms-cbinfo">
					<template v-for=" (cart,$i) in cartList">
						<div class="ms-cbgroup">
							<div class="cover">
								<div class="cover-box">
									<img :src="cart.pic" alt="封面图">
								</div>
							</div>
							<div class="detail">
								<div class="title">{{cart.name}}</div>
								<div class="other">
									<div class="price">￥{{cart.price}}</div>
									<div class="num">x{{cart.count}}</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<div class="ms-cbfooter">
					<div class="ms-cbtext">共{{cartList.length}}件商品</div>
					<div class="ms-cbtext large">合计:
						<span>￥{{allPrice}}</span>
					</div>
				</div>
			</section>
		</div>
		<footer class="ms-clearing-footer" ref="footerEl">
			<div class="price">
				<div class="price-all">
					需付:
					<span>
						<i>￥</i>{{needPayPrice.split('\.')[0]}}<i>.{{needPayPrice.split('\.')[1]}}</i>
					</span>
				</div>
				<div class="price-discount">
					优惠:
					<span>
						<i>￥</i>{{realDiscountPrice.split('\.')[0]}}<i>.{{realDiscountPrice.split('\.')[1]}}</i>
					</span>
				</div>
			</div>
			<ask-button :hover="false" class="discount" text="折扣" @click.native="discountModalShow = true"></ask-button>
			<ask-button :hover="false" text="结算" @click.native="pay"></ask-button>
		</footer>
		<ask-modal 
			:show.sync="show" 
			:title="''" 
			:showFooter="false" 
			:showHeader=" false" 
			:beforeClose="closeModal" 
			class="member-clearing">
			<div class="mc-box">
				<div class="mc-once" @click="chooseType(3)">
					<div class="icon">
						<img src="~@/assets/img_icon/icon_pay.png" alt="图标">
					</div>
					<div class="text">扫付款码</div>
				</div>
				<!-- <div class="mc-once" @click="chooseType(2)">
					<div class="icon">
						<img src="~@/assets/img_icon/icon_card.png" alt="图标">
					</div>
					<div class="text">会员卡</div>
				</div> -->
				<div class="mc-once" @click="chooseType(1)">
					<div class="icon">
						<img src="~@/assets/img_icon/icon_phone.png" alt="图标">
					</div>
					<div class="text">会员手机</div>
				</div>
			</div>
		</ask-modal>
		<ask-modal 
			:show.sync="memberShow" 
			:title="''" 
			:showFooter="false" 
			:showHeader="false"
			class="member-info">
			<div class="mi-box">
				<div class="mi-once">
					<input type="text" placeholder="请输入手机号" v-model="modelData.phone">
				</div>
				<div class="mi-once">
					<ask-button class="verif" 
						:hover="false" 
						:text="codeText" 
						:disabled="codeDisabled" 
						@click.native="sendCode">
					</ask-button>
					<input type="text" placeholder="请输入验证码" v-model="modelData.verif">
				</div>
				<div class="mi-once btn">
					<ask-button :hover="false" text="确定" @click.native="usePhoneGetInfo" v-show="sureButton"></ask-button>
					<ask-button :hover="false" text="取消" @click.native="closeMemberModal"></ask-button>
				</div>
			</div>
		</ask-modal>

		<ask-modal 
			:show.sync="discountModalShow" 
			:title="''" 
			:showFooter="false" 
			:showHeader=" false" 
			class="discont-modal">
			<div class="dm-box">
				<div class="dm-title">整单折扣</div>
				<div class="dm-once">
					<div class="dm-name">原价：</div>
					<div class="dm-value">￥{{allPrice}}</div>
				</div>
				<div class="dm-once">
					<div class="dm-name">优惠：</div>
					<div class="dm-value">
						<input type="number" placeholder="请输入折扣价" v-model="discountPrice" @input="cancelDiscountChoose">元
					</div>
				</div>
				<div class="dm-once">
					<div class="dm-name">折扣：</div>
					<div class="dm-value">
						<span @click="changeDiscount(.9)" :class="{'active': discountNeddActive && discount == .9}">9折</span>
						<span @click="changeDiscount(.85)" :class="{'active': discountNeddActive && discount == .85}">85折</span>
						<span @click="changeDiscount(.75)" :class="{'active': discountNeddActive && discount == .75}">75折</span>
						<span @click="changeDiscount(.7)" :class="{'active': discountNeddActive && discount == .7}">7折</span>
					</div>
				</div>
				<div class="dm-once btn">
					<ask-button :hover="false" text="取消" @click.native="discountModalShow = false"></ask-button>
					<ask-button :hover="false" text="确定" @click.native="sureDiscountModal"></ask-button>
				</div>
			</div>
		</ask-modal>
	</div>
</template>
<script>
import {    askDialogConfirm, 
			merge,
			askDialogToast,
			amountFormat,
			twoFloat } from '@/utils';
import SlideSub from '@core/slide-sub/slide-sub.vue';
import { Member,Order } from '@/services';
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import store from '@/store';
import Vue from 'vue'
export default {
	name: 'Clearing',
	inject:['rootMain'],
	components: {
		"slide-sub": SlideSub
	},
	data() {
		return {
			memberShow: false,
			show: false,
			member: {
				tip: "当前为普通收款，我要切换为",
				btn: "会员到店",
				type: 1, //1=>普通收款,2=>会员到店
				id: null,
				name: "张某某",
				phone: "18751234562",
				code: null
			},
			modelData: {
				card: null,
				phone: null,
				verif: null
			},
			phoneRex: /^[1]{1}[34578]{1}[0-9]{9}$/,
			codeText: '验证码',
			codeDisabled: false, //是否发送验证码
			sureButton: false,
			infoStyle: {},
			posId: 0,
			discount: 1,
			discountNeddActive: true,
			discountPrice: 0,
			realDiscountPrice: '0.00',
			discountModalShow: false,
		}
	},
	computed:{
		cartList(){
			return this.$store.getters['cartModule/getAllCart'];
		},
		// discountPrice(){
		// 	let p = 0;
		// 	p = this.allPrice - this.allPrice * this.discount;
		// 	return amountFormat(twoFloat(p));
		// },
		allPrice(){
			let p = 0;
			if(this.cartList.length > 0){
				p = this.cartList.reduce((sum,val)=>{
					return (sum*100 + val.count * val.price*100)/100;
				},0);
			}
			return amountFormat(twoFloat(p));
		},
		needPayPrice(){
			return amountFormat(twoFloat((this.allPrice*100 - this.realDiscountPrice*100)/100));
		},
		orderData(){
			let o = [];
			if(this.cartList.length > 0){
				this.cartList.map(index=>{
					o.push([index.id,index.count]);
				})
			}
			return JSON.stringify(o);
		},
		nav_meta(){
			var _obj = {};
			_obj['onBack'] = function(){
				askOverlay.closeAll();
				askDialogConfirm({
					title: '提示',
					theme: 'accent',
					content: '确认离开？',
					shadeClick: false,
					showClose: false
				}, (vm) => {
					vm.close();
					this.$router ? this.$router.back() : window.history.back();
				})
			}
			return merge(true,this.$route.meta,_obj);
		}
	},
	mounted() {
		let _h = this.$refs.footerEl ? this.$refs.footerEl.offsetHeight + 20 : 74;
		_h = _h + .5 | 0;
		this.infoStyle = { 'padding-bottom': _h + 'px' };
	},
	methods: {
		sureDiscountModal(){
			this.realDiscountPrice = amountFormat(twoFloat(this.discountPrice));
			this.discountModalShow = false;
		},
		cancelDiscountChoose(){
			this.discountNeddActive = false;
		},
		changeDiscount(val){
			this.discountNeddActive = true;
			this.discount = val;
			let p = 0;
			p = this.allPrice*100 - this.allPrice * this.discount*100;
			p = p/100;
			this.discountPrice = amountFormat(twoFloat(p));
			
		},
		async chooseType(type) {
			this.modelData =  {
				card: null,
				phone: null,
				verif: null
			};
			this.show = false;
			if(type == 3){
				//扫付款码识别卡号
				this.$jsBridge.callHandler("launchScan",{title:'获取付款码'},(res)=>{
					if(res){
						this.modelData.card = res;
						this.useCardGetInfo({
							pay_code: this.modelData.card
						});
					}
			    })
			}else if (type == 2) {
				this.$jsBridge.callHandler("getMemberCardNo",{title:'获取会员卡号'},(res)=>{
					if(res){
						this.modelData.card = res;
						this.useCardGetInfo({
							card: this.modelData.card
						});
					}
			    })
			} else {
				this.openMemberModal();
			}
		},
		openModal() {this.show = true;},
		closeModal(close) {close();},
		openMemberModal() {this.memberShow = true;},
		closeMemberModal(){
			this.memberShow = false;
			this.sureButton = false;
		},
		changeType() {
			let _member = {};
			if (this.member.type == 1) {
				this.openModal();
			} else {
				_member['tip'] = "当前为普通收款，我要切换为";
				_member['btn'] = "会员到店";
				_member['type'] = 1;
				this.member['order_code'] = null;
			}
			this.member = merge(true, this.member, _member);
		},
		validatePhone(){
			if (!this.modelData.phone) {
				askDialogToast({msg:'请输入您的手机号！',class:"danger",time: 2000});
				return false;
			}
			if (!this.phoneRex.test(this.modelData.phone)) {
				askDialogToast({msg:'手机号格式不对！',class:"danger",time: 2000});
				return false;
			}
			return true;
		},
		sendCode() {
			if(!this.validatePhone()) return;
			const memberServer = new Member();
			this.codeDisabled = true;
			let count = 60;
			let timer = setInterval(()=> {
				count--;
				this.codeText = count + 's';
				if (count < 0 || !this.memberShow) {
					this.codeText = '验证码';
					this.codeDisabled = false;
					clearInterval(timer);
				}
			}, 1000);
			memberServer.sendCode(this.modelData.phone).then(r=>{
				if(!r.data.ok) return;
				askDialogToast({msg:'验证码已发送',class:"success",time: 2000});
				this.sureButton = true; 
			},error=>{
				askDialogToast({msg:'网络请求错误',class:"success",time: 2000});
			})
			
		},
		usePhoneGetInfo(){
			if(!this.validatePhone()) return;
			if (!this.modelData.verif) {
				askDialogToast({msg:'请输入验证码',class:"danger",time: 2000});
				return false;
			}
			this.useCardGetInfo({
				phone: this.modelData.phone,
				code: this.modelData.verif
			});
		},
		useCardGetInfo(opt){
			const memberServer = new Member();
			memberServer.getInfo(opt).then(r=>{
				if(!r.data.ok) return;
				this.member['tip'] = `欢迎会员${r.data.name}到店`;
				this.member['btn'] = "普通收款";
				this.member['type'] = 2;
				this.member['id'] = r.data.id;
				this.member['name'] = r.data.name;
				this.member['phone'] = r.data.phone;
				this.member['order_code'] = r.data.order_code;
				this.closeMemberModal();
			},error=>{
				askDialogToast({msg:'网络请求错误',class:"success",time: 2000});
			});
		},
		pay(){
			// this.rootMain.loader(true);
			let option = {};
			option['order_code'] = this.member.order_code || "";
			option['amount'] = this.needPayPrice;
			option['extra_data'] = {
				'discount': this.realDiscountPrice
			};
			option['goods_list'] = this.cartList.reduce((sum,val)=>{
				let cur = {
					"goods_id": val.id,
					"name": val.name,
					"num": val.count,
					"price": val.price,
					"goods_no": val.goods_no,
				};
				sum.push(cur);
				return sum;
			}, []);
			//没有jsbridge调用隐藏加载框
			if(this.$jsBridge.isInit && this.$jsBridge.isInit == "no"){
				this.rootMain.loader(false);
			}
			this.$jsBridge.callHandler("buildGoodsOrder",{title:'pos支付',...option},(res)=>{
				// this.rootMain.loader(false);
				this.$store.dispatch('cartModule/clearCart');
				if(typeof res == "string") res = JSON.parse(res);
				if(res.retcode == 1){
					this.$router.back();
				}else{
					this.$router.askForward({ path: '/order/0', query: this.$route.query});
				}
			});
		}
	}/*,
	beforeRouteLeave(to, from, next) {
		// next(false);
		if(to.name == "order") {
			next();
			return;
		}
		askDialogConfirm({
			title: '提示',
			theme: 'accent',
			content: '确认离开？',
			shadeClick: false,
			showClose: false
		}, (vm) => {
			vm.close();
			next();
		}, (vm) => {
			next(false);
		})
	}*/,
	watch: {
		'modelData.phone'(n, o){
			let _t = ('' + n).replace(/\D/g, '');
			if (_t.length > 11) {
				_t = _t.substr(0, 11);
			}
			this.modelData.phone = _t;
		},
		'discountPrice'(n,o){
			let _p = (''+n).split('\.');
			
			if(_p.length > 1){
				if(_p[1].length > 2){
					_p[1] =_p[1].substr(0, 2);
				}
				this.discountPrice = _p[0]+'.'+_p[1];
			}else{
				this.discountPrice = n;
			}
		}
	}
}

</script>
