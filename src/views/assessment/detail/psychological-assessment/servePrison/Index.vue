<template>
  <query-list
    ref="queryList"
    stripe
    row-key=""
    layout="total, sizes , -> , pager, next"
    :fields="queryFields"
    :fetch-method="fetchContent"
    :handle-data="handleData"
    class="query"
    :next-text="'下一页'"
    :page-sizes="[3,5,10,15,20,30]"
    :page-size="3"
  >
    <div slot="query-operation" class="operation"></div>
    <div class="item" slot-scope="scope">
      <content-panel :content='scope.item' />
    </div>
  </query-list>
</template>

<script>
import QueryList from '@/views/file-manage/components/QueryList/Index.vue';
import ContentPanel from '../../components/ContentPanel/Index';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: '',
  components: {
    QueryList,
    ContentPanel
  },
  data() {
    return {
      queryFields,
    };
  },
  created() {
    this.getEvalContent();
  },
  methods: {
    handleData(data) {
      return data.dataList;
    },
    fetchContent(options = {}) {
      const data = { ...options.params, ...this.$route.query, cpjd: 'fxpg' };
      return this.$api.assessment.getPsychologyEvalDetail(options.pageNo || 1, options.pageSize || 10, data).then(res => {
        if (res && res.data) {
          res.data.totalElements = res.data.totalNum;
        }
        return res;
      });
    },
    async getEvalContent() {
      let { data } = await this.$api.assessment.getPsychologyEvalContent({});
      this.queryFields.map(item => {
        if (item.prop === 'pgnrdm') {
          item.options = data['fxpg_xlcp_lbbm_data'].map(i => {
            i.label = i.name;
            delete i.name;
            return i;
          });
        }
        return item;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.query {
  background-color: transparent;
  /deep/ .el-form-item{
    /deep/ .el-input__inner {
      width: 199px;
      height: 40px;
      background-color: rgba(110, 121, 153, 0.15);
      border: 0px;
      border-radius: $--border-radius-base;
      padding-left: 20px;

      &::-webkit-input-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
        opacity: 1;
      }
      &::-moz-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
      &:-moz-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
      &:-ms-input-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
    }
  }
  /deep/ .el-input__prefix {
    left: unset;
    right: 5px;
  }
  /deep/ .c-query-list{
    &__list{
      padding-top: 10px;
      .c-query-list__item{
        background-color: transparent;
        padding: 0;
        &:nth-of-type(2n + 1){
          background-color: transparent;
        }
      }
    }
    &__pagination{
      .el-pagination{
        .btn-next{
          background-color: transparent;
        }
        span:not([class*=suffix]){
          line-height: 40px;
        }
      }
      .el-pagination__sizes{
        input{
          background-color: transparent;
          border: transparent;
        }
      }
      .el-pager{
        margin-top: 5px;
        li{
          background-color: transparent;
          border-radius: $--border-radius-base;
          border:1px solid $--color-text-regular;
          color:$--color-text-regular;
          font-size: 16px;
          line-height: 26px;
        }
        li.active{
          border: 0;
          background-color: $--color-primary;
          color: $--color-white;
        }
      }
    }
  }
}
</style>
