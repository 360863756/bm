<template>
  <title-panel class='sub-panel' title='动态评估表'>
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
    <div>
      <el-table
        :data='tableData'
        :row-style="{height:0+'px'}"
        :cell-style="{padding:0+'px'}"
        show-summary
        border
        style='width: 100%'
      >
        <el-table-column prop='dtpgx' label='评估因子'>
          <template slot-scope="scope">
            <div class="eval-col">
              <div class="desc">{{ scope.row.dtpgx }}</div>
              <template v-if="scope.row.dtpgyz">
                <div class="valbg"> <span class="val">{{ scope.row.dtpgyz }}</span> </div>
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
    </div>
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
      this.$api.dynamicEvaluation.exportDetail(data).then(res => {
        if (res.errcode !== 0) {
          this.$message().error('导出失败!');
        }
        window.open(this.$BASE_API + res.data.filePath);
      });
    },
    fetchDetailData(data) {
      let _this = this;
      this.$api.dynamicEvaluation.queryDetailData(data).then(function(res) {
        let data = res.data;
        let tableData = data.fxpg_pgzx_dtpg_jlxq_wx_data;
        if (data.fxpg_pgzx_dtpg_jlxq_xq_data && data.fxpg_pgzx_dtpg_jlxq_xq_data.length > 0) {
          tableData.push({ dtpgx: '心情驿站' });
          tableData.push(...data.fxpg_pgzx_dtpg_jlxq_xq_data);
        }
        _this.tableData = tableData;
      });
    },
    hanleQuery(e) {
      this.fields[0]['value'] = this.time;
      this.$emit('dataChange', this.time);
      let { zfbh, pgsj } = this.$route.query;
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
      let { errcode, data } = await this.$api.assessment.getDynamicDate({ zfbh });
      if (errcode === 0) {
        this.dateList = data['fxpg_dtpg_rqList_data'].map(i => {
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
  /deep/ .c-titlePanel-header__append {
    display: flex;
  }
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
  /deep/ .el-button {
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
      padding: 0;
      height: 50px;
    }
    th{
      background-color:rgba(110,121,153,0.2);
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
    &__header {
      width: 100%;
      font-size: 20px;
      line-height: 20px;
      color: $--color-text-regular;
    }
    &--border{
      border: transparent;
      &::after {
        width: 0;
      }
      th {
        border-right: transparent;
      }
      td {
        border-right: transparent;
      }
      th.gutter:last-of-type{
        border: transparent;
      }
    }
    &__body-wrapper {
      max-height: 500px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
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
  }
}
</style>
