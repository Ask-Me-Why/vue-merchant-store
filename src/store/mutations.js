/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-02-28 10:54:40
 */
import {
	PAGE_CHANGE,
	PAGE_CHANGE_SUCCESS,
	POS_GETMEMBER,
	POS_GETMEMBER_SUCCESS,
	ERROR_MSG
} from './mutations-types';

export const pageMutations = {
	[PAGE_CHANGE](state) {
		state.pageLoader = true;
	},
	[PAGE_CHANGE_SUCCESS](state) {
		state.pageLoader = false;
	}
}
export const posMutations = {
	[POS_GETMEMBER](state) {},
	[POS_GETMEMBER_SUCCESS](state, payload) {
		state.posMemeberCard = payload;
	}
}