<template>
<div class="c-query-list" :class="{ 'is-stripe': stripe }">
  <query
    class="c-query-list__query"
    ref="query"
    v-model="search"
    v-bind="$attrs"
    v-on="$listeners"
    @change="handleFetchData"
  >
    <!-- :fields="queryFields" -->
    <div v-if="showQueryOperation" slot="operation">
      <slot name="query-operation">
        <el-button type="primary" @click="onSearch">查 询</el-button>
        <el-button type="text" @click="onSearchReset">重 置</el-button>
      </slot>
    </div>
    <slot name="query-append" slot="append"></slot>
  </query>
  <div class="c-query-list__list" v-loading="loading">
    <template v-if="!displayCustom">
      <template v-if="Array.isArray(data) && data.length">
        <div
          v-for="(item, index) in data"
          :key="item[rowKey] || index"
          class="c-query-list__item"
        >
          <!-- <div class="c-query-list__item-selection" v-if="showSelection">
            <el-checkbox
              v-model="selection"
              :label="item[rowKey]"
              @change="handleSelectionChange"
            >
              <span v-show="false"></span>
            </el-checkbox>
          </div> -->
          <div class="c-query-list__item-content">
            <slot :item="item" :$index="index"></slot>
          </div>
        </div>
      </template>
      <slot name="empty" v-else>
        <p class="c-query-list__empty">暂无数据</p>
      </slot>
    </template>
    <slot name="body" :data="data" v-else></slot>
  </div>
  <div class="c-query-list__pagination" v-if="showPagination">
    <el-pagination
      :total="total"
      :page-size="internalPageSize"
      :current-page="pageNo"
      :layout="layout"
      @size-change="onPageSizeChange"
      @current-change="onPageNoChange"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</div>
</template>

<script>
import Query from '@/components/Query/Index.vue';

export default {
  name: 'query-list',
  inheritAttrs: false,
  components: {
    Query,
  },
  props: {
    displayCustom: Boolean,
    fetchMethod: {
      type: Function,
      required: true,
    },
    queryFields: Array,
    showQueryOperation: {
      type: Boolean,
      default: true,
    },
    showSelection: {
      type: Boolean,
      default: true,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    handleData: Function,
    rowKey: {
      type: String,
      required: true,
    },
    fetchDataOnChange: {
      type: Boolean,
      default: true,
    },
    dataType: {
      // 数据字段取值
      type: String,
    },
    onSearchBefore: Function,
    stripe: Boolean,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    pageSize: Number,
    // pageSizes: Array,
  },
  data() {
    return {
      search: {},
      data: [],
      loading: false,
      internalPageSize: this.pageSize || 9,
      pageNo: 1,
      // internalpageSizes: this.pageSizes || [5, 10, 15, 20],
      total: 0,
      selection: [],
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
      this.loading = true;
      options = {
        sortby: 'modifyTime',
        order: 'desc',
        pageNo: this.pageNo,
        // FIXME: 分页传5无数据
        pageSize: this.internalPageSize || 9,
        params: this.search,
        ...options
      };
      try {
        const res = await this.fetchMethod(options);
        this.$emit('data-responsed', res);
        const { errcode, data } = res;
        if (errcode === 0) {
          const content = data[this.dataType] || data || {};
          const { totalElements = 0 } = data[this.dataType] || data || {};
          this.data = this.handleData ? this.handleData(content) : content;
          this.total = totalElements;
        } else {
          this.data = [];
          this.total = 0;
        }
        this.$emit('data-fetched', this.data);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    handleFetchData() {
      this.fetchDataOnChange && this.onSearch();
    },
    handleSelectionChange(value) {
      this.$emit('selection-change', this.selection);
    },
    /**
     * 选中所有
     */
    selectAll() {
      this.selection = this.data.map(item => item[this.rowKey]);
      this.$emit('selection-change', this.selection);
    },
    /**
     * 选中所有
     */
    clearSelection() {
      this.selection = [];
      this.$emit('selection-change', this.selection);
    },
    /***
     * 根据rowKey替换表格行数据
     * @param {object} row 待替换行
     */
    replaceRow(row) {
      if (this.rowKey) {
        const key = row[this.rowKey];
        const foundRowIndex = this.data.findIndex(tableRow => tableRow[this.rowKey] === key);
        if (foundRowIndex !== -1) {
          this.data.splice(foundRowIndex, 1, row);
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
      this.data.unshift(row);
    },
    /**
     * 表首插入多行
     * @param {array} rows 行数据
     */
    prependRows(rows) {
      this.data = [...rows, ...this.data];
    },
    /***
     * 表尾插入
     * @param {object} row 待插入行
     */
    appendRow(row) {
      this.data.push(row);
    },
    /***
     * 移除表格行
     * @param {object} row 待删除行
     */
    removeRow(row) {
      if (this.rowKey) {
        const key = row[this.rowKey];
        const foundRowIndex = this.data.findIndex(tableRow => tableRow[this.rowKey] === key);
        if (foundRowIndex !== -1) {
          this.data.splice(foundRowIndex, 1);
        }
      } else {
        console.warn('[QueryTable.removeRow]: 请提供rowKey');
      }
    },
    getRow(rowKey) {
      if (this.rowKey) {
        const foundRow = this.data.find(tableRow => tableRow[this.rowKey] === rowKey);
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

.c-query-list {
  background-color: $--mgr-app-body-background-color;
  border-radius: $--border-radius-base;
  &__empty {
    text-align: center;
    color: $--color-text-secondary;
    padding: 12px 0;
  }
  &__query {
    padding: 20px;
  }
  &__item {
    padding: 16px 10px;
    display: flex;
    &-selection {
      align-self: center;
      margin-right: 20px;
    }
    &-content {
      flex: 1;
      overflow: hidden;
    }
    &:hover {
      background-color: $--color-black;
    }
  }
  &__pagination {
    padding: 20px;
  }
  &.is-stripe {
    .c-query-list__item:nth-of-type(2n + 1) {
      background-color: #fafafa;
    }
  }
}
</style>
