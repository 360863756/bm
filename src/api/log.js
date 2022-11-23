import request from '@/utils/request';

/**
 * 获取日志
 * @param {object} payload 查询参数
 */
export function getLogs(payload) {
  return request.post('/api/sys/log/page', payload);
}

/**
 * 导出数据
 * @param {array<syring>} ids id列表
 */
export function exportData(ids) {
  // return request.post('/api/sys/log/stream', {
  //   ids,
  // });
  return request.post('/api/static/fileDown/logEndExport', { ids }, {
    headers: {
      'X-Res-Type': 'original', // 携带此请求头的请求不会被响应拦截器unwrap
    },
    responseType: 'arraybuffer'
  });
}
