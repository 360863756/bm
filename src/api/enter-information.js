import request from '@/utils/request';

/**
 * 得到录入信息登录编号list
 */
export function getEnterInformationCriminalCodes(data) {
  return request.post('api/datatrans/getCriminalInfo', data);
}

/**
 * 量表描述及题目总数
 */
// export function getScaleInfo(data) {
//   return request.get('api/datatrans/getScaleInfo/' + data.la + '?scale=' + data.scale);
// }

/**
 * 题目内容
 */
export function getQuestion(data) {
  return request.post('api/datatrans/getScaleList', data);
}

/**
 * 选择题库
 */
export function getCriminalScaleList(data) {
  return request.post('api/tableintf/queryMoreTablesByGroup/getCriminalScaleList', data);
}

/**
 * 注意事项
 */
export function getScaleInfo(data) {
  return request.post('api/tableintf/queryMoreTablesByGroup/getScaleInfo', data);
}

/**
 * 答题题目数
 */
export function getScaleTitleNum(data) {
  return request.post('api/tableintf/queryMoreTablesByGroup/getScaleTitleNum', data);
}

/**
 * 提交答案
 */
export function saveScale(data) {
  return request.post('/api/datatrans/saveScaleTest', data);
}
