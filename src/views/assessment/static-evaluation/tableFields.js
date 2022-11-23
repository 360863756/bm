import DangrousGrade from '@/components/DangrousGrade/Index.vue';
import { ASSESSMENT } from '@/constant/assessment';
import router from '@/router';
function goDetail(row) {
  let { pgsj, zfbh } = row;
  router.push({
    path: ASSESSMENT['static']['detailPath']['twoPage'].path,
    query: {
      pgsj,
      zfbh
    }
  });
}
export const tableFields = [
  {
    label: '监区',
    prop: 'jqmc'
  },
  {
    label: '编号',
    width: '120px',
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
    width: '100px',
    prop: 'xq',
  },
  {
    label: '入监时间',
    minWidth: '120',
    prop: 'rjsj',
  },
  {
    label: '评估分值',
    width: '100',
    prop: 'pgfz',
  },
  {
    label: '评估等级',
    width: '150',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.wxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '管控措施',
    width: '150',
    render(h, { row }) {
      return (
        <el-button on-click={ (e) => {
          goDetail(row);
        }} type='primary'>查看措施</el-button>
      );
    },
  }
];
