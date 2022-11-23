import {
  Random,
} from 'mockjs';
import {
  R, // 构造响应
  // RP, // 构造分页响应
  // RE, // 构造错误响应
} from './index';

export default [
  {
    url: '/api//some/url',
    method: 'get',
    response(options) {
      return R(Random.guid());
    },
  },
];
