export const staticRoutes = [

	{
		path: '/index',
		meta: {
			title: 'index',
		},
		name: "index",
		component: () => import('@/views/index.vue'),
	},

	{
		path: '/info',
		meta: {
			title: 'info',
		},
		name: "info",
		component: () => import('@/views/info.vue'),
	},

	{
		path: '/socket',
		meta: {
			title: 'socket',
		},
		name: "socket",
		component: () => import('@/views/socket.vue'),
	},



	{
		path: '/demo',
		meta: {
			title: 'demo',
		},
		name: "demo",
		component: () => import('@/views/demo.vue'),
	},


	{
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
		redirect: '/index'
	}


];
