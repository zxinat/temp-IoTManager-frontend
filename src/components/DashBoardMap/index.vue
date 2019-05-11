<template>
  <div>
    <div class="block">
      <span class="demonstration">地域筛选</span>
      <el-cascader
        :options="selectorOptions"
        v-model="selectedArea"
        @change="areaFilter">
      </el-cascader>
      <div class="dashboard-map-container">
        <!--<h2>-->
        <!--中国地图-->
        <!--</h2>-->
      </div>
    </div>

  </div>

</template>

<script>
  // http://efe.baidu.com/blog/echarts-map-tutorial/
  // http://gallery.echartsjs.com/editor.html?c=xBJDR584vG
  import echarts from 'echarts';
  // 一定要引入才能正常显示
  import 'echarts/map/js/china';

  export default {
    name: "DashBoardMap",
    data() {
      return {
        chart: null,
        option: {
          backgroundColor: '#404a59',  		// 图表背景色
          tooltip: {
            trigger: 'item',
            formatter: function (data)//对提示框的数据自定义
            {
              return data.seriesName + '<br/>' + data.name + '：' + (data.value[2]); //将小数转化为百分数显示

            }
          }, // 鼠标移到图里面的浮动提示框
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            // roam: true,
            itemStyle: {					// 定义样式
              normal: {					// 普通状态下的样式
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {					// 高亮状态下的样式
                areaColor: '#483636'
              }
            }
          },
          series: [
            {
              name: '设备分布', // series名称
              type: 'scatter', // series图表类型
              coordinateSystem: 'geo', // series坐标系类型
              data: [
                {name: '海门', value: [121.15, 31.89, 90]},
                {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
                {name: '招远', value: [120.38, 37.35, 142]},
                {name: '舟山', value: [122.207216, 29.985295, 123]}
              ],
            }
          ]
        },
        selectorOptions: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedArea: []
      };
    },
    mounted() {
      this.chinaConfigure();
    },
    methods: {
      chinaConfigure() {
        let myChart = echarts.init(document.getElementsByClassName('dashboard-map-container')[0]); //这里是为了获得容器所在位置
        window.onresize = myChart.resize;
        myChart.setOption(this.option)
        console.log(this.option);
      },
      areaFilter(value) {
        console.log(value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties.scss";

  .block {
    margin: 10px;
  }

  .dashboard-map-container {
    height: $dashboard-block-height;
  }
</style>
