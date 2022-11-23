// import {
//   Random,
// } from 'mockjs';
import {
  R, // 构造响应
  // RP, // 构造分页响应
  // RE, // 构造错误响应
} from './index';

export default [
  {
    url: '/api/some/tableList',
    method: 'get',
    response(options) {
      return R({
        'content': [{
          'fileId': '0000000070a9e3540170a9e86cd50001',
          'reportName': '香港(2020-03-05 16:55:39).docx',
          'reportType': '香港',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 16:55:47',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/eventAnalyse/香港(2020-03-05 16:55:39).docx'
        }, {
          'fileId': '0000000070a95f170170a986c0dc0008',
          'reportName': '企业舆情(2020-03-05 15:08:52).docx',
          'reportType': '企业舆情',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 15:09:06',
          'reportFolderId': {
            'folderId': '000000006f7bfae8016f7ebaae070dae',
            'reportFolderName': '企业舆情',
            'createTime': '2020-01-07 14:39:21',
            'updateTime': null,
            'status': '1',
            'reportNumber': null
          },
          'updateTime': null,
          'status': '1',
          'reportPath': '/reportClip/企业舆情(2020-03-05 15:08:52).docx'
        }, {
          'fileId': '0000000070a95f170170a980b7ec0007',
          'reportName': '银行(2020-03-05 15:02:21).docx',
          'reportType': '银行',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 15:02:30',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/companyAnalyse/银行(2020-03-05 15:02:21).docx'
        }, {
          'fileId': '0000000070a8c62b0170a8c7fe470000',
          'reportName': '企业舆情(2020-03-05 11:40:39).docx',
          'reportType': '企业舆情',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 11:40:44',
          'reportFolderId': {
            'folderId': '000000006f7bfae8016f7ebaae070dae',
            'reportFolderName': '企业舆情',
            'createTime': '2020-01-07 14:39:21',
            'updateTime': null,
            'status': '1',
            'reportNumber': null
          },
          'updateTime': null,
          'status': '1',
          'reportPath': '/reportClip/企业舆情(2020-03-05 11:40:39).docx'
        }, {
          'fileId': '0000000070a666530170a6688c8b0000',
          'reportName': '企业舆情(2020-03-05 00:36:42).docx',
          'reportType': '企业舆情',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 00:37:14',
          'reportFolderId': {
            'folderId': '000000006f7bfae8016f7ebaae070dae',
            'reportFolderName': '企业舆情',
            'createTime': '2020-01-07 14:39:21',
            'updateTime': null,
            'status': '1',
            'reportNumber': null
          },
          'updateTime': null,
          'status': '1',
          'reportPath': '/reportClip/企业舆情(2020-03-05 00:36:42).docx'
        }, {
          'fileId': '0000000070a643930170a652b80f014b',
          'reportName': '企业舆情(2020-03-05 00:13:11).docx',
          'reportType': '企业舆情',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 00:13:24',
          'reportFolderId': {
            'folderId': '000000006f7bfae8016f7ebaae070dae',
            'reportFolderName': '企业舆情',
            'createTime': '2020-01-07 14:39:21',
            'updateTime': null,
            'status': '1',
            'reportNumber': null
          },
          'updateTime': null,
          'status': '1',
          'reportPath': '/reportClip/企业舆情(2020-03-05 00:13:11).docx'
        }, {
          'fileId': '0000000070a643930170a648981f014a',
          'reportName': '香港(2020-03-05 00:02:06).docx',
          'reportType': '香港',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-05 00:02:20',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/eventAnalyse/香港(2020-03-05 00:02:06).docx'
        }, {
          'fileId': '0000000070a643930170a64538d60000',
          'reportName': '湖北省(2020-03-04 23:58:11).docx',
          'reportType': '湖北省',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-04 23:58:39',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/companyAnalyse/湖北省(2020-03-04 23:58:11).docx'
        }, {
          'fileId': '0000000070a5c2b30170a5c7a5dc0001',
          'reportName': '香港(2020-03-04 21:41:22).docx',
          'reportType': '香港',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-04 21:41:30',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/eventAnalyse/香港(2020-03-04 21:41:22).docx'
        }, {
          'fileId': '0000000070a5c2b30170a5c3c8e30000',
          'reportName': '湖北省(2020-03-04 21:37:05).docx',
          'reportType': '湖北省',
          'reportAuthor': {
            'userId': '000000006f7b283e016f7b2df4e80001',
            'account': 'bmsoft',
            'userCnName': '北明软件',
            'phone': null,
            'email': '40472320@qq.com',
            'img': '/static/image/79344476-aca4-41fc-a39a-f892d2ef942a.png',
            'nickName': '李小强',
            'headImgUrl': 'http://thirdwx.qlogo.cn/mmopen/wy90FmP1alQ8BWVe6lHvmwbHn9JwFKzvBAeTfZO6lXsp45Eia8nv0ukuNDAeL7ic9mh4ibhz5ARxIwIU4DJgcSicKWvdHLeljhPp/132',
            'system': 0,
            'companyRole': 1,
            'status': '1',
            'creator': 'admin',
            'createTime': '2020-01-06 22:06:46',
            'updateTime': '2020-03-05 14:57:48',
            'updateTor': '1',
            'openId': 'oS4vhwlaB0e39mCOp7JzwwyB3Hsk'
          },
          'createTime': '2020-03-04 21:37:17',
          'reportFolderId': null,
          'updateTime': null,
          'status': '1',
          'reportPath': '/analyse/companyAnalyse/湖北省(2020-03-04 21:37:05).docx'
        }],
        'pageable': {
          'sort': {
            'sorted': true,
            'unsorted': false,
            'empty': false
          },
          'pageSize': 10,
          'pageNumber': 0,
          'offset': 0,
          'unpaged': false,
          'paged': true
        },
        'last': false,
        'totalPages': 3,
        'totalElements': 29,
        'first': true,
        'sort': {
          'sorted': true,
          'unsorted': false,
          'empty': false
        },
        'numberOfElements': 10,
        'size': 10,
        'number': 0,
        'empty': false
      }
      );
    },
  }
];
