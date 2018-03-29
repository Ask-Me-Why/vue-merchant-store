/*
* @Author: askMeWhy
* @Date:   2017-12-29 14:44:52
* @Last Modified by:   bigWave
* @Last Modified time: 2018-02-11 17:33:49
*/
import Vue from 'vue';
import Vuex from 'vuex';
import { merge } from '@/utils';

Vue.use(Vuex);

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import cartModule from './cart';

const storeGetters = ()=>{
	let obj = {};
	Object.keys(getters).forEach((key) => {
	    obj = merge(true,obj,getters[key]);
	})
	return obj;
}
const storeMutations = ()=>{
	let obj = {};
	Object.keys(mutations).forEach((key) => {
	    obj = merge(true,obj,mutations[key]);
	})
	return obj;
}
const storeActions = ()=>{
	let obj = {};
	Object.keys(actions).forEach((key) => {
	    obj = merge(true,obj,actions[key]);
	})
	return obj;
}


export default new Vuex.Store({
	strict: true,
	state: {
		posMemeberCard: 0,
		pageLoader: false
	},
	getters:storeGetters(),
	mutations: storeMutations(),
	actions: storeActions(),
	modules:{
		cartModule
	}
})