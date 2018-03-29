<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ms-report-merchant{
	width: 100%;
	padding: 0 0 30px;
	.ms-rmgroup{
		width: 100%;
		padding: 3.2% 3.2% 0;
		.ms-rmouter{
			width: 100%;
			background: map-get($color,200);
			border-radius: 8px 8px 0 0;
			box-shadow: 0 0 8px rgba(map-get($color,300D3),.14);
			.ms-rmcaption{
				width: 100%;
				padding: 4% 5%;
				@include flexLayout(flex,justify,center);
				box-shadow: 0 3px 5px rgba(map-get($color,300D3),.14);
				position: relative;
				z-index: 4;
				.icon{
					width: 50px;
					height: 50px;
					.box{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						background: linear-gradient(to top, map-get($report,100), map-get($report,101));
						@include flexLayout(flex,center,center);
						font-size: 16px;
						color: map-get($color,200);
						line-height: 1;
						i.text{
							font-style: normal;
							display: inline-block;
							transform: skewX(-12deg);
						}
						i.iconfont{
							font: inherit;
							font-size: 24px;
							color: inherit;
						}
					}
				}
				.corner{
					width: 50px;
					@include flexLayout(flex,normal,center);
					.cicon{
						width: 20px;
						height: 20px;
						overflow: hidden;
						font-size: 20px;
						line-height: 1;
						color: map-get($color,1002);
						transition: transform .3s linear;
						.iconfont{
							font:inherit;
							color: inherit;
						}
						span{
							display: block;
							width: 100%;
							height: 100%;
							overflow: inherit;
							font:inherit;
							color: inherit;
							transform-origin: 50% 50%;
							transition: transform .3s linear;
						}
						&.active{
							span{
								transform: rotate(180deg);
								transition: transform .3s linear;
							}
						}
					}
					.ctext{
						font-size: 14px;
						color: map-get($color,300S2);
						line-height: 1;
						white-space: nowrap;
					}
				}
				.info{
					width: calc(100% - 50px - 50px);
					padding-left: 14px;
					.text{
						width: 100%;
						white-space:nowrap;
						font-size: 16px;
						color: map-get($color,300);
						line-height: 1;
						padding-top: 10px;
					}
					.price{
						width: 100%;
						white-space:nowrap;
						font-size: 16px;
						color: map-get($color,600);
						line-height: 1;
						padding-top: 10px;
						span{
							font-size: 24px;
						}
					}
				}
			}
			.ms-rminfo{
				width: 100%;
				background: map-get($color,500S2);
				.ms-rmiouter{
					width: 100%;
					@include flexLayout(flex,justify,top);
					padding: 4.2% 4.2%;
					.ms-chonce{
						width: 33%;
						.name{
							width: 100%;
							text-align:center;
							color: map-get($color,300S1);
							font-size: 14px;
						}
						.value{
							width: 100%;
							text-align:center;
							color: map-get($color,300);
							font-size: 16px;
							white-space: nowrap;
						}
					}
				}
			}
			.ms-rmtable{
				width: 100%;
				.ms-th{
					width: 100%;
					@include flexLayout(flex,justify,center);
					.ms-td{
						font-size: 14px;
						color: map-get($color,300);
						text-align: center;
						font-weight: normal;
						padding: 4.3% 0;
						border-top: 1px solid map-get($color,400D1);
						border-left: 1px solid map-get($color,400D1);
						@include textEllipsis(1);
						&:nth-child(3n+1){
							width: 25%;
							border-left: none;
						}
						&:nth-child(3n+2){
							width: 50%;
						}
						&:nth-child(3n+3){
							width: 25%;
						}
					}
				}
				.ms-thead{
					width:100%;
					.ms-th .ms-td{
						border-top: none;
					}
				}
				.ms-tbody{
					width:100%;
					.ms-td{
						// padding: 5.6% 0;
					}
				}
			}
		}
	}
	@for $i from 1 through 4 {
		.ms-rmgroup:nth-child(5n+#{$i+1}){
			.ms-rmouter .ms-rmcaption .icon .box{
				background: linear-gradient(to top, map-get($report,($i + 1)*100), map-get($report,($i + 1)*100+1));
			}
		}
	}
}
</style>
<template>
	<div class="ask-view" v-nav="nav_meta">
		<div class="ask-view-box">
			<div class="ms-report-merchant">
				<template v-for="(l,$i) in list">
					<div class="ms-rmgroup">
						<div class="ms-rmouter">
							<div class="ms-rmcaption" @click="changeSlide($i)">
								<div class="icon">
									<div class="box">
										<template v-if="l.icon == false">
											<i class="iconfont icon-jinri"></i>
										</template>
										<template v-else>
											<i class="text">{{l.icon}}</i>
										</template>
									</div>
								</div>
								<div class="info">
									<div class="text">{{l.name}}</div>
									<div class="price">￥<span>{{l.price}}</span></div>
								</div>
								<div class="corner">
									<div class="cicon" :class="{active: currentActive == $i}">
										<span><i class="iconfont icon-xiala-copy-copy"></i></span>
									</div>
									<div class="ctext" v-text="currentActive == $i ? '展开':'收起'"></div>
								</div>
							</div>
							<slide-sub :show="currentActive == $i" class="ms-rminfo">
								<div class="ms-rmiouter">
									<template v-for="item in l.item">
										<div class="ms-chonce">
											<div class="name">{{item.name}}</div>
											<div class="value">
												<span>{{item.value}}</span>
											</div>
										</div>
									</template>
								</div>
							</slide-sub>
						</div>
					</div>
				</template>
				<div class="ms-rmgroup">
					<div class="ms-rmouter">
						<div class="ms-rmcaption" @click="changeSlide(list.length)">
							<div class="icon">
								<div class="box">
									<i class="iconfont icon-bangdan"></i>
								</div>
							</div>
							<div class="info">
								<div class="text">销售榜Top 10</div>
							</div>
							<div class="corner">
								<div class="cicon" :class="{active: currentActive == list.length}">
									<span><i class="iconfont icon-xiala-copy-copy"></i></span>
								</div>
								<div class="ctext" v-text="currentActive == list.length ? '展开':'收起'"></div>
							</div>
						</div>
						<slide-sub :show="currentActive == list.length" class="ms-rminfo">
							<div class="ms-rmtable">
								<div class="ms-thead">
									<div class="ms-th">
										<div class="ms-td">销售榜</div>
										<div class="ms-td">商品名称</div>
										<div class="ms-td">数量</div>
									</div>
								</div>
								<div class="ms-tbody">
									<template v-for="(t,$i) in tops">
										<div class="ms-th">
											<div class="ms-td">{{$i+1}}</div>
											<div class="ms-td">{{t.name}}</div>
											<div class="ms-td">{{t.num}}</div>
										</div>
									</template>
								</div>
							</div>
						</slide-sub>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Report } from '@/services';
import { twoFloat,merge } from '@/utils';
import SlideSub from '@core/slide-sub/slide-sub.vue';
import moment from 'moment/moment.js';

export default {
	name: 'ReportMerchant',
	inject:['rootMain'],
	components: {
		"slide-sub": SlideSub
	},
	data(){
		return {
			reportServer : new Report(),
			currentActive: null,
			tops:[],
			list:[
				{
					name: "今日收益(元)",
					price: 0.00,
					icon: false,
					item:[
						{
							name: "收入(元)",
							value:  0.00,
						},
						{
							name: "成本(元)",
							value:  0.00,
						},
						{
							name: "利润(元)",
							value:  0.00,
						}
					]
				},
				{
					name: "本周收益(元)",
					icon: '本周',
					price: 0.00,
					item:[
						{
							name: "收入(元)",
							value:  0.00,
						},
						{
							name: "成本(元)",
							value:  0.00,
						},
						{
							name: "利润(元)",
							value:  0.00,
						}
					]
				},
				{
					name: "本月收益(元)",
					icon: moment().get('month') + '月',
					price: 0.00,
					item:[
						{
							name: "收入(元)",
							value:  0.00,
						},
						{
							name: "成本(元)",
							value:  0.00,
						},
						{
							name: "利润(元)",
							value:  0.00,
						}
					]
				},
				{
					name: "本年收益(元)",
					icon: moment().get('year').toString().substr(2,2) + '年',
					price: 0.00,
					item:[
						{
							name: "收入(元)",
							value:  0.00,
						},
						{
							name: "成本(元)",
							value:  0.00,
						},
						{
							name: "利润(元)",
							value:  0.00,
						}
					]
				}
			]
		}
	},
	computed:{
		type(){
			//1=>商户报表,2=>门店报表
			let _t = 1;
			if(this.$route.params.type == 1 || this.$route.params.type == 2){
				_t = this.$route.params.type;
			}
			return _t;
		},
		nav_meta(){
			var _obj = {};
			_obj['title'] = this.type == 1 ? '商户报表':'门店报表';
			return merge(true,this.$route.meta,_obj);
		}
	},
	mounted() {
		this.getReport();
		this.getTop();
	},
	methods:{
		changeSlide(index){
			if(this.currentActive == index){
				this.currentActive = null;
			}else{
				this.currentActive = index;
			}
		},
		getReport(){
			this.rootMain.loader(true);
			this.reportServer.getReport({
				type: this.type
			}).then(r=>{
				this.rootMain.loader(false);
				if(!r.data.ok) return;
				this.list[0] = this.buildData(this.list[0],r.data.day);
				this.list[1] = this.buildData(this.list[1],r.data.week);
				this.list[2] = this.buildData(this.list[2],r.data.month);
				this.list[3] = this.buildData(this.list[3],r.data.year);
			},error=>{
				this.rootMain.loader(false);
			});
		},
		getTop(){
			this.rootMain.loader(true);
			this.reportServer.getTop({
				type: this.type
			}).then(r=>{
				this.rootMain.loader(false);
				if(!r.data.ok) return;
				this.tops = [...r.data.list];
			},error=>{
				this.rootMain.loader(false);
			});
		},
		buildData(list,sourc){
			list.price = twoFloat(sourc.income);
			list.item[0].value = twoFloat(sourc.income);
			list.item[1].value = twoFloat(sourc.const);
			list.item[2].value = twoFloat(sourc.profit);
			return list;
		}
	}
}

</script>
