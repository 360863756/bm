<template>
<title-panel title="静态评估">
        <query-table
            ref="queryTable"
            :query-fields='queryFields'
            :table-fields="tableFields"
            :fetch-method="fetchTableM"
            row-operation-width="80px"
            layout="total, sizes , -> , pager, next"
            query-reverse
            :max-table-height='true'
        >
        <template slot="row-operation" slot-scope="scope">
          <div class="test-see">
            <el-button type="text" class="heart" @click="handleSelect(scope.row,$const.assessment.ASSESSMENT['psychological']['detailPath']['onePage'].path)">心理</el-button>
            <el-button type="text" class="dynamic" @click="handleSelect(scope.row,$const.assessment.ASSESSMENT['dynamic']['detailPath']['onePage'].path)">动态</el-button>
            <el-button type="text" class="static" @click="handleSelect(scope.row,$const.assessment.ASSESSMENT['static']['detailPath']['onePage'].path)">静态</el-button>
          </div>
        </template>
        </query-table>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import { tableFields } from './tableFields';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'StaticEvaluation',
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
    this.getPrisonData();
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.assessment.getStaticEvaluationData(params);
    },
    handleSelect(row, path) {
      let { pgsj, zfbh } = row;
      this.$router.push({
        path,
        query: {
          pgsj,
          zfbh
        }
      });
    },
    async getPrisonData() {
      let { data } = await this.$api.app.getPrisonData();
      this.queryFields.map(item => {
        if (item.prop === 'jqdm') {
          item.options = data['areaList_data'].map(i => {
            i.value = i.areacode;
            i.label = i.arecname;
            delete i.areacode;
            delete i.arecname;
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
.test-see{
  display: flex;
    /deep/ .el-button{
    width:50px;
    height:26px;
    border:1px solid $--color-text-secondary;
    border-radius:4px;
      span{
        font-size: 16px;
      }
    &:nth-child(3){
      background:$--color-text-secondary;
      color:$--color-text-primary;
    }
  }
}
/deep/ .el-button--primary{
  padding: 4px 14px;
  border:1px solid $--color-purple;
  border-radius:4px;
  background-color: transparent;
  span{
    font-size: 16px;
    font-weight:400;
    color: $--color-purple;
  }
}
</style>
