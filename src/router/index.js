import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maintain from '@/pages/maintain'
import inquiry from '@/pages/inquiry'
import test1 from '@/pages/test1'
import test2 from '@/pages/test2'
import cancelReport from '@/pages/cancelReport'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/maintain',
    name: 'maintain',
    component: maintain,
    meta: {
      title: '报事报修',
    }
  }, {
    path: '/inquiry',
    name: 'inquiry',
    component: inquiry,
    meta: {
      title: '报事查询',
    }
  }, {
    path: '/',
    name: 'test1',
    component: test1,
    meta: {
      title: '测试列表1',
    }
  }, {
    path: '/test1',
    name: 'test1',
    component: test1,
    meta: {
      title: '测试列表1',
    }
  }, {
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试列表2',
    }
  }, {
    path: '/cancelReport',
    name: 'cancelReport',
    component: cancelReport,
    meta: {
      title: '取消报事',
    }
  }]
})