import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maintain from '@/pages/maintain'
import inquiry from '@/pages/inquiry'
import test1 from '@/pages/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/maintain',
      name: 'maintain',
      component: maintain,
      meta: {
        title: '报事报修',
      }
    },
    {
      path: '/inquiry',
      name: 'inquiry',
      component: inquiry,
      meta: {
        title: '报事查询',
      }
    },
    {
      path: '/',
      name: 'test1',
      component: test1,
      meta: {
        title: '测试列表1',
      }
    }
  ]
})
