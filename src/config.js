let config = {
	isLocal: true,
	el: document.getElementsByTagName('body')[0],
	getBaseUrl() {
		let _r = this.el.getAttribute('data-api');
		if (this.isLocal) {
			_r = 'http://localhost:8045/api/';
			_r = 'http://www.askmewhy.cn/web-app/api/';
			// _r = 'http://192.168.1.107:8045/api/';
			// _r = 'http://testmob.to-ok.com.cn/page/web-app/api';
		}
		return _r;
	},
	getAuthToken() {
		let _r = this.el.getAttribute('data-token');
		if (this.isLocal) {
			// _r = '1a6d0c9bf64054e48cfdf3b28cb62bb8';
			_r = '83267613=bbbf224379775dc8d3de74251781defb';
		}
		return _r;
	}
}

export const PROD = config.isLocal;
export const BASE_URL = config.getBaseUrl();
export const AUTH_TOKEN = config.getAuthToken();