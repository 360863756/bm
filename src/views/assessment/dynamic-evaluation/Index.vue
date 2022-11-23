<template>
<title-panel title="动态评估">
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
        <div class="c-query-table-caution" slot="caution-append">
         <p class="c-query-table-caution__flex"  >告警:<span class="c-query-table-caution__flex" v-for="i in cautionData" :key="i.txlb"><div><DangrousGrade
            width="16"
            height="16"
            :levelTypes="getGrade(i.txlb)"
            :colorList='$const.app.DANGER_TYPES'
            className="circle"
          >
          <i>!</i>
          </DangrousGrade></div>{{i.txlb}}超时( <i class="inhert">{{i.totalnum}}</i> )</span></p>
        </div>
        </query-table>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import DangrousGrade from '@/components/DangrousGrade/Index.vue';
import { tableFields } from './tableFields';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'DynamicEvaluation',
  components: {
    TitlePanel,
    QueryTable,
    DangrousGrade
  },
  data() {
    return {
      tableFields,
      queryFields,
      searchModel: {},
      cautionData: [],
    };
  },
  async created() {
    this.warningPeople();
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.assessment.getDynamicEvaluationData(params);
    },
    handleSelect(row, path) {
      const { pgsj, zfbh } = row;
      this.$router.push({
        path,
        query: {
          pgsj,
          zfbh
        }
      });
    },
    async warningPeople() {
      let { data } = await this.$api.assessment.getDynamicEvaluationDengrious();
      this.cautionData = data['risktotalNum_data'];
    },
    getGrade(str) {
      let filters = this.$const.app.DANGER_TYPES.find(type => type.label === str);
      return filters.value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.c-query-table-caution{
  font-size: 0.96vw;
  p{
      span{
        margin-left: 10px;
      }
  }
  &__flex{
    display: flex;
    align-items: center;
  }
  /deep/ .circle{
    border-radius: 8px;
    margin-right: 3px;
    color: #000000;
    font-weight: 550;
    font-size: 13px;
    i{
      font-style: inherit;
    }
  }
  .inhert{
    color: $--color-text-primary;
    font-style: inherit;
    margin:0 6px;
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
        font-weight:300;
      }
    &:nth-child(2){
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
    color:$--color-purple;
  }
}
</style>
