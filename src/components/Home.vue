<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/"><img src="../assets/logotxt.png"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">运维指针</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/profile"><span style="color: #555;font-size: 14px;">个人信息</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="'/user/changepwd'"><span style="color: #555;font-size: 14px;">修改密码</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="topbar-account topbar-btn">
        <el-button type="warning" icon="el-icon-rank">全屏</el-button>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <!-- <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div> -->
        <!--导航菜单-->
        <el-menu default-active="$route.path" router :collapse="collapsed">
          <template v-for="(item,index) in $store.state.routes" v-if="item.menuShow">
            <!-- <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item  v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu> -->
            <syf-menu-item
              :index="item.children[0].path"
              :children="item.children"
              :class="$route.path.indexOf(item.parpath)>-1?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
            </syf-menu-item>
          </template>
        </el-menu>

        <el-menu default-active="$route.path" router :collapse="collapsed">
          <template v-for="(item,index) in $store.state.menuchildren" v-if="!item.ishide">
            <syf-menu-item 
              :index="item.path"
              :children="$store.state.menuchildren"
              :class="$route.path.indexOf(item.path)>-1?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
            </syf-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <!--tabs-->
        <el-tabs
          v-model="activeIndex"
          type="border-card"
          closable
          @tab-click="tabClick"
          v-if="options.length"
          @tab-remove="tabRemove">
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in options"
            :label="item.name"
            :name="item.route">
          </el-tab-pane>
        </el-tabs>
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import {bus} from '../bus.js'
  import API from '../api/api_user'
  import syfMenuItem from './syfcommen/elementui/menu-item'
  export default {
    components:{
      syfMenuItem
    },
    name: 'home',
    created(){
      bus.$on('setNickName', (text) => {
        this.nickname = text;
      })

      bus.$on('goto', (url) => {
        if (url === "/login") {
          localStorage.removeItem('access-user');
        }
        this.$router.push(url);
      })
    },
    data () {
      return {
        nickname: '',
        collapsed: true,
      }
    },
    computed: {
      options () {
        return this.$store.state.options;
      },
      activeIndex: {
        get () {
          return this.$store.state.activeIndex;
        },
        set (val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
    watch: {
      $route(to) {
        let firsturl=to.path.split('/')[1];
        for (let option of this.$store.state.routes ) {
          if(option.parpath==firsturl){
            this.$store.commit('set_active_menuchildren', option.children);
            break
          }
        }
        let flag = false;
        for (let option of this.options ) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set_active_index', to.path);
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name});
          this.$store.commit('set_active_index', to.path);
        }
      }
    },
    methods: {
      // tab切换时，动态的切换路由
      tabClick (tab) {
        let path = this.activeIndex;
        this.$router.push({path: path});
      },
      tabRemove (targetName) {
        // 首页不可删除
        if(targetName == '/dashboard'|| targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length-1].route);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/'});
          }
        }
      },
      handleOpen() {
        //console.log('handleopen');
      },
      handleClose() {
        //console.log('handleclose');
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          that.loading = true;
          API.logout().then(function (result) {
            that.loading = false;
            localStorage.removeItem('access-user');
            that.$router.go('/login'); //用go刷新
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {});
      },
      //全屏
      launchIntoFullscreen(element) { 
        if(element.requestFullscreen){ 
          element.requestFullscreen(); 
         }
         else if(element.mozRequestFullScreen) {
         element.mozRequestFullScreen(); 
         } 
        else if(element.webkitRequestFullscreen) { 
          element.webkitRequestFullscreen(); 
         } 
        else if(element.msRequestFullscreen) { 
          element.msRequestFullscreen(); 
         }
       }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
      // 刷新时以当前路由做为tab加入tabs
      let firstpage="/dashboard";
      let firstpagename="概览";
      if (this.$route.path !== '/' && this.$route.path.indexOf(firstpage) == -1) {
        this.$store.commit('add_tabs', {route: firstpage, name: firstpagename});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
        this.$store.commit('set_active_index', this.$route.path);
      } else {
        this.$store.commit('add_tabs', {route: firstpage, name: firstpagename});
        this.$store.commit('set_active_index', firstpage);
        this.$router.push(firstpage);
      }
      let firsturl=this.$route.path.split('/')[1];
      for (let option of this.$store.state.routes ) {
        if(option.parpath==firsturl){
          this.$store.commit('set_active_menuchildren', option.children);
          break
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        overflow-y:auto;
        overflow-x:hidden;
        border-radius: 0px;
        background-color: #333744;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
        float: left;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 60px;
        width:100%;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
