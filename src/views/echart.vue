<template>
	 <div class="p20">


    <el-button type="primary" @click="getDiskData">getDiskData</el-button>

    <el-button type="primary" :disabled="cxlOnlineData.length" @click="getCxlData">getCxlData</el-button>


    <p>{{curlineType}}</p>

    <div id="peiBox" style="width: 100%; height: 300px; background-color: #dedede; margin-bottom: 20px; margin-top: 20px;">
      realCxlOnlineCpu:{{realCxlOnlineCpu}} <br />
      realCxlOnlineGpu:{{realCxlOnlineGpu}} <br />

      realDisk.cup:{{realDisk.cup ? realDisk.cup.value : 0}} <br />
      realDisk.gpu:{{realDisk.gpu ? realDisk.gpu.value : 0}} <br />

      <div class="clx">
        <div class="item1 left" style="width: 200px; height: 200px;" @click="setCurLineFn('cpu')">
            <mProgress 
              :width="200" 
              title="CPU" 
              :ratio="realCxlOnlineCpu" 
              :percentage="realCxlOnlineCpu" 
              :inside-percentage="realDisk.cup ? realDisk.cup.value : 0"
            ></mProgress>
        </div>

        <div class="item2 left" style="width: 200px; height: 200px;" @click="setCurLineFn('gpu')">
            <mProgress 
              :width="200" 
              title="GPU" 
              :ratio="realCxlOnlineGpu" 
              :percentage="realCxlOnlineGpu" 
              :inside-percentage="realDisk.gpu ? realDisk.gpu.value : 0"
            ></mProgress>
        </div>

      </div>

    
    </div>
    
    <div id="lineBox" style="width: 100%; height: 300px; background-color: #dedede; margin-bottom: 20px;"></div>


    <decode-throughput />
   
   </div>
</template>

<script setup name="echart">
import { getCurrentInstance,onMounted,ref,reactive,markRaw,watch   } from 'vue'
import * as echarts from 'echarts'
import { ElButton,ElDatePicker } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'
import mProgress from "@/components/m-progress.vue"


import decodeThroughput from "./decode-throughput.vue"

const { proxy } =getCurrentInstance();

const storesSocket = useSocket();
const { diskData,distCpu,distGpu,cxlOnlineData,cxlOnlineCpu,cxlOnlineGpu,realCxlOnlineCpu,realCxlOnlineGpu,step } = storeToRefs(storesSocket);


const seriesData = ref(
  [
    {
      name: 'CXL',
      type: 'line',
      //stack: 'Total',
      smooth: true,
      showSymbol: false,
      data: []
    },
    {
      name: 'Disk',
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
        data: ['CXL', 'Disk']
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

  if (option && typeof option === 'object') {
    lineChart.value.setOption(option);
  }

  window.addEventListener('resize', lineChart.value.resize);

}


const getDiskData = async ()=>{
  await storesSocket.getDiskData()
  if(!!distCpu.value.length){


    seriesData.value[1].data = distCpu.value
    lineChart.value.setOption({series: seriesData.value})
  }
}

const getCxlData = async ()=>{
  await storesSocket.getCxlData()
}

const realDisk = reactive({
  cpu:null,
  gpu:null,
})





const cpuRealDataFn =()=>{
  seriesData.value[0].data = cxlOnlineCpu.value
  lineChart.value.setOption({series: seriesData.value})
}

const gpuRealDataFn =()=>{
  seriesData.value[0].data = cxlOnlineGpu.value
  lineChart.value.setOption({series: seriesData.value})
}




const curlineType = ref('cpu')
const setCurLineFn =(val)=>{
  if(curlineType.value === val) return
  curlineType.value = val

  lineChart.value.clear()
  option.series = []
  lineChart.value.setOption(option)



  if(curlineType.value ==='cpu'){

    seriesData.value[1].data = distCpu.value
    lineChart.value.setOption({series: seriesData.value})

    cpuRealDataFn()
  }else if(curlineType.value ==='gpu'){
    seriesData.value[1].data = distGpu.value
    lineChart.value.setOption({series: seriesData.value})
    gpuRealDataFn()

  }else{


  }






  



}
  

const diskRealDataFn = ()=>{
  // 这里的数据处理比较草率
  realDisk.cup = distCpu.value[step.value]
  realDisk.gpu = distGpu.value[step.value]
}

watch(
  cxlOnlineData,
  (newVal, oldVal) => {
    diskRealDataFn()
    curlineType.value === 'cpu' && cpuRealDataFn()
  },
  {
    //immediate: true,
    deep: true
  }
)






onMounted(() => {
  initLineChart()
})

</script>

<style scoped lang="scss">
</style>
