export const userQueryFields = [
  {
    label: '用户名',
    prop: 'account',
    placeholder: '请输入用户名',
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 0 },
    ]
  }
];
