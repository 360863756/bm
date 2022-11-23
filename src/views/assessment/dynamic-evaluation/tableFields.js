import DangrousGrade from '@/components/DangrousGrade/Index.vue';
import { DANGER_TYPES } from '@/constant/app';
import { ASSESSMENT } from '@/constant/assessment';
import router from '@/router';
function goDetail(row) {
  let { pgsj, zfbh } = row;
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
let style = {
  borderRadius: '8px',
  lineHeight: '16px',
  color: '#000000',
  fontWeight: '600',
  textAlign: 'center',
  marginRight: '3px'
};
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
    render(h, { row }) {
      return (
        <div style='display:flex;align-items:center'>{(getGrade(row) === 0 || getGrade(row) === 1)
          ? <DangrousGrade
            width="16"
            height="16"
            levelTypes={getGrade(row)}
            colorList={DANGER_TYPES}
            is-show-low-background-color={true}
            customStyle={style}
          >
          !
          </DangrousGrade> : ''}{row.zfxm}</div>
      );
    },
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
    label: '自杀',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.zswxdj} ></DangrousGrade>
      );
    },
  },
  {
    label: '脱逃',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.ttwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '行凶',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.xxwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '抗改',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.kgwxdj}></DangrousGrade>
      );
    },
  },
  {
    label: '破坏',
    width: '60',
    render(h, { row }) {
      return (
        <DangrousGrade is-show-low-background-color={true} levelTypes={row.phwxdj}></DangrousGrade>
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
