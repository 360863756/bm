import axios from 'axios';
import {
  Message,
  MessageBox,
} from 'element-ui';
import router from '@/router';
import { TOKEN_KEY } from '@/constant/app';
import { getToken, removeToken } from '@/utils/auth';

const isDev = process.env.NODE_ENV === 'development';
const shouldApiLog = process.env.VUE_APP_API_LOG !== 'false';

axios.defaults.withCredentials = true;
const defaultInstance = axios.create({
  timeout: 60000, // 60s超时,
  baseURL: process.env.VUE_APP_BASE_API, // 接口前缀
  withCredentials: true, // 是否携带cookie信息
});

// 全局拦截器

const errorHandler = error => {
  throw error;
};

// 请求拦截器
const requestInterceptors = [];
// 设置Token
requestInterceptors.push(config => {
  const token = getToken();
  config.headers = config.headers ? {
    ...config.headers,
    [TOKEN_KEY]: token,
  } : {
    [TOKEN_KEY]: token,
  };
  return config;
});
// Logger
shouldApiLog && requestInterceptors.push(config => {
  const {
    url,
    method,
    params,
    data,
  } = config;
  isDev && console.log(`==>\tRequest: [${method}] ${url}`, params, data);
  return config;
});
requestInterceptors.forEach(interceptor => {
  defaultInstance.interceptors.request.use(interceptor, errorHandler);
});

// 响应拦截器
const responseInterceptors = [];
// Logger
shouldApiLog && responseInterceptors.push(res => {
  const {
    url,
    method,
  } = res.config;
  console.log(`\tResponse: [${method}] ${url}`, res.data);
  console.log('');
  return res;
});
// Response unwrap
responseInterceptors.push(response => {
  const res = response.data;
  return [res, response];
});
// 响应状态拦截
responseInterceptors.push(async([response, axiosResponse]) => {
  const {
    errcode,
    errmsg: message,
    detailErrMsg,
  } = response;
  const {
    'X-Res-Type': resType = 'unwrap',
  } = axiosResponse.config.headers || {};
  if (errcode === 0) {
    return resType === 'unwrap' ? response : axiosResponse;
  }
  if (errcode === 401 && router.currentRoute.path !== '/login') {
    removeToken();
    await MessageBox.confirm('登录信息已过期，请重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      showCancelButton: false,
      type: 'warning'
    });
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      },
    });
    Promise.resolve().then(() => {
      window.location.reload();
    });
  } else if (errcode === 500) {
    isDev && message && Message.error({
      showClose: true,
      message,
    });
    detailErrMsg && console.error(detailErrMsg);
  } else {
    message && Message.error({
      showClose: true,
      message,
    });
  }
  return resType === 'unwrap' ? response : axiosResponse;
});

responseInterceptors.forEach(interceptor => {
  defaultInstance.interceptors.response.use(interceptor, errorHandler);
});

export default defaultInstance;
