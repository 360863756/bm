import { colorTextViolet } from '@/style/var.scss';
const style = {
  color: colorTextViolet
};
export const tableFields = [
  {
    label: '监区',
    prop: 'jq'
  },
  {
    label: '编号',
    prop: 'zfbh',
  },
  {
    label: '姓名',
    prop: 'zfxm',
  },
  {
    label: '年龄',
    prop: 'nl',
  },
  {
    label: '刑期',
    prop: 'xq',
  },
  {
    label: '疾病名称',
    minWidth: '80',
    prop: 'jbmc',
  },
  {
    label: '诊断结果',
    prop: 'zdjg',
    width: '100',
  },
  {
    label: '诊断时间',
    prop: 'zdsj',
  },
  {
    label: '治疗结果',
    prop: 'zljg',
    render(h, { row }) {
      return (<span style={style}>{row.zljg}</span>);
    }
  },
  {
    label: '治疗时间',
    prop: 'zlsj',
  },
  {
    label: '操作',
    prop: 'cz',
    minWidth: '100',
    render() {
      return (<el-button type="primary">查看</el-button>);
    }
  },
];
