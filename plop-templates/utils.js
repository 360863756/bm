const fs = require('fs');

// Vue组件常用选项
exports.VUE_OPTIONS = [
  {
    name: 'components',
    defaultChecked: false,
  },
  {
    name: 'directives',
    defaultChecked: false,
  },
  {
    name: 'filters',
    defaultChecked: false,
  },
  {
    name: 'props',
    defaultChecked: true,
  },
  {
    name: 'data',
    defaultChecked: true,
  },
  {
    name: 'computed',
    defaultChecked: true,
  },
  {
    name: 'watch',
    defaultChecked: true,
  },
  {
    name: 'created',
    defaultChecked: true,
  },
  {
    name: 'mounted',
    defaultChecked: true,
  },
  {
    name: 'beforeDestory',
    defaultChecked: false,
  },
  {
    name: 'methods',
    defaultChecked: true,
  },
];

/**
 * 列举目录下的文件
 *
 * @param {string} root 根目录
 * @param {RegExp} include 包含的正则表达式
 * @returns
 */
exports.list = function(root, include) {
  const files = fs.readdirSync(root);
  if (Object.prototype.toString.call(include) === '[object RegExp]') {
    return files.filter(file => include.test(file));
  }
  return files;
};
