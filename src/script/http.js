import axios from 'axios'
import {delCookie,getCookie, setSession, getSession, getStore} from '@/script/util'
import router from '@/router/index'
import qs from 'qs'


// axios 配置 根据实际接口配置IP地址
var baseUrl = 'http://202.105.104.105:8006';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseUrl; //这是调用数据接口
var Content_Type = 'application/json;charset=utf-8';

//http request 拦截器，通过这个，把token传到后台
axios.interceptors.request.use(
  config => {
 		if(axios.defaults.baseURL == baseUrl){
 			var token = getCookie('privarytoken'); //获取Cookie
 			if(token&&token.length!=0){
 				token = token.slice(6);
 			}
 			var projectId = JSON.parse(getStore('projectInfo'));
 			if(projectId && projectId.length!=0){
 				projectId = projectId.code;
 			}
	    config.headers = { //请求头的配置，请与你的后台商量需要的放回参数
				// 'Content-Type':'application/json;charset=utf-8',		//不跨域时的请求头
				'Content-Type':'application/x-www-form-urlencoded;charset=utf-8', 
				// 'Content-Type':	Content_Type,
				// 'Stafftoken': token,
				// 'Itemid': projectId  //项目iD
	    };
			// alert(projectId)
 }
		 console.log(config)
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
		// console.log(response)
		if(response.data.status == 402){
			// alert(router.currentRoute.fullPath+"呵呵")
			setSession("direct", location.href)	//保存重定向之前的地址
			router.push({
				path: '/login',
			})
		}
		if(axios.defaults.baseURL == baseUrl){	 //自己后台用的数据格式，先剥一层data
			return response.data;
		}
    return response;
  },
  error => {
		console.log(error+"err")
    return Promise.reject(error.response)
  });
export default axios; 
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, newUrl, dataType) {
 	if(newUrl){
		axios.defaults.baseURL = newUrl
	}else{
		axios.defaults.baseURL = baseUrl
	}
  return new Promise((resolve, reject) => {

    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response);
    },err => {
      reject(err);
    })
  })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, newUrl, dataType) {
	// if(dataType == 'formdata'){
	// 	data = qs.stringify(data);
	// 	Content_Type = 'application/x-www-form-urlencoded;charset=utf-8';
	// }else{
	// 	Content_Type = 'application/json;charset=utf-8';
	// }
	data = qs.stringify(data);
	if(newUrl){
		axios.defaults.baseURL = newUrl
	}else{
		axios.defaults.baseURL = baseUrl
	}
  	return new Promise((resolve, reject) => {

		//console.log(axios.defaults.baseURL)
	    axios.post(url, data)
	      .then(response => {
	        resolve(response);
	      }, err => {
	        reject(err);
	      })
  })
}
 
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {},newUrl) {
	 if(newUrl&&url=='/ssh/wilddog/getToken'){
	    axios.defaults.baseURL = newUrl
	  }else{
	 	axios.defaults.baseURL = baseUrl; //这是调用数据接口
	 }
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
  })
}
 
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
  })
}
