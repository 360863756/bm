<template>
<title-panel title="心理评估">
        <query-table
            ref="queryTable"
            :query-fields='queryFields'
            :table-fields="tableFields"
            :fetch-method="fetchTableM"
            row-operation-width="80px"
            :show-row-operation="false"
            layout="total, sizes , -> , pager, next"
            query-reverse
            :max-table-height='true'
        >
        </query-table>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import { tableFields } from './tableFields';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'PsychologicalAssessment',
  components: {
    TitlePanel,
    QueryTable,
  },
  data() {
    return {
      tableFields,
      queryFields,
      searchModel: {}
    };
  },
  async created() {
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.assessment.getPsychologicalAssessmentData(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.c-query__append{
  p{
      height:24px;
      font-size:18px;
      font-weight:400;
      line-height:26px;
      color:$--color-text-regular;
      span{
        margin-right: 37px;
      }
  }
}
/deep/ .el-button{
  padding: 4px 14px;
  margin-left: 10px;
  border:1px solid $--color-primary;
  border-radius:4px;
  background-color: transparent;
  span{
    font-size: 16px;
    font-weight:400;
    color:$--color-primary;
  }
}
/deep/ .grade{
  display: flex;
  & > span{
    margin-right: 15px;
  }
}
</style>
