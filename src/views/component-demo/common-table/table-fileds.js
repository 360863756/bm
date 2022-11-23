export const userTableFields = [
  {
    label: '账号',
    prop: 'account'
  },
  {
    label: '昵称',
    prop: 'userCnName'
  },
  {
    label: '类型',
    render(h, { row }) {
      return (
        <span>{ row.role }</span>
      );
    }
  },
  {
    label: '状态',
    render(h, { row }) {
      return (
        <span>{ row.status === 1 ? '正常' : '禁用' }</span>
      );
    }
  }
];
