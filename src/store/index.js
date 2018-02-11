import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {	//此处配置公用的数据
	project:[],
	viewDirection: '',
  imgURL: 'http://202.105.96.131:3002/xa/static/',
}

export default new Vuex.Store({
	state,
	mutations,
})
