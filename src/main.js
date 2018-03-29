// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store';
import router from './router';
import ASKComponents from './components/ask'
import VeeValidate from 'vee-validate'
import FastClick from 'fastclick'
import {
	JsBridge,
	docCookies
} from '@/utils';
import "./utils/polyfill.js";

FastClick.attach(document.body);
Vue.use(JsBridge);
Vue.config.productionTip = false;

// docCookies.setItem('access_token', "83267613=4af88baaa31bbbca685d9aeda6692226");
// setTimeout(()=>{
// 	docCookies.setItem('access_token',"365985984w845sd48wadwa");
// },8000);
const nextDirection = (direction) => {
	let el = document.getElementById('app');
	if (el) el.setAttribute('transition-direction', direction);
}

router['_push'] = router['push'];
router.askForward = router['push'] = (target) => {
	nextDirection('forward')
	setTimeout(() => {
		router['_push'](target)
	}, 0);
}
router.askBack = (target) => {
	nextDirection('back')
	setTimeout(() => {
		router['_push'](target)
	}, 0);
}

Vue.use(VeeValidate);
Vue.use(ASKComponents);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	}
})