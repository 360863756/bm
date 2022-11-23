<template>
  <title-panel title="关联数据查询" class="panel">
    <div class="c-query-table">
      <form-list class="c-query-table__query"
                 @dynamicTableData="getFormData">
        <slot name="query-dynamic" slot="dynamic"></slot>
        <slot name="query-append" slot="query-operation"></slot>
      </form-list>
      <!-- <slot name="caution-append"></slot> -->
      <div class="c-query-table-caution">
         <span>查询结果   （记录规则总数：{{total}}行）</span>
         <el-button type="primary" @click="handleExport()">导出</el-button>
      </div>
    <!-- 表格 table -->
    <!-- TODO: 翻页滚动条置顶 -->
    <common-table
      class="c-query-table__table"
      ref="table"
      :data="tableData"
      :fields="tableFields"
      :loading="tableLoading"
      :pageSize="pageSize"
      :pageSizes="pageSizes"
      :pageNo="pageNo"
      :total="total"
      :show-row-operation="showRowOperation"
      :row-key="rowKey"
      v-bind="$attrs"
      v-on="$listeners"
      rowOperationWidth='0px'
      layout="total, sizes , -> , pager, next"
      :show-selection = 'false'
      :adaptive='adaptive'
      @current-change="onPageNoChange"

      @size-change="onPageSizeChange"
    >
      <template slot="row-operation" slot-scope="{ row, column, $index }">
        <slot name="row-operation" :row="row" :column="column" :$index="$index"></slot>
      </template>
    </common-table>
  </div>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import CommonTable from '@/components/CommonTable/Index.vue';
import FormList from './components/FormList/Index.vue';
export default {
  name: 'FileManageDataQuery',
  inheritAttrs: false,
  components: {
    TitlePanel,
    CommonTable,
    FormList
  },
  props: {
    // fetchMethod: {
    //   type: Function,
    //   required: true,
    // },
    // tableFields: {
    //   type: Array,
    //   required: true,
    // },
    // queryFields: {
    //   type: Object,
    //   required: true,
    // },
    showQueryOperation: {
      type: Boolean,
      default: false,
    },
    // showRowOperation: {
    //   type: Boolean,
    //   default: true,
    // },
    handleData: Function,
    rowKey: {
      type: String,
      default: 'id',
    },
    fetchDataOnChange: {
      type: Boolean,
      default: true,
    },
    onSearchBefore: Function,
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100],
    }
  },
  data() {
    return {
      search: {},
      tableData: [],
      tableLoading: false,
      internalPageSize: this.pageSize,
      pageNo: 1,
      total: 0,
      showRowOperation: false,
      elForm: {},
      options: {},
      formData: [],
      sqlQueryFields: [],
      tableFields: [],
      adaptive: true,
    };
  },
  created() {
    // this.onFetchData();
  },
  methods: {
    fetchMethod(options) {
      const params = {
        ...options
      };
      return this.$api.fileQuery.fileQuery(params);
    },
    onSearch() {
      typeof this.onSearchBefore === 'function' && this.onSearchBefore();
      this.pageNo = 1;
      this.onFetchData();
    },
    getFormData(formData, tableArr) {
      this.formData = formData;
      this.sqlQueryFields = [];
      /**
       * 以下是设置动态表头
       */
      this.tableFields = [];
      tableArr.forEach((item, index, arr) => {
        this.tableFields.splice(index, 0, {
          label: item.field_name,
          prop: item.field_num
        });
      });
      for (var i = 0; i < this.tableFields.length; i++) {
        // 设置删除状态位，每出现一个相同元素则+1，当大于1时，就删除一个重复元素
        var deleteStatus = 0;
        this.tableFields.forEach((item, index, arr) => {
          if (this.tableFields[i].label === item.label && this.tableFields[i].prop === item.prop) {
            deleteStatus = deleteStatus + 1;
            if (deleteStatus > 1) {
              this.tableFields.splice(i, 1);
            }
          }
        });
      }
      /**
       * 以下是处理查询字段
       */
      tableArr.forEach((item, index, arr) => {
        this.sqlQueryFields.splice(index, 0, item.table_num + '.' + item.field_num);
      });
      this.onFetchData({});
    },
    // onSearchReset() {
    //   this.pageNo = 1;
    //   this.$refs.query && this.$refs.query.resetFields();
    //   this.onFetchData();
    // },
    onPageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.onFetchData();
    },
    onPageSizeChange(pageSize) {
      this.internalPageSize = pageSize;
      this.onFetchData();
    },
    async onFetchData(options = {}) {
      this.tableLoading = true;
      // this.tableData = [];
      // this.total = 0;
      options = {
        pageNo: this.pageNo,
        pageSize: this.internalPageSize,
        queryFields: this.sqlQueryFields.join(','),
        ...this.formData,
      };
      this.options = options;
      try {
        const res = await this.fetchMethod(options);
        // this.sqlQueryFields = [];
        this.$emit('data-responsed', res);
        const { errcode, data } = res;
        if (errcode === undefined) {
          const { dataList = [], totalNum = 0 } = data || {};
          this.tableData = this.handleData ? this.handleData(dataList) : dataList;
          this.total = totalNum;
        } else {
          this.tableData = [];
          this.total = 0;
        }
        this.$emit('data-fetched', this.tableData);
      } catch (e) {
        console.error(e);
      } finally {
        this.tableLoading = false;
      }
    },
    handleFetchData() {
      this.fetchDataOnChange && this.onSearch();
    },
    /***
     * 根据rowKey替换表格行数据
     * @param {object} row 待替换行
     */
    replaceRow(row) {
      if (this.rowKey) {
        const key = row[this.rowKey];
        const foundRowIndex = this.tableData.findIndex(tableRow => tableRow[this.rowKey] === key);
        if (foundRowIndex !== -1) {
          this.tableData.splice(foundRowIndex, 1, row);
        }
      } else {
        console.warn('[QueryTable.replaceRow]: 请提供rowKey');
      }
    },
    /***
     * 表首插入
     * @param {object} row 待插入行
     */
    prependRow(row) {
      this.tableData.unshift(row);
    },
    /**
     * 表首插入多行
     * @param {array} rows 行数据
     */
    prependRows(rows) {
      this.tableData = [...rows, ...this.tableData];
    },
    /***
     * 表尾插入
     * @param {object} row 待插入行
     */
    appendRow(row) {
      this.tableData.push(row);
    },
    /***
     * 移除表格行
     * @param {object} row 待删除行
     */
    removeRow(row) {
      if (this.rowKey) {
        const key = row[this.rowKey];
        const foundRowIndex = this.tableData.findIndex(tableRow => tableRow[this.rowKey] === key);
        if (foundRowIndex !== -1) {
          this.tableData.splice(foundRowIndex, 1);
        }
      } else {
        console.warn('[QueryTable.removeRow]: 请提供rowKey');
      }
    },
    getRow(rowKey) {
      if (this.rowKey) {
        const foundRow = this.tableData.find(tableRow => tableRow[this.rowKey] === rowKey);
        return foundRow;
      } else {
        console.warn('[QueryTable.getRow]: 请提供rowKey');
      }
    },
    /**
     * 设置更新Search参数
     */
    setSearch(key, value) {
      this.$set(this.search, key, value);
    },
    async handleExport() {
      var tableHeader = {};
      this.$refs.table.fields.forEach((item, index) => {
        tableHeader[item.prop] = item.label;
      });
      Object.keys(tableHeader).forEach((key) => {
        /* if (tableHeader[key].label != undefined && tableHeader[key].property != undefined) {
          formHeader.push(tableHeader[key].label);
        } */
      });
      var option = {
        formHeader: tableHeader,
        options: this.options
      };
      console.log('-------------------adadada', process.env.VUE_APP_LAYOUT);
      const { filePath } = await this.$api.fileQuery.exportExcel(option);
      window.location.href = 'http://localhost:9528/risk/dev-api' + filePath;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.bgc {
  width: 100%;
  height: 50vw;
  cursor: pointer;
  background-image: url('~@/assets/images/preview/03.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}

.panel{
  /deep/ .c-query__form{
  display: flex;
  justify-content: flex-start;
/*     .el-form-item:nth-child(){
      flex: 1;
    } */
    .el-form-item__content{
      width: 100%;
    }
  }
  .append{
    width: 220px;
    display: flex;
    justify-content: space-around;
    .card{
      width: 17px;
      height: 17px;
      background-image: url('~@/assets/images/cardicon.png');
      margin-top: 10px;
      cursor: pointer;
    }
    .card-active{
      background-image: url('~@/assets/images/cardicon2.png');
    }
    .list{
      cursor: pointer;
      width: 20px;
      height: 17px;
      background-image: url('~@/assets/images/listicon2.png');
      margin-top: 10px;
    }
    .list-active{
      background-image: url('~@/assets/images/listicon.png');
    }
    /deep/ .el-button{
      width:100px;
      height:40px;
    }
  }
  /deep/ .c-query-table-caution{
    //margin-top: 40px;
    display: flex;
    justify-content:space-between
  }

  /deep/ .c-query-table__query{
    display: flex;
    justify-content:flex-start
  }
}
.el-icon-add, .el-icon-sub{
   width:18px;
   height:18px;
   background:rgba(255,255,255,1);
   opacity:1;
   float: left;
   margin-top: 10px;
   border-radius: 50%;
   cursor: pointer;
   p{
     text-align: center;
     font-weight: bold;
   }
}

.c-query-table {
  // background-color: $--color-white;
  border-radius: $--border-radius-base;
  &__query {
    padding: 10px;
  }
  &-caution{
      font-size:18px;
      font-weight:400;
      color:rgba(110,121,153,1);
      margin-bottom: 20px;
  }
}
.c-query-table-caution {
  margin-top: 10px;
}
// el-icon-remove-outline1-in{
//   width:12px;
// height:12px;
// background:rgba(41,57,88,1);
// opacity:1;
//}
</style>
