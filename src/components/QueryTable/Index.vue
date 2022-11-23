<template>
  <div class="c-query-table">
    <query
      class="c-query-table__query"
      ref="query"
      :fields="queryFields"
      v-model="search"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleFetchData"
    >
      <div v-if="showQueryOperation" slot="operation">
        <slot name="query-operation">
          <el-button type="primary" @click="onSearch">查 询</el-button>
          <el-button @click="onSearchReset">重 置</el-button>
        </slot>
      </div>
      <slot name="query-append"  slot="append"></slot>
    </query>
      <slot name="caution-append"></slot>
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
      rowOperationWidth='157px'
      @current-change="onPageNoChange"
      @size-change="onPageSizeChange"
    >
      <template slot="row-operation" slot-scope="{ row, column, $index }">
        <slot name="row-operation" :row="row" :column="column" :$index="$index"></slot>
      </template>
    </common-table>
  </div>
</template>

<script>
import Query from '@/components/Query/Index.vue';
import CommonTable from '@/components/CommonTable/Index.vue';

export default {
  name: 'query-table',
  inheritAttrs: false,
  components: {
    Query,
    CommonTable
  },
  props: {
    fetchMethod: {
      type: Function,
      required: true,
    },
    tableFields: {
      type: Array,
      required: true,
    },
    queryFields: {
      type: Array,
      default: () => [],
    },
    showQueryOperation: {
      type: Boolean,
      default: false,
    },
    showRowOperation: {
      type: Boolean,
      default: true,
    },
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
    };
  },
  created() {
    this.onFetchData();
  },
  methods: {
    onSearch() {
      typeof this.onSearchBefore === 'function' && this.onSearchBefore();
      this.pageNo = 1;
      this.onFetchData();
    },
    onSearchReset() {
      this.pageNo = 1;
      this.$refs.query && this.$refs.query.resetFields();
      this.onFetchData();
    },
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
        ...this.search,
        ...options
      };
      try {
        const res = await this.fetchMethod(options);
        this.$emit('data-responsed', res);
        const { errcode, data } = res;
        if (errcode === 0) {
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
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

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
</style>
