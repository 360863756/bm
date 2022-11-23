import MD5 from 'crypto-js/md5';
import { TOKEN_KEY } from '@/constant/app';
import Cookies from 'js-cookie';

/**
 * 获取token
 */
export function getToken() {
  return localStorage
    ? localStorage.getItem(TOKEN_KEY)
    : Cookies.get(TOKEN_KEY);
}

/**
 * 设置token
 * @param {string} token token
 */
export function setToken(token) {
  return localStorage
    ? localStorage.setItem(TOKEN_KEY, token)
    : Cookies.set(TOKEN_KEY, token);
}

/**
 * 移除token
 */
export function removeToken() {
  return localStorage
    ? localStorage.removeItem(TOKEN_KEY)
    : Cookies.remove(TOKEN_KEY);
}

export function encryptPassword(password) {
  return MD5(password).toString();
}
