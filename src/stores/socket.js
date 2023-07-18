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

		cxl_online_obj:{
			"CPU%": [],
			"MEM%": [],
			"GPU%": [],
			"GPUMEM%": [],
			"CXLMEM%": [],
		},

		cxl_history_obj:{
			"CPU%": [],
			"MEM%": [],
			"GPU%": [],
			"GPUMEM%": [],
			"CXLMEM%": [],
		},

		disk_history_obj:{
			"CPU%": [],
			"MEM%": [],
			"GPU%": [],
			"GPUMEM%": [],
			"CXLMEM%": [],
		},



	}),

	actions: {
		setDataResponse(res){
			const data_type = res[0]
			const data = JSON.parse(res[1])
			if(data_type === "cxl_online" ){
				this.cxl_online = data
				this.setCxlOnlineObj(data)
			}else if(data_type === "cxl_history"){
				this.cxl_history = data
				this.setCxlHistoryObj(data)
			}else if(data_type === "disk_history"){
				this.disk_history = data
				this.setDiskHistoryObj(data)
			}else if(data_type === "live_progress_bar_value"){
				this.live_progress_bar_value = data
				console.log("2222",data)
			}else if(data_type === "live_cxl_throughput_value"){
				this.live_cxl_throughput_value = data
			}else if(data_type === "disk_throughput_value"){
				this.disk_throughput_value = data
			}else{
				console.log(res)
			}
		},

		// 设置cxl_online 折线图 中显示的数据
		setCxlOnlineObj(data){
			this.cxl_online_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}
			data.forEach(item => {
				this.cxl_online_obj["CPU%"].push(item["CPU%"])
				this.cxl_online_obj["MEM%"].push(item["MEM%"])
				this.cxl_online_obj["GPU%"].push(item["GPU%"])
				this.cxl_online_obj["GPUMEM%"].push(item["GPUMEM%"])
				this.cxl_online_obj["CXLMEM%"].push(item["CXLMEM%"])
			})
		},


		// 设置cxl_history 折线图 中显示的数据
		setCxlHistoryObj(data){
			this.cxl_history_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}
			data.forEach(item => {
				this.cxl_history_obj["CPU%"].push(item["CPU%"])
				this.cxl_history_obj["MEM%"].push(item["MEM%"])
				this.cxl_history_obj["GPU%"].push(item["GPU%"])
				this.cxl_history_obj["GPUMEM%"].push(item["GPUMEM%"])
				this.cxl_history_obj["CXLMEM%"].push(item["CXLMEM%"])
			})

		},

		// 设置disk_history 折线图 中显示的数据
		setDiskHistoryObj(data){
			this.disk_history_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}
			data.forEach(item => {
				this.disk_history_obj["CPU%"].push(item["CPU%"])
				this.disk_history_obj["MEM%"].push(item["MEM%"])
				this.disk_history_obj["GPU%"].push(item["GPU%"])
				this.disk_history_obj["GPUMEM%"].push(item["GPUMEM%"])
				this.disk_history_obj["CXLMEM%"].push(item["CXLMEM%"])
			})
		},


		clearState(){
			this.cxl_history = []
			this.cxl_history = []
			this.disk_history = []
			this.live_progress_bar_value = null
			this.live_cxl_throughput_value = null
			this.disk_throughput_value = null

			this.cxl_online_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}

			this.cxl_history_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}

			this.disk_history_obj = {
				"CPU%": [],
				"MEM%": [],
				"GPU%": [],
				"GPUMEM%": [],
				"CXLMEM%": [],
			}
		}
	}
});

export default useSocket