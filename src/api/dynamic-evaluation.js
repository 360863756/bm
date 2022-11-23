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
  return request.post(`/api/tableintf/fxpg_pgzx_dtpg/getTableData/${params.pageNo}/${params.pageSize}`, { ...params
  });
}

/**
 * 获取告警信息
 *
 */
export function queryMoreTablesByGroup() {
  return request.post(`api/tableintf/queryMoreTablesByGroup/dtpg`, {});
}

/**
 * 获取动态评估详情信息
 *
 */
export function queryDetailData(data) {
  if (data.zfbh) {
    data.zfbh = 'equals$' + data.zfbh;
  }
  if (data.pgsj) {
    data.pgsj = 'equals$' + data.pgsj;
  }
  return request.post(`/api/tableintf/queryMoreTablesByGroup/dtpgjlxq`, data);
}

/**
 * 动态评估详情导出
 *
 */
export function exportDetail(data) {
  return request.post('api/tableintf/fxpg_pgzx_dtpg_jlxq/exportTableData/', data);
}
