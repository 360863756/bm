import { deleteById } from '@/api/parameter';
import router from '@/router';

function handleUpdate(row, vue) {
  router.push({
    path: '/parameter/dynamic-assess-configuration/detail',
    query: {
      id: row.id,
    }
  });
}

async function handleDelete(row, vue) {
  const { errcode } = await deleteById(row.id);
  if (errcode === 0) {
    vue.$message.success('删除成功');
    const index = vue.data.findIndex((item) => {
      return item.id === row.id;
    });
    vue.data.splice(index, 1);
  } else {
    vue.$message.warning('删除失败');
  }
}

export const tableFields = [
  {
    label: '评估分组',
    prop: 'group_name',
    minWidth: '100'
  },
  {
    label: '评估项',
    prop: 'field_name',
    minWidth: '150'
  },
  {
    label: '评估因子',
    prop: 'name',
    minWidth: '200'
  },
  {
    label: '描述',
    prop: 'remark',
    minWidth: '150'
  },
  {
    label: '规则',
    prop: 'rule',
    minWidth: '250'
  },
  {
    label: '评估条件',
    prop: 'where_sql',
    minWidth: '250'
  },
  {
    label: '危险分值',
    prop: 'risk_value',
    minWidth: '100'
  },
  {
    label: '操作',
    width: '100px',
    render(h, { row }, vue) {
      return (
        <div class='operation'>
          <el-button type='text' button-type='edit' icon='el-icon-edit' title='修改' onClick={() => {
            handleUpdate(row, vue);
          }}></el-button>
          <el-button type='danger' button-type="custom" icon="el-icon-delete" comp-name="删除" on-click={ () => {
            handleDelete(row, vue);
          }}></el-button>
        </div>
      );
    }
  }
];
