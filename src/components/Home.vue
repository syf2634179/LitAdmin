<template>
  <el-row class="container" >
    <!--头部-->
    <el-col :span="24" class="topbar-wrap" v-show="nofullscreen">
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
        <el-dropdown trigger="click" >
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="screenshow">全屏</el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/user/profile"><span style="color: #555;">个人信息</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="'/user/changepwd'"><span style="color: #555;">修改密码</span></router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
     <!--  <div class="topbar-account topbar-btn">
        <el-button type="warning" icon="el-icon-rank">全屏</el-button>
      </div> -->
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main" :style=[styletop]>
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}" v-show="nofullscreen">
        <!--导航菜单-->
        <el-menu default-active="$route.path" router :collapse="collapsed" @select="handlemenuselect">
	      <div class="menu-toggle" @click.prevent="collapse">
	        <i class="iconfont icon-menufold" v-show="!collapsed"></i>
	        <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
	      </div>
          <template v-for="(item,index) in $store.state.routes" v-if="item.menuShow">
            <!-- <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item  v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu> -->
            <el-menu-item
              :index="item.children[0].path"
              :children="item.children"
              :class="$route.path.indexOf(item.parpath)>-1?' is-activesyf':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>

        <el-menu class="syf-menu" v-show="$store.state.menuchildren.length>1" default-active="$route.path" router :childcollapse="menuchildcollapsed">
          <div class="menu-toggle shutiao" @click.prevent="menuchildcollapse">
	        <i class="iconfont icon-menufold" v-show="!menuchildcollapsed"></i>
	        <i class="iconfont icon-menuunfold" style="width:20px;" v-show="menuchildcollapsed"></i>
	      </div>
          <template v-for="(item,index) in $store.state.menuchildren" v-if="!item.ishide">
            <el-menu-item 
              :index="item.path"
              :children="$store.state.menuchildren"
              :class="$route.path.indexOf(item.path)>-1?' is-activesyf':''">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container" id="screenshow">
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
  export default {
    name: 'home',
    created(){
      // alert(this.$router.options.routes.length);
      bus.$on('setNickName', (text) => {
        this.nickname = text;
      })

      bus.$on('goto', (url) => {
        if (url === "/login") {
          sessionStorage.removeItem('user');
        }
        this.$router.push(url);
      })
    },
    data () {
      return {
        nickname: '',
        collapsed: true,
        menuchildcollapsed: false,
        nofullscreen: true,
        styletop: {top: '50px'}
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
      //全屏
      screenshow(){
        this.launchIntoFullscreen(document.getElementById("body"));
      },
      // tab切换时，动态的切换路由
      tabClick (tab) {
        let path = this.activeIndex;
        this.$router.push({path: path});
      },
      tabRemove (targetName) {
        //首页不可删除
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
      handlemenuselect(index, indexPath) {

      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      menuchildcollapse: function () {
      	this.menuchildcollapsed = !this.menuchildcollapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--danger'
        }).then(() => {
          //确认
          that.loading = true;
          API.logout().then(function (result) {
            that.loading = false;
            sessionStorage.removeItem('user');
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
        // this.styletop.top="0px";
        // this.nofullscreen=false;
       }
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
        API.findMenu({menu: user.menu}).then(function (result) {
          if (result && result.menu) {
            that.$store.commit('set_active_menu', result.menu);
          }
          that.$router.push({path: '/'});
        }, function (err) {
          that.$store.commit('set_active_menu', []);
        }).catch(function (error) {
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      }
      // 刷新时以当前路由做为tab加入tabs
      // let firstpage="/dashboard";
      // let firstpagename="概览";
      this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
      this.$store.commit('set_active_index', this.$route.path);
      // if (this.$route.path !== '/' && this.$route.path.indexOf(firstpage) == -1) {
      //   this.$store.commit('add_tabs', {route: firstpage, name: firstpagename});
      //   this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
      //   this.$store.commit('set_active_index', this.$route.path);
      // } else {
      //   this.$store.commit('add_tabs', {route: firstpage, name: firstpagename});
      //   this.$store.commit('set_active_index', firstpage);
      //   this.$router.push(firstpage);
      // }
      let firsturl=this.$route.path.split('/')[1];
      for (let option of this.$store.state.routes ) {
        if(option.parpath==firsturl){
          this.$store.commit('set_active_menuchildren', option.children);
          break
        }
      }
      let that=this;
      document.addEventListener('fullscreenchange', function(){
        if(!that.nofullscreen){
          that.styletop.top = "50px";
          that.nofullscreen = true;
        }else{
          that.styletop.top = "0px";
          that.nofullscreen = false;
        }
      });
      document.addEventListener('mozfullscreenchange', function(){ 
        if(!that.nofullscreen){
          that.styletop.top = "50px";
          that.nofullscreen = true;
        }else{
          that.styletop.top = "0px";
          that.nofullscreen = false;
        }
      });
      document.addEventListener('webkitfullscreenchange', function(){ 
        if(!that.nofullscreen){
          that.styletop.top = "50px";
          that.nofullscreen = true;
        }else{
          that.styletop.top = "0px";
          that.nofullscreen = false;
        }
      });
      document.addEventListener('MSFullscreenChange', function(){
        if(!that.nofullscreen){
          that.styletop.top = "50px";
          that.nofullscreen = true;
        }else{
          that.styletop.top = "0px";
          that.nofullscreen = false;
        }
      });
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
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
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
        overflow-y: hidden;
      }
      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 0px);
        height: -webkit-calc(100% - 0px);
        height: calc(100% - 0px);
        border-radius: 0px;
        background-color: #333744;
        width: 150px;
        float:left;
        overflow-y: auto;
      }
      .syf-menu{
      	width:120px !important;
      	background: #eaedf1;
      	transition: all .5s ease;
        .el-menu-item,.el-menu-item.is-active{
          color:#666;
          background: #eaedf1;
        }
      }
      .el-menu-item.is-active{
        background: #333744;
      }
      .el-menu-item.is-active i{
        color: #878d99;
      }
      .el-submenu.el-menu-item.is-activesyf, .el-menu-item.is-activesyf, .el-submenu .el-menu-item.is-activesyf:hover, .el-menu-item.is-activesyf:hover {
        background-color: #00C1DE;
        color: #fff;
      }
      .el-menu-item.is-activesyf i,.el-menu-item.is-activesyf i:hover{
        color:#fff;
      }
      .syf-menu .el-menu-item.is-activesyf,.syf-menu .el-menu-item:hover{
      	background: #fff;
        color: #666;
      }
      .syf-menu[childcollapse="true"]{
      	width:16px !important;
      	overflow-y:hidden;
      	.shutiao{
      	  height:100%;
      	  position:absolute;
      	  z-index:1;
      	  i{
      	  	position: relative;
      	  	top: 50%;
      	  }
      	}
      	.shutiao:hover{
	  	  background: #00c1de;
	  	}
      }
      .el-submenu .el-menu-item {
        min-width: 50px;
      }
      .el-menu--collapse {
        width: 54px;
      }
      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 36px;
        line-height: 36px;
        font-size: 12px;
      }
      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }
    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 29px;
      line-height: 29px;
      .iconfont {
        margin:0;
      }
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
