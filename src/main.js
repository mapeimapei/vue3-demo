export {}
import { createApp } from 'vue'
//import ElementPlus from 'element-plus'
import pinia from '@/stores/index'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'
import 'element-plus/dist/index.css'
import '@/assets/css/main.css'

import {storeToRefs} from 'pinia'

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
app.config.globalProperties.$mittBus = mitt()
app.config.globalProperties.$storeToRefs = storeToRefs