import request from '@/utils/request';

/**
 * 获取表格数据，以及查询信息
 *
 */
export function getData(params) {
  if (params.wxdj) {
    params.wxdj = 'in$' + params.wxdj;
  }
  if (params.zfbh) {
    params.fixQL = ` and (zfbh like '%${params.zfbh}%' or zfxm like '%${params.zfbh}%')`;
    delete params.zfbh;
  }
  return request.post(`/api/tableintf/fxpg_pgzx_jtpg/getTableData/${params.pageNo}/${params.pageSize}`, { ...params });
}

/**
 * 获取静态评估评估详情数据
 *
 */
export function queryDetailData(params) {
  if (params.zfbh) {
    params.zfbh = 'equals$' + params.zfbh;
  }
  if (params.pgsj) {
    params.pgsj = 'equals$' + params.pgsj;
  }
  return request.post(`api/tableintf/queryMoreTablesByGroup/jtpgjl`, { ...params });
}

/**
 * 获取静态评估管控措施数据
 *
 */
export function queryControlData(params) {
  return request.get('api/tableintf/fxpg_gkcs_fh/getByUuid/' + params.zfbh);
}

/**
 * 获取 民警列表数据
 *
 */
export function queryPoliceList() {
  return request.post('api/tableintf/queryMoreTablesByGroup/jcList', {});
}

/**
 * 管控措施修改
 *
 */
export function updateControlInfo(data) {
  return request.post('api/tableintf/fxpg_gkcs_fh/updateData', data);
}

/**
 * 获取基本信息
 *
 */
export function queryBaseInfo(params) {
  return request.get('api/tableintf/fxpg_zf_jbxx/getByUuid/' + params.zfbh);
}

/**
 * 民警执行管控措施
 *
 */
export function execControl(data) {
  return request.post('api/tableintf/fxpg_gkcs_zxjl/updateData', data);
}

/**
 * 静态评估详情导出
 *
 */
export function exportDetail(data) {
  return request.post('api/tableintf/fxpg_pgzx_jtpg_jlxq/exportTableData/', data);
}
