import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import { getPostsApi, deleteSingle, addSingle } from "@/api/cms"
import { ElLoading,ElMessage  } from 'element-plus'

import {useAuth} from "./auth"
const authStore = useAuth();

/**
 * 博客信息
 */
export const useBlog = defineStore('blog', {
	state: () => ({
		articleList:[],
	}),
	actions: {
		// 获取列表
		getPostsList(data) {
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getPostsApi(data).then((res)=>{
					const {code,data} = res
					this.articleList = data
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

		// 接口删除
		deleteData(id){
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			let obj = {
				"id": id,
				"user_id": authStore.user.id
			}
			return new Promise((resolve,reject) => {
				deleteSingle(obj).then((res)=>{
					const { code,data} = res
					if(code === 20000){
						//ElMessage.success("删除成功")
						this.getPostsList()
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
		
		// 编辑 or 新建
		editData(){
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				addSingle().then((res)=>{
					const { code,data} = res
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
		
	// addSingle(addArticle).then((data) => {
	// 	proxy.$notify({
	// 		message: '成功',
	// 		type: 'success'
	// 	})
	// 	
	// }).catch((err) => {
	// 	proxy.$notify({
	// 		message: '失败',
	// 		type: 'warning'
	// 	});
	// })

	},

	// 相当于 vue 中的 computed 计算属性
	getters: {
		// 定义的 getters，第一个参数就是该容器的 state
		getArticleList(state) {
			return state.articleList
		}
	},
});
