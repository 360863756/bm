import router from '@/router';
import { ASSESSMENT } from '@/constant/assessment';
function see(path, row) {
  let { zfbh } = row;
  router.push({
    path,
    query: {
      zfbh
    }
  });
}
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
    label: '入监评估次数',
    width: '250',
    render(h, { row }) {
      return (
        <div class='rjgrade grade'><span>{row.rjpgcs}</span><el-button on-click={() => {
          see(ASSESSMENT['psychological']['detailPath']['onePage'].path, row);
        }} >查看</el-button></div>
      );
    },
  },
  {
    label: '中期评估次数',
    width: '250',
    render(h, { row }) {
      return (
        <div class='fxgrade grade'><span>{row.zqpgcs}</span><el-button on-click={() => {
          see(ASSESSMENT['psychological']['detailPath']['twoPage'].path, row);
        }} >查看</el-button></div>
      );
    },
  },
  {
    label: '出监前评估次数',
    width: '250',
    render(h, { row }) {
      return (
        <div class='cjgrade grade'><span>{row.cjpgcs}</span><el-button on-click={() => {
          see(ASSESSMENT['psychological']['detailPath']['threePage'].path, row);
        }} >查看</el-button></div>
      );
    },
  }
];
