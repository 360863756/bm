import request from '@/utils/request';

/**
 * 重点提醒列表数据,查询接口
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {number,string} jqdm 监狱编号
 */
export function getWarningFightRemindData(params) {
  if (params.zfbh) {
    params.fixQL = ` and (zfbh like '%${params.zfbh}%' or zfxm like '%${params.zfbh}%')`;
    delete params.zfbh;
  }
  return request.post(`api/tableintf/fxpg_yj_zdtx/getTableData/${params.pageNo}/${params.pageSize}`,
    { ...params });
}
/**
 * 重点提醒告警人数
 *
 */
export function getWarningFightRemindDengrious(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/totalNum`,
    { ...params });
}
