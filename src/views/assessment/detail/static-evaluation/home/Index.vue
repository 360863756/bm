<template>
  <title-panel class='sub-panel' title='静态评估表'>
    <template slot='header-append'>
      <query
        v-model='time'
        :fields='fields'
        label-width='5em'
        @change='hanleQuery'
        class='query'
      ></query>
      <el-button type='primary' @click="handleExport">导出</el-button>
    </template>
    <template>
      <el-table
        :data='tableData'
        :row-style="{height:0+'px'}"
        :cell-style="{padding:0+'px'}"
        show-summary
        border
        style='width: 100%'
      >
        <el-table-column prop='jtpgx' label='评估因子'>
          <template slot-scope="scope">
            <div class="eval-col">
              <div class="desc">{{ scope.row.jtpgx }}</div>
              <template v-if="scope.row.jtpgz">
                <div class="valbg"> <span class="val">{{ scope.row.jtpgz }}</span> </div>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop='wxfz' label='分值'>
          <template slot-scope="scope" v-if="scope.row.wxfz">
            <span class="table-score">{{ scope.row.wxfz }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='xgsm' label='相关说明'>
          <template slot="header">
            相关说明
            <i class="el-icon-caret-top desc-icon"></i>
          </template>
          <template slot-scope="scope">
            <span class="explain">{{ scope.row.xgsm }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import Query from '@/components/Query/Index.vue';
import { fields } from '../detail-fields';

export default {
  name: '',
  data() {
    return {
      fields,
      time: {},
      tableData: [],
      dateList: []
    };
  },
  components: {
    TitlePanel,
    Query
  },
  created: function() {
    let { zfbh, pgsj } = this.$route.query;
    let data = {};
    if (zfbh) {
      data.zfbh = zfbh;
    }
    if (pgsj) {
      data.pgsj = pgsj;
    }
    this.fetchDetailData(data);
    this.getDateList();
  },
  methods: {
    handleExport() {
      let data = this.$route.query;
      let { date } = this.time;
      if (date) {
        data.pgsj = date;
      }
      this.$api.staticEvaluation.exportDetail(data).then(res => {
        if (res.errcode !== 0) {
          this.$message().error('导出失败!');
        }
        window.open(this.$BASE_API + res.data.filePath);
      });
    },
    fetchDetailData(data) {
      this.$api.staticEvaluation.queryDetailData(data).then(res => {
        let data = res.data;
        let age = [];
        let tableData = data.fxpg_pgzx_jtpg_jlxq_data.filter(d => {
          if (d.jtpgx === '年龄' || d.jtpgx === '余刑') {
            age.push(d);
          } else {
            return true;
          }
        });
        if (age && age.length > 0) {
          tableData.push({ jtpgx: '刑期年龄组合' });
          tableData.push(...age);
        }
        this.tableData = tableData;
      });
    },
    hanleQuery(e) {
      this.fields[0]['value'] = this.time;
      this.$emit('dataChange', this.time);
      const { zfbh, pgsj } = this.$route.query;
      let data = {};
      if (zfbh) {
        data.zfbh = zfbh;
      }
      if (pgsj) {
        data.pgsj = e.date;
      }
      this.fetchDetailData(data);
    },
    async getDateList() {
      let { zfbh } = this.$route.query;
      let { errcode, data } = await this.$api.assessment.getStaticDate({ zfbh });
      if (errcode === 0) {
        this.dateList = data['fxpg_jtpg_rqList_data'].map(i => {
          i.value = i.pgsj;
          i.label = i.pgsj;
          delete i.pgsj;
          delete i.zfbh;
          delete i.pgfz;
          return i;
        });
      }
      this.fields[0]['options'] = this.dateList;
      this.fields[0]['value'] = this.dateList[0].value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.sub-panel {
  /deep/ .c-titlePanel-header__title {
    width: 100px;
    height: 26px;
    color: $--color-white;
    font-size: 20px;
    line-height: 26px;
  }
  .sub-head-time {
    color: $--color-text-regular;
  }
  .el-button {
    width: 100px;
    height: 40px;
  }

  .query {
    /deep/ .el-input__inner {
      width: 199px;
      height: 40px;
      background-color: rgba(110, 121, 153, 0.15);
      border: 0px;
      border-radius: $--border-radius-base;
      padding-left: 20px;

      ::-webkit-input-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
        opacity: 1;
      }
      ::-moz-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
      :-moz-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
      :-ms-input-placeholder {
        font-size: 16px;
        line-height: 26px;
        color: $--color-text-regular;
      }
    }
    /deep/ .el-input__prefix {
      left: unset;
      right: 5px;
    }
  }
  /deep/ .el-table {
    &::before{
      height: 0px;
    }
    td {
      border-bottom: transparent;
      border-right: transparent;
      padding: 0;
      height: 50px;
    }
    th{
      background-color:rgba(110,121,153,0.2);
      border-right: transparent;
      position: relative;
      .desc-icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        color: rgba(202,202,202,1);
        position: absolute;
        right: 40px;
      }
      .cell{
        font-size:20px;
        line-height:20px;
        color:$--color-text-regular;
      }
    }
    &--border {
      border: transparent;
      &::after {
        width: 0;
      }
    }
    &__header {
      width: 100%;
      font-size: 20px;
      line-height: 20px;
      color: $--color-text-regular;
    }
    &__footer-wrapper{
      td{
        border-color: $--color-text-regular;
      }
      .cell{
        font-size:20px;
        line-height:26px;
        color:$--color-white;
        margin-left: 10px;
      }
      tbody{
        td{
          background-color: transparent;
        }
      }
    }

    .eval-col{
      display: flex;
      justify-content: space-between;
      width: 290px;

      .desc{
        flex: 1 1 auto;
        padding-top: 5px;
        font-size:16px;
        line-height:20px;
        color:$--color-text-regular;
      }
      .valbg{
        flex: 0 0 auto;
        width:70%;
        height:30px;
        color: $--color-white;
        background:rgba(110,121,153,0.15);
        border-radius:$--border-radius-base;

        .val{
          display: inline-block;
          margin-left: 10px;
          height: 41px;
          font-size:16px;
          line-height:30px;
          color:$--color-white;
          vertical-align: middle;
        }
      }
    }
    .table-score{
      display: inline-block;
      width: 30px;
      height: 30px;
      background:rgba(110,121,153,0.15);
      border-radius:$--border-radius-base;
      text-align: center;
      padding-top: 5px;
      margin-top: 4px;
    }
    .explain{
      font-size:16px;
      line-height:20px;
      color:$--color-text-regular;
    }
  }
}
</style>
