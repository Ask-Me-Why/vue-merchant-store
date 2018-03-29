<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ms-shoplist-menu {
	position: absolute;
	top: 48px;
	height: calc(100% - 48px);
	left: 0;
	width: 102px;
	bottom: 0;
	z-index: 1;
	background: map-get($color,500S1);
	.ms-smlist{
		width: 100%;
		padding-bottom: 78px;
		.ms-smli{
			width: 100%;
			height: 54px;
			padding: 0 20.5%;
			@include flexLayout(flex,left,center);
			.text{
				max-width: 100%;
				@include textEllipsis(1);
				font-size: 14px;
				line-height: 1;
				color: map-get($color,300S2);
			}
			&.active{
				background: map-get($color,200);
				.text{
					color: map-get($color,600);
				}
			}
		}
	}
}

.ms-shoplist-sub {
	padding-left: 102px;
	width: 100%;
	height: 100%;
	background: map-get($color, 200);
	.ms-sstitle {
		height: 50px;
		width: 100%;
		padding: 0 2.9%;
		@include textEllipsis(1);
		font-size: 14px;
		color: map-get($color, 300);
		line-height: 1;
		@include flexLayout(flex, normal, center);
	}
	.ms-ssinfo {
		position: relative;
		width: 100%;
		height: calc(100% - 50px);
	}
}
.ms-ssscorll.ask-scroll{
	.ask-scroll-body{
		padding-bottom: 70px;
	}
}

</style>
<template>
	<div class="ask-view index" v-nav="$route.meta">
		<div class="ask-view-box">
			<div class="ms-shoplist-menu">
				<ask-scroll class="noscroll">
					<ul class="ms-smlist">
						<template v-for="type in typeList">
							<li :key="type.id" class="ms-smli" :class="{active: typeId == type.id}" @click="changeSub(type.id)">
								<div class="text">{{type.name}}</div>
							</li>
						</template>
					</ul>
				</ask-scroll>
			</div>
			<div class="ms-shoplist-sub">
				<div class="ms-sstitle" v-if="typeList.length != 0">{{typeName}}</div>
				<div class="ms-ssinfo">
					<ask-scroll class="noscroll ms-ssscorll" :on-infinite="onInfinite">
						<product-list :product="product"></product-list>
						<ask-inline-loader :show="loader"></ask-inline-loader>
						<template v-if="!infiniteMore" slot="infinite">
							<div class="bottom-line-text">
								<span>
									<template v-if="typeList.length == 0 ">暂无分类数据</template>
									<template v-else-if="product.length == 0 ">该分类暂无数据</template>
									<template v-else>已加载全部数据</template>
								</span>
							</div>
						</template>
					</ask-scroll>
				</div>
			</div>
			<shop-cart></shop-cart>
		</div>
	</div>
</template>
<script>
import { Product } from '@/services';
import ProductList from '@core/product/product-list.vue';
import ShopCart from '@core/product/shop-cart.vue';
import { askDialogToast } from '@/utils';

export default {
	name: 'ShopList',
	components: {
		'product-list': ProductList,
		'shop-cart': ShopCart,
	},
	data() {
		return {
			typeList:[],
			typeId : null,
			loader: false,
			product: [],
			allowClick: true,
			offset: 0,
			infiniteMore: false,
			productServer: new Product()
		}
	},
	computed:{
		typeName(){
			let n = "";
			if(this.typeList.length > 0 && this.typeId!=null){
				let _t = this.typeList.filter(t=>t.id == this.typeId)[0];
				n = _t.name || "";
			}
			return n;
		}
	},
	async mounted() {
		await this.initType();
		this.getProduct();
	},
	methods:{
		changeSub(id){
			if(id != this.typeId){
				this.allowClick = true;
			} 
			if(!this.allowClick) return;
			this.typeId = id;
			this.allowClick = false;
			this.infiniteMore = true;
			this.offset = 0;
			this.product = [];
			this.getProduct();
		},
		async initType(){
			let typeP = await this.productServer.getType();
			if(typeP.data.list.length == 0 ){
				askDialogToast({msg: '暂无分类信息',class: "info"});
				return;
			}
			this.typeList = typeP.data.list;
			this.typeId = typeP.data.list[0].id;
		},
		getProduct(){
			if(this.typeId == null) return;
			this.loader = true;
			this.productServer.getGoods({
				type_id: this.typeId,
				offset: this.offset
			}).then(r=>{
				this.allowClick = true;
				this.loader = false;
				if(!r.data.ok) return;
				let _p = [];
				if(r.data.list.length > 0){
					r.data.list.map(index=>{
						_p.push(index);
					})
					this.product = [...this.product,..._p];
				}
				this.infiniteMore = r.data.hasmore;
				this.offset++;
			},error=>{
				this.allowClick = true;
				this.loader = false;
				console.log(error);
			});
		},
		async onInfinite(done){
			if(!this.infiniteMore) return;
			await this.getProduct();
			done();
		}
	},
	watch:{
		// typeId(n,o){
		// 	this.infiniteMore = true;
		// 	this.offset = 0;
		// 	this.product = [];
		// 	this.getProduct();
		// }
	}
}

</script>
