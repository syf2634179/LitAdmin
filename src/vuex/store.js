import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Wise Wrong',
    logo: 'syf',
    options: [],
    activeIndex: '',
    userInfo: {},
    routes: [
      {
        path: '/login',
        name: '登录',
        parpath: "login",
      },
      {
        path: '/dashboard',
        name: '首页',
        redirect: '/dashboard',
        leaf: true, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        parpath: "dashboard",
        children: [
          {path: '/dashboard', iconCls: 'iconfont icon-home', name: '首页',ishide: true}
        ]
      },
      {
        path: '/',
        name: '资产管理',
        menuShow: true,
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-users', // 图标样式class
        parpath: "asset",
        children: [
          {path: '/asset/list', iconCls: 'iconfont icon-users', name: '资产列表', parname: '资产管理'}
        ]
      },
      {
        path: '/',
        name: '图书管理',
        menuShow: true,
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-books',
        parpath: "book",
        children: [
          {path: '/book/list', iconCls: 'iconfont icon-books', name: '图书列表', parname: '图书管理'},
          {path: '/book/category', iconCls: 'iconfont icon-books', name: '图书分类', parname: '图书管理'}
        ]
      },
      {
        path: '/',
        name: '设置',
        menuShow: true,
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "user",
        children: [
          {path: '/user/profile', iconCls: 'iconfont icon-setting1', name: '个人信息', parname: '设置'},
          {path: '/user/changepwd', iconCls: 'iconfont icon-setting1', name: '修改密码', parname: '设置'}
        ]
      }
    ],
    menuchildren: []
  },
  mutations: {
    newAuthor (state, msg) {
      state.author = msg
    },
     // 添加tabs
    add_tabs (state, data) {
      this.state.options.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info;
    },
    // 设置二级菜单
    set_active_menuchildren (state, menudata) {
      this.state.menuchildren = menudata;
    }
  }
})

export default store
