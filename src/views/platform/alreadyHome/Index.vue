<template>
  <div class="platform">
    <title-panel title="工作台">
      <div class="platform-top">
        <div class="platform-top__left">
          <div>
            <span class="left-title">功能快捷入口</span>
          </div>
          <div class="left-content">
            <div class="left-content-box">
              <div
              :key="index"
              v-for="(item, index) in entryList"
              :class="{'active': active === index }"
              @click="handleClick(index,item)">
                <div class="grid-content">
                  <img :src="item.img"/>
                  <div>
                    <span class="name">{{item.name}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="platform-top__right">
          <panel title="待办事项">
            <!-- <p class="platform-top__right-more" slot="header-append">更多…</p> -->
            <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
              <query-list
                ref="queryList"
                row-key="id"
                query-reverse
                :fetch-method="fetchMethod"
                :show-query-operation="false"
                :show-pagination="false"
                dataType='fxpg_gkcs_fh_data'
              >
                <div slot-scope="{ item }">
                  <c-article
                    :route-path="getRoutePath(item)"
                    :id="item.id"
                    :title="item.zfxm"
                    :levelTypes="item.pglx === '动态' ? 0 : 1"
                    :date="item.pgsj"
                    :item-data='item'
                    :query-list='["pgsj","zfbh"]'
                    :abstract="item.csnr"
                  ></c-article>
                </div>
                </query-list>
              </el-scrollbar>
          </panel>
        </div>
      </div>
      <div class="platform-bottom">
        <div class="platform-bottom__title">
          <span class="platform-bottom__text">近期高危超时预警</span>
          <div class="platform-bottom__line"></div>
        </div>
        <div class="platform-bottom__content">
          <el-scrollbar>
          <head-portrait
          v-for="item in warningList"
          :key="item.zfbh"
          :id="item.zfbh"
          :name="item.zfxm"
          :levelTypes="item.txlb === '动态' ? 0 : 1"
          :column="true"
          :item-data='item'
          :route-path="$const.assessment.ASSESSMENT['dynamic']['detailPath']['onePage'].path"
          :query-list='["pgsj","zfbh"]'
          ></head-portrait>
          </el-scrollbar>
        </div>
      </div>
    </title-panel>
  </div>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import Panel from '@/components/Panel/Index.vue';
import QueryList from '@/components/QueryList/Index.vue';
import CArticle from '@/components/Article/Index.vue';
import HeadPortrait from '@/components/HeadPortrait/Index.vue';
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'platform',
  components: {
    TitlePanel,
    Panel,
    QueryList,
    CArticle,
    HeadPortrait,
  },
  data() {
    return {
      entryList: [
        { img: require('@/assets/images/icon-one.png'), name: '通讯录', path: '/file-manage/address-book' },
        { img: require('@/assets/images/icon-two.png'), name: '电子档案', path: '/file-manage/electronic' },
        { img: require('@/assets/images/icon-three.png'), name: '健康档案', path: '/file-manage/health-file' },
        { img: require('@/assets/images/icon-four.png'), name: '动态评估', path: '/assessment/dynamic-evaluation' },
        { img: require('@/assets/images/icon-five.png'), name: '静态评估', path: '/assessment/static-evaluation' },
        { img: require('@/assets/images/icon-six.png'), name: '心理评估', path: '/assessment/psychological-assessment' },
      ],
      warningList: [],
      active: 3
    };
  },
  async created() {
    this.fetchHeadMethod();
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
  },
  methods: {
    fetchMethod() {
      let option = {
        fixQL: ` and (sffh='0'and fhmjjh='${this.userInfo.userName}') or (sffh='1' and sfzx='0' and zpmjjh='${this.userInfo.userName}')`
      };
      return this.$api.platform.fetchWarningData(option);
    },
    async fetchHeadMethod() {
      try {
        const { data, errcode } = await this.$api.platform.fetchList();
        if (errcode === 0) {
          this.warningList = data['riskList_data'] || [];
          this.warningList.forEach(item => {
            if (item.type.indexOf(this.$const.app['DANGER_TYPE']['HIGHRISK'].label) !== -1) {
              item.levelTags = 0;
            } else {
              item.levelTags = 1;
            }
          });
        }
      } catch (e) {
        console.warn(e);
      }
    },
    handleClick(index, item) {
      this.active = index;
      this.$router.push(item.path);
    },
    getRoutePath(item) {
      let { ASSESSMENT } = this.$const.assessment;
      return item.pglx === '动态'
        ? ASSESSMENT['dynamic']['detailPath']['twoPage'].path
        : ASSESSMENT['static']['detailPath']['twoPage'].path;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.platform {
  width: 100%;
  display: flex;
  flex-direction: column;
  /deep/.c-panel-body {
    padding-left: 0;
  }
  &-top {
    height: 563px;
    display: flex;
    &__left {
      width: 592px;
      height: 100%;
      padding-top: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .left-title {
        font-size: 22px;
        color: $--color-text-primary;
      }
      .left-content {
        height: 400px;
        width: 360px;
        .name {
          color: $--color-text-regular;
          font-size: 16px;
        }
        &-box{
          border-top:1px solid rgba(191,204,255,1);
          padding-left: 30px;
          padding-right: 64px;
        }
        .grid-content {
          width: 130px;
          height: 116px;
          border-radius:5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      .left-content>div {
        margin-top: 20px;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
      }
    }
    &__right {
      position: relative;
      overflow-y: hidden;
      &-more{
        font-size:16px;
        font-weight:400;
        color:rgba(65,146,243,1);
      }
      .mask-img {
        z-index: 999;
        position: absolute;
      }
     /deep/ .app-menu__scrollbar {
        height: 100%;
        overflow: hidden;
          .app-menu__wrap {
            overflow-x: hidden;
            // overflow-y: hidden;
          }
      }
      max-width: 928px;
      // flex: 1;
      margin-top: 3px;
    }
  }
  &-content {
    width: 100%;
    height: 100%;
  }
  /deep/ .c-panel{
    background: url('~@/assets/images/platform.png') no-repeat;
    background-size: 100% 100%;
    height: 563px;
    overflow: hidden;
    &-body{
      height: 517px;
      background-color: transparent;
    }
  }
  /deep/ .c-query-list{
    background: none;
  }
  /deep/.c-titlePanel-body {
    border: 6px solid #4192F3;
    border-right: none;
    // 兼容不同浏览器
    border-image: -webkit-linear-gradient(to right, rgba(22,128,255,1), rgba(22,128,255,0.06)) 40 40;
    border-image: -moz-linear-gradient(to right, rgba(22,128,255,1), rgba(22,128,255,0.06)) 40 40;
    border-image: linear-gradient(to right, rgba(22,128,255,1), rgba(22,128,255,0.06)) 40 40;
    border-right-color: transparent;
  }
  &-bottom {
    height: 232px;
    &__title {
      position: relative;
      left: 111px;
    }
    &__content {
      width: calc(100% - 111px);
      position: relative;
      left: 111px;
      height: 232px;
       overflow-x: hidden;
      .el-scrollbar{
        width: 100%;
        height: 90%;
        overflow: hidden;
         /deep/ .el-scrollbar__wrap{
           overflow-x: hidden;
         }
        /deep/ .el-scrollbar__view{
          display: flex;
          .c-avatar:nth-child(1){
            margin-left: 20px;
            &:last-child{
             margin-right: 111px;
            }
          }
        }
      }
    }
    &__content::-webkit-scrollbar {
      display:none;
    }
    &__text {
      color: $--color-white;
      font-size: 18px;
      position: absolute;
      top: -8px;
      left: 0;
    }
    &__line {
      border: 2.5px solid transparent;
      border-image: -webkit-linear-gradient(to left, rgba(22,128,255,1), rgba(22,128,255,0.06));
      border-image: -moz-linear-gradient(to left, rgba(22,128,255,1), rgba(22,128,255,0.06));
      border-image: linear-gradient(to left, rgba(22,128,255,1), rgba(22,128,255,0.06));
      border-image-slice: 10;
    }
  }
  .active {
    background:-webkit-gradient(linear, 0 0, 0 100%, from(rgba(0,76,255,0.47)), to(rgba(14,41,73,0.42)));
    border-radius: 4px;
    .name {
      color: $--color-text-primary;
    }
  }
}
</style>
