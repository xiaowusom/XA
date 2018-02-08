import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maintain from '@/pages/maintain'
import inquiry from '@/pages/inquiry'
import test1 from '@/pages/test1'
import cancelReport from '@/pages/cancelReport'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/inquiry',
    name: 'inquiry',
    component: inquiry,
    meta: {
      title: '报事查询',
    }
  }, {
    path: '/',
    name: 'maintain',
    component: maintain,
    meta: {
      title: '报事投诉',
    }
  }, {
    path: '/cancelReport',
    name: 'cancelReport',
    component: cancelReport,
    meta: {
      title: '报事详情',
    }
  }]
})
