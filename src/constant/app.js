// 系统名称
import CSSVariables from '@/style/var.scss';
export const APP_TITLE = process.env.VUE_APP_TITLE || '系统名称';
// 系统子名称
export const APP_SUB_TITLE = 'System Name';
// 系统LOGO
export { default as APP_LOGO } from '@/assets/images/app-header-logo.png';
// 系统复合背景底图
export { default as APP_BACKGROUND } from '@/assets/images/app-background.jpg';
// TOKEN KEY
export const TOKEN_KEY = 'X-Access-Token';

export const GLOBAL_SEARCH_RECENT_KEY = 'GlobalSearch:recent-keywords';
export const GLOBAL_SEARCH_KEYWORD_COUNT = 5;
// 菜单类型
export const MODULE_TYPES = {
  PAGE: { // 页面
    name: 'Page',
    value: '10',
    route: true,
  },
  VIEW: { // 路由容器，必须包含RouterView
    name: 'Layout',
    value: '11',
    route: true,
  },
  IFRAME: { // iframe页面
    name: 'Iframe',
    value: '12',
    route: true,
  },
  LINK: { // 外链
    name: 'Link',
    value: '13',
    route: false,
  },
};
export const TYPES = Object.values(MODULE_TYPES);

export let FLAT_ARTICLE_TYPE = {};
Object.entries(TYPES).forEach(([key, cur]) => {
  FLAT_ARTICLE_TYPE[key] = cur;
  FLAT_ARTICLE_TYPE = {
    ...FLAT_ARTICLE_TYPE,
  };
});
export const MODULE_TYPE_LIST = Object.values(FLAT_ARTICLE_TYPE);

// 需要注册路由的类型
export const MODULE_ROUTE_TYPE_LIST = Object.values(MODULE_TYPES).filter(type => type.route);
// 危险等级
export const DANGER_TYPE = {
  HIGHRISK: {
    label: '高危',
    value: 1,
    color: CSSVariables.colorDanger,
  },
  OVERTIME: {
    label: '动态',
    value: 0,
    color: CSSVariables.colorInfo,
  }
};
export const DANGER_TYPES = Object.values(DANGER_TYPE);
