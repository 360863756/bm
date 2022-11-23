<template>
<title-panel title="重点提醒">
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
          <el-button type="text" class="dynamic" @click="handleSelect(scope.row)">动态</el-button>
          </div>
        </template>
        <div class="c-query-table-caution" slot="caution-append">
         <p class="c-query-table-caution__flex">告警:所有( {{allDengrious}} )<span v-for="i in cautionData" class="c-query-table-caution__flex" :key="i.type"><div><DangrousGrade
            width="16"
            height="16"
            :levelTypes="getGrade(i.type)"
            :colorList='$const.app.DANGER_TYPES'
            className="circle"
          >
          <i>!</i>
          </DangrousGrade></div>{{i.type}}超时(<i class="inhert">{{i.totalnum}}</i>)</span></p>
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
      cautionData: []
    };
  },
  computed: {
    allDengrious() {
      let num = this.cautionData.reduce((num, item) => {
        return num + item.totalnum;
      }, 0);
      return num;
    }
  },
  async created() {
    this.warningPeople();
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.warning.getWarningFightRemindData(params);
    },
    async warningPeople() {
      let { data } = await this.$api.warning.getWarningFightRemindDengrious();
      this.cautionData = data['fxpg_yj_zdtx_totalNum_data'];
    },
    handleSelect(item) {
      const { pgsj, zfbh } = item;
      this.$router.push({
        path: this.$const.assessment.ASSESSMENT['dynamic']['detailPath']['onePage'].path,
        query: {
          pgsj,
          zfbh
        }
      });
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
.c-query-table-caution{
  p{
      span{
        margin-left: 10px;
      }
  }
  &__flex{
    display: flex;
    align-items: center;
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
    color:$--color-purple;
  }
}
</style>
