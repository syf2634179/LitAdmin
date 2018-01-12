/**
 * Created by syf on 2018/01/08.
 * 初始化菜单(menu)模拟数据
 *
 * Created by syf on 2018/01/08.
 */
const menus = {};
menus['one'] = [
      {
        path: '/dashboard',
        name: '首页',
        leaf: false, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        parpath: "dashboard",
        component: "Home",
        children: [
          {path: '/dashboard', component: "Dashboard", iconCls: 'iconfont icon-home', name: '概览',ishide: true}
        ]
      },
      {
        path: '/',
        name: '资产',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-books',
        parpath: "book",
        component: "Home",
        children: [
          {path: '/book/zcgailan', component: "bookzcgailan", iconCls: 'iconfont icon-books', name: '资产概览'},
          {path: '/book/list', component: "booklist", iconCls: 'iconfont icon-books', name: '网络设备'},
          {path: '/book/category', component: "bookcategorylist", iconCls: 'iconfont icon-books', name: '安全设备'}
        ]
      },
      {
        path: '/',
        name: '工单',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-users', // 图标样式class
        parpath: "asset",
        component: "Home",
        children: [
          {path: '/asset/list', component: "assetlist", iconCls: 'iconfont icon-users', name: '资产列表'}
        ]
      },
      {
        path: '/',
        name: '数据',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "infodata",
        component: "Home",
        children: [
          {path: '/infodata/profile', component: "userprofile", iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/infodata/changepwd', component: "userchangepwd", iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      },
      {
        path: '/',
        name: '告警',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "report",
        component: "Home",
        children: [
          {path: '/infodata/profile', component: "userprofile", iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/infodata/changepwd', component: "userchangepwd", iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      },
      {
        path: '/',
        name: '系统',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-setting1',
        parpath: "user",
        component: "Home",
        children: [
          {path: '/infodata/profile', component: "userprofile", iconCls: 'iconfont icon-setting1', name: '个人信息'},
          {path: '/infodata/changepwd', component: "userchangepwd", iconCls: 'iconfont icon-setting1', name: '修改密码'}
        ]
      }
    ];

menus['two'] = [
      {
        path: '/dashboard',
        name: '首页',
        leaf: false, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        parpath: "dashboard",
        component: "Home",
        children: [
          {path: '/dashboard', component: "Dashboard", iconCls: 'iconfont icon-home', name: '概览',ishide: true}
        ]
      },
      {
        path: '/',
        name: '资产',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-books',
        parpath: "book",
        component: "Home",
        children: [
          {path: '/book/zcgailan', component: "bookzcgailan", iconCls: 'iconfont icon-books', name: '资产概览'},
          {path: '/book/list', component: "booklist", iconCls: 'iconfont icon-books', name: '网络设备'},
          {path: '/book/category', component: "bookcategorylist", iconCls: 'iconfont icon-books', name: '安全设备'}
        ]
      },
      {
        path: '/',
        name: '工单',
        menuShow: true,
        leaf: false, // 只有一个节点
        iconCls: 'iconfont icon-users', // 图标样式class
        parpath: "asset",
        component: "Home",
        children: [
          {path: '/asset/list', component: "assetlist", iconCls: 'iconfont icon-users', name: '资产列表'}
        ]
      },
      {
        path: '*',
        component: "notfount",
        name: '404'
      }
    ];
menus['default']=[
      {
        path: '/dashboard',
        name: '首页',
        leaf: false, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-home', // 图标样式class
        parpath: "dashboard",
        component: "Home",
        children: [
          {path: '/dashboard', component: "Dashboard", iconCls: 'iconfont icon-home', name: '概览',ishide: true}
        ]
      },
      {
        path: '*',
        component: "notfount",
        name: '404'
      }
    ];
module.exports = menus;
