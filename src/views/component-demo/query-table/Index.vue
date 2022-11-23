<template>
<div class="page">
  <query-table
    ref="queryTable"
    :query-fields="queryFields"
    :table-fields="tableFields"
    :fetch-method="$api.componentDemo.getCommonTableData"
    row-operation-width="200px"
    show-selection
  >
    <template slot="query-append">
      <el-button type="primary">新增</el-button>
    </template>
    <template slot="row-operation" slot-scope="scope">
      <el-button type="text">编辑 - {{ scope.row.userCnName }} - {{ scope.column.property }} - {{ scope.$index }}</el-button>
    </template>
  </query-table>
</div>
</template>

<script>
import QueryTable from '@/components/QueryTable/Index.vue';
import {
  userQueryFields as queryFields,
} from './queryFields';
import {
  userTableFields as tableFields,
} from './tableFields';

export default {
  name: 'QueryTableDemo',
  components: {
    QueryTable,
  },
  data() {
    return {
      queryFields,
      tableFields,
    };
  },
};
</script>
