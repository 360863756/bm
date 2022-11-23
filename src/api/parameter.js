import request from '@/utils/request';

/**
 * 接口描述
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function demoApi(params) {
  return request.get('/api//some/url', {
    params,
  });
}
/**
 * 获取静态评估阀值数据
 */
export function fetchStaticEvaluation() {
  return request.post('api/tableintf/queryMoreTablesByGroup/fxpg_fxfz_jtpg', {});
}
/**
 * 修改静态阀值
 */
export function updateStaticEvaluation(param) {
  return request.post('/api/tableintf/fxpg_fxfz_jtpg/updateData', param);
}
/**
 * 获取动态评估阀值相关数据
 */
export function fetchDynamicEvaluation() {
  return request.post('/api/tableintf/queryMoreTablesByGroup/fxpg_fxfz_dtpg', {});
}
/**
 * 修改动态评估各项阀值
 */
export function updateDynamicEvaluationn(param) {
  return request.post('/api/tableintf/fxpg_fxfz_dtpg/updateData', param);
}

/**
 * 评估因子列表数据
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function getLabelList(params) {
  return request.post(`api/tableintf/fxpg_label/getTableData/${params.pageNo}/${params.pageSize}`, {
    ...params,
  });
}

/**
 * 评估主题表字段数据接口
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function getFields(params) {
  return request.post('api/tableintf/queryMoreTablesByGroup/getSubjectField', {
    ...params,
  });
}

/**
 * 评估主题表字段数据接口
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function getSubjects(params) {
  return request.post('api/tableintf/queryMoreTablesByGroup/getSubjects', {
    ...params,
  });
}

/**
 * 获取维度
 */
export function getDimListMutiple(param) {
  return request.get(`api/risk/getDimListMutiple?dimCodes=${param}`);
}

/**
 * 新增评估因子
 */
export function addLabel(params) {
  return request.post('api/risk/label/fxpg_label/addNewData', { ...params });
}

/**
 * 新增评估因子字段规则
 */
export function addSubLabel(params) {
  return request.post('api/risk/label/fxpg_label_base/addBatchData', { ...params });
}

/**
 * 修改评估因子
 */
export function updateLabel(params) {
  return request.post('api/risk/label/fxpg_label/upadteData', { ...params });
}

/**
 * 修改评估因子字段规则
 */
export function updateSubLabel(params) {
  return request.post('api/risk/label/fxpg_label_base/updateBatchData', { ...params });
}

/**
 * 删除单条数据
 * @param {} params
 */
export function deleteById(autoId) {
  return request.get(`api/tableintf/fxpg_label/deleteByUuid/${autoId}`);
}

/**
 * 获取评估因子数据
 * @param {} params
 */
export function getLabelData(params) {
  return request.get('api/risk/label/getCondListById?autoId=' + params);
}

/**
 * 获取uuid
 */
export function getUuid() {
  return request.get('api/tableintf/getUuid');
}
