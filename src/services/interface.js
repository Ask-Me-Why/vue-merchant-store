/*
* @Author: askMeWhy
* @Date:   2018-01-15 15:26:22
* @Last Modified by:   bigWave
* @Last Modified time: 2018-02-22 11:18:50
*/
import {
	ajax,
	askDialogToast,
	merge,
	localStorage,
	docCookies
} from '@/utils';

import * as config from '@/config.js';

const baseURL = config.BASE_URL;

export class User{
	get user(){
		return localStorage.getItem('user') || 'none';
	}
	set user(val){
		let _luser = localStorage.getItem('user');
		if(_luser) localStorage.removeItem('user');

		localStorage.setItem('user', val);
	}

	get auth(){
		return localStorage.getItem('auth') || 'none';
	}
	set auth(val){
		let _lauth = localStorage.getItem('auth');
		if(_lauth) localStorage.removeItem('auth');

		localStorage.setItem('auth', val);
	}

	login(opt,type){
		if(type == 'cookie'){
			let _user = {type:"cookie"};
			this.user = _user;
			this.auth = docCookies.getItem('access_token') || 'none';
			return true;
		}
		let option = {
			account: opt.account,
			pass: opt.pass,
			wid: opt.wid,
			unid: opt.unid,
			method: 'pos_login'
		}
		return this._ajax('post',option);
	}
	loginOut(force){
		let _luser = localStorage.getItem('user');
		if(_luser) localStorage.removeItem('user');

		let _lauth = localStorage.getItem('auth');
		if(_lauth) localStorage.removeItem('auth');
		return new Promise((resolve,reject)=>{
			resolve();
		});
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
				if(!r.data.ok) {
					askDialogToast({ msg: r.data.error || r.data.message || '登录失败', time: 2000, class: 'danger' });
					return;
				}
				let _user = {};
				// _user['duty_type'] = r.data.duty_type;//职务,1-员工,2-店长 
				// _user['duty_num'] = r.data.duty_num;//职务编号  
				_user['name'] = r.data.name;//昵称
				// _user['wid'] = options.wid;//商户ID
				// _user['unid'] = options.unid;//门店ID
				this.user = _user;
				this.auth = r.data.access_token;
			}
		});
	}
}


const userInfo = new User();
class publicModal{
	constructor(){
		this.default = {
			// "wid": user.user.wid||'none',
			// "unid": user.user.unid||'none',
			// "duty_type": user.user.duty_type||'none',
			// "duty_num": user.user.duty_num||'none',
			"access_token": userInfo.auth
		}
	}

	_ajax(method,options){
		options = options || {};
		//TODO 使用cookie模式登录的
		if(userInfo.user.type && userInfo.user.type == "cookie"){
			userInfo.auth = docCookies.getItem('access_token') || 'none';
			options.access_token = userInfo.auth;
		}
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
				if(!r.data.ok) {
					askDialogToast({ msg: r.data.error || r.data.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
			}
		});
	}
}
export class Product extends publicModal{
	getType(){
		let option = merge(true,{method: 'pos_goodsType'},this.default);
		return this._ajax('post',option);
	}
	getGoods(opt){
		let option = {
			method: "pos_goods",
			type_id: 0,
			offset: 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Order extends publicModal{

	create(opt){
		let option = {
			method: "pos_createOrder",
			order_data: "",
			posid: "",
			//good_xuid: "",//会员支付则传递此参数，否则不传递
			...this.default,
			...opt
		}

		return this._ajax('post',option);
	}

	all(opt){
		let option = {
			method: "pos_newSelectOrder",
			status: 0,
			offset: 0,
			...this.default,
			...opt
		}

		return this._ajax('post',option);
	}

	remove(id){
		let option = {
			method: "pos_cancelOrder",
			order_id: id || 0,
			...this.default
		}
		return this._ajax('post',option);
	}

	byId(id,offset){
		let option = {
			method: "pos_newSelectOrder",
			order_id: id,
			offset: offset || 0,
			status: 0,
			...this.default
		}

		return this._ajax('post',option);
	}
}

export class Member extends publicModal{
	sendCode(phone){
		let option = {
			method: "user_getCode",
			phone: phone,
			type: 5
		}
		return this._ajax('post',option);
	}
	
	getInfo(opt){
		let option = {
			method: "pos_memberInfo",
			"card":"",//卡号优先级高于手机+验证码,如果有,则不需要手机号和验证码 
    		"phone":"",//手机号 
    		"code":"",//验证码 
    		"pay_code":"",//付款码查找会员
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Manages extends publicModal{
	getStaff(opt){
		let option = {
			method: "pos_employeeList", 
    		"offset": 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}

	getStore(opt){
		let option = {
			method: "pos_storeList", 
    		"offset": 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Report extends publicModal{
	getReport(opt){
		let option = {
			method: "pos_report", 
    		"type": 1,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}

	getTop(opt){
		let option = {
			method: "pos_topTen", 
    		"type": 1,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}
