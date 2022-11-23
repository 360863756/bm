<script>
export default {
  name: 'common-table',
  inheritAttrs: false,
  props: {
    showPagination: {
      type: Boolean,
      default: true,
    },
    showRowOperation: Boolean,
    showSelection: Boolean,
    fields: Array,
    data: Array,
    loading: Boolean,
    rowOperationWidth: String,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, ->, jumper'
    },
    pageNo: {
      type: Number,
    },
    stripe: {
      type: Boolean,
      default: true
    },
    adaptive: {
      type: [Boolean, Object],
      default: false,
    },
    selectable: Function,
    reserveSelection: Boolean,
    maxTableHeight: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      loadingInstance: null,
      tableHeight: undefined
    };
  },
  updated() {
    this.adaptive && this.getTableHeight();
    this.maxTableHeight && this.getTableHeight();
  },
  methods: {
    getTableHeight() {
      const elTable = this.$refs.elTable;
      const paginationWrapper = this.$refs.paginationWrapper;
      if (elTable) {
        const windowHeight = window.innerHeight;
        let bottomOffset = 0;
        if (this.adaptive) {
          bottomOffset = typeof this.adaptive === 'object'
            ? (this.adaptive.bottomOffset || 30)
            : 30;
        }
        if (this.maxTableHeight) {
          bottomOffset = typeof this.maxTableHeight === 'object'
            ? (this.maxTableHeight.bottomOffset || 30)
            : 30;
        }
        const rectTop = elTable.$el.getBoundingClientRect().top;
        if (paginationWrapper) {
          const paginationHeight = paginationWrapper.getBoundingClientRect().height;
          this.tableHeight = windowHeight - rectTop - paginationHeight - bottomOffset;
        } else {
          this.tableHeight = windowHeight - rectTop - bottomOffset;
        }
        this.$nextTick(() => {
          elTable && elTable.doLayout();
        });
      }
    },
    handleFields(h, fields) {
      if (!Array.isArray(fields)) return;
      return fields.map(field => {
        const fieldData = {
          key: field.key || field.prop,
          props: {
            ...field,
          }
        };
        if (typeof field.render === 'function') {
          fieldData.scopedSlots = {
            default: (scope) => field.render(h, scope, this)
          };
        }
        return (
          <el-table-column {...fieldData}>
            {
              field.cols ? this.handleFields(h, field.cols) : null
            }
          </el-table-column>
        );
      });
    }
  },
  watch: {
    'loading'(isLoading) {
      if (isLoading) {
        this.$refs.container && (this.loadingInstance = this.$loading({
          target: this.$refs.container,
          text: 'loading',
          customClass: 'common-table-loading'
        }));
      } else if (this.loadingInstance && this.loadingInstance.close) {
        this.loadingInstance.close();
      }
    }
  },
  mounted() {
    if (this.loading && !this.loadingInstance) {
      this.$refs.container && (this.loadingInstance = this.$loading({
        target: this.$refs.container,
        text: 'loading'
      }));
    }
  },
  render(h) {
    const rowOperationData = {
      props: {
        label: '测评查看',
        prop: '_operation',
        width: this.rowOperationWidth
      },
      scopedSlots: {
        default: scope => {
          const operationFn = this.$scopedSlots['row-operation'];
          return operationFn && operationFn(scope);
        }
      }
    };
    const listeners = {
      ...this.$listeners,
      'current-change': (...args) => this.$emit('table-current-change', ...args) // 修复表格和分页current-change事件冲突
    };
    return (
      <div class="c-common-table" ref="container">
        <el-table
          { ...{ on: listeners, props: this.$attrs, } }
          ref="elTable"
          data={ this.data }
          stripe = { this.stripe }
          height={this.adaptive ? this.tableHeight : undefined }
          max-height={this.maxTableHeight ? this.tableHeight : undefined }
        >
          {
            this.showSelection ? (
              <el-table-column
                type="selection"
                selectable={ this.selectable }
                reserve-selection={ this.reserveSelection }
              ></el-table-column>
            ) : null
          }
          {
            this.handleFields(h, this.fields)
          }
          {
            this.showRowOperation ? (<el-table-column {...rowOperationData}></el-table-column>) : null
          }
        </el-table>
        {
          this.showPagination
            ? (
              <div class="c-common-table__pagination-wrapper" ref="paginationWrapper">
                <el-pagination
                  { ...{ on: this.$listeners, props: this.$attrs } }
                  current-page={ this.pageNo }
                  layout={ this.layout }
                  next-text='下一页'
                ></el-pagination>
              </div>
            ) : null
        }
      </div>
    );
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-common-table {
  &__pagination-wrapper {
    background-color: $--color-white;
    padding: 20px;
    .el-pagination {
      padding: 2px 0;
    }
  }
}
</style>
