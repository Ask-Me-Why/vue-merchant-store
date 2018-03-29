<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.nav-bar {
	display: block;
	width: 100%;
	overflow: hidden;
	height: 48px;
	line-height: 48px;
	color: map-get($color,200);
	font-size: 16px;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background-color: map-get($color,100);
	z-index: 10;
}

</style>
<template>
	<div class="nav-bar" v-if="show">
		<slot></slot>
	</div>
</template>
<script>
import Vue from 'vue';
import channel from '@/components/channel.js';
import headerBar from './header.vue';
import router from '@/router';
export default {
	name: 'NavBar',
	data(){
		return{
			headers:[],
			show:true
		}
	},
	mounted() {
		channel.$on('UpdateNavBar', this.updateNavBarFn);
	},
	beforeDestroy() {
		channel.$off('UpdateNavBar',this.updateNavBarFn);
	},
	methods: {
		updateNavBarFn(data){
			if(data.hideNavBar && data.hideNavBar == !0) {
				this.show = false;
				return;
			}
			this.show = true;
			this.createHeader(data);
		},
		_createHeaderDom() {
			let container = this.$el;
			let el = document.createElement('div');
			container.appendChild(el);
			return new Promise((resolve, reject) => {
				setTimeout(() => { resolve(el) }, 0);
			})
		},
		createHeader(data) {
			let props = {};
			if (data.nav == !1) this.show = false;
			if (data.showBack) props.showBack = data.showBack;
			if (data.onBack) props.onBack = data.onBack;
			if (data.title) props.title = data.title;
			let headerComponent = Vue.extend(headerBar);

			this.$nextTick(()=>{
				this._createHeaderDom().then(el => {
					let vm = new headerComponent({
						propsData:props,
						router
					}).$mount(el);
					let headers = this.headers;
					let prevHeader = headers.pop();
					if(prevHeader){
						prevHeader.cache();
					}
					headers.push(vm);
				})
			});
			
		}
	}
}

</script>
