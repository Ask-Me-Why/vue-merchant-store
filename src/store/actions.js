/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-02-11 17:36:11
 */
import { localStorage } from '@/utils';
import {
	PAGE_CHANGE,
	PAGE_CHANGE_SUCCESS,
	POS_GETMEMBER,
	POS_GETMEMBER_SUCCESS,
	ERROR_MSG
} from './mutations-types';

export const pageActions = {
	pageChangeStart({ commit }) {
		commit(PAGE_CHANGE);
	},
	pageChangeEnd({ commit }){
		setTimeout(()=>{
			commit(PAGE_CHANGE_SUCCESS);
		},500);
	}
}

export const posActions = {
	posBegin({ commit }) {
		commit(POS_GETMEMBER);
	},
	posEnd({ commit },payload){
		commit(POS_GETMEMBER_SUCCESS,payload);
	}
}