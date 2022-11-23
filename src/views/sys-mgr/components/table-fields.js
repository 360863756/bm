import {
  STATUS_LIST,
} from '@/constant/sys-mgr';

export const userTableFields = [
  {
    label: '账号',
    prop: 'account',
  },
  {
    label: '昵称',
    prop: 'userCnName',
  },
  {
    label: '类型',
    render(h, { row }) {
      const roleNames = row.roles && row.roles.map(role => role.roleName).join('、');
      return (
        <span>{ roleNames }</span>
      );
    }
  },
  {
    label: '状态',
    render(h, { row }) {
      const foundStatus = STATUS_LIST.find(item => item.value === row.status);
      return (
        <span
          class={ `table-column__status ${foundStatus ? foundStatus.className : ''}` }
        >
          { foundStatus && foundStatus.label }
        </span>
      );
    }
  }
];
