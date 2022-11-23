<template>
  <title-panel class='sub-panel' title='管控措施列表'>
    <div v-if="controlInfo && controlInfo.fhmj" class="block">
      <el-timeline>
        <el-timeline-item placement="top">
          <div slot="dot"><i class="time-node time-node_active"></i></div>
          <div class="item-content">
            <div class="item-content-header">
              <div class="item-content-header-left">
                <span class="key">复核人员：</span>
                <span class="val">{{controlInfo.fhmj || ''}}</span>
              </div>
              <!-- <div class="item-content-header-right">
                <el-button>修改方案</el-button>
              </div> -->
            </div>
            <el-card>
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                :readonly="(controlInfo.sffh && controlInfo.sffh === '1') || userInfo.userName !== controlInfo.fhmjjh"
                v-model="controlInfo.csnr">
              </el-input>
            </el-card>
          </div>
        </el-timeline-item>
        <el-timeline-item  placement="top">
          <div slot="dot"><i class="time-node"></i></div>
          <div class="item-content">
            <div  class="item-content-header">
              <div v-if="controlInfo && userInfo.userName === controlInfo.fhmjjh">
                <span class="key">指派民警：</span>
                <span class="val" v-if="controlInfo.sffh && controlInfo.sffh === '1'">{{controlInfo.zpmj}}</span>
                <el-autocomplete
                  v-if="!controlInfo.sffh || controlInfo.sffh !== '1'"
                  class="search-input"
                  v-model="controlInfo.zpmj"
                  placeholder="请输入内容"
                  :fetch-suggestions="fetchSuggestions"
                  @select="handleSelect"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-autocomplete>
              </div>
              <div v-else>
                <span class="key">执行人员：</span>
                <span class="val">{{controlInfo.zpmj}}</span>
                <br>
                <el-button v-if="(controlInfo.sffh && controlInfo.sffh === '1') && !(controlInfo.sfzx && controlInfo.sfzx === '1')" @click="handleExec" class="footer_btn save excute">确认执行</el-button>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div slot="footer" v-if="controlInfo && controlInfo.fhmj" class="panel_footer">
      <div>
        <el-button v-if="!(controlInfo.sffh && controlInfo.sffh === '1') && userInfo.userName === controlInfo.fhmjjh" class="footer_btn save" @click="handleSave">保存</el-button>
        <!-- <el-button class="footer_btn update">修改</el-button> -->
      </div>
    </div>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import { dateFormat } from '@/utils/index';
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: '',
  components: {
    TitlePanel,
  },
  data() {
    return {
      searchVal: '',
      controlInfo: {
        zpmj: '',
        fhmj: '',
        csnr: ''
      },
      policeList: []
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    })
  },
  created: function() {
    // console.log('control');
    // console.log(this.$route.query);
    this.fetchControlData();
    // console.log('store');
    // console.log(this.userInfo);
  },
  methods: {
    handleExec() {
      const { id } = this.controlInfo;
      let data = { id, sfzx: '1', zxsj: dateFormat(new Date()) };
      this.$api.staticEvaluation.updateControlInfo(data).then((res) => {
        if (res.errcode === 0) {
          this.$set(this.controlInfo, 'sfzx', data.sfzx);
          this.$message.success('执行成功!');
        }
      });
    },
    handleSelect(item) {
      this.controlInfo.zpmj = item.value;
      this.controlInfo.zpmjjh = item.jh;
    },
    fetchSuggestions(queryString, cb) {
      this.controlInfo.zpmjjh = '';
      if (!queryString) { queryString = ''; }
      if (this.policeList && this.policeList.length > 0) {
        cb(this.filterPolice(queryString, this.policeList));
        return;
      }
      let _this = this;
      this.$api.staticEvaluation.queryPoliceList().then((res) => {
        _this.policeList = res.data.policeList_data.map(d => { return { ...d, value: d.xm }; });
        cb(_this.filterPolice(queryString, _this.policeList));
      });
    },
    filterPolice(str, list) {
      return list.filter(d => {
        return (d.value.toLowerCase().indexOf(str.toLowerCase()) === 0);
      });
    },
    handleSave(e) {
      let data = { ...this.controlInfo, fhsj: dateFormat(new Date()) };
      if (!(data.csnr && data.csnr.length > 0)) {
        this.$message.warning('请输入内容!');
        return;
      }
      if (!(data.zpmj && data.zpmj.length > 0) || !(data.zpmjjh && data.zpmjjh.length > 0)) {
        this.$message.warning('请通过点击选择民警!');
        return;
      }
      if ((this.controlInfo.zpmj && this.controlInfo.zpmjjh) && (!this.controlInfo.sffh || this.controlInfo.sffh === '0')) {
        data.sffh = '1';
      }
      this.$api.staticEvaluation.updateControlInfo(data).then((res) => {
        if (data.sffh) {
          this.$set(this.controlInfo, 'sffh', data.sffh);
        }
        if (res.errcode === 0) { this.$message.success('保存成功!'); }
      });
    },
    fetchControlData() {
      this.$api.assessment.queryControlData({ ...this.$route.query, pglx: '动态' }).then(res => {
        if (res.errcode === 0) {
          this.controlInfo = res.data.fxpg_gkcs_fhxq_data[0];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.el-card{
  border: transparent;
  background-color: rgba(110,121,153,0.15);
  font-size:14px;
  line-height:32px;
  color: $--color-white;
}
/deep/ .el-textarea__inner{
  background-color: transparent;
  border: transparent;
  font-size:14px;
  line-height:32px;
  color:$--color-white;
}
.sub-panel {

  .footer_btn{
    width:100px;
    height:40px;
    background:transparent;
    border: transparent;
    border-radius:$--border-radius-base;
    font-size:16px;
  }
  .excute{
    margin-top: 10px;
  }
  .save{
    background:$--color-primary;
    color:$--color-white;
  }
  .update{
    border:1px solid $--color-text-regular;
    color:$--color-text-regular;
  }
  .panel_footer{
    width: 80%;
    display: flex;
    justify-content: flex-end;
    color: $--color-white;
  }

  /deep/ .c-titlePanel-header__append {
    display: flex;
  }
  /deep/ .c-titlePanel-header__title {
    font-size:20px;
    line-height:26px;
    color:$--color-white;
  }
  .block{
    padding-left: 10px;

    .time-node{
      display: inline-block;
      width: 22px;
      height: 22px;
      background-image: url('~@/assets/images/timeline-node.png');
    }
    .time-node_active{
      background-image: url('~@/assets/images/timeline-node-active.png');
    }
    // /deep/ .el-timeline-item__tail{
    //   left: 11px;
    //   top: 22px;
    //   height: calc(100% - 22px);
    //   border-left: 1px solid rgba(191,191,191,1);
    // }
    .item-content{
      width: 880px;
      margin-left: 20px;
      position: relative;
      top: -7px;

      &-header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .key{
          font-size:16px;
          line-height:20px;
          color:$--color-text-regular;
        }
        .val{
          font-size:16px;
          line-height:20px;
          color:rgba(255,255,255,0.8);
        }
      }
    }
    .el-card{
      border: transparent;
      background-color: rgba(110,121,153,0.15);
      font-size:14px;
      line-height:32px;
      color: $--color-white;

      .el-textarea__inner{
        background-color: transparent;
        border: transparent;
        font-size:14px;
        line-height:32px;
        overflow-y: hidden;
        color:$--color-white;
      }
    }
  }
}
</style>
