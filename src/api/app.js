import request from '@/utils/request';
// import { getToken } from '@/utils/auth';

/**
 * 获取当前登录用户信息
 */
export function fetchUserInfo(params) {
  return request.get('/api/app/priv/getUserByToken', { params });
  // return request.get('/currentUser');
}

/**
 * 验证码验证接口
 */
export function checkCode(params) {
  // return request.post('/login.checkcode', params);
  return request.post('/login/checkcode', undefined, {
    params
  });
}
/**
 * 获取所有登录配置信息
 */
export function fetchLoginConfig(params) {
  // return request.get('/api/app/getAllLoginConfig', { params });
  return request.get('/login/getAllLoginConfig', { params });
}

/**
 * 获取所有菜单
 * @param {object} params 查询参数
 */
export function fetchAllMenus(params) {
  return request.post('/api/app/priv/getUserModuleAndExtendsTreeByToken', params);
  // return request.get('/api/app/menus', {
  //   params,
  // });
}

/**
 * 获取菜单
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function fetchMenus(params) {
  return request.post('/api/app/priv/getUserModuleAndExtendsTreeByToken', params);
  // return request.get('/api/app/menus', {
  //   params,
  // });·
}

export function fetchMenusByOrganization(id) {
  return request.get('/api/sys/model/getTeamList', {
    params: {
      teamId: id,
    },
  });
}

/**
 * 获取对应菜单下的元素级权限列表
 * @param {string} name 菜单名
 */
export function fetchElementPermissions(name) {
  return request.get('/api/app/permissions/element', {
    params: {
      name,
    },
  });
}

/**
 * 获取系统通知消息
 */
export function fetchNotifications() {
  return request.get('/api/sy/message/getAllMessage');
}

/**
 * 用户登录
 * @param {object} payload 登录数据
 */
export function login(payload) {
  // return request.post('/api/user/login', payload);
  return request.post('/login/check', payload);
}

/**
 * 域名验证
 * @param {object} payload 登录数据
 */
export function checkDomainName(payload) {
  return request.post('/api/user/realmNameLogin', payload);
}

/**
 * 监区数据
*/
export function getPrisonData() {
  return request.post('/api/tableintf/queryMoreTablesByGroup/area', {});
}
