<template>
  <div class="p20">
    
    
    <el-button @click="get_cxl_history_data" type="primary">get_cxl_history_data</el-button>


    <el-button @click="cxl_online" type="primary">cxl_online</el-button>
    


  </div>
</template>

<script setup  name="socket2">
import { getCurrentInstance, onMounted, onUnmounted, ref, reactive } from 'vue';
import { ElButton,ElInput} from 'element-plus'

import { useSocket } from "@/stores/socket"

import mySocketio from "@/utils/socket.io"





const { proxy } = getCurrentInstance()




const storesSocket = useSocket();
//const { socketMsg, socketMsgList } = proxy.$storeToRefs(storesSocket);


const get_cxl_history_data = ()=>{
  mySocketio.sendMsg('cxl_history','data_request');

}


const cxl_online = ()=>{
  mySocketio.sendMsg('cxl_online','data_request');

}






const sendMessage = () => {
  let msg = { "msg": input.value }
  mySocketio.sendMsg(msg)
  input.value = ""
}




onMounted(async () => {

})

onUnmounted(() => {

});

</script>

<style scoped lang="scss"></style>