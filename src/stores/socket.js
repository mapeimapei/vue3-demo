import { defineStore } from 'pinia';
import { getDiskDataApi,getCxlDataApi } from "@/api/demo"
import { ElLoading,ElMessage  } from 'element-plus'

/**
 * socket 
 * @methods setSocketMsg 设置 最新收到的消息
 * @methods setSocketMsgList 设置 消息列表
 * @methods clearMsg 清空消息数据
 */


export const useSocket = defineStore('socket', {
	state: () => ({
		socketMsg: {},
		socketMsgList: [],

		step:null,

		cxlOnlineData:[],
		cxlOnlineCpu:[],
		cxlOnlineGpu:[],
		realCxlOnlineCpu:null,
		realCxlOnlineGpu:null,



		diskData:[],
		distCpu:[],
		distGpu:[],


	
	}),

	actions: {

		

		setCxlOnlineData(data) {
			console.log("setCxlOnlineData====>", data)

			this.cxlOnlineData.push(data)

			this.realCxlOnlineCpu = data.cpu
			this.realCxlOnlineGpu = data.gpu

			this.cxlOnlineCpu.push(data.cpu)
			this.cxlOnlineGpu.push(data.gpu)

			this.step = data.step




		},


		setSocketMsg(data) {
			console.log("msg====>", data)
			this.socketMsg = data;
			this.socketMsgList.push(data)
		},

		setSocketMsgList(data) {
			this.socketMsgList = data
		},
		clearMsg() {
			this.socketMsg = {}
			this.socketMsgList = []
		},

		setDiskData(data) {
			data.forEach(item =>{
				this.distCpu.push(
					{
						"timestamp":item.timestamp,
						"step":item.step,
						"value":item.cpu
					}
				)

				this.distGpu.push(
					{
						"timestamp":item.timestamp,
						"step":item.step,
						"value":item.gpu
					}
				)

			})
		},



		// 获取列表
		getDiskData(data) {
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getDiskDataApi(data).then((res)=>{
					const {code,data} = res
					this.diskData = data
					
					this.setDiskData(data)
					if(code === 20000){
						resolve(res)
					}else{
						reject(res)
					}
				}).catch((err)=>{
					console.log(err)
					reject(err)
				}).finally(()=>{
					loading.close()
				})
			});
		},

		// 获取列表
		getCxlData(data) {
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getCxlDataApi(data).then((res)=>{
					const {code,data} = res
					this.diskData = data
					
					//this.setDiskData(data)
					if(code === 20000){
						resolve(res)
					}else{
						reject(res)
					}
				}).catch((err)=>{
					console.log(err)
					reject(err)
				}).finally(()=>{
					loading.close()
				})
			});
		},

		


	}
});

export default useSocket