<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="alarm-container">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="status-container">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';
    export default {
        name: "DashboardStatistics",
      data(){
          return{
            alarmOption : {
              title : {
                text: '报警次数',
                x:'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['异常','严重告警','正常工作']
              },
              series: [
                {
                  name:'告警等级',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:335, name:'异常'},
                    {value:310, name:'严重告警'},
                    {value:234, name:'正常工作'},
                  ]
                }
              ]
            },
            statusOption : {
              title : {
                text: '设备状态',
                x:'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['在线','离线']
              },
              series: [
                {
                  name:'访问来源',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:335, name:'在线'},
                    // {value:310, name:'严重告警'},
                    {value:234, name:'离线'},
                  ]
                }
              ]
            }
          }
      },
      mounted() {
        this.initAlarmChart();
        this.initStatusChart();
      },
      methods: {
        initAlarmChart() {
          this.chart = echarts.init(document.getElementsByClassName('alarm-container')[0]);
          // 把配置和数据放这里
          console.log(this.alarmOption);
          this.chart.setOption(this.alarmOption)
        },
        initStatusChart(){
          this.chart = echarts.init(document.getElementsByClassName('status-container')[0]);
          // 把配置和数据放这里
          console.log(this.statusOption);
          this.chart.setOption(this.statusOption)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties";
.alarm-container,.status-container{
  height: $dashboard-block-height;
  margin: 10px;
}
</style>
