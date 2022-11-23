import request from '@/utils/request';

/**
 * 获取分组列表
 * @param {object} params
 */
export function get(params) {
  return request.get('/api/sys/group/groupList', {
    params,
  });
}

/**
 * 根据分组名获取分组
 * @param {string} name 分组名
 */
export function getByName(name, type) {
  return request.get('/api/sys/group/getGroupByName', {
    params: {
      name,
      type
    },
  });
}

/**
 * 新增分组
 * @param {object} payload
 */
export function add(payload) {
  return request.post('/api/sys/group/add', payload);
}

/**
 * 删除分组
 * @param {object} payload
 * @param {string} payload.id 分组id
 * @param {enum} payload.type 分组类型：事件监测分组，机构分组，企业分组
 */
export function del(payload) {
  return request.post('/api/sys/group/delete', payload);
}

/**
 * 更新分组
 * @param {object} payload
 * @param {string} payload.id 分组id
 * @param {string} payload.name 分组名
 * @param {string} payload.teamId 团队ID
 * @param {enum} payload.type 分组类型
 */
export function update(payload) {
  return request.post('/api/sys/group/update', payload);
}

/**
 * 校验分组名称
 * @param {object} params 查询参数
 */
export function validAccount(params) {
  return request.get('/api/sys/group/validName', {
    params,
  });
}
