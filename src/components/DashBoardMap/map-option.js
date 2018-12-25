
var myData = [

  {name: '海门', value: [121.15, 31.89, 90]},
  {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
  {name: '招远', value: [120.38, 37.35, 142]},
  {name: '舟山', value: [122.207216, 29.985295, 123]}
]


export default  { // 进行相关配置
  backgroundColor: '#404a59',  		// 图表背景色
  tooltip: {}, // 鼠标移到图里面的浮动提示框
  geo: { // 这个是重点配置区
    map: 'china', // 表示中国地图
    roam: true,
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
      data: myData // series数据内容
    }
  ]
}
