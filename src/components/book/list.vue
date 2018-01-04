<template>
  <el-row class="warp">
    <!-- <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col> -->
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="加载中">
      <!--工具条-->
      <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="书名" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
        </el-form>
      </el-col> -->
      <!--工具条-->
      <el-col :span="20" class="toolbar">
        <!-- <el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button> -->
        <!-- <el-button type="primary" @click="showAddDialog">新增</el-button> -->
        <el-button type="primary" @click="showAddDialog">设备入库</el-button>
        <el-button type="primary" @click="showAddDialog">自动发现</el-button>
        <el-button type="primary" @click="showAddDialog">批量导入</el-button>
        <el-dropdown>
          <el-button type="primary">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>直接添加</el-dropdown-item>
            <el-dropdown-item>批量导出</el-dropdown-item>
            <el-dropdown-item>直接下架</el-dropdown-item>
            <el-dropdown-item>直接删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="toolbar">
          <el-input
            placeholder="请输入内容"
            v-model="inputquicksearch">
            <!-- <i slot="suffix" class="el-input__icon el-icon-search input-with-select"></i> -->
            <el-button @click="quicksearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
      </el-col>
      <el-col :span="21" class="toolbar">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="负载均衡" name="first">负载均衡</el-tab-pane>
          <el-tab-pane label="数据中心交换机" name="second">数据中心交换机</el-tab-pane>
          <el-tab-pane label="核心层交换机" name="third">核心层交换机</el-tab-pane>
          <el-tab-pane label="汇聚层交换机" name="fourth">汇聚层交换机</el-tab-pane>
          <el-tab-pane label="核心层路由器" name="five">核心层路由器</el-tab-pane>
          <el-tab-pane label="汇聚层路由器" name="six">汇聚层路由器</el-tab-pane>
          <el-tab-pane label="接入层交换机" name="seven">接入层交换机</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="1" class="toolbar" style="text-align:right;">
        <el-tooltip class="item" effect="light" offset="6" :enterable="enterable" content="切换搜索栏" placement="top-start">
          <i class="el-icon-zoom-in" style="margin-top:8px;" @click="showsearch()"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="2" class="toolbar" style="text-align:right;">
        <el-popover
          ref="popover2"
          placement="left-start"
          title="筛选显示列"
          width="150"
          trigger="click"
          >
          <el-button @click="resetChecked" size="mini">重置</el-button>
          <el-tree
            :data="showtitles"
            show-checkbox
            node-key="id"
            ref="tree"
            @check-change="getCheckedKeys"
           >
          </el-tree>
        </el-popover>
        <el-button v-popover:popover2 size="mini" type="primary">显示列筛选</el-button>
      </el-col>
      
      <!--列表-->
      <el-table :data="books" style="width: 100%" highlight-current-row @selection-change="selsChange" stripe>
        <el-table-column :key="Math.random()" type="selection"  width="40">
        </el-table-column>
        <el-table-column :key="Math.random()" type="index"  width="50" label="序号"></el-table-column>
        <el-table-column prop="id" :key="Math.random()"  label="资产编号"  sortable min-width="200" >
          <el-table-column prop="id"  :render-header="inputsearch" min-width="200" v-if="searchshow">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="name" :key="Math.random()" label="资产名称"  sortable width="200" v-if="checktitles.name">
          <el-table-column prop="name" :render-header="inputsearch" width="200" v-if="searchshow">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="author" :key="Math.random()" label="场地"  sortable width="100" v-if="checktitles.author">
          <el-table-column prop="author" :render-header="inputsearch" width="100" v-if="searchshow">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="publishAt" :key="Math.random()" label="创建时间" width="150"  sortable v-if="checktitles.publishAt" >
          <el-table-column prop="publishAt" :render-header="inputsearch" width="150" v-if="searchshow">
          </el-table-column>
        </el-table-column>
        <el-table-column :key="Math.random()" type="expand" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="[图书简介]">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :key="Math.random()" label="" width="80" fixed="right" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" offset="6" :enterable="enterable" content="修改" placement="top-start">
                <i class="el-icon-edit" @click="showEditDialog(scope.$index,scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="light" offset="6" :enterable="enterable" content="详情" placement="top-start">
                <i class="el-icon-tickets" @click="showEditDialog(scope.$index,scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="light" offset="6" :enterable="enterable" content="删除" placement="top-start">
                <i class="el-icon-delete" @click="delBook(scope.$index,scope.row)"></i>
              </el-tooltip>
              <!-- <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button> -->
              <!-- <el-button type="danger" @click="delBook(scope.$index,scope.row)" size="small">删除</el-button> -->
            </template>
        </el-table-column>
      </el-table>
<!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="limit" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <el-dialog title="编辑" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="书名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="editForm.author" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="editForm.description" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="书名" prop="name">
            <el-input v-model="addForm.name" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="addForm.author" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" placeholder="选择日期" :editable = "false" v-model="addForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="addForm.description" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
  import util from '../../common/util'
  import API from '../../api/api_book';

  export default{
    data(){
      return {
        filters: {
          name: ''
        },
        books: [],
        showtitles: [
          {
            id: "1",
            label: "基本信息",
            children: [
              // {
              //   id: "id", 
              //   label: "资产编号",
              //   disabled: true
              // },
              {
                id: "name", 
                label: "资产名称"
              },
              {
                id: "author", 
                label: "场地"
              },
              {
                id: "publishAt", 
                label: "创建时间"
              }
            ]
          }
        ],
        checktitles: {},
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        sels: [], //列表选中列
        propselects: [{ text: '家', value: '家' }, { text: '公司', value: '公司' }, { text: '', value: '末' }],
        activeName2: 'first',
        inputquicksearch:'',
        sarchtime: new Date(),
        searchspaceing: 1000, //触发搜索间隔
        searchshow:false, //是否显示搜索框
        enterable:false, //鼠标能否进入悬停显示

        //编辑相关数据
        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          name: [
            {required: true, message: '请输入书名', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ]
        },
        editForm: {
          id: 0,
          name: '',
          author: '',
          publishAt: '',
          description: ''
        },

        //新增相关数据
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入书名', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ]
        },
        addForm: {
          name: '',
          author: '',
          publishAt: '',
          description: ''
        }
      }
    },
    methods: {
      //筛选显示列
      getCheckedKeys(data) {
        let checktitlejson=this.$refs.tree.getCheckedKeys(true);
        let that=this;
        that.checktitles={};
        checktitlejson.forEach(function(value,index,array){
          that.checktitles[value]=true;
        });
      },
      //重置显示列
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      //快速搜索
      quicksearch(){
        // alert(this.$store.state.zcFzShowTitle.author)
        // alert(this.inputquicksearch);
        // alert( !this.$store.state.zcFzShowTitle.author);
        this.$store.commit('set_zcfz_showtitle', {author: !this.$store.state.zcFzShowTitle.author});
      },
      //tabs点击切换
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search();
      },
      handleSearch(){
        this.total = 0;
        this.page = 1;
        this.search();
      },
      search(){
        let that = this;
        let params = {
          page: that.page,
          limit: that.limit,
          name: that.filters.name
        };

        that.loading = true;
        API.findList(params).then(function (result) {
          that.loading = false;
          if (result && result.books) {
            that.total = result.total;
            that.books = result.books;
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //删除
      delBook: function (index, row) {
        let that = this;
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          that.loading = true;
          API.remove(row.id).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {
        });
      },
      //显示编辑界面
      showEditDialog: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //编辑
      editSubmit: function () {
        let that = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let para = Object.assign({}, this.editForm);
            para.publishAt = (!para.publishAt || para.publishAt == '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
            API.update(para.id, para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                that.$refs['editForm'].resetFields();
                that.editFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
        });
      },
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          author: '',
          publishAt: '',
          description: ''
        };
      },
      //新增
      addSubmit: function () {
        let that = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            that.loading = true;
            let para = Object.assign({}, this.addForm);
            para.publishAt = (!para.publishAt || para.publishAt === '') ? '' : util.formatDate.format(new Date(para.publishAt), 'yyyy-MM-dd');
            API.add(para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });

          }
        });
      },
      //批量删除
      batchDeleteBook: function () {
        let ids = this.sels.map(item => item.id).toString();
        let that = this;
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          that.loading = true;
          API.removeBatch(ids).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {

        });
      },
      //header搜索
      inputsearch: function (h, { column, $index }) {
        let that = this;
         return h('input', {
          style: {
            width:'92%'
          },
          attrs: {
            type: "text",
            searchtitle: column.property
          },
          on: {
            input: function (event) {
              // this.value = event.target.value
              // this.$emit('input', event.target.value)
            },
            keyup: function (event) {
              // alert(event.target.value);
              // alert(event.target.getAttribute("searchtitle"))
              that.sarchtime = new Date();
              setTimeout(function(){
                let newtime = new Date();
                if (newtime-that.sarchtime >= that.searchspaceing) {
                  // alert(event.target.getAttribute("searchtitle"));
                  // alert(event.target.value);
                  that.handleSearch();
                }
              },that.searchspaceing);
            }
          }
        })
      },
      showsearch: function () {
        this.searchshow = !this.searchshow;

      }
    },
    mounted() {
      this.handleSearch()
    }
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
  .toolbar{
  margin:10px auto 0;
}
.el-tabs--card > .el-tabs__header{
  border-bottom:none;
  margin: 0;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav{
  margin: 0 0 0 20px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
  background: #f5f7fa; 
  border-bottom-color:#dfe4ed !important;
}
.el-table .nopadding>.cell{
  padding:0 !important;
}
.cell i,i.item{ 
  cursor: pointer;
  font-size: 16px;
  color: #409eff;
 }
 .el-table thead th{
  background: #f5f7fa;
 }
</style>
