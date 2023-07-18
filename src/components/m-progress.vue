<template>

<div class="progressBox">
  <svg viewBox="0 0 100 100">
    <path 
      :d="trackPath"
      stroke="#ebeef5" 
      :stroke-width="relativeStrokeWidth"
      fill="none">
    </path>
    <path  
      :d="trackPath"
      stroke="#20a0ff" 
      fill="none" 
      stroke-linecap="square" 
      :stroke-width="relativeStrokeWidth"
      class="pathCss"
      :style="circlePathStyle"
    >
    </path>
  </svg>

  <div class="inside" :style="insideStyle" v-if="props.insidePercentage">
    <svg viewBox="0 0 100 100">
      <path  
        :d="trackPath2"
        stroke="#a40000" 
        fill="none" 
        stroke-linecap="square" 
        :stroke-width="relativeStrokeWidth2"
        class="pathCss"
        :style="circlePathStyle2"
      >
      </path>
    </svg>
  </div>

  <div class="desc fx fx-fdc fx-aic fx-jcc">
    <div class="title tc" v-if="props.title">{{props.title}}</div>
    <div class="ratio" v-if="props.ratio">{{props.ratio}}%</div>
  </div>



</div>



</template>

<script setup name="mProgress">
import { getCurrentInstance, onMounted,ref,computed } from 'vue';
const { proxy } = getCurrentInstance()

const props = defineProps({

  width:{
    type:Number,
    default:126
  },

  title:{
    type:String,
    default:""
  },

  ratio:{
    type:Number,
    default:0
  },


  percentage:{
    type:Number,
    default:0
  },

  insidePercentage:{
    type:Number,
    default: 0
  },



})

const strokeWidth = ref(10)


const scale = computed(() => {
  return (props.width / 100).toFixed(1);
});

const relativeStrokeWidth = computed(() => {
  return (strokeWidth.value / props.width * 100).toFixed(1);
});

const radius = computed(() => {
  return parseInt(50 - parseFloat(relativeStrokeWidth.value) / 2, 10);
});

const trackPath = computed(() => {
    return `
      M 50 50
      m 0 -${radius.value}
      a ${radius.value} ${radius.value} 0 1 1 0 ${radius.value * 2}
      a ${radius.value} ${radius.value} 0 1 1 0 -${radius.value * 2}
      `;
});


const circlePathStyle = computed(() => {
    let perimeter = 2 * Math.PI * radius.value;
    let strokeDasharray = `${perimeter * (props.percentage / 100) }px, ${perimeter}px`
    return {
      strokeDasharray
    }
});


const strokeWidth2 = ref(8)

const relativeStrokeWidth2 = computed(() => {
  return (strokeWidth2.value / props.width * 100).toFixed(1);
});

const radius2 = computed(() => {
  return parseInt(50 - parseFloat(relativeStrokeWidth2.value) / 2, 10);
});

const trackPath2 = computed(() => {
    return `
      M 50 50
      m 0 -${radius2.value}
      a ${radius2.value} ${radius2.value} 0 1 1 0 ${radius2.value * 2}
      a ${radius2.value} ${radius2.value} 0 1 1 0 -${radius2.value * 2}
      `;
});

const circlePathStyle2 = computed(() => {
  let perimeter = 2 * Math.PI * radius2.value;
    let strokeDasharray = `${perimeter * (props.insidePercentage / 100) }px, ${perimeter}px`
    return {
      strokeDasharray
    }
});

const insideStyle = computed(() => {
    let hh  = relativeStrokeWidth.value * 2 * scale.value  + scale.value * 3
    let width = `calc(100% - ${hh}px)`
    let height = `calc(100% - ${hh}px)`
    let top = `${hh / 2}px`
    let left = `${hh / 2}px`
    return {
      width,
      height,
      top,
      left
    }
})

</script>

<style scoped lang="scss">
.progressBox {
  position: relative;
  .inside {
    position: absolute;
  }

  .desc{
    position: absolute;
    width: 80%;
    height: 80%;
    top:10%;
    left: 10%;

  }
}

.pathCss{stroke-dashoffset: 0px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;}

</style>
