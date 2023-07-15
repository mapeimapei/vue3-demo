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
		path: '/socket2',
		meta: {
			title: 'socket2',
		},
		name: "socket2",
		component: () => import('@/views/socket2.vue'),
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
		path: '/echart',
		meta: {
			title: 'echart',
		},
		name: "echart",
		component: () => import('@/views/echart.vue'),
	},


	{
		path: "/:catchAll(.*)", // 不识别的path自动匹配404
		redirect: '/index'
	}


];
