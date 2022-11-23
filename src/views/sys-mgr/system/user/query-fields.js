import {
  STATUS_LIST,
} from '@/constant/sys-mgr';
export const userQueryFields = [
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    options: STATUS_LIST,
  },
  {
    label: '账号',
    prop: 'account',
    type: 'input',
    placeholder: '请输入账号',
  },
  {
    label: '昵称',
    prop: 'cnName',
    type: 'input',
    placeholder: '请输入昵称',
  },
];
