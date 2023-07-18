<template>
	 <div style="width: 450px; height: 150px; background-color: #aaa;" v-if="!!decodeThroughput">
        decode throughput: {{decodeThroughput.val}}
   </div>
</template>

<script setup name="decode-throughput">
import { getCurrentInstance,onMounted,ref,reactive,markRaw,watch,onBeforeUnmount} from 'vue'
import * as echarts from 'echarts'
import { ElButton,ElDatePicker } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useSocket } from '@/stores/socket'




const { proxy } =getCurrentInstance();

const storesSocket = useSocket();
const { decodeThroughput } = storeToRefs(storesSocket);






onMounted(() => {

})

onBeforeUnmount(() => {
   console.log("2222")
})

</script>

<style scoped lang="scss">
</style>
