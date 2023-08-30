<template>
  <div class="p20 bg">
    <div class="chart-box" id="linesBox"></div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, reactive, markRaw, watch, onBeforeUnmount, computed } from 'vue'
import { ElButton, ElDatePicker } from 'element-plus'
import * as echarts from 'echarts'


const { proxy } = getCurrentInstance();

// 路径线
const linesChart = ref()

const initLineChart = () => {
  const dom = document.getElementById('linesBox')
  linesChart.value = markRaw(
    echarts.init(
      dom,
      null,
      {
        renderer: 'canvas',
        useDirtyRect: false
      }
    )
  )
  var option = {
    //使用直角坐标需要xAxis和yAxis
    xAxis: {
      type: 'value',
      show: true,
      min: 0,
      max: 300,
      // axisLine: {
      //   lineStyle: {
      //     color: 'red'
      //   }
      // },
      // splitLine: {
      //   lineStyle: {
      //     color: 'red'
      //   }
      // }
    },
    yAxis: {
      type: 'value',
      show: true,
      min: 0,
      max: 500,
      // axisLine: {
      //   lineStyle: {
      //     color: 'red'
      //   }
      // },
      // splitLine: {
      //   lineStyle: {
      //     color: 'red'
      //   }
      // }
    },
    //直角坐标系中的绘图网格
    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: false
    },
  

    series: [
      

    {
      type: 'lines',
      symbol: ['none', 'none'],
      polyline: true,//是否是多段线
      silent: true,
      coordinateSystem: 'cartesian2d',//指定该系列使用的坐标系（直角坐标系需要添加xAxis和yAxis坐标）
      // lineStyle: {//线的样式
      //   type: 'solid',//线的类型（虚线）
      //   width: 2,//线宽
      //   color: 'black'//线的颜色
      // },

      lineStyle: { //线的样式
        width: 1,
        normal: {
          type: 'solid',//线的类型（实线）
          opacity: 0,
          curveness: 0.4, // 曲线的弯曲程度
          color: '#3be3ff'
        }
      },



      effect: {//线特效的配置
        show: true,//是否显示特效
        period: 10 ,// 箭头指向速度，值越小速度越快
        trailLength: 0.1,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
        symbol: 'arrow',//线两端的标记类型
        symbolSize: 5, // 图标大小
      },
      //线的数据集（第一个coord是起点，第二个coord是终点）
      data: [
        [
          { coord: [100, 100] }, 
          { coord: [134, 222], effect: { color: 'green' }},
          { coord: [200, 200], effect: { color: 'green' }}





    

        //   {

          

        //   "coords": [
				// 		[
				// 			206,
				// 			267
				// 		],
				// 		[
				// 			284,
				// 			267
				// 		],
				// 		[
				// 			284,
				// 			413
				// 		],
				// 		[
				// 			295,
				// 			413
				// 		]
				// 	]

        // }


        ],
        // [
        //   { coord: [0, 1] }, { coord: [1, 1], effect: { color: 'red' } }
        // ]

      ]
    }]
  }
  linesChart.value.setOption(option)
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
