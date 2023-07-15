<template>
	 <div style="width: 450px; height: 150px; background-color: #aaa;" v-if="!!decodeThroughput">
        decode throughput: {{decodeThroughput.val}}
   </div>
</template>

<script setup name="decode-throughput">
import { getCurrentInstance,onMounted,ref,reactive,markRaw,watch   } from 'vue'
import * as echarts from 'echarts'
import { ElButton,ElDatePicker } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'

import { getDecodeThroughputApi } from "@/api/demo"


const { proxy } =getCurrentInstance();

const storesSocket = useSocket();
const { decodeThroughput } = storeToRefs(storesSocket);


const getDecodeThroughput = ()=>{
  getDecodeThroughputApi()
}




onMounted(() => {
  getDecodeThroughput()
})


</script>

<style scoped lang="scss">
</style>
