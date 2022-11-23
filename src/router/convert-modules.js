import {
  MODULE_TYPES,
  MODULE_ROUTE_TYPE_LIST,
} from '@/constant/app';
import {
  normalizeUrl,
} from '@/utils';

/**
 * 根据权限菜单树生成相应的异步路由配置
 * @param {array} moduleTree 权限菜单树
 */
export default function convertModules(moduleTree) {
  const needsRegisterModules = filterSPAModules(moduleTree || []);
  const sortedModules = sortModules(needsRegisterModules);
  const routes = sortedModules
    .map(mod => module2Route(mod))
    .filter(route => !!route);
  return routes;
}

/**
 * 筛选需要前端注册的路由菜单
 * @param {array} modules 路由
 */
function filterSPAModules(modules = []) {
  const routeTypeValues = MODULE_ROUTE_TYPE_LIST.map(type => type.value);
  return modules.filter(mod => routeTypeValues.includes(mod.type));
}

/**
 * 菜单排序
 * @param {array} modules 需要排序的菜单
 */
function sortModules(modules = []) {
  const slicedModules = modules.slice(0);
  slicedModules.sort((prev, cur) => {
    return +prev.seq - +cur.seq;
  });
  return slicedModules;
}

/**
 * 将路由path映射为路由组件地址，根据实际项目结构修改
 * @param {string} path 路由path
 * @example
 * resolveComponentPath('/ftl/house/zhuwu'); // "/house/zhuwu"
 */
function resolveComponentPath(path) {
  return path
    .replace(/^\/ftl\//, '')
    .replace(/^\//, '')
    .replace(/\/$/, '');
}

/**
 * 菜单对象转换为vue-route的路由对象
 * @param {object} mod 菜单对象
 */
function module2Route(mod) {
  const { type } = mod;
  if (type === MODULE_TYPES.PAGE.value) {
    return getPageRoute(mod);
  }
  if (type === MODULE_TYPES.IFRAME.value) {
    return getIFrameRoute(mod);
  }
  if (type === MODULE_TYPES.VIEW.value) {
    return getViewRoute(mod);
  }
}

/**
 * 获取布局组件
 * @param {string} layout 布局组件
 */
function getLayoutComponent(layout) {
  if (!layout) {
    return null;
  }
  const hasSlash = layout.includes('/');
  // 带有/的表示布局组件相对于src/layout的路径，否则使用VUE_APP_LAYOUT指定目录下的布局组件
  if (hasSlash) {
    return () => import(`@/layout/${layout}.vue`);
  }
  return () => import(`@/layout/${process.env.VUE_APP_LAYOUT}/${layout}.vue`);
}

/**
 * 根据菜单配置生成路由配置
 * @param {object} mod 菜单
 */
function getPageRoute(mod) {
  const {
    name,
    path,
    layout,
  } = mod;
  // 路由path
  const normalizedPath = normalizeUrl(path);
  // 路由组件地址
  const componentPath = resolveComponentPath(normalizedPath);
  const component = () => import(`@/views/${componentPath}/Index.vue`).then(mod => {
    // 设置路由组件名，用于keep-alive缓存路由组件实例
    mod.default.name = mod.default.name || name;
    return mod;
  });
  const layoutComponent = getLayoutComponent(layout);
  const route = {
    name,
    path,
    component,
    meta: {
      ...mod,
    },
  };
  return layoutComponent ? {
    path,
    component: layoutComponent,
    children: [route],
  } : route;
}

function getIFrameRoute(mod) {
  const {
    name,
    path,
    layout,
    iframeSrc,
  } = mod;
  const route = {
    name,
    path: layout ? '' : path,
    props: {
      src: iframeSrc || path,
    },
    // FIXME: 非按需加载会报错
    component: () => import(`@/components/IFrame/Index.vue`),
    meta: {
      ...mod
    },
  };
  const layoutComponent = layout && getLayoutComponent(layout);
  return layoutComponent ? {
    path,
    component: layoutComponent,
    children: [route],
  } : route;
}

function getViewRoute(mod) {
  const {
    name,
    path,
    layout,
    children,
  } = mod;
  const childRoutes = convertModules(children || []);
  const layoutComponent = getLayoutComponent(layout);
  return {
    name,
    path,
    redirect: childRoutes[0] && childRoutes[0].path,
    component: layoutComponent,
    children: childRoutes,
    meta: {
      ...mod
    },
  };
}
