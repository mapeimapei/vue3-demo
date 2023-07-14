import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import { getProductsApi, addOrderApi, getOrdersDetailsByIdApi, addCartApi, deleteProductInOrderDetailsApi, getCartListApi, deleteCartApi} from "@/api/shop"
import { ElLoading,ElMessage  } from 'element-plus'
import {useAuth} from "./auth"
import router from '@/router'
import { get } from '@vueuse/shared';
import { uuid } from "@/utils/common.js"
const authStore = useAuth();

/**
 * 商城信息
 */
export const productShop = defineStore('shop', {
	state: () => ({
		productList: [], /*商品列表*/ 
		orderList: [],  /*直接购买页面的列表*/
		amount: '',     /*总价*/
		orderid: '',    /*传参*/
		status: '',     /*支付状态*/
		cartList: [],   /*购物车页面数据*/
		multipleSelection: [],  /*购物车页面多选*/
		productids: '',
	}),
	actions: {
		// 获取列表
		getProductsList(data) {
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getProductsApi(data).then((res)=>{
					const {resultCode, result} = res
					this.productList = result
					this.productList.forEach((item,index)=>{
						item.quantity = 1
					})
					if(resultCode === "20000"){
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

		// 直接购买
		makeOrderPage(row){
			let obj = {
        "userid": authStore.user.id,
        "productList": [row],
      }
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				addOrderApi(obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						this.orderid = result.orderid;
						resolve(res)
						router.push({path: 'ordersDetails', query:{orderid: result.orderid}})
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

		// 直接购买页面的列表
		getOrdersDetailsById(){
			let obj = {
        "orderid": this.orderid,
				"userid": authStore.user.id
      }
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getOrdersDetailsByIdApi(obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						this.orderList = result.orderlist
						this.amount = result.amount
						this.status = this.orderList.length ? this.orderList[0].status : null
						// ElMessage.success("订单生成成功")
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
		
		// 加入购物车页面
		getAddShoppingCart(row){
			let obj = {
				"productid": row.productid,
				"quantity": row.quantity,
				"userid": authStore.user.id
			}
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				addCartApi(obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						ElMessage.success("成功加入购物车")
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

		// 生成订单页面的删除
		deleteProductInOrder(row){
			let _obj = {
				"userid": authStore.user.id,
				"orderid": this.orderid,
				"productid": row.productid,
			}
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				deleteProductInOrderDetailsApi(_obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						this.getOrdersDetailsById()
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

		// 购物车页面初始化
		getCartListAll(){
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				getCartListApi(authStore.user.id).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						this.cartList = result;
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

		// 购物车页面的删除,清空
		deleteCartData(productids){
			let obj = {
				"productids": [...productids],
				"userid": authStore.user.id,
			}
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			// 清空
			if (productids === "clear") {
				obj.productids = []
				this.cartList.forEach((item) => {
					obj.productids.push(item.productid)
				})
			}
			return new Promise((resolve,reject) => {
				deleteCartApi(obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						this.getCartListAll()
						this.multipleSelection = []
						productids = []
						rowKeys = uuid()
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

		getmultipleSelection(val){
			this.multipleSelection = val
			console.log(val)
			this.productids = []
			this.multipleSelection.forEach((item) => {
				this.productids.push(item.productid)
			})
		},
		// 提交订单
		makeOrderFn(){
			let obj = {
				"productList": [...this.multipleSelection],
				"userid": authStore.user.id,
			}
			const loading = ElLoading.service({
				lock: true,
				text: 'Loading',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			return new Promise((resolve,reject) => {
				addOrderApi(obj).then((res)=>{
					const {resultCode, result} = res
					if(resultCode === "20000"){
						resolve(res)
						debugger;
						router.push({path: 'ordersDetails', query:{orderid: result.orderid}})
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

	// 相当于 vue 中的 computed 计算属性
	getters: {
		// 定义的 getters，第一个参数就是该容器的 state
		getArticleList(state) {
			return state.productList, state.orderList
		}
	},
});
