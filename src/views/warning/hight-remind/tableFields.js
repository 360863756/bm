import DangrousGrade from '@/components/DangrousGrade/Index.vue';
import router from '@/router';
import { DANGER_TYPES } from '@/constant/app';
import { ASSESSMENT } from '@/constant/assessment';
function goDetail(row) {
  const { pgsj, zfbh } = row;
  router.push({
    path: ASSESSMENT['dynamic']['detailPath']['twoPage'].path,
    query: {
      pgsj,
      zfbh
    }
  });
}
function getGrade(obj) {
  if (!obj.txlb) return false;
  let filters = DANGER_TYPES.find(type => type.label === obj.txlb);
  return filters.value;
}
export const tableFields = [
  {
    label: '提醒类别',
    minWidth: '100',
    prop: 'txlb',
    render(h, { row }) {
      return (
        <div style='display:flex;align-items:center'>{(getGrade(row) === 0 || getGrade(row) === 1)
          ? <DangrousGrade
            width="16"
            height="16"
            levelTypes={getGrade(row)}
            colorList={DANGER_TYPES}
            className="circle"
          >
            <i>!</i>
          </DangrousGrade> : ''}{row.txlb}</div>
      );
    },
  },
  {
    label: '编号',
    width: '80',
    prop: 'zfbh',
  },
  {
    label: '姓名',
    width: '60',
    prop: 'zfxm'
  },
  {
    label: '年龄',
    width: '60',
    prop: 'nl',
  },
  {
    label: '刑期',
    width: '60',
    prop: 'xq',
  },
  {
    label: '入监时间',
    minWidth: '120',
    prop: 'rjsj',
  },
  {
    label: '评估分值',
    minWidth: '100',
    prop: 'pgdf',
  },
  {
    label: '自杀',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade levelTypes={row.zswxdj} ></DangrousGrade>
      );
    },
  },
  {
    label: '脱逃',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade levelTypes={row.ttwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '行凶',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade levelTypes={row.xxwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '抗改',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade levelTypes={row.kgwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '破坏',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade levelTypes={row.phwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '管控措施',
    width: '120',
    render(h, { row }) {
      return (
        <el-button on-click={ () => {
          goDetail(row);
        }} type='primary'>查看措施</el-button>
      );
    },
  }
];
