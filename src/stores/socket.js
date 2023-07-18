import { defineStore } from 'pinia';



/**
 * socket 
 * @methods setSocketMsg 设置 最新收到的消息
 * @methods setSocketMsgList 设置 消息列表
 * @methods clearMsg 清空消息数据
 */


export const useSocket = defineStore('socket', {
	state: () => ({
		cxl_online:[],
		cxl_history:[],
		disk_history:[],
		live_progress_bar_value:null,
		live_cxl_throughput_value:null,
		disk_throughput_value:null,
	}),

	actions: {
		setDataResponse(res){
			const data_type = res[0]
			const data = JSON.parse(res[1])
			if(data_type === "cxl_online" ){
				this.cxl_online = data
			}else if(data_type === "cxl_history"){
				this.cxl_history = data
			}else if(data_type === "disk_history"){
				this.disk_history = data
			}else if(data_type === "live_progress_bar_value"){
				this.live_progress_bar_value = data

			}else if(data_type === "live_cxl_throughput_value"){
				this.live_cxl_throughput_value = data
			}else if(data_type === "disk_throughput_value"){
				this.disk_throughput_value = data
			}else{
				console.log(res)
			}
		},

		clearState(){
			this.cxl_online = []
			this.cxl_history = []
			this.disk_history = []
			this.live_progress_bar_value = null
			this.live_cxl_throughput_value = null
			this.disk_throughput_value = null
		}
	}
});

export default useSocket