import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import ElementPlus from 'unplugin-element-plus/vite'
import viteConfitExtend from "./vite.config.extend.js";


const pathResolve = (dir) => {
	// 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
	return resolve(__dirname, dir);
};

const alias = {
	'@': pathResolve("src"),
	"comps": pathResolve("src/components"),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
	"api": resolve('src/api'),
	"views": resolve('src/views'),
	"utils": resolve('src/utils'),
	"router": resolve('src/router'),
};

export default defineConfig((mode) => {
	const env = loadEnv(mode.mode, process.cwd());
	// dev ==> { mode: 'development', command: 'serve', ssrBuild: false }
	// build ==> mode { mode: 'production', command: 'build', ssrBuild: false }
	return {
		lintOnSave: false,
		plugins: [
			vue(),
			ElementPlus(),
			viteConfitExtend({
				indexPath:'templates',
				indexName: 'index.html',
			}),
		],
		root: process.cwd(),
		resolve: { alias },
		//项目部署的基础路径
		base: mode.command === 'serve' ? '/' : env.VITE_PUBLIC_PATH,
		// 热更
		hmr: true, 
		// 强制预构建插件包
		optimizeDeps: {
			include: [
				// 'element-plus/lib/locale/lang/zh-cn', 
				// 'element-plus/lib/locale/lang/en', 
				// 'element-plus/lib/locale/lang/zh-tw',
				'axios'
			],
		},

		 // 本地运行配置，及反向代理配置
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT,
			open: env.VITE_OPEN, // 在服务器启动时自动在浏览器中打开应用程序
			cors: true, // 默认启用并允许任何源
			//https.createServer()配置项
			https: false,
			proxy: {
				// [env.VITE_APP_BASE_API]: {
				// 	target: `http://${env.VITE_APP_BASE_IP}:8088`, // release
				// 	ws: true,
				// 	changeOrigin: true,
				// 	//rewrite: (path) => path.replace(new RegExp(`^\\${env.VITE_APP_BASE_API}`), ''),
				// },

				// 匹配请求路径，http://127.0.0.1:9000
				'/api': {
					target: env.VITE_API_URL, // 代理的目标地址
					// secure: true, // 是否https接口
					ws: true,// 是否代理websockets
					changeOrigin: true,
					// 路径重写，rewrite target目标地址 + '/api'，如果接口是这样的，那么不用重写
					// rewrite: (path) => path.replace(/^\/api/, '') 
				},
				'/resStatic': {
					target: env.VITE_API_URL, // 代理的目标地址
					// secure: true, // 是否https接口
					// ws: true,// 是否代理websockets
					changeOrigin: true,
					// 路径重写
					rewrite: (path) => path.replace(/^\/resStatic/, '')
				},

				'/socket.io': {
					target: env.VITE_SOCKET_URL, // 代理的目标地址
					changeOrigin: true,
				}
			},

		},

  		// 打包配置
		build: {
			outDir: 'dist', //指定输出路径
			minify: 'terser', // 混淆器，terser构建后文件体积更小
			sourcemap: false, // 是否生成sourceMap
			chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
			rollupOptions: {
				output: {
					entryFileNames: `static/assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `static/assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `static/assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					}
				},
			},
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
		},
	};
});

