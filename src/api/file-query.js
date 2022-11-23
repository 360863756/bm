import request from '@/utils/request';

export function getCxgx() {
  return request.get(`/api/risk/getDim?dimCode=cxgx`);
};
export function getCxtj() {
  return request.get(`/api/risk/getDim?dimCode=cxtj`);
};
export function getZtb() {
  return request.post(`/api/tableintf/queryMoreTablesByGroup/fxpg_clcx_ztb`, {});
};
export function getZdmc(params) {
  return request.post(`/api/tableintf/queryMoreTablesByGroup/fxpg_glcx_zd`, params);
}
export function getDtbt(params) {
  return request.post(`/api/tableintf/queryMoreTablesByGroup/fxpg_glcx_dtbt`, params);
}
export function fileQuery(params) {
  return request.post(`api/fileManage/fileQuery/${params.pageNo}/${params.pageSize}`, { ...params });
}
export function exportExcel(params) {
  return request.post(`api/fileManage/exportExcel`, params);
}
