<template>
    <div class="statistics-container">
      <!--<h2>-->
        <!--统计信息-->
      <!--</h2>-->
    </div>
</template>

<script>
  import echarts from 'echarts';
    export default {
        name: "DashboardStatistics",
      data(){
          return{
            option : {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
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
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                  ]
                }
              ]
            }
          }
      },
      mounted() {
        this.initChart();
      },
      methods: {
        initChart() {
          this.chart = echarts.init(document.getElementsByClassName('statistics-container')[0]);
          // 把配置和数据放这里
          console.log(this.option);
          this.chart.setOption(this.option)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variaties";
.statistics-container{
  height: $dashboard-block-height;
  margin: 10px;
}
</style>
