import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import maintain from '@/pages/maintain'
import test1 from '@/pages/test1'
import test2 from '@/pages/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'maintain',
      component: maintain,
      meta: {
        title: '报事报修',
      }
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1,
      meta: {
        title: '测试列表1',
      }
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2,
      meta: {
        title: '测试列表2',
      }
    }
  ]
})
