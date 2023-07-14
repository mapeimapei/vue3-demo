import { defineStore } from 'pinia';

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
	}),

	actions: {
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
		}
	}
});

export default useSocket