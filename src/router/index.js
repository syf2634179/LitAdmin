import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import notfount from '@/components/notfound'

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/components/Login'], resolve)
Vue.use(Router)
let user = sessionStorage.getItem('user');
// let user = localStorage.getItem('access-user');
let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      children: [
        {path: '/dashboard', component: resolve => require(['@/components/Dashboard'], resolve), name: '概览'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '资产',
      children: [
        {path: '/book/zcgailan', component: resolve => require(['@/components/bookzcgailan'], resolve), name: '资产概览'},
        {path: '/book/list', component: resolve => require(['@/components/booklist'], resolve), name: '网络设备'},
        {path: '/book/category', component: resolve => require(['@/components/bookcategorylist'], resolve), name: '安全设备'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '工单',
      children: [
        {path: '/asset/list', iconCls: 'iconfont icon-users', component: resolve => require(['@/components/assetlist'], resolve), name: '工单1'},
        {path: '/asset/list/profile', iconCls: 'iconfont icon-users', component: resolve => require(['@/components/userprofile'], resolve), name: '工单详情'},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      children: [
        {path: '/user/profile', component: resolve => require(['@/components/userprofile'], resolve), name: '个人信息'},
        {path: '/user/changepwd', component: resolve => require(['@/components/userchangepwd'], resolve), name: '修改密码'}
      ]
    },
    {
      path: '*',
      component: notfount,
      name: '404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  // let pass = valid(to);
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
