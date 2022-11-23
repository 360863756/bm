export const tableFields = [
  {
    label: '评估类型',
    prop: 'cpjd'
  },
  {
    label: '目标群体',
    prop: 'mbrs'
  },
  {
    label: '评估人数',
    prop: 'cprs'
  },
  {
    label: '评估占比',
    prop: 'cpzb',
    render(h, { row }) {
      return (<p>{row.cpzb}%</p>);
    },
  },
];
