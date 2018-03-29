<template>
	<div id="app">
		<nav-bar></nav-bar>
		<div class="ask-toy-container">
			<keep-alive exclude="shoplist">
			  <transition name="ask-switch">
			  	<router-view/>
			  </transition>
			</keep-alive>
		</div>
		<ask-loader :show="pageLoader || show"></ask-loader>
	</div>
</template>
<style src="./assets/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
<script>
import Vue from 'vue';
import channel from '@/components/channel.js';
import navBar from '@core/nav/nav-bar.vue';
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import { mapState } from 'vuex';

Vue.directive('nav', {
	inserted: function(el, binding) {
		let data = binding.value;
		channel.$emit('UpdateNavBar', data);
	}
})
export default {
	name: 'app',
	components: {
		"nav-bar": navBar
	},
	computed:{
		...mapState({
		    pageLoader: state => state.pageLoader
		})
	},
	provide() {
		return {
			rootMain: this
		};
	},
	data(){
		return{
			show: false,
			index: 0,
		}
	},
	methods:{
		loader(state) {
			if (state) {
				if (this.index == 0) this.show = true;
				this.index++;
			} else {
				this.index--;
				if (this.index == 0) this.show = false;
			}
		}
	},
	watch:{
		'$route' (to, from) {
			askOverlay.closeAll();
		}
	}
}
</script>
