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
				@include flexLayout(flex,justify,center);
				@include textEllipsis(1);
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
					width: 60%;
					font: inherit;
					color: inherit;
					text-align: right;
					&.active{
						color: map-get($color,1002);
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
						<template v-for="s in staffs">
							<div class="ms-msgroup">
								<div class="ms-msonce">
									<div class="name">店长</div>
									<div class="value active">{{s.name}}</div>
								</div>
								<div class="ms-msonce">
									<div class="name">电话</div>
									<div class="value">{{s.phone}}</div>
								</div>
							</div>
						</template>
					</div>
					<ask-inline-loader :show="loader"></ask-inline-loader>
					<template v-if="!infiniteMore" slot="infinite">
						<div class="bottom-line-text">
							<span>
								<template v-if="staffs.length == 0 ">暂无数据</template>
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
	name: 'ManageStaff',
	components:{
	},
	data(){
		return {
			loader:false,
			infiniteMore: false,
			offset: 0,
			staffs: [],
			managesServer: new Manages()
		}
	},
	mounted() {
		this.getStaff();
	},
	methods:{
		getStaff(){
			this.loader = true;
			this.managesServer.getStaff({
				offset: this.offset
			}).then(r=>{
				this.loader = false;
				if(!r.data.ok) return;
				let _s = [];
				if(r.data.list.length > 0){
					r.data.list.map(index=>{
						_s.push(index);
					})
					this.staffs = [...this.staffs,..._s];
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
			await this.getStaff();
			done();
		}
	}
}

</script>
