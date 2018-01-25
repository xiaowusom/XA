import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {	//此处配置公用的数据
	project:[],
	viewDirection: '',

}

export default new Vuex.Store({
	state,
	mutations,
})
