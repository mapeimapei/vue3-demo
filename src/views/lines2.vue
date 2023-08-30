<template>
  <div class="p20 bg">
    <div class="chart-box" id="linesBox"></div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { ElButton, ElDatePicker } from 'element-plus'
import * as echarts from 'echarts'


const { proxy } = getCurrentInstance();

// 路径线
const linesChart = ref()








const dotsArr = [
      [ // 这个括号里代表的一组数据的运动,即从点[205, 275]运动到点[263, 275]
        [205, 275],
        [263, 275],
        [500, 500],
      ],
      [ // 这组点里有四个点
        [206, 267],
        [284, 267],
        [284, 413],
        [295, 413]
      ],
    ]


let speed = { // 转速
  type: Number,
  default: 7
}


const getLines = () => {
  return {
    type: 'lines',
    coordinateSystem: 'cartesian2d',
    // symbol:'arrow',
    zlevel: 1,
    symbol: ['none', 'none'],
    polyline: true,
    silent: true,
    effect: {
      symbol: 'arrow',
      show: true,
      period: 7, // 箭头指向速度，值越小速度越快
      trailLength: 0.01, // 特效尾迹长度[0,1]值越大，尾迹越长重
      symbolSize: 5, // 图标大小
    },
    lineStyle: {
      width: 1,
      normal: {
        opacity: 0,
        curveness: 0.4, // 曲线的弯曲程度
        color: '#3be3ff'
      }
    }
  }

}

const getOption = () => {
  // 点合集-在图片上一个一个量的，注意以渲染盒子左下角为原点，点取值方法：以图片左下角为原点，量几个线段点的（x,y）


  // 点的处理-量图上距离转换为在渲染盒子中的距离 start
  dotsArr.map(item => {
    item.map(sub => {
      sub[0] = sub[0] // x值
      sub[1] = sub[1] // y值
    })
  })
  // 点的处理-量图上距离转换为在渲染盒子中的距离 end

  // 散点图和lines绘制 start
  let scatterData = []
  let linesData = [] // 默认路径图点的路径
  let seriesLines = [] // 路径图
  dotsArr.map(item => {
    scatterData = scatterData.concat(item) // 散点图data
    linesData.push({
      coords: item
    })
  })


  console.log("linesData",linesData)

  // 默认路径图
  linesData && linesData.length && seriesLines.push({
    ...getLines(),
    data: linesData
  })
  // 散点图和lines绘制 end


  console.log("seriesLines",seriesLines)

  let option = {
    backgroundColor: 'transparent',
    xAxis: {
      // type: 'category',
      type: 'value',
      show: false,
      min: 0,
      max: 600,
      axisLine: {
        lineStyle: {
          color: 'red'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'red'
        }
      }
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 400,
      axisLine: {
        lineStyle: {
          color: 'red'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'red'
        }
      }
      // type: 'category'
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: false
    },
    series: [
      {
        zlevel: 2,
        symbolSize: 0,
        data: scatterData,
        type: 'scatter'
      },
      ...seriesLines
    ]
  };

  console.log("option",JSON.stringify(option))


  return option
}

// 绘制图表
const draw = () => {
  linesChart.value.clear()
  resetChartData()
}
// 刷新数据
const resetChartData = () => {
  linesChart.value.setOption(getOption(), true)
}



const initLineChart = () => {
  const dom = document.getElementById('linesBox')
  linesChart.value = echarts.init(dom)
  draw()
}

onMounted(() => {
  initLineChart()

})


</script>

<style scoped lang="scss">
.bg {
  background-color: #e1e1e1;
  height: 100%;
}

.chart-box {
  width: 1000px;
  height: 800px;


}
</style>
