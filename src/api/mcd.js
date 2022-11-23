import request from '@/utils/request';

export function insertData(params) {
  return request.post(`api/risk/label/fxpg_mcd/addBatchData`, params);
}
export function fetchData(params) {
  return request.post(`/api/tableintf/queryMoreTablesByGroup/fxpg_mcd`, params);
}
/**
 * 更新量表状态
 */
export function updateLbstate(params) {
  return request.post(`/api/tableintf/fxpg_xlcp_cp/updateData`, params);
}
