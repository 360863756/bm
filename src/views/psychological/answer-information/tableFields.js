import router from '@/router';
function goDetail(id) {
  router.push({
    path: '/psychological/answer-information/detail',
    query: {
      id,
    }
  });
}
function goResult(row) {
  let { pgsj, zfbh } = row;
  router.push({
    path: '/psychological/answer-information/result',
    query: {
      pgsj,
      zfbh
    }
  });
}
export const tableFields = [
  {
    label: '序号',
    prop: 'id'
  },
  {
    label: '罪犯编号',
    prop: 'zfbh',
  },
  {
    label: '姓名',
    prop: 'zfxm',
  },
  {
    label: '监区',
    prop: 'jq',
  },
  {
    label: '评测内容',
    prop: 'cplb',
    width: '300px',
  },
  {
    label: '操作',
    width: '300px',
    render(h, { row }) {
      return (
        <div class='operation'>
          <el-button type='primary' on-click={ () => {
            goResult(row);
          }}>评估结果</el-button>
          <el-button onClick={() => {
            goDetail(row.id);
          }} type='primary'>试题情况</el-button>
        </div>
      );
    }
  }
];
