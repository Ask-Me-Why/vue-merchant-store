/*
 * @Author: askMeWhy
 * @Date:   2018-01-30 16:47:33
 * @Last Modified by:   smile
 * @Last Modified time: 2018-03-07 16:54:39
 */
import {
	JOIN_CART,
	JOIN_CART_SUCCESS,
	REMOVE_CART,
	REMOVE_CART_SUCCESS,
	CLEAR_CART,
	CLEAR_CART_SUCCESS
} from './mutations-types';
import {
	localStorage,
	askDialogToast
} from '@/utils';
const localCart = (cart) => {
	if (cart) {
		localStorage.setItem('cartInfo', {
			cart: cart
		});
	} else {
		return localStorage.getItem('cartInfo') && localStorage.getItem('cartInfo').cart || [];
	}
}

const cartModule = {
	namespaced: true,
	state: {
		cart: localCart()
	},
	getters: {
		getCartNum(state, getters) {
			if (state.cart.length <= 0) return 0;
			let num = state.cart.reduce((sum, value) => {
				return sum + value.count;
			}, 0)
			return num;
		},
		getCartById: (state, getters) => payload => {
			if (getters.getAllCart.length == 0) {
				payload = { ...payload,
					count: 0
				};
				return payload;
			}
			let _index = getters.getAllCart.findIndex(c => c.id == payload.id);
			if (_index != -1) {
				return getters.getAllCart[_index];
			} else {
				payload = { ...payload,
					count: 0
				};
				return payload;
			}
		},
		getAllCart(state, getters) {
			return state.cart;
		}
	},
	actions: {
		joinCart({
			commit
		}, payload) {
			commit(JOIN_CART_SUCCESS, payload);
		},
		removeCart({
			commit
		}, payload) {
			commit(REMOVE_CART_SUCCESS, payload);
		},
		clearCart({
			commit
		}, payload) {
			commit(CLEAR_CART_SUCCESS, payload);
		}
	},
	mutations: {
		[JOIN_CART_SUCCESS](state, payload) {
			let _index = state.cart.findIndex(c => c.id == payload.id);
			if(payload.store_nums < 0) return;
			if (_index != -1) {
				state.cart[_index].count++;

				state.cart[_index].count = Math.min(state.cart[_index].count, state.cart[_index].store_nums);
				
			} else {
				payload['count'] = 1;
				state.cart.push(payload);
			}
			localCart(state.cart);
		},
		[REMOVE_CART_SUCCESS](state, payload) {
			let _index = state.cart.findIndex(c => c.id == payload);
			if (_index != -1) {
				if (state.cart[_index].count <= 1) {
					state.cart.splice(_index, 1);
				} else {
					state.cart[_index].count--;
				}
			}
			localCart(state.cart);
		},
		[CLEAR_CART_SUCCESS](state, payload) {
			if (payload) {
				let _index = state.cart.findIndex(c => c.id == payload);
				if (_index != -1) {
					state.cart.splice(_index, 1);
				}
			} else {
				state.cart = [];
			}
			localCart(state.cart);
		}
	}
}

export default cartModule;