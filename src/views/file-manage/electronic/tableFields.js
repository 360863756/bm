import router from '@/router';
function goDetail(row) {
  router.push({
    path: '/file-manage/electronic/detail',
    query: {
      zfbh: row.zfbh
    }
  });
}
export const tableFields = [
  {
    label: '姓名',
    prop: 'zfxm'
  },
  {
    label: '编号',
    prop: 'zfbh',
  },
  {
    label: '在押标志',
    prop: 'zfzt',
  },
  {
    label: '出身日期',
    prop: 'csrq',
  },
  {
    label: '家庭住址',
    prop: 'jtzz',
  },
  {
    label: '出生区划',
    prop: 'csqh',
  },
  {
    label: '操作',
    render(h, { row }) {
      return (<el-button type='primary' on-click={() => {
        goDetail(row);
      }} >查看详情</el-button>
      );
    },
  }
];
