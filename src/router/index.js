import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import {
  MODULE_TYPES,
} from '@/constant/app';
import convertModules from './convert-modules';
// import { setDocumentTitle } from '@/utils';

import Login from '@/views/login/Index.vue';
import E401 from '@/views/error/401.vue';
import E404 from '@/views/error/404.vue';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/',
    name: 'root',
  },
  {
    path: '/redirect',
    component: () => import(`@/layout/${process.env.VUE_APP_LAYOUT}/AppLayout.vue`),
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/app/redirect/Index.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/401',
    name: 'E401',
    component: E401,
    meta: {
      title: '无访问权限'
    }
  },
  {
    path: '/404',
    name: 'E404',
    component: E404,
    meta: {
      title: '页面未找到'
    }
  },
];

export const appendRoutes = [
  {
    path: '*',
    redirect: {
      name: 'E404'
    }
  },
];

// 无须鉴权的白名单路由
const whiteListRoutes = [
  '/login',
];

/**
 * 根据权限菜单树生成相应的异步路由配置
 * @param {array} moduleTree 权限菜单树
 */
export function generateAsyncRoutes(moduleTree) {
  return convertModules(moduleTree);
}

const router = new Router({
  mode: process.env.VUE_APP_ROUTE_MODE || 'hash',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: constantRoutes || [],
});

// 初始化权限菜单，注册前端路由
// 首页默认跳转至第一个路由
router.beforeEach(async(to, from, next) => {
  // setDocumentTitle(to.meta.title);
  console.log(to, from);

  if (whiteListRoutes.includes(to.path)) {
    return next();
  }
  const hasInitialized = store.getters['app/asyncRoutesInitialized'];
  const normalizedMenus = store.getters['app/normalizedMenus'];
  const userInfo = store.getters['app/userInfo'];
  !userInfo && await store.dispatch('app/fetchUserInfo');
  // 未初始化异步路由，先初始化路由
  if (!hasInitialized) {
    await store.dispatch('app/initialAsyncRoutes');
    return next({ ...to });
  }
  // 根路径默认重定向至第一个菜单
  if (to.path === '/') {
    // 构建时指定默认跳转页面，一般在构建离线包时使用到
    if (process.env.VUE_APP_INDEX_PATH) {
      return next({
        path: process.env.VUE_APP_INDEX_PATH
      });
    }
    const indexRoute = normalizedMenus[0] || { name: 'E404' };
    if (indexRoute && indexRoute.type === MODULE_TYPES.LINK.value) {
      location.href = indexRoute.path;
    }
    return next({
      ...indexRoute,
      path: indexRoute.path || '/',
    });
  }
  // 获取页面元素级权限
  // const permissions = await store.dispatch('app/fetchElementPermissions', to.name);
  // window.kunCompAuth = permissions;
  next();
});

// 添加路由实例的缓存
router.afterEach(to => {
  const {
    name,
    meta: {
      cache,
    },
  } = to;
  name && cache && store.commit('app/ADD_CACHE_ROUTE', name);
});

// 模块未找到，跳转至404
router.onError(error => {
  const { code } = error || {};
  if (code === 'MODULE_NOT_FOUND') {
    router.push({ name: 'E404' });
  } else {
    console.error(error);
  }
});

export default router;
