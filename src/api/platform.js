import request from '@/utils/request';

/**
 * 接口描述
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */

export function fetchList() {
  return request.post('api/tableintf/queryMoreTablesByGroup/platform_warning', {});
}

export function fetchWarningData(params) {
  return request.post('api/tableintf/queryMoreTablesByGroup/platform_control', { ...params });
}
export function fetchPushData(params) {
  return request.post('/api/tableintf/queryMoreTablesByGroup/fxpg_dbsx', { ...params });
}
export function updatePushData(params) {
  return request.post('/api/tableintf/fxpg_dbsx/updateData', { ...params });
}
export function getAllData() {
  return request.get('/api/platform/getData');
}
/**
 * 首页指标数据
 *
 */
export function getIndexData() {
  return request.get('/api/risk/comm/getIndexTotal');
}
/**
 * 动态评估，静态评估数据
 *
 */
export function getAssesmentEchartsData(params) {
  return request.post('/api/tableintf/queryMoreTablesByGroup/getEvalData', { ...params });
}
/**
 * 心理测评数据
 *
 */
export function getRankingListData() {
  return request.post('/api/tableintf/fxpg_index_xlcpqk/getTableData/1/10', {});
}

/**
 * 罪犯信息数据
 *
 */
export function getZfxxListData() {
  return request.post('/api/tableintf/queryMoreTablesByGroup/getCriminalList', {});
}

/**
 * 其它图表数据
 *
 */
export function getQtListData(params) {
  return request.post('/api/tableintf/queryMoreTablesByGroup/getEchartData', { ...params });
}
