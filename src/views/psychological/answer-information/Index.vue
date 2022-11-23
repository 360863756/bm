<template>
<title-panel title="答题信息">
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
        <div class="c-query-table-caution" slot="caution-append">
         <p class="answerNum">
           <span  v-for="i in cautionData"  :key="i.type">
           {{i.type}}：(<i>{{i.totalnum}}</i>)</span></p>
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
  name: 'PsychologicalAnswerInformation',
  components: {
    TitlePanel,
    QueryTable
  },
  data() {
    return {
      tableFields,
      queryFields,
      selection: [],
      cautionData: []
    };
  },
  computed: {
  },
  async created() {
    const { data } = await this.$api.psychological.getTopicInformation();
    this.cautionData = data['fxpg_xlcp_cptj_data'];
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.psychological.getPsychologicalAnswerInformationData(params);
    },
    handSelectionChange(selection) {
      this.selection = [...selection];
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
      let { data, errcode } = await this.$api.psychological.importantPsychologicalAnswerInformationData({
        zfbh: 'in$' + str
      });
      if (errcode === 0) {
        let a = document.createElement('a');
        a.href = this.$BASE_API + data.filePath;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 0);
      }
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
/deep/ .operation{
  display: flex;
 .el-button--primary{
  padding: 4px 14px;
  border:1px solid $--color-text-secondary;
  border-radius:4px;
  background-color: transparent;
  margin-right: 40px;
  span{
    font-size:16px;
    font-weight:400;
    color: $--color-text-secondary
  }
}
}
/deep/ .answerNum{
  span{
    margin-right:20px;
    i{
      color: $--color-white;
      font-style: inherit;
      margin: 0 6px;
    }
  }
}
</style>
