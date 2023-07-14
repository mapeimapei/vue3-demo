<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick,  getCurrentInstance } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import mySocketio from "@/utils/socket.io"
const { proxy } = getCurrentInstance()

// 页面加载时
onMounted(() => {
	nextTick(() => {
		// 刷新页面 重新连接 socket
		mySocketio.init(proxy)
	});
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
	// 关闭 socket
	mySocketio.close(proxy)

});

</script>



<style scoped>

</style>
