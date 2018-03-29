<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ms-manage-staff{
	width: 100%;
	position: relative;
	height: 100%;
	.ms-msinfo{
		width: 100%;
		.ms-msgroup{
			width: 100%;
			background: map-get($color,200);
			margin-bottom: 4%;
			.ms-msonce{
				width: 100%;
				padding: 4% 8% 4% 5.6%;
				@include flexLayout(flex,justify,top);
				font-size: 14px;
				color: map-get($color,300);
				line-height: 1;
				position: relative;
				&::after{
					content:"";
					display: block;
					width: 93.6%;
					height: 1px;
					background: map-get($color,400S1);
					position: absolute;
					top: 0;
					left: 3.2%;
					z-index: 1;
					pointer-events: none;
				}
				&:first-of-type::after{
					display: none;
				}
				.name{
					width: 40%;
					font: inherit;
					color: inherit;
				}
				.value{
					max-width: 60%;
					font: inherit;
					color: inherit;
					word-break: break-all;
					&.active{
						color: map-get($color,1002);
					}
				}
				.title{
					width: 100%;
					@include textEllipsis(1);
					font-size: 16px;
					color: map-get($color, 1002);
					font-weight: 900;
					line-height: 1;
					padding-left: 14px;
					position: relative;
					&::after{
						content:"";
						display: block;
						width: 2px;
						height: 100%;
						background: map-get($color, 1002);
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
						pointer-events:none;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div class="ask-view" v-nav="$route.meta">
		<div class="ask-view-box">
			<div class="ms-manage-staff">
				<ask-scroll class="noscroll" :on-infinite="onInfinite">
					<div class="ms-msinfo">
						<template v-for="s in stores">
							<div class="ms-msgroup">
								<div class="ms-msonce">
									<div class="title">{{s.company}}</div>
								</div>
								<div class="ms-msonce">
									<div class="name">门店类型</div>
									<div class="value">{{s.sjzy || '暂无'}}</div>
								</div>
								<div class="ms-msonce">
									<div class="name">门店电话</div>
									<div class="value">{{s.lxrtel || '暂无'}}</div>
								</div>
								<div class="ms-msonce">
									<div class="name">门店地址</div>
									<div class="value">{{s.address || '暂无'}}</div>
								</div>
							</div>
						</template>
					</div>
					<ask-inline-loader :show="loader"></ask-inline-loader>
					<template v-if="!infiniteMore" slot="infinite">
						<div class="bottom-line-text">
							<span>
								<template v-if="stores.length == 0 ">暂无数据</template>
								<template v-else>已加载全部数据</template>
							</span>
						</div>
					</template>
				</ask-scroll>
			</div>
		</div>
	</div>
</template>
<script>
import { Manages } from '@/services';
export default {
	name: 'ManageStore',
	components:{
	},
	data(){
		return {
			loader:false,
			infiniteMore: false,
			offset: 0,
			stores: [],
			managesServer: new Manages()
		}
	},
	mounted() {
		this.getStore();
	},
	methods:{
		getStore(){
			this.loader = true;
			this.managesServer.getStore({
				offset: this.offset
			}).then(r=>{
				this.loader = false;
				if(!r.data.ok) return;
				let _s = [];
				if(r.data.list.length > 0){
					r.data.list.map(index=>{
						_s.push(index);
					})
					this.stores = [...this.stores,..._s];
				}
				this.infiniteMore = r.data.hasmore;
				this.offset++;
			},error=>{
				this.loader = false;
				this.infiniteMore = false;
			});
		},
		async onInfinite(done){
			if(!this.infiniteMore) return;
			await this.getStore();
			done();
		}
	}
}

</script>
