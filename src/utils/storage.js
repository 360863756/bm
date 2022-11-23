/**
 * 保存localStorage
 * @param {string} key 存储key
 * @param {*} value 存储值
 */
export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 获取localStorage数据
 * @param {string} key 存储key
 */
export function getItem(key) {
  const s = localStorage.getItem(key);
  return s && JSON.parse(s);
}
