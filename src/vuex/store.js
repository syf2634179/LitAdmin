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
    routes: [], //menu 包含2级menu
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
    // 设置菜单
    set_active_menu (state, menudata) {
      this.state.routes = menudata;
    },
    // 设置二级菜单
    set_active_menuchildren (state, menudata) {
      this.state.menuchildren = menudata;
    },
    // 设置资产负载均衡显示列头
    set_zcfz_showtitle (state, titledata) {
      this.state.zcFzShowTitle = titledata;
    }
  }
})
export default store
