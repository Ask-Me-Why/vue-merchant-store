<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.slide-sub{
		width: 100%;
		height: 0;
		overflow:hidden;
		transition: height .3s linear;
		.slide-sub-info{
			width: 100%;
		}
	}
</style>
<template>
	<transition  
		@before-enter="beforeEnter"
		@enter="enter"
		@before-leave="beforeLeave"
		@leave="leave"
	>
		<div class="slide-sub" v-show="show">
			<div class="slide-sub-info">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		name:"SlideSub",
		props:{
			show: false
		},
		mounted(){
			if(this.show){
				let _h = this.$el.querySelector('.slide-sub-info').offsetHeight;
				this.$el.style.height = _h+'px';
			}
		},
		methods:{
			beforeEnter(el){
				el.style.height = 0 + 'px';
			},
			enter(el,done){
				let _h = el.querySelector('.slide-sub-info').offsetHeight;
				el.style.height = _h+'px';
				done();
			},
			beforeLeave(el){
				let _h = el.querySelector('.slide-sub-info').offsetHeight;
				el.style.height = _h+'px';
			},
			leave(el,done){
				el.style.height = 0 + 'px';
				setTimeout(() => {
				    done();
				}, 300);
			}
		}
	}
</script>