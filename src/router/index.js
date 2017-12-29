import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import BookList from '@/components/book/list'
import BookCategoryList from '@/components/bookcategory/list'

import UserList from '@/components/asset/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '概览', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '资产',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: BookList, name: '网络设备', menuShow: true},
        {path: '/book/category', component: BookCategoryList, name: '安全设备', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '工单',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/asset/list', iconCls: 'iconfont icon-users', component: UserList, name: '工单1', menuShow: true},
        {path: '/asset/list/profile', iconCls: 'iconfont icon-users', component: UserProfile, name: '工单详情', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
