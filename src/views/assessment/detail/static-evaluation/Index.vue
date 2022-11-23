<template>
  <div class="content">
    <div class="left">
      <card @fetch-card-info="fetchCardInfo" :params="cardFields">
        <tr class='merge' slot="footer" slot-scope="scope">
          <td class="c-card-content__subtitle">总分</td>
          <td><span>{{scope.data.pgfz}}分</span></td>
        </tr>
      </card>
    </div>
    <div class="right">
      <el-tabs  v-model="active"  @tab-click="handleClick">
        <el-tab-pane v-for="i in assessment" :label="i.title" :name="i.path" :key="i.path">
          <span slot='label'>
            <i class='subiconbg'>
              <i class='subicon' :class="i.config.icon"></i>
            </i> {{ i.title }}
          </span>
        </el-tab-pane>
        <router-view @dataChange="dataChange"></router-view>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import Card from '../components/Card/Index.vue';
import { parseJson } from '@/utils';
import { cardFields } from './cardFields';
import { COLOR_GRADES } from '@/constant/dengrous';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  data() {
    return {
      cardFields,
      assessment: [],
      title: '',
      active: '',
      query: this.$route.query,
      time: ''
    };
  },
  components: {
    Card
  },
  computed: {
    ...mapGetters({
      normalizedMenus: 'normalizedMenus',
    })
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  },
  created() {
    this.assessment = parseJson(this.normalizedMenus, 'path', '/assessment/detail/static-evaluation')[0].children;
    this.getData();
  },
  methods: {
    dataChange(val) {
      this.time = val.date;
    },
    fetchCardInfo(cb) {
      let { zfbh, pgsj } = this.$route.query;
      let data = {};
      if (zfbh) {
        data.zfbh = zfbh;
      }
      if (pgsj) {
        data.pgsj = pgsj;
      }
      if (this.time) {
        data.pgsj = this.time;
      }
      this.$api.staticEvaluation.queryDetailData(data).then((res) => {
        let data = res.data;
        let info = data.fxpg_pgzx_jtpg_his_data[0];
        if (info) {
          let color = COLOR_GRADES.filter(color => color.value === Number(info.wxdj));
          let wxdjxx = (color instanceof Array) ? color[0] : color;
          info.wxdjlabel = wxdjxx.label;
          info.wxdjclass = wxdjxx.className;
          cb(info);
        }
      });
    },
    handleClick(tab, e) {
      let getObj = this.assessment.find(item => {
        return item.title === tab.label;
      });
      this.$router.push({
        path: getObj.path,
        query: this.query
      });
      this.getData();
    },
    getData() {
      let result = this.assessment.find(item => {
        return this.$route.path.indexOf(item.path) !== -1;
      });
      this.active = result.path;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
.back{
  color: $--color-primary;
  cursor: pointer;
}

.tabs{
  background-color: transparent;
  border: transparent;
  /deep/ .el-tabs__header{
    background-color: transparent;
    border-bottom: 1px solid $--color-text-regular;
    .el-tabs__nav{
      margin-left: 5px;
      transition: transparent;
    }
    /deep/ .el-tabs__item{
      color: $--color-text-regular;
      font-size: 20px;
      -webkit-transition: transparent;
      transition: transparent;
    }
  }
  /deep/ .el-tabs__item.is-active{
      background-color: $--color-black;
      color: $--color-primary;
      border-color: $--color-text-regular;
      border-radius:$--border-radius-base;
      border-bottom: none;
      position: relative;
      top: 2px;
    }
}
.content {
  display: flex;
  justify-content: space-between;

  .left {
    width: 220px;
    color: $--color-white;
    margin-top: 30px;
    padding: 15px;

    .merge {
      margin-top: 10px;
      color: $--color-white;
      font-size: 16px;
      td:nth-child(2) {
        span{
          display: inline-block;
          width: 42px;
          height: 20px;
          background-color: $--color-danger;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  .right {
    width: calc(95% - 250px);
    margin-top: 20px;
    .el-tabs__item.is-active{
      &:nth-child(2){
        .subicon{
          background-image: url('~@/assets/images/assetmentDetailOne.png')
        }
      }
      &:nth-child(3){
        .subicon{
          background-image: url('~@/assets/images/assetmentDetailTwo.png')
        }
      }
      &:nth-child(4){
        .subicon{
          background-image: url('~@/assets/images/assetmentDetailThree.png')
        }
      }
    }
    .subiconbg {
      display: inline-block;
      width: 35px;
      height: 40px;
      background-image: url('~@/assets/images/background-detail2.png');
      vertical-align: middle;
      margin-right: 10px;
      .subicon {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        position: relative;
        top: 11px;
        left: 9px;
      }
      .user-detail-tab-icon {
        background: url('~@/assets/images/assetmentDetailOne1.png') no-repeat;
        background-size: 100% auto;
      }
      .control-tab-icon {
        height: 21px;
        margin-top: -2px;
        background: url('~@/assets/images/assetmentDetailTwo1.png') no-repeat;
        background-size: 100% auto;
      }
      .baseinfo-tab-icon {
        background: url('~@/assets/images/assetmentDetailThree1.png') no-repeat;
        background-size: 100% auto;
      }
    }
    /deep/ .el-tabs__header {
      border: transparent;
    }

    /deep/ .el-tabs__nav {
      display: flex;
      justify-content: center;
      float: inherit;
    }

    /deep/ .el-tabs__item {
      border: transparent;
      margin-right: 40px;

      font-size: 20px;
      line-height: 20px;
      color: $--color-text-regular;
    }

    /deep/ .el-tabs__active-bar {
      background-color: transparent;
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
    /deep/ .el-tabs__item.is-active {
      color: $--color-white;
      top: 0;
      &:hover{
        color: $--color-white;
      }
      .subiconbg {
        background-image: url('~@/assets/images/background-detail.png');
      }
    }
  }
}
</style>
