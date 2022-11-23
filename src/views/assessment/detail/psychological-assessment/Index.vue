<template>
  <div class="content">
    <div class="left">
      <card @fetch-card-info="fetchCardInfo" :params="cardFields"></card>
    </div>
    <div class="right">
      <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane v-for="i in assessment" :label="i.title" :name="i.path" :key="i.path">
          <span slot='label'>
            <i class='subiconbg'>
              <i class='subicon' :class="i.config.icon"></i>
            </i> {{ i.title }}
          </span>
        </el-tab-pane>
        <router-view></router-view>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import Card from '../components/Card/Index.vue';
import { parseJson } from '@/utils';
import { cardFields } from './cardFields';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  data() {
    return {
      cardFields,
      query: this.$route.query,
      assessment: [],
      title: '',
      active: ''
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
  created() {
    this.assessment = parseJson(this.normalizedMenus, 'path', '/assessment/detail/psychological-assessment')[0].children;
    this.getData();
  },
  watch: {
    $route(to, from) {
      this.getData();
      const { fields } = this.cardFields;
      const field = fields[fields.length - 1];
      field.label = this.title;
      field.index = this.getCardFieldIndex(this.active);
      this.$set(this.cardFields, 'fields', fields);
    }
  },
  methods: {
    getCardFieldIndex(path) {
      switch (path) {
        case '/assessment/detail/psychological-assessment/servePrison': return 'zqpgcs';
        case '/assessment/detail/psychological-assessment/outPrison': return 'cjpgcs';
        default: return 'rjpgcs';
      }
    },
    fetchCardInfo(cb) {
      const { zfbh, pgsj } = this.$route.query;
      let data = {};
      if (zfbh) {
        data.zfbh = zfbh;
      }
      if (pgsj) {
        data.pgsj = pgsj;
      }
      this.$api.assessment.getPsychologyEvalZFInfo(data).then((res) => {
        const data = res.data;
        if (data && data.fxpg_pgzx_xlpg_pgqk_data && data.fxpg_pgzx_xlpg_pgqk_data.length > 0) {
          let info = data.fxpg_pgzx_xlpg_pgqk_data[0];
          cb(info);
        }
      });
    },
    handleClick(tab, e) {
      let getObj = this.assessment.filter(item => {
        return item.title === tab.label;
      })[0];
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
      this.title = result.title;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
/deep/ .eval-count{
  color: red;
}
.back{
  color: $--color-primary;
  cursor: pointer;
}
/deep/ .c-card-content{
  td:nth-child(2){
    padding-left: 6px
  }
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

    .el-tabs__item:not(.is-disabled):hover{
      color: $--color-text-regular;
    }
  }
  /deep/ .el-tabs__item.is-active{
      background-color: $--color-black;
      color: $--color-primary;
      border:1px solid $--color-text-regular;
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
      text-align: center;
      span {
        display: inline-block;
        background-image: url('~@/assets/images/static-assess.png');
        width: 42px;
        height: 49px;
        vertical-align: middle;
        padding-top: 13px;
        margin-left: 5px;
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
      border: transparent;
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
