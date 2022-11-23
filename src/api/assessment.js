import request from '@/utils/request';
/**
 * 获取动态评估表格数据，以及查询信息
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {number,string} jqdm 监狱编号
 */
export function getDynamicEvaluationData(params) {
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
 * 获取动态告警信息
 *
 */
export function getDynamicEvaluationDengrious() {
  return request.post(`api/tableintf/queryMoreTablesByGroup/dtpg`, {});
}

/**
 * 获取静态评估表格数据，以及查询信息
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {number,string} jqdm 监狱编号
 */
export function getStaticEvaluationData(params) {
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
 * 获取心理表格数据，以及查询信息
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {string} wxdj 危险等级
 * @param {number,string} jqdm 监狱编号
 */
export function getPsychologicalAssessmentData(params) {
  if (params.wxdj) {
    params.wxdj = 'in$' + params.wxdj;
  }
  if (params.zfbh) {
    params.fixQL = ` and (zfbh like '%${params.zfbh}%' or zfxm like '%${params.zfbh}%')`;
    delete params.zfbh;
  }
  return request.post(`/api/tableintf/fxpg_pgzx_xlpg/getTableData/${params.pageNo}/${params.pageSize}`, { ...params });
}

/**
 * 总体概况图表数据
 *
 */
export function getGeneralSituationData() {
  return request.post(`api/tableintf/queryMoreTablesByGroup/eval`, {});
}
/**
 * 总体概况动态评估超时列表数据
 *
 */
export function getGeneralSituationListLeftData() {
  return request.post(`api/tableintf/queryMoreTablesByGroup/eval_dtyj`, {});
}
/**
 * 总体概况动态评估超时列表数据
 *
 */
export function getGeneralSituationListRightData() {
  return request.post(`api/tableintf/queryMoreTablesByGroup/eval_gwyj`, {});
}
/**
 * 心理评估详情-服刑评估页面-评估详情数据
 *
 */
export function getPsychologyEvalDetail(page, pageSize, data) {
  return request.post(`api/tableintf/fxpg_pgzx_xlpg_log/getTableData/` + page + '/' + pageSize, data);
}
/**
 * 心理评估详情-罪犯信息
 *
 */
export function getPsychologyEvalZFInfo(data) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/fxpg_pgzx_xlpg_pgqk`, data);
}
/**
 * 心理评估详情-评估内容
 *
 */
export function getPsychologyEvalContent(data) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/lb_bm`, data);
}

/**
 * 管控措施详情内容
 *
 */
export function queryControlData(data) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/gkcs_xq`, data);
}

/**
 * 静态详情时间数据
 *
 */
export function getStaticDate(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/getStaticEvaluationDateList`, { ...params });
}
/**
 * 动态详情时间数据
 *
 */
export function getDynamicDate(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/getDynamicEvaluationDateList`, { ...params });
}

/**
 * 评估详情基本信息数据
 *
 */
export function getEvalCriminalInfo(params) {
  return request.post(`api/tableintf/queryMoreTablesByGroup/getEvalCriminalInfo`, { ...params });
}
