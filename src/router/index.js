import Vue from 'vue'
import Router from 'vue-router'
import { sessionStorage, refreshTitle,docCookies } from '@/utils'
import { User } from '@/services';
import store from '@/store';

const user = new User();
import Index from '@/views/index.vue';
import Login from '@/views/login.vue';

//懒加载路由

//sub->结算页面
const ShopList = resolve => require.ensure([], () => resolve(require('@/views/shoplist.vue')), '');
//sub->结算页面
const Clearing = resolve => require.ensure([], () => resolve(require('@/views/clearing.vue')), '');
//sub->订单页面
const Order = resolve => require.ensure([], () => resolve(require('@/views/order.vue')), '');
//sub->订单支付成功页面
const OrderSuccess = resolve => require.ensure([], () => resolve(require('@/views/order_success.vue')), '');
//sub->店员管理页面
const ManageStaff = resolve => require.ensure([], () => resolve(require('@/views/manage_staff.vue')), '');
//sub->门店管理页面
const ManageStore = resolve => require.ensure([], () => resolve(require('@/views/manage_store.vue')), '');
//sub->商户报表和门店报表页面
const Report = resolve => require.ensure([], () => resolve(require('@/views/report.vue')), '');

const nextDirection = (direction) => {
	let el = document.getElementById('app');
	if (el) el.setAttribute('transition-direction', direction);
}
const viewScrollTop = (scrollTop) => {
	const el = document.getElementById('app');
	if (typeof scrollTop == 'number') {
		const pages = el && el.querySelectorAll('.ask-view .ask-view-box');
		const content = pages[pages.length - 1];
		if (content) {
			content.scrollTop = scrollTop;
		}
	} else {

		return el && el.querySelector('.ask-view .ask-view-box') ?
			el.querySelector('.ask-view .ask-view-box').scrollTop : 0
	}
}
const beforeEach = (toRoute, fromRoute, next) => {
	store.dispatch('pageChangeStart');
	if(docCookies.getItem('access_token') && user.auth == 'none'){
		user.login({},'cookie');
	}
	if (user.auth != 'none') {
		Vue.prototype.$user = {
			user: user.user,
			auth: user.auth,
			loginOut: user.loginOut
		};
	} else {
		Vue.prototype.$user = 'none';
	}
	
	if (toRoute.meta.title) {
		refreshTitle(toRoute.meta.title);
	} else {
		refreshTitle('百货系统');
	}
	const _to = toRoute.path,
		_from = fromRoute.path,
		scrollTop = viewScrollTop();

	if(_to == "/clearing" && fromRoute.name == "order"){
		nextDirection('back');
		next({
			path: '/'
		});
	}

	let his = sessionStorage.getItem(_to);

	if (his && his.history) {
		nextDirection('back');
		his.history = false;
		sessionStorage.setItem(_to, his);
	} else {
		nextDirection('forward');
		sessionStorage.setItem(_from || '/', {
			history: true,
			scrollTop: scrollTop
		});
	}
	
	if (_to == '/login' && user.auth != 'none') {
		next({
			path: '/'
		});
	} else {
		if (toRoute.meta.requiresAuth && user.auth == 'none') {
			refreshTitle('登录');
			next({
				path: '/login',
				query: { redirect: toRoute.fullPath }
			});
		} else {
			next();
		}
	}
}
const afterEach = (toRoute, fromRoute) => {
	const _to = toRoute.path,
		_from = fromRoute.path;
	if (_from == '/') {
		Vue.nextTick(() => {
			store.dispatch('pageChangeEnd');
		});
		return;
	}
	let his = sessionStorage.getItem(_to);
	if (his && his.scrollTop) {
		Vue.nextTick(() => {
			store.dispatch('pageChangeEnd');
			viewScrollTop(his.scrollTop);
		});
	}else{
		Vue.nextTick(() => {
			store.dispatch('pageChangeEnd');
		});
	}
}

Vue.use(Router)
const router = new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: Index,
			meta: { title: '百货系统', requiresAuth: true }
		}, {
			path: '/login',
			name: 'login',
			component: Login,
			meta: { title: '登录', showBack: false }
		}, {
			path: '/clearing',
			name: 'clearing',
			component: Clearing,
			meta: { title: '确认订单', showBack: true , requiresAuth: true }
		}, {
			path: '/order/:type',
			name: 'order',
			component: Order,
			meta: { title: '订单', showBack: true , requiresAuth: true }
		}, {
			path: '/shoplist',
			name: 'shoplist',
			component: ShopList,
			meta: { title: '购物', showBack: true , requiresAuth: true }
		}, {
			path: '/manage/staff',
			name: 'managestaff',
			component: ManageStaff,
			meta: { title: '店员管理', showBack: true , requiresAuth: true }
		}, {
			path: '/manage/store',
			name: 'managestore',
			component: ManageStore,
			meta: { title: '门店管理', showBack: true , requiresAuth: true }
		}, {
			path: '/report/:type',
			name: 'report',
			component: Report,
			meta: { title: '商户报表', showBack: true , requiresAuth: true }
		}, {
			path: '/ordersuccess',
			name: 'ordersuccess',
			component: OrderSuccess,
			meta: { title: '支付结果', showBack: true , requiresAuth: true }
		}
	]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router;
