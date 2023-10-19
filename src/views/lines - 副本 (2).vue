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
      // min: 1,
      // max: 1,
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
      // min: 1,
      // max: 1,
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
      type: "graph",
      layout: "none",//图的布局（none不采用任何布局）
      focusNodeAdjacency: true, // 鼠标悬浮到某节点，则此节点以及其所有邻接节点高亮
      roam: true, // 鼠标缩放和平移漫游
      symbolSize: [50, 50],//节点标记大小
      symbol: '',//节点图标（写在这里所有的图标都一样）
      //categories: "categories",//节点分类的类目
      coordinateSystem: 'cartesian2d',//指定该系列使用的坐标系（直角坐标系需要添加xAxis和yAxis坐标）
      edgeSymbol: ['circle', 'arrow'],//边两端的标记类型（左边圆圈，右边箭头）
      edgeSymbolSize: [4, 10],//边两端的标记大小
      lineStyle: {//关系边的公用线条样式
        normal: {
          width: 2,
          shadowColor: "none",
          color: "purple",
        }
      },

      //节点集合（节点的name不能重复）
      data: [
        {
          name: "a",
          //symbol:'image://'+require('@/assets/1.png'),//节点图标（写在这里可以分别显示不同的图标）
          value: [0, 1]//坐标
        },
        {
          name: "b",
          value: [1, 1]
        },
        {
          name: "c",
          value: [1, 2]
        }, {
          name: 'd',
          value: [1, 0]
        }
      ],

    },
    {
      type: 'lines',
      polyline: true,//是否是多段线
      coordinateSystem: 'cartesian2d',//指定该系列使用的坐标系（直角坐标系需要添加xAxis和yAxis坐标）
      lineStyle: {//线的样式
        type: 'dashed',//线的类型（虚线）
        width: 2,//线宽
        color: 'black'//线的颜色
      },
      effect: {//线特效的配置
        show: true,//是否显示特效
        trailLength: 0.1,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
        symbol: 'arrow',//线两端的标记类型
        symbolSize: 8//线两端的标记大小
      },
      //线的数据集（第一个coord是起点，第二个coord是终点）
      data: [
        [
          { coord: [0, 1] }, { coord: [1, 0], effect: { color: 'green' } }
        ],
        [
          { coord: [0, 1] }, { coord: [1, 1], effect: { color: 'red' } }
        ],
        [
          { coord: [0, 1] }, { coord: [1, 2], effect: { color: 'green' } }
        ]

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
