<template>
<title-panel title=静态评估因子>
        <query-table
            ref="queryTable"
            :query-fields='queryFields'
            :table-fields="tableFields"
            :fetch-method="fetchTableM"
            :show-row-operation='false'
            row-operation-width="120px"
            layout="total, sizes , -> , pager, next"
            @selection-change="handSelectionChange"
        >
          <template slot="row-operation" slot-scope="scope">
            <div class="test-see1">
              <el-button type="text" button-type="edit" class="text-primary" icon="el-icon-edit"
                comp-name="修改" title="修改" @click="handleUpdate(scope.row)"></el-button>
              <el-button type="text" button-type="custom" icon="el-icon-delete" comp-name="删除"
                title="删除" class="text-danger" @click="handleDelete(scope.row)"></el-button>
            </div>
          </template>
          <div slot="query-append">
            <el-button @click="handleAdd" type="primary">新增</el-button>
          </div>
        </query-table>
</title-panel>
</template>

<script>
import router from '@/router';
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import { tableFields } from './tableFields';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'ParameterStatic',
  components: {
    TitlePanel,
    QueryTable,
  },
  data() {
    return {
      dialogTitle: '新增',
      dialogVisible: false,
      tableFields,
      queryFields,
      selection: [],
    };
  },
  async created() {
  },
  methods: {
    fetchTableM(options) {
      const params = {
        kind: 'jt',
        ...options
      };
      console.log(options);
      console.log(params);
      return this.$api.parameter.getLabelList(params);
    },
    handSelectionChange(selection) {
      this.selection = [...selection];
    },
    handleUpdate() {
    },
    async handleDelete(row) {
      const { errcode } = this.$api.parameter.deleteById(row.id);
      if (errcode === 0) {
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
    },
    handleAdd() {
      router.push({
        path: '/parameter/static-config-add',
        query: {
        }
      });
    },
    search() {
      console.log('测试');
      this.fetchTableM();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
// .c-query__append{
//   p{
//       height:24px;
//       font-size:18px;
//       font-weight:400;
//       line-height:26px;
//       color:rgba(110,121,153,1);
//       span{
//         margin-right: 37px;
//       }
//   }
// }

/deep/ .c-query-table__table{
  .el-button--primary{
    padding: 4px 14px;
    border:1px solid $--color-purple;
    border-radius:4px;
    background-color: transparent;
    span{
      font-size: 16px;
      font-weight:400;
      color:$--color-purple;
    }
  }
  .el-button--danger{
    background-color: transparent;
    color:#ff0000;
    padding: 0;
    border: 0px;
  }
}
</style>
