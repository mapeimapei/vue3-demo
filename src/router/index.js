import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes } from './route';

export const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});


// 路由加载前
router.beforeEach(async (to, from, next) => {
  next()
})
// 路由加载后
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

// 导出路由
export default router;
