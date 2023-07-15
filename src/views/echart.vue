<template>
	 <div class="p20">


    <el-button type="primary" @click="getDiskData">getDiskData</el-button>

    <p v-if="diskData.length">{{diskData[0]}}</p>

    <div id="peiBox" style="width: 100%; height: 300px; background-color: #dedede; margin-bottom: 20px; margin-top: 20px;"></div>
    
    <div id="lineBox" style="width: 100%; height: 300px; background-color: #dedede;"></div>


    
   
   </div>
</template>

<script setup name="echart">
import { getCurrentInstance,onMounted,ref,reactive,markRaw  } from 'vue'
import * as echarts from 'echarts'
import { ElButton,ElDatePicker } from 'element-plus'
import { storeToRefs } from 'pinia';
import { useSocket } from '@/stores/socket';

const { proxy } =getCurrentInstance();

const storesSocket = useSocket();
const { diskData } = storeToRefs(storesSocket);


const getDiskData =()=>{
  storesSocket.getDiskData()

}








const seriesData = ref(
  [
    {
      name: 'CPU',
      type: 'line',
      //stack: 'Total',
      smooth: true,
      showSymbol: false,
      data: []
    },
    {
      name: 'GPU',
      type: 'line',
      //stack: 'Total',
      smooth: true,
      showSymbol: false,
      data: []
    },
  ]
)

const option = reactive({
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['CPU', 'GPU']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false
        },
        nameLocation: 'middle'
        //data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData.value
});


const lineChart = ref()

const initLineChart = ()=>{
  const dom = document.getElementById('lineBox')
  lineChart.value = markRaw(
    echarts.init(
      dom, 
      null, 
      {
        renderer: 'canvas',
        useDirtyRect: false
      }
    )
  )

  setInterval(()=> {
    seriesData.value[0].data.push(Math.random() * 100)
    //seriesData.value[1].data.push(Math.random() * 100)
    lineChart.value.setOption({
      series: seriesData.value
    });
  }, 1000);

  if (option && typeof option === 'object') {
    lineChart.value.setOption(option);
  }

 
  window.addEventListener('resize', lineChart.value.resize);

}




onMounted(() => {
  initLineChart()
})


</script>

<style scoped lang="scss">
</style>
