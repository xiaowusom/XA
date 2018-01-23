// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import iView from 'iview'
import '../theme/iview.css'
import MintUI from 'mint-ui'
import qs from 'qs'
import 'mint-ui/lib/style.css'

import {post,get,patch,put} from '@/script/http'
import {delCookie,getCookie, setSession, getSession} from '@/script/util'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;


// 时间格式化函数
Date.prototype.format = function(fmt) {
  var o = {
      "M+": this.getMonth() + 1,               //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}

// 格式化标题 （兼容微信H5）
document.setTitle = function(t) {
  document.title = t;
  var i = document.createElement('iframe');
  i.src = 'http://www.baidu.com/favicon.ico';
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function(){
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
}

// 路由截获
router.beforeEach((to, from, next) => {
  const list = ['test1', 'test2']    // 将需要切换效果的路由名称组成一个数组,往里添加对应页面路由名称
  const toName = to.name    // 即将进入的路由名字
  const fromName = from.name    // 即将离开的路由名字
  const toIndex = list.indexOf(toName)    // 进入下标
  const fromIndex = list.indexOf(fromName)   // 离开下标
  let direction = ''

  if (toIndex > -1 && fromIndex > -1) {   // 如果下标都存在
    if (toIndex < fromIndex) {          // 如果进入的下标小于离开的下标，那么是左滑
      direction = 'left'
    } else {
      direction = 'right'         // 如果进入的下标大于离开的下标，那么是右滑
    }
  }
  store.state.viewDirection = direction  //这里使用vuex进行赋值
  return next()
})

Vue.config.productionTip = false // 来关闭生产模式下给出的提示
Vue.use(iView)
Vue.use(MintUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
