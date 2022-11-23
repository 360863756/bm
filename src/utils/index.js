import dayjs from 'dayjs';
import numbro from 'numbro';
import 'numbro/languages/zh-CN';
import {
  APP_TITLE,
} from '@/constant/app';

numbro.setLanguage('zh-CN');

/**
  * 导入指定上下文中所有模块的默认导出，导出结果以文件名为key，默认导出为value
  * @param {RequireContext} modulesFiles 由webpack提供的require.context方法返回的上下文
  * @param {Boolean} bAllExport 是否导出模块中所有export内容，默认只导出export default
  */
export function importAll(modulesFiles, bAllExport = false) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // 排除index.js文件
    if (modulePath.includes('index.js')) {
      return modules;
    }
    // 以文件名为key
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = bAllExport ? {
      ...value,
    } : value.default;
    return modules;
  }, {});
  return modules;
}

/**
 * 正常化URL地址
 * 带协议的url直接返回
 * path类型的url替换//为/，移除结尾/
 * @param {string} url 需要处理的url
 */
export function normalizeUrl(url, options = {}) {
  const {
    trimStartSlash = false,
    trimEndSlash = true,
    replaceDumplicatedSlash = true,
  } = options;
  if (url) {
    const urlReg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    if (urlReg.test(url)) {
      return url;
    }
    let ret = url;
    if (trimStartSlash) {
      ret = ret.replace(/^\//, '');
    }
    if (trimEndSlash) {
      ret = ret.replace(/\/$/, '');
    }
    if (replaceDumplicatedSlash) {
      ret = ret.replace(/\/+/g, '/');
    }
    return ret;
  }
}

/**
 * 设置文档标题，路由名 - 系统名
 * @param {string} title 文档标题
 */
export function setDocumentTitle(title) {
  document.title = title ? `${title} - ${APP_TITLE}` : APP_TITLE;
}

/**
 * 判断是否是外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function foretime(date, defaultFormatter = 'MM-DD') {
  const dayjsNow = dayjs(Date.now());
  const dayjsDate = dayjs(date);
  const diffMinutes = dayjsNow.diff(dayjsDate, 'minute');
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  }
  const diffHours = dayjsNow.diff(dayjsDate, 'hour');
  if (diffHours < 24) {
    return `${diffHours}小时前`;
  }
  return dayjsDate.format(defaultFormatter);
}

/**
 * 日期格式化
 * @param {date} date 日期
 * @param {string} formatter 格式化模板
 */
export function dateFormat(date = new Date(), formatter = 'YYYY-MM-DD') {
  // 兼容时间戳和字符串格式
  return dayjs(+date ? new Date(+date) : date).format(formatter);
}

/**
 * 数字格式化
 * @param {number} number 需要格式化的字符串
 * @param {object} formatter 格式化选项，默认千分
 */
export function numberFormat(number, formatter = {}) {
  const numbroFormatter = {
    thousandSeparated: true,
    ...formatter
  };
  return numbro(number).format(numbroFormatter);
}

export function flatArrayMap(arr, props) {
  const {
    children: childrenKey,
    prop: propKey,
  } = {
    children: 'children',
    prop: 'id',
    ...props,
  };
  const flat = arr => arr.reduce((acc, cur) => {
    return [
      ...acc,
      cur[propKey],
      ...(cur[childrenKey] ? flat(cur[childrenKey]) : [])
    ];
  }, []);
  return flat(arr);
}
/**
 * 取json数据中某个对象
 * @param {object,array} jsonObj json数据
 * @param {string} key 对象键
 * @param {string} value 对象键对应的键值
 */
export function parseJson(jsonObj, key, value) {
  let array = [];
  for (let v in jsonObj) {
    let element = jsonObj[v];
    if (typeof (element) === 'object') {
      let result = parseJson(element, key, value);
      if (result.length) {
        array = array.concat(result);
      }
    } else {
      if (v === key) {
        if (element === value) {
          array.push(jsonObj);
        }
      }
    }
  }
  return array;
}
