import { normalizeUrl } from '@/utils';
import * as MutationTypes from '@/store/mutation-types';
import { MODULE_TYPE_LIST } from '@/constant/app';

import {
  fetchUserInfo,
  fetchMenus,
  fetchElementPermissions,
} from '@/api/app';
import router, {
  appendRoutes,
  generateAsyncRoutes,
} from '@/router';

const state = {
  userInfo: null,
  asyncMenus: null, // 接口返回的菜单原始数据
  asyncRoutes: null, // 根据菜单数据生成的VueRoute的路由配置
  cachedRoutes: [], // 已经缓存的路由名
  elementPermissions: {}, // 路由元素级权限
  isMenuCollapse: false, // 管理后台侧导航时候收起
};

const getters = {
  userInfo: state => state.userInfo,
  currentTeamId: state => state.userInfo && state.userInfo.teamIds && state.userInfo.teamIds[0],
  asyncRoutesInitialized: state => state.asyncRoutes !== null,
  normalizedMenus: state => {
    const convertMenus = (menus = [], level = 0) => {
      if (menus) {
        return menus
          .slice(0)
          .map(menu => {
            const {
              moduleImg,
              moduleName,
              moduleLayout,
              moduleType,
              moduleUrl,
              moduleIframeSrc,
              moduleCode,
              moduleSeq,
              moduleHidden,
              moduleCache,
              moduleConfig,
              childs: children,
            } = menu || {};
            return {
              icon: moduleImg,
              title: moduleName,
              layout: moduleLayout,
              type: moduleType,
              path: normalizeUrl(moduleUrl),
              iframeSrc: normalizeUrl(moduleIframeSrc),
              name: `Code${moduleCode.replace(/-/g, '')}`,
              seq: +moduleSeq,
              hidden: moduleHidden === '1',
              cache: moduleCache === '1',
              level,
              config: moduleConfig && JSON.parse(moduleConfig),
              children: convertMenus(children, level + 1),
            };
          })
          .sort((prev, cur) => {
            return +prev.seq - +cur.seq;
          });
      };
      return [];
    };
    return convertMenus(state.asyncMenus);
  },
  displayMenus: (state, getters) => {
    const normalizedMenus = getters.normalizedMenus;
    const getDisplayMenus = menus => {
      return menus
        .slice(0)
        .filter(menu => !menu.hidden)
        .map(menu => {
          return {
            ...menu,
            children: getDisplayMenus(menu.children || [])
          };
        });
    };
    return getDisplayMenus(normalizedMenus);
  },
};

const mutations = {
  [MutationTypes.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [MutationTypes.SET_ASYNC_MENUS](state, menus = []) {
    state.asyncMenus = menus;
  },
  [MutationTypes.SET_ASYNC_ROUTES](state, routes = []) {
    state.asyncRoutes = routes;
  },
  [MutationTypes.ADD_CACHE_ROUTE](state, name) {
    const cachedRoutes = state.cachedRoutes || [];
    if (!cachedRoutes.includes(name)) {
      state.cachedRoutes = [...cachedRoutes, name];
    }
  },
  [MutationTypes.SET_ELEMENT_PERMISSIONS](state, { name, permissions }) {
    state.elementPermissions[name] = permissions || [];
  },
  [MutationTypes.TOGGLE_MENU_COLLAPSE](state) {
    state.isMenuCollapse = !state.isMenuCollapse;
  },
};

const actions = {
  /**
   * 初始化异步路由
   */
  async initialAsyncRoutes({ getters, commit, }) {
    const params = {
      moduleType: MODULE_TYPE_LIST.map(type => type.value).join(',')
    };
    const {
      errcode,
      data: asyncMenus
    } = await fetchMenus(params);
    if (errcode === 0) {
      commit(MutationTypes.SET_ASYNC_MENUS, asyncMenus);
      const accessRoutes = generateAsyncRoutes(getters.normalizedMenus);
      router.addRoutes([...accessRoutes, ...appendRoutes]);
      commit(MutationTypes.SET_ASYNC_ROUTES, accessRoutes);
      return accessRoutes;
    }
    return [];
  },
  /**
   * 获取元素级权限
   */
  async fetchElementPermissions({ commit }, name) {
    const payload = {
      name,
      permissions: []
    };
    try {
      const {
        data: {
          errcode,
          data: permissions,
        },
      } = await fetchElementPermissions(name);
      if (errcode === 0) {
        payload.permissions = permissions || [];
      }
    } catch (error) {
      console.error(error);
    }
    commit(MutationTypes.SET_ELEMENT_PERMISSIONS, payload);
    return payload.permissions;
  },
  async fetchUserInfo({ commit }) {
    const { errcode, errmsg, data } = await fetchUserInfo();
    if (errcode === 0) {
      commit(MutationTypes.SET_USER_INFO, data);
      return Promise.resolve(data);
    } else {
      return Promise.reject(errmsg);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
