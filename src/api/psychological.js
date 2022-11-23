import request from '@/utils/request';

/**
 * 电子档案列表数据,查询接口
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {number,string} jqdm 监狱编号
 */
export function getPsychologicalAnswerInformationData(params) {
  if (params.zfbh) {
    params.fixQL = `and (zfbh like '%${params.zfbh}%' or zfxm like '%${params.zfbh}%')`;
    delete params.zfbh;
  }
  return request.post(`api/tableintf/fxpg_xlcp_cpjl/getTableData/${params.pageNo}/${params.pageSize}`,
    { ...params });
}
/**
 * 导出接口
 */
export function importantPsychologicalAnswerInformationData(params) {
  return request.post(`api/tableintf/fxpg_zf_jbxx/exportTableData/`,
    { ...params });
}

/**
 * 测评量表信息
 */
export function getNumberData(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/lb_bm`,
    { ...params });
}

/**
 * 统计题的信息
 */
export function getTopicInformation(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/cptj`,
    { ...params });
}

/**
 * 试题情况信息
 * @param {number} id 试题id
 */
export function getAnswerInformationDetail(params) {
  return request.get(`api/risk/getUserTestInfo?id=${params.id}`);
}
/**
 * 评估结果
 */
export function psychologicalResult(data) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/xlpgjg`, data);
}

/**
 * 评估阶段和评估终端的数据接口
 */
export function getDimListMutiple() {
  return request.get(`api/risk/getDimListMutiple?dimCodes=scaleType,evaluationTerminal`);
}

/**
 * 罪犯编号姓名
 * @param {number} jqdm 监区编号
 */
export function getCrimianlList(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/getCrimianlList`,
    { ...params });
}

/**
 * 测评主题获取接口
 * @param {number} cpjd 监区编号
 */
export function getEvaluatingCpztData(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/lb_bm`,
    { ...params });
}

/**
 * 电子档案列表数据,查询接口
 */
export function addEvaluatingData(params) {
  return request.post(`api/tableintf/fxpg_xlcp_cp/addNewData`,
    { ...params });
}

/**
 * 评测内容配置列表数据,查询接口
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 */
export function getPsychologicalEvaluatingData(params) {
  return request.post(`api/tableintf/fxpg_xlcp_cp/getTableData/${params.pageNo}/${params.pageSize}`,
    { ...params });
}

/**
 * 评测内容人员配置上传接口
 */
export function uploadPersonInformation(params) {
  return request.post(`api/risk/label/fxpg_xlcp_cp/addBatchData`,
    { ...params });
}
