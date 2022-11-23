import request from '@/utils/request';

/**
 * 电子档案列表数据,查询接口
 * @param {number} pageNo 页码
 * @param {number} pageSize 页数
 * @param {string} fixQL 关键字
 * @param {number,string} jqdm 监狱编号
 */
export function getElectronicData(params) {
  if (params.zfbh) {
    params.fixQL = ` and (zfbh like '%${params.zfbh}%' or zfxm like '%${params.zfbh}%')`;
    delete params.zfbh;
  }
  return request.post(`api/tableintf/fxpg_zf_jbxx/getTableData/${params.pageNo}/${params.pageSize}`,
    { ...params });
}
/**
 * 导出接口
 */
export function importantElectronicData(params) {
  return request.post(`api/tableintf/fxpg_zf_jbxx/exportTableData/`,
    { ...params });
}

/**
 * 健康档案列表
 *
 * @returns {Promise}
 */
export function healthFileList(page, size, data) {
  if (data.jqdm) {
    data.jqdm = 'equals$' + data.jqdm;
  }
  return request.post('api/tableintf/fxpg_zf_jkxx/getTableData/' + page + '/' + size, data);
}

/**
 * 导出健康档案列表
 *
 * @returns {Promise}
 */
export function exportHealthFile(data) {
  if (data.zfbh) {
    data.zfbh = 'in$' + data.zfbh;
  }
  if (data.jqdm) {
    data.jqdm = 'equals$' + data.jqdm;
  }
  return request.post('api/tableintf/fxpg_zf_jkxx/exportTableData/', data);
}

/**
 * 通讯录列表
 *
 * @returns {Promise}
 */
export function addressBookList(page, size, data) {
  // if (data.zfbh) {
  //   data.zfbh = 'in$' + data.zfbh;
  // }
  if (data.xmszm) {
    data.xmszm = 'equals$' + data.xmszm;
  }
  return request.post('api/tableintf/fxpg_jc_xx/getTableData/' + page + '/' + size, data);
}

/**
 * 导出通讯录列表
 *
 * @returns {Promise}
 */
export function exportAddressBook(data) {
  if (data.jh) {
    data.jh = 'in$' + data.jh;
  }
  if (data.xmszm) {
    data.xmszm = 'equals$' + data.xmszm;
  }
  return request.post('api/tableintf/fxpg_jc_xx/exportTableData/', data);
}

/**
 * 个人档案详情信息
 *
 * @param {number} zfbh 编号
 */
export function getElectronicDetailData(params) {
  return request.get(`api/tableintf/fxpg_zf_jbxx/getByUuid/${params.zfbh}`);
}
/**
 * 健康档案详情列表
 *
 * @returns {Promise}
 */
export function healthFileDetailList(page = 1, pageSize = 3, data) {
  return request.post('api/tableintf/fxpg_zf_zymx/getTableData/' + page + '/' + pageSize, { zfbh: data.zfbh ? 'equals$' + data.zfbh : '' });
}

/**
 * 健康档案详情人员信息
 *
 * @returns {Promise}
 */
export function healthFileDetailInfo(data) {
  return request.post('api/tableintf/queryMoreTablesByGroup/zfjkmx', { zfbh: data.zfbh ? 'equals$' + data.zfbh : '' });
}
