import axios from 'axios'

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 600000,
	headers: {
    'XRequested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-control': 'no-cache, no-store'
  }
});


// 响应拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },

  error => {
    console.log(error)
  }

)

export default service
