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
        leaf: false, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        parpath: "dashboard",
        children: [
          {path: '/dashboard', iconCls: 'iconfont icon-home', name: '概览',ishide: true}
        ]
      },
      {
        path: '/',
        name: '资产',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-books',
        parpath: "book",
        children: [
          {path: '/book/zcgailan', iconCls: 'iconfont icon-books', name: '资产概览'},
          {path: '/book/list', iconCls: 'iconfont icon-books', name: '网络设备'},
          {path: '/book/category', iconCls: 'iconfont icon-books', name: '安全设备'}
        ]
      },
      {
        path: '/',
        name: '工单',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-users', // 图标样式class
        parpath: "asset",
        children: [
          {path: '/asset/list', iconCls: 'iconfont icon-users', name: '资产列表'}
        ]
      },
      {
        path: '/',
        name: '数据',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "infodata",
        children: [
          {path: '/infodata/profile', iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/infodata/changepwd', iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      },
      {
        path: '/',
        name: '告警',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "report",
        children: [
          {path: '/report/profile', iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/report/changepwd', iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      },
      {
        path: '/',
        name: '系统',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "user",
        children: [
          {path: '/user/profile', iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/user/changepwd', iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      }
    ],
    menuchildren: [], // 2级menu
    zcFzShowTitle: {}  // 资产-负载均衡显示列头
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
    },
    // 设置资产负载均衡显示列头
    set_zcfz_showtitle (state, titledata) {
      alert(JSON.stringify(titledata));
      this.state.zcFzShowTitle = titledata;
    }
  }
})

export default store
