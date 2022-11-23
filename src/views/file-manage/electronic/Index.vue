<template>
<title-panel title="电子档案">
        <query-table
            ref="queryTable"
            :query-fields='queryFields'
            :table-fields="tableFields"
            :fetch-method="fetchTableM"
            :show-row-operation='false'
            row-operation-width="80px"
            layout="total, sizes , -> , pager, next"
            @selection-change="handSelectionChange"
            show-selection
            :max-table-height='true'
        >
        <div slot="query-append">
          <el-button @click="importantData" type="primary">导出</el-button>
        </div>
        </query-table>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import { tableFields } from './tableFields';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'fileElectronic',
  components: {
    TitlePanel,
    QueryTable,
  },
  data() {
    return {
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
        ...options
      };
      return this.$api.fileManage.getElectronicData(params);
    },
    handSelectionChange(selection) {
      this.selection = [...selection];
    },
    handleSelect() {
    },
    search(value) {
    },
    async importantData() {
      if (this.selection.length === 0) {
        return this.$message.warning('请选择要导出的数据');
      }
      let str = this.selection.reduce((string, item, index) => {
        if (index === this.selection.length - 1) {
          return string + item.zfbh;
        }
        return string + item.zfbh + ',';
      }, '');
      let { data, errcode } = await this.$api.fileManage.importantElectronicData({
        zfbh: 'in$' + str
      });
      if (errcode === 0) {
        let a = document.createElement('a');
        a.href = this.$BASE_API + data.filePath;
        a.download = '服刑人员电子档案表.xls';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 0);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
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
}
</style>
