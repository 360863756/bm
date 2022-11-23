import request from '@/utils/request';

/**
 * 获取团队用户列表
 * @param {object} payload 查询参数
 */
export function getUsers(payload) {
  return request.post('/api/sys/user/page', payload);
}

/**
 * 获取管理后台用户
 * @param {object} payload
 */
export function getMgrUsers(payload) {
  return request.post('/api/sys/user/backPage', payload);
}

/**
 * 根据用户账号获取用户，用于账号唯一性校验
 * @param {string} account 账号
 */
export function getUserByAccount(account, params) {
  return request.get(`/api/sys/user/validAccount/${account}`, {
    params
  });
}

// export function getUserByAccount(account) {
//   return request.get(`/api/sys/user/validAccount/${account}`);
// }

/**
 * 根据用户id获取用户
 * @param {string} id 账号
 */
export function getUserById(id) {
  return request.get(`/api/sys/user/userDetail/${id}`);
}

/**
 * 改变用户状态
 * @param {string} id 用户id
 * @param {enum} status 用户状态
 */
export function changeUserStatus(id, status) {
  return request.post(`/api/sys/user/forbiddenOrEnable`, {
    id,
    type: status,
  });
}

/**
 * 修改密码
 * @param {object} payload 密码数据
 * @param {string} payload.id 用户id
 * @param {string} payload.password 密码
 */
export function changePassword(payload) {
  return request.post('/api/sys/user/changePwdByAdmin', payload);
}

/**
 * 新增用户
 * @param {object} payload 用户信息
 */
export function addUser(payload) {
  return request.post('/api/sys/user/add', payload);
}

/**
 * 新增管理后台用户
 * @param {object} payload 用户信息
 */
export function addSystemUser(payload) {
  return request.post('/api/sys/user/systemAdd', payload);
}

/**
 * 更新用户
 * @param {object} payload 用户信息
 */
export function updateUser(payload) {
  return request.post('/api/sys/user/update', payload);
}

/**
 * 更新管理后台用户
 * @param {object} payload 用户信息
 */
export function updateSystemUser(payload) {
  return request.post('/api/sys/user/systemUpdate', payload);
}

/**
 * 删除用户
 * @param {string} id 用户id
 */
export function deleteUser(id) {
  return request.post(`/api/sys/user/deleteAccount`, {
    ids: [id],
  });
}

/**
 * 批量删除用户
 * @param {array<string>} ids 需要删除的用户id列表
 */
export function deleteUsers(ids) {
  return request.post('/api/sys/user/deleteAccount', {
    ids,
  });
}

/**
 * 导出用户列表
 * @param {object} payload 用户列表
 */
export function exportUsers(payload) {
  // return request.post('/api/sys-mgr/users/stream', payload);
  return request.post('/api/static/fileDown/userInfoExport', payload, {
    headers: {
      'X-Res-Type': 'original', // 携带此请求头的请求不会被响应拦截器unwrap
    },
    responseType: 'arraybuffer'
  });
}

/**
 * 获取绑定通讯方式的用户
 * @param {object} params 查询参数
 */
export function getBoundUsers(params) {
  return request.get('/api/sys/user/getCompanyLowUser', {
    params,
  });
}
