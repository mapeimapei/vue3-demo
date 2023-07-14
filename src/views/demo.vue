<template>
  <div class="p20">
    <el-button type="primary" @click="percentageFn">++++</el-button>




    <div class="clx">

         <div class="item1 left">
          <mProgress :width="100" :ratio="percentage1" :percentage="percentage1" :inside-percentage="insidePercentage1"></mProgress>
        </div>

        <div class="item2 left">
          <mProgress :width="150" title="nihao" :ratio="percentage2" :percentage="percentage2" :inside-percentage="insidePercentage2"></mProgress>
        </div>


        <div class="item3 left">
          <mProgress :width="200" title="hello world" :ratio="percentage3" :percentage="percentage3"></mProgress>
        </div>

        <div class="item4 left">
          <mProgress :width="176"  title="文章知识点与官方知识"  :percentage="percentage4" ></mProgress>
        </div>


    </div>




  </div>
</template>

<script setup>
import mProgress from "@/components/m-progress.vue"
import { ElButton } from 'element-plus'

import { getCurrentInstance, onMounted,ref,computed } from 'vue';
const { proxy } = getCurrentInstance()

const strokeWidth = ref(4)
const percentage1 = ref(10)
const percentage2 = ref(30)
const percentage3 = ref(40)
const percentage4 = ref(50)

const insidePercentage1 = ref(10)
const insidePercentage2 = ref(90)
const insidePercentage3 = ref(100)
const insidePercentage4 = ref(50)



const percentageFn=()=>{
  percentage1.value++
  percentage2.value += 3
  percentage3.value += 5
  percentage4.value += 10

  insidePercentage1.value++
  insidePercentage2.value -= 3
  insidePercentage3.value -= 5
  insidePercentage4.value -= 10

}


</script>

<style scoped lang="scss">
.item1 {
  width: 100px;
  height: 100px;
  background-color: RGBa(182, 158, 164, 1);
}

.item2 {
  width: 150px;
  height: 150px;
  background-color: RGBa(182, 158, 164, 1);
}

.item3 {
  width: 200px;
  height: 200px;
  background-color: RGBa(182, 158, 164, 1);
}

.item4 {
  width: 176px;
  height: 176px;
  background-color: RGBa(182, 158, 164, 1);
}




.pathCss{stroke-dashoffset: 0px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;}

</style>
