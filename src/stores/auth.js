import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import {loginApi} from "@/api/auth"


import { ElLoading,ElMessage  } from 'element-plus'

/**
 * 用户信息
 */
export const useAuth = defineStore('auth', {
	state: () => ({
		user: Session.get("user"),
		token: Session.get("token")
	}),
	actions: {
		setUser(obj) {
			this.user =  obj
			if(!!obj){
				Session.set("user",obj)
			}else{
				Session.remove("user")
			}
		},

		setToken(str) {
			this.token =  str
			if(!!str){
				Session.set("token",str)
			}else{
				Session.remove("token")
			}
		},

		// 登录接口
		actionLogin(loginData) {
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})

			return new Promise((resolve,reject) => {
				loginApi(loginData).then((res)=>{
					const { code,data} = res
					if(code === 20000){
						//this.setUser(data)
						this.user= data
						this.token= data.access_token
						Session.set("user",data)
						Session.set("token",data.access_token)
						// ElMessage({
						// 	message: '登录成功',
						// 	type: 'success',
						// })
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
	},
});
