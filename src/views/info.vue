<template>
	 <div class="p20">
    <div>str ==> {{str}}</div>
    <div>num ==> {{num}}</div>
    <div>arr ==> {{arr}}</div>
    <div>isOk ==> {{isOk}}</div>
    <div>obj ==> {{obj}}</div>
   
    <el-button type="primary" @click="setIsOk">setIsOk</el-button>
    <el-button type="primary" @click="setStr">setStr</el-button>
    <el-button type="primary" @click="setObj">setObj</el-button>
    <el-button type="primary" @click="getApiDemoInfo">getApiDemoInfo</el-button>


    <br />


    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
      />


   
   </div>
</template>

<script setup>
import { getCurrentInstance,onMounted,ref } from 'vue';
import { ElButton,ElDatePicker } from 'element-plus'
import { storeToRefs } from 'pinia';
import { useDemo } from '@/stores/demo';


const { proxy } =getCurrentInstance();

const value1 = ref('')

const storesDemo = useDemo();
const { str,num,arr,isOk,obj } = storeToRefs(storesDemo);

function setIsOk(){
  let aa = true
  storesDemo.setIsOk(aa)
}


function setStr(){
  let str = "收到广东省郭德纲"
  storesDemo.setStr(str)
}


function setObj(){
  let obj = {
			name:"11111111111",
			sex:"2222222222",
			age:202222
  }
  storesDemo.setObj(obj)
}


async function getApiDemoInfo(){
  let obj = await storesDemo.getApiDemoInfo()
  storesDemo.setDemo(obj)
}



onMounted(() => {


})


</script>

<style scoped lang="scss">
</style>
