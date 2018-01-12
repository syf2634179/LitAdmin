<template>
  <el-row class="warp">
    <el-col :span="24" >
      <el-col :span="5" class="tip">
        综述
      </el-col>
      <el-col :span="3" :offset="16" style="margin-top:14px;">
        <el-select v-model="value7" placeholder="请选择">
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-col>
    </el-col>
    <el-col :span="24" class="warp-breadcrum">
      <el-col :span="17">
        <el-container class="el-containerc">
          <el-header class="el-headerc" height="40px">资产数量</el-header>
          <el-main>
            <el-col :span="4" class="rightborder">
              <el-container>
                <el-header class="el-headeri" height="40px">总数量</el-header>
                <el-main class="textcolor Info">
                  200
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="5" class="rightborder">
              <el-container>
                <el-header class="el-headeri" height="40px">闲置中</el-header>
                <el-main class="textcolor">
                  40
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="5" class="rightborder">
              <el-container>
                <el-header class="el-headeri" height="40px">使用中</el-header>
                <el-main class="textcolor Success">
                  150
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="5" class="rightborder">
              <el-container>
                <el-header class="el-headeri" height="40px">维护中</el-header>
                <el-main class="textcolor Warning">
                  5
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="5">
              <el-container>
                <el-header class="el-headeri" height="40px">已报废</el-header>
                <el-main class="textcolor Danger">
                  5
                </el-main>
              </el-container>
            </el-col>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="6" style="float:right;">
        <el-container class="el-containerc">
          <el-header class="el-headerc" height="40px">资产回收站</el-header>
          <el-main>
            <el-col :span="12" class="rightborder">
              <el-container>
                <el-header class="el-headeri" height="40px">总数量</el-header>
                <el-main class="textcolor Danger">
                  10
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12" >
              <el-col :span="24" class="el-headeril34">
                <el-button type="primary" size="mini" plain style="width:90%;">还原上次删除</el-button>
              </el-col>
              <el-col :span="24" class="el-headeril34">
                <el-button type="success" size="mini" style="width:90%">管理</el-button>
              </el-col>
            </el-col>
          </el-main>
        </el-container>
      </el-col>
    </el-col>
    <el-col :span="24" class="warp-main">
      <section class="chart-container ">
        <el-row id="sortable" class="list-group">

          <el-col :span="8" class="list-group-item">
            <el-col :span="24" class="tip-bottom">
              资产分类占比
            </el-col>
            <el-col :span="24" class="chartbg">
              <div id="chartPie" style="width:100%; height:330px;"></div>
            </el-col>
          </el-col>

          <el-col :span="8" class="list-group-item">
            <el-col :span="24" class="tip-bottom">
              资产状态占比
            </el-col>
            <el-col :span="24" class="chartbg">
              <div id="chartBar" style="width:100%; height:330px;"></div>
            </el-col>
          </el-col>

          <el-col :span="8" class="list-group-item">
            <el-col :span="24" class="tip-bottom">
              回收站资产统计
            </el-col>
            <el-col :span="24" class="chartbg">
              <div id="chartLine" style="width:100%; height:330px;"></div>
            </el-col>
          </el-col>

          <el-col :span="16" class="list-group-item">
            <el-col :span="24" class="tip-bottom"  style="padding:0px 0px 4px 10px;">
              <el-col :span="20" class="list-group-item" style="padding:4px 0 0 0;">
                本周告警数TOP10资产
              </el-col>
              <el-col :span="4" style="padding:0px;">
                <el-select v-model="value7" placeholder="请选择" >
                  <el-option-group
                    v-for="group in options3"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" class="chartbg">
              <template>
                <el-table
                  :data="tableData"
                  border
                  height="330"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="资产编号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资产名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="状态">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-col>

          <el-col :span="8" class="list-group-item">
            <el-col :span="24" class="tip-bottom">
              资产告警数量分类对比
            </el-col>
            <el-col :span="24" class="chartbg">
              <div id="chartColumn" style="width:100%; height:330px;"></div>
            </el-col>
          </el-col>

          <el-col :span="16" class="list-group-item">
            <el-col :span="24" class="tip-bottom"  style="padding:0px 0px 4px 10px;">
              <el-col :span="20" class="list-group-item" style="padding:4px 0 0 0;">
                近半年内即将过保资产
              </el-col>
              <el-col :span="4" style="padding:0px;">
                <el-select v-model="value7" placeholder="请选择" >
                  <el-option-group
                    v-for="group in options3"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" class="chartbg">
              <template>
                <el-table
                  :data="tableData"
                  border
                  height="330"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="资产编号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资产名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="状态">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-col>

          <el-col :span="8" class="list-group-item">
            <el-col :span="24" class="tip-bottom">
              资产质保时间分布
            </el-col>
            <el-col :span="24" class="chartbg">
              <div id="chartColumnX" style="width:100%; height:330px;"></div>
            </el-col>
          </el-col>
         <!--  <el-col :span="24" >
            <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
          </el-col> -->
        </el-row>
      </section>
    </el-col>
  </el-row>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .list-group-item {
    transition: all 1s;
    cursor: move;
  } 
  .el-headerc {
    background-color: #f2f2f2;
    color: #333;
    text-align: center;
    line-height: 40px;
    font-size:14px;
  }
  .el-containerc{
    border:1px solid #d8d8d8;
  }
  .rightborder{
    border-right:1px solid #d8d8d8;
  }
  .el-headeri,.el-headeril34{
    text-align: center;
    line-height: 40px;
    font-size:14px;
    padding:0;
  }
  .el-headeril34{
    line-height: 34px;
  }
  .textcolor{
    text-align: center;
    color:#409EFF;
    font-size:20px;
    padding:4px 0;
  }
  .textcolor.Success{
    color:#67C23A;
  }
  .textcolor.Warning{
    color:#E6A23C;
  }
  .textcolor.Danger{
    color:#ff0000;
  }
  .textcolor.Info{
    color:#909399;
  }
  .chart-container .el-col.chartbg{
    background: #f2f2f2;
    padding:0;
  }
</style>

<script>
  import echarts from 'echarts'
  import Sortable from 'sortablejs'
  document.body.ondrop = function (event) {  
    event.preventDefault();  
    event.stopPropagation();  
  }  
  export default {
    data() {
      return {
        currentDate: new Date(),
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null,
        chartColumnX: null,
        options3: [{
          label: '全部',
          options: [{
            value: 'all',
            label: '全部'
          }]
        }, {
          label: '机房名',
          options: [{
            value: 'h1',
            label: '机房1'
          }, {
            value: 'h2',
            label: '机房2'
          }, {
            value: 'h3',
            label: '机房3'
          }, {
            value: 'h4',
            label: '机房4'
          }]
        }],
        value7: 'all',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }]
      };
    },
    mounted: function () {
      var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartBar = echarts.init(document.getElementById('chartBar'));
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartPie = echarts.init(document.getElementById('chartPie'));
      this.chartColumnX = echarts.init(document.getElementById('chartColumnX'));

      this.chartBar.setOption({
        title: {
          text: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '45%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      this.chartLine.setOption({
        title: {
          text: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '45%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      this.chartPie.setOption({
        title: {
          text: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '45%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
      this.chartColumn.setOption({
        title: {
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });
      this.chartColumnX.setOption({
        title: {
          text: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '45%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      Sortable.create(sortable, { 
        animation: 300 
      });
    }
  }
</script>
