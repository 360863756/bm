import request from '@/utils/request';

/**
 * 接口描述
 *
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function getCommonTableData(params) {
  return request.get('/api/component-demo/common-table', {
    params,
  });
}
