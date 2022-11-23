// import {
//   Random,
// } from 'mockjs';
import {
  R, // 构造响应
  // RP, R, // 构造分页响应
  // RE, // 构造错误响应
} from './index';
// import {
//   DANGER_TYPES,
// } from '@/constant/article';

export default [
  // {
  //   url: '/api/some/tableList',
  //   method: 'get',
  //   response(options) {
  //     return RP(Array(4).fill(undefined).map(() => ({
  //       id: Random.guid(),
  //       level: Random.pick(DANGER_TYPES.map(type => type.value)),
  //       title: Random.cword(5),
  //       abstractContent: Random.cparagraph(),
  //       time: Random.datetime(),
  //     })));
  //   },
  // },
  {
    url: '/api/platform/getData',
    response(options) {
      return R({
        peopleCounting: {
          allPeople: 2667,
          policeman: 19,
          newpeople: 26,
          outpeople: 19
        }
      });
    },
  }
];
