import Mock from 'mockjs';
// import { parse } from 'query-string';

import {
  importAll,
} from '@/utils';

const modulesFiles = require.context('./', true, /\.js$/);
const modules = importAll(modulesFiles);

Object.values(modules)
  .reduce((acc, val) => acc.concat(val), [])
  .forEach(({
    url,
    method = 'get',
    response = () => R(),
  }) => {
    if (shouldMock(url)) {
      const prefixedUrl = prependPrefix(url);
      Mock.mock(new RegExp(prefixedUrl), method, (options = {}) => {
        let body;
        try {
          body = JSON.parse(options.body);
        } catch (e) {
          body = options.body;
        }
        const wrappedOptions = {
          ...options,
          // params: parse(options.url.split('?')[1]),
          body,
        };
        return response(wrappedOptions);
      });
    }
  });

/**
 * 判断当前接口是否需要Mock
 * @param {string} url 接口地址
 */
function shouldMock(url) {
  const {
    VUE_APP_MOCK_INCLUDE: mockInclude,
    VUE_APP_MOCK_EXCLUDE: mockExclude,
  } = process.env;

  function matchList(list) {
    return list.some(item => {
      const reg = new RegExp(item);
      return reg.test(url);
    });
  }

  try {
    // 在包含列表中应该MOCK
    const includeList = mockInclude && JSON.parse(mockInclude);
    if (includeList && includeList.length) {
      if (matchList(includeList)) {
        return true;
      }
    }
    // 在排除列表中不应该MOCK
    const excludeList = mockExclude && JSON.parse(mockExclude);
    if (excludeList && matchList(excludeList)) {
      return false;
    }
    // 不匹配任何规则应该MOCK
    return true;
  } catch (error) {
    console.warn(error);
    // 配置解析失败设置为MOCK
    return true;
  }
}

/**
 * 接口地址附加地址前缀
 * @param {string} url 真实请求接口地址，即api中写的url
 */
function prependPrefix(url) {
  const baseApi = process.env.VUE_APP_BASE_API || '';
  // TODO: 判别绝对路径：//api.com/,http://api.com/等
  return `${baseApi}/${url}`.replace(/\/+/g, '/');
}

/**
 * 构造成功响应数据格式
 * @param {any} data 成功响应数据
 */
export function R(data) {
  return {
    errcode: 0,
    data,
  };
}

/**
 * 构造分页响应数据格式
 * @param {array} list 分页响应列表数据
 * @param {object} param1 分页相关参数
 */
export function RP(list = [], options = {}) {
  const {
    page = 1,
    size = list.length || 10,
    totalElements = 105,
  } = options;
  return R({
    size,
    page,
    totalElements,
    content: list,
  });
}

/**
 * 构造错误响应数据格式
 * @param {string} message 错误消息
 * @param {number} errcode 错误码
 */
export function RE(message = '模拟的错误响应', errcode = -1) {
  return {
    errcode,
    message,
  };
}
