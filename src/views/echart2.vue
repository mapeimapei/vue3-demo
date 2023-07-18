<template>
	 <div class="p20">

    <el-button type="primary" @click="getData()">getData</el-button>


    <div id="peiBox" style="width: 100%; height: 300px; background-color: #dedede; margin-bottom: 20px; margin-top: 20px;">

      <div class="clx">
        <div class="item1 left" style="width: 200px; height: 200px;" @click="setCurLineFn('GPU%')">
            <mProgress 
              v-if="cxlState"
              :width="200" 
              title="GPU UTILIZATION" 
              :ratio="cxlState['GPU%']" 
              :percentage="cxlState['GPU%']" 
              :inside-percentage="diskState['GPU%']"
            ></mProgress>
        </div>

        <div class="item2 left" style="width: 200px; height: 200px;" @click="setCurLineFn('GPUMEM%')">
            <mProgress 
              v-if="cxlState"
              :width="200" 
              title="GPU MEM.UTILIZATION" 
              :ratio="cxlState['GPUMEM%']" 
              :percentage="cxlState['GPUMEM%']" 
              :inside-percentage="diskState['GPUMEM%']"
            ></mProgress>
        </div>

        <div class="item1 left" style="width: 200px; height: 200px;" @click="setCurLineFn('CPU%')">
            <mProgress 
              v-if="cxlState"
              :width="200" 
              title="CPU UTILIZATION" 
              :ratio="cxlState['CPU%']" 
              :percentage="cxlState['CPU%']" 
              :inside-percentage="diskState['CPU%']"
            ></mProgress>
        </div>

        <div class="item2 left" style="width: 200px; height: 200px;" @click="setCurLineFn('MEM%')">
            <mProgress 
              v-if="cxlState"
              :width="200" 
              title="MEM.UTILIZATION" 
              :ratio="cxlState['MEM%']" 
              :percentage="cxlState['MEM%']" 
              :inside-percentage="diskState['MEM%']"
            ></mProgress>
        </div>


        <div class="item2 left" style="width: 200px; height: 200px;" @click="setCurLineFn('CXLMEM%')">
            <mProgress 
              v-if="cxlState"
              :width="200" 
              title="CXL MEM.UTILIZATION" 
              :ratio="cxlState['CXLMEM%']" 
              :percentage="cxlState['CXLMEM%']" 
              :inside-percentage="diskState['CXLMEM%']"
            ></mProgress>
        </div>

      </div>
    </div>

    <div class="progressBox">
      <el-slider v-if="live_progress_bar_value" v-model="live_progress_bar_value['live_progress_bar_value_%']" />
    </div>

    <div>
      <el-checkbox v-model="checkedCXL" label="CXL" />
      <el-checkbox v-model="checkedDisk" label="Disk" />
    </div>

   
    <div id="lineBox" style="width: 100%; height: 300px; background-color: #dedede; margin-bottom: 20px;"></div>


    <div class="throughput">
      <div class="" style="width: 200px; height: 200px;">
            <mProgress 
              v-if="live_cxl_throughput_value"
              :width="200" 
              title="DECODE THROUGHPUT" 
              :tokens= "live_cxl_throughput_value['live_cxl_throughput_value']"
              :percentage="live_cxl_throughput_value['live_cxl_throughput_value%']" 
              :inside-percentage="!!checkedDisk ? disk_throughput_value['disk_throughput_value%']:null"
            ></mProgress>
        </div>
    </div>

   </div>
</template>

<script setup name="echart">
import { getCurrentInstance,onMounted,ref,reactive,markRaw,watch,onBeforeUnmount,computed   } from 'vue'
import * as echarts from 'echarts'
import { ElButton,ElDatePicker,ElCheckbox,ElSlider } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'
import mProgress from "@/components/m-progress.vue"
import mySocketio from "@/utils/socket.io"

const { proxy } =getCurrentInstance()

const storesSocket = useSocket()
const {
  cxl_online, 
  cxl_history, 
  disk_history,
  live_progress_bar_value,
  live_cxl_throughput_value,
  disk_throughput_value,
  cxl_online_obj,
  cxl_history_obj,
  disk_history_obj
} = storeToRefs(storesSocket)


// 实时数据定时器
const liveTimer = ref()
// 清除定时器
const clearLiveTimer = ()=>{
  clearInterval(liveTimer.value)
  liveTimer.value = null
  //将store中的数据也清空掉
  storesSocket.clearState()
}

// 初始化，获取所有数据
const getData = ()=>{
  // Request HISTORY CXL data
  mySocketio.sendMsg('cxl_history','data_request')
  // Request HISTORY Disk data
  mySocketio.sendMsg('disk_history','data_request')
  // Request  DISK Throughput data
  mySocketio.sendMsg('disk_throughput_value','data_request')

  // Request ONLINE CXL data
  mySocketio.sendMsg('cxl_online','data_request')
  // Request live Progress data
  mySocketio.sendMsg('live_progress_bar_value','data_request')
  // Request Live CXL Throughput data
  mySocketio.sendMsg('live_cxl_throughput_value','data_request')
  
  // 三个实时数据需要一秒请求一次
  liveTimer.value = setInterval(()=>{
    // Request ONLINE CXL data
    mySocketio.sendMsg('cxl_online','data_request')
    // Request live Progress data
    mySocketio.sendMsg('live_progress_bar_value','data_request')
    // Request Live CXL Throughput data
    mySocketio.sendMsg('live_cxl_throughput_value','data_request')
  },1000)
}

// 鼠标是否在折线上
const isHover = ref(false)

// 这是2个复选框
const checkedCXL = ref(false)
const checkedDisk = ref(false)

const defaultState = {
		"CPU%": 0,
		"MEM%": 0,
		"GPU%": 0,
		"GPUMEM%": 0,
		"CXLMEM%": 0,
		"PCI_TX_MBps": 0,
		"PCI_RX_MBps": 0,
		"PRODUCT": "",
		"PCI_INFO": "",
		"GPUMEM_USED_MB": 0,
		"GPUMEM_TOTAL_MB": 0,
		"STEP": 0
}

// 计算属性 表盘上的cxl值
const cxlState = computed(() => {
  let val = defaultState
  if(!!isHover.value){
    // 鼠标在折线上 

  }else if(!checkedCXL.value){
    // cxl 未勾选 则显示 online 数据
    if(cxl_online.value.length > 0 ){
      val = cxl_online.value.at(-1)
    }
  }else{
    // cxl 勾选 则显示 history 数据
    val = cxl_history.value.at(-1)
  }
  return val
})

// 获取 step 
const step = computed(()=>{
  return cxlState.value?.STEP || 0
})

// step需要一个监听-------------------------

// 计算属性 表盘上的disk值
const diskState = computed(() => {

  let val = defaultState
  if(!!isHover.value){
    // 鼠标在折线上 


  }else if(!!checkedDisk.value){
    // disk 勾选 则显示 history 数据的历史数据
    if(disk_history.value.length > 0 && disk_history.value.length > step.value){
      // 当数组长度大于 step 则显示第 step 个
      val = disk_history.value[step.value]
    }else if(disk_history.value.length < step.value) {
      // 当数组长度小于 step 则显示最后一个
      val = disk_history.value.at(-1)
    }
  }

  return val
})

// 折线 option.series
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

// 折线 option
const option = reactive({
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['CXL', 'Disk'],
        selected: {
          'CXL':true,
          'Disk':false,
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false
        },
        nameLocation: 'middle'
        //data: []
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData.value
});

// 折线
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


// 折线显示了数据类型 默认 GPU%
const curlineType = ref('GPU%')
const setCurLineFn =(val)=>{
  //if(curlineType.value === val) return
}

watch(
  cxl_online,
  (newVal, oldVal) => {
    console.log(111)
    if(!checkedCXL.value){
      setLineSeriesDataFn()
    }
    
  },
  {
    deep: true
  }
)

// 监听 checked-CXL 是否选择
watch(
  ()=> checkedCXL.value,
  (newVal, oldVal) => {
    if(!!checkedCXL.value){
      seriesData.value[0].data = cxl_history_obj.value[curlineType.value]
    }else{
      // 这里不用写代码 因为  setLineSeriesDataFn 会自动执行
    }

    lineChart.value.setOption({series: seriesData.value})
  }
)

// 监听 checked-disk 是否选择
watch(
  ()=> checkedDisk.value,
  (newVal, oldVal) => {
    if(!!checkedDisk.value){
      seriesData.value[1].data = disk_history_obj.value[curlineType.value]
    }else{
      seriesData.value[1].data = []
    }

    lineChart.value.clear()
    option.legend.selected = {
      'CXL':true, //CXL 永远都会选择
      'Disk':checkedDisk.value,
    }
    lineChart.value.setOption(option)
  }
)

const setLineSeriesDataFn =()=>{
  seriesData.value[0].data = cxl_online_obj.value[curlineType.value]
  lineChart.value.setOption({series: seriesData.value})
}

onMounted(() => {
  getData() //获取数据
  initLineChart() // 初始化折线图
})

onBeforeUnmount(() => {
  clearLiveTimer()
})

</script>

<style scoped lang="scss">
</style>