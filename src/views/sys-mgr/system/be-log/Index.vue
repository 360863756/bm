<template>
<div class="page">
  <query-table
    ref="queryTable"
    :query-fields="queryFields"
    :table-fields="tableFields"
    :fetch-method="fetchMethod"
    :adaptive="{ bottomOffset: 24 }"
    :page-size="20"
    show-selection
    reserve-selection
    @selection-change="handleSelectionChange"
  >
    <template slot="query-operation">
      <el-button type="primary" class="mybutton">检 索</el-button>
    </template>
    <template slot="query-append">
      <el-button
        :disabled="selection.length === 0"
        @click="exportTableData"
        class="exportbtn"
      >导出</el-button>
    </template>
    <template slot="row-operation" slot-scope="{ row }">
      <el-button type="text" @click="viewDetail(row)">详情</el-button>
    </template>
  </query-table>
  <el-dialog
    title="日志详情"
    :visible.sync="dialogVisible"
  >
    <el-form
    :model="formModel"
    label-width="7em"
    label-position="left">
      <el-form-item label="操作模块">
        <span>{{ formModel.operationModel }}</span>
      </el-form-item>
      <el-form-item label="操作人员">
        <span>{{ formModel.operationName }}</span>
      </el-form-item>
      <el-form-item label="操作机构">
        <span>{{ formModel.organization }}</span>
      </el-form-item>
      <el-form-item label="操作事项">
        <span>{{ formModel.operationMatters }}</span>
      </el-form-item>
      <el-form-item label="操作内容">
        <span>{{ formModel.operationContent }}</span>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>

</div>
</template>

<script>
import QueryTable from '@/components/QueryTable/Index.vue';
import { downloadFormAxiosRes } from '@/utils/downloadFile.js';
import {
  logQueryFields as queryFields,
} from './query-fields';
import {
  logTableFields as tableFields,
} from './table-fields';

export default {
  name: 'BeLog',
  components: {
    QueryTable,
  },
  data() {
    return {
      queryFields,
      tableFields,
      selection: [],
      dialogVisible: false,
      formModel: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    fetchMethod(options) {},
    handleSelectionChange(selection) {
      this.selection = [...selection];
    },
    viewDetail(log) {
      this.formModel = {
        ...log,
      };
      this.dialogVisible = true;
    },
    async exportTableData() {
      await this.$confirm(`确认导出选中的${this.selection.length}条数据？`, '确认导出');
      const ids = this.selection.map(item => item.id);
      const fileRes = await this.$api.log.exportData(ids);
      await downloadFormAxiosRes(fileRes);
    },
    search() {
      const queryTable = this.$refs.queryTable;
      queryTable && queryTable.onSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
/deep/ .el-input__inner {
  position: relative;
}
.exportbtn {
  position: absolute;
  top: 160px;
  left: 280px;
}
.el-button--primary {
  position: absolute;
  top: 5px;
  right: -70px;
}
/deep/ .c-query-table__query {
  margin-bottom: 22px;
}
/deep/ .el-dialog__header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(232,232,232,1);
}
</style>
