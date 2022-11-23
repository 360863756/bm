<template>
  <div  class="platform-home">
    <dv-full-screen-container v-if="largehome">
      <div @dblclick="closeLarge" class="platform platformlarge">
        <title-panel>
          <template slot="header-append">
            <div class="header-content">
              <p><span></span><span></span><span></span><span></span></p>
              <p>服刑人员监管风险综合评估大数据分析平台</p>
              <p><span></span><span></span><span></span><span></span></p>
            </div>
          </template>
          <div class="platform-left">
            <div class="left_header">
              <dv-border-box-12 :color="['#1680FF']" :dur='5'>
                <title-panel>
                  <div slot="title" class="title">监区概况</div>
                  <div class="content">
                    <div>
                      <p>在册人数</p>
                      <p>{{allData.zcrs}}</p>
                    </div>
                    <div>
                      <p>民警总人数</p>
                      <p>{{allData.mjzrs}}</p>
                    </div>
                    <div>
                      <p>新入监人数</p>
                      <p>{{allData.xrjrs}}</p>
                    </div>
                    <div>
                      <p>刑满释放人数</p>
                      <p>{{allData.xmsfrs}}</p>
                    </div>
                  </div>
                </title-panel>
              </dv-border-box-12>
            </div>
            <div class="left_section">
              <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='6'>
                <title-panel>
                  <div slot="title" class="title">评估概况</div>
                  <div class="content">
                    <div class="content-top">
                      <div>
                        <p>参与静态评估</p>
                        <p>{{allData.jtpgrs}}<i>人</i></p>
                      </div>
                      <div>
                        <p>高风险</p>
                        <p>{{allData.jtpggfxrs}}<i>人</i></p>
                      </div>
                      <div>
                        <p>参与动态评估</p>
                        <p>{{allData.dtpgrs}}<i>人</i></p>
                      </div>
                      <div>
                        <p>高风险</p>
                        <p>{{allData.dtpggfxrs}}<i>人</i></p>
                      </div>
                    </div>
                    <div class="content-footer">
                      <assesment-echarts></assesment-echarts>
                    </div>
                  </div>
                </title-panel>
              </dv-border-box-8>
            </div>
            <div class="left_footer">
              <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='7'>
                <title-panel>
                  <div slot="title" class="title">服刑人员处遇等级</div>
                  <traitement-grade :key="traitementgradeData.pgrs" :traitementgradeData="traitementgradeData">
                  </traitement-grade>
                </title-panel>
              </dv-border-box-8>
            </div>
          </div>
          <div class="platform-center">
            <div class="center_header">
              <dv-border-box-10 :color="['#1680FF']" :dur='8'>
                <title-panel>
                  <swiper-list :key="swiperListData.dtcsyjrs" :swiperListData="swiperListData"></swiper-list>
                </title-panel>
              </dv-border-box-10>
            </div>
            <div class="center_footer">
              <dv-border-box-8 :color="['#1680FF']" :dur='9'>
                <title-panel>
                  <div slot="title" class="title">评估量表次数排名TOP5</div>
                  <ranking-list></ranking-list>
                </title-panel>
              </dv-border-box-8>
            </div>
          </div>
          <div class="platform-right">
            <div class="right_header">
              <dv-border-box-12 :reverse="true" :color="['#1680FF']" :dur='10'>
                <title-panel>
                  <div slot="title" class="title">危险倾向人数情况</div>
                  <dengrious-people></dengrious-people>
                </title-panel>
              </dv-border-box-12>
            </div>
            <div class="right_section">
              <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='11'>
                <title-panel>
                  <div slot="title" class="title">人脸识别</div>
                  <face-recognition :key="facerecognitionData.zmqxcs" :facerecognitionData='facerecognitionData'>
                  </face-recognition>
                </title-panel>
              </dv-border-box-8>
            </div>
            <div ref="rightFooter" class="right_footer">
              <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='12'>
                <title-panel>
                  <div slot="title" class="title">心理评估</div>
                  <query-table ref="queryTable" :table-fields="tableFields" :fetch-method="fetchTableM"
                    :max-height="tableHeight" :key="tableHeight" :show-pagination='false' :show-row-operation="false"
                    style="width: 85%">
                  </query-table>
                </title-panel>
              </dv-border-box-8>
            </div>
          </div>
        </title-panel>
      </div>
    </dv-full-screen-container>
    <div  v-else class="platform">
      <title-panel :key="largehome+'12'">
        <div slot="header-append">
          <div class="header-blowUp cursor-pointer" @click="goBigHome"></div>
        </div>
        <div class="platform-left">
          <div class="left_header">
            <dv-border-box-12 :color="['#1680FF']" :dur='5'>
              <title-panel>
                <div slot="title" class="title">监区概况</div>
                <div class="content">
                  <div>
                    <p>在册人数</p>
                    <p>{{allData.zcrs}}</p>
                  </div>
                  <div>
                    <p>民警总人数</p>
                    <p>{{allData.mjzrs}}</p>
                  </div>
                  <div>
                    <p>新入监人数</p>
                    <p>{{allData.xrjrs}}</p>
                  </div>
                  <div>
                    <p>刑满释放人数</p>
                    <p>{{allData.xmsfrs}}</p>
                  </div>
                </div>
              </title-panel>
            </dv-border-box-12>
          </div>
          <div class="left_section">
            <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='6'>
              <title-panel>
                <div slot="title" class="title">评估概况</div>
                <div class="content">
                  <div class="content-top">
                    <div>
                      <p>参与静态评估</p>
                      <p>{{allData.jtpgrs}}<i>人</i></p>
                    </div>
                    <div>
                      <p>高风险</p>
                      <p>{{allData.jtpggfxrs}}<i>人</i></p>
                    </div>
                    <div>
                      <p>参与动态评估</p>
                      <p>{{allData.dtpgrs}}<i>人</i></p>
                    </div>
                    <div>
                      <p>高风险</p>
                      <p>{{allData.dtpggfxrs}}<i>人</i></p>
                    </div>
                  </div>
                  <div class="content-footer">
                    <assesment-echarts></assesment-echarts>
                  </div>
                </div>
              </title-panel>
            </dv-border-box-8>
          </div>
          <div class="left_footer">
            <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='7'>
              <title-panel>
                <div slot="title" class="title">服刑人员处遇等级</div>
                <traitement-grade :key="traitementgradeData.pgrs" :traitementgradeData="traitementgradeData">
                </traitement-grade>
              </title-panel>
            </dv-border-box-8>
          </div>
        </div>
        <div class="platform-center">
          <div class="center_header">
            <dv-border-box-10 :color="['#1680FF']" :dur='8'>
              <title-panel>
                <swiper-list :key="swiperListData.dtcsyjrs" :swiperListData="swiperListData"></swiper-list>
              </title-panel>
            </dv-border-box-10>
          </div>
          <div class="center_footer">
            <dv-border-box-8 :color="['#1680FF']" :dur='9'>
              <title-panel>
                <div slot="title" class="title">评估量表次数排名TOP5</div>
                <ranking-list></ranking-list>
              </title-panel>
            </dv-border-box-8>
          </div>
        </div>
        <div class="platform-right">
          <div class="right_header">
            <dv-border-box-12 :reverse="true" :color="['#1680FF']" :dur='10'>
              <title-panel>
                <div slot="title" class="title">危险倾向人数情况</div>
                <dengrious-people></dengrious-people>
              </title-panel>
            </dv-border-box-12>
          </div>
          <div class="right_section">
            <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='11'>
              <title-panel>
                <div slot="title" class="title">人脸识别</div>
                <face-recognition :key="facerecognitionData.zmqxcs" :facerecognitionData='facerecognitionData'>
                </face-recognition>
              </title-panel>
            </dv-border-box-8>
          </div>
          <div ref="rightFooter" class="right_footer">
            <dv-border-box-8 :reverse="true" :color="['#1680FF']" :dur='12'>
              <title-panel>
                <div slot="title" class="title">心理评估</div>
                <query-table ref="queryTable" :table-fields="tableFields" :fetch-method="fetchTableM"
                  :max-height="tableHeight" :key="tableHeight" :show-pagination='false' :show-row-operation="false"
                  style="width: 85%">
                </query-table>
              </title-panel>
            </dv-border-box-8>
          </div>
        </div>
      </title-panel>
    </div>
  </div>
</template>

<script>
import {
  createNamespacedHelpers
} from 'vuex';
import TitlePanel from '@/components/TitlePanel/Index.vue';
import AssesmentEcharts from './components/AssesmentEcharts.vue';
import TraitementGrade from './components/TraitementGrade.vue';
import RankingList from './components/RankingList.vue';
import SwiperList from './components/SwiperList.vue';
import DengriousPeople from './components/DengriousPeople.vue';
import FaceRecognition from './components/FaceRecognition.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import {
  tableFields
} from './tableFields';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'platform',
  components: {
    TitlePanel,
    AssesmentEcharts,
    TraitementGrade,
    RankingList,
    SwiperList,
    DengriousPeople,
    FaceRecognition,
    QueryTable
  },
  data() {
    return {
      allData: {},
      tableFields,
      tableHeight: 80,
      largehome: false
    };
  },
  async created() {
    this.getData();
  },
  updated() {
    const height = this.$refs.rightFooter.offsetHeight;
    this.$nextTick(() => {
      this.tableHeight = height / 1.5;
    });
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
    traitementgradeData() {
      let {
        ygrs,
        pgrs,
        kgrs,
        kcrs
      } = this.allData;
      return {
        ygrs,
        pgrs,
        kgrs,
        kcrs
      };
    },
    facerecognitionData() {
      let {
        zmqxcs,
        zmqxzb,
        fmqxcs,
        fmqxzb
      } = this.allData;
      return {
        zmqxcs,
        zmqxzb,
        fmqxcs,
        fmqxzb
      };
    },
    swiperListData() {
      let {
        dtcsyjrs,
        gwcsyjrs
      } = this.allData;
      return {
        dtcsyjrs,
        gwcsyjrs
      };
    }
  },
  methods: {
    async getData() {
      let {
        data,
        errcode
      } = await this.$api.platform.getIndexData();
      if (errcode === 0) {
        this.allData = data;
      }
    },
    fetchTableM() {
      return this.$api.platform.getRankingListData();
    },
    goBigHome() {
      // let routeUrl = this.$router.resolve({
      //   path: '/platform/largehome'
      // });
      // window.open(routeUrl.href, '_blank');
      this.largehome = true;
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    },
    closeLarge() {
      if (document.exitFullScreen) {
        document.exitFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.largehome = false;
      location.reload();
    }
  }
};

</script>

<style lang="scss" scoped>
  @import "@/style/var.scss";

  #dv-full-screen-container {
    background: $--color-black;
  }
  .platformlarge{
    background: $--color-black;
    height: calc(100% - 0.5vw);
    width: 100%;
    padding-bottom: 0.5vw;
    /deep/.c-titlePanel-header{
      &__append{
        width:100%;
      }
      .header-content{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        p:nth-child(2){
          font-size:1.67vw;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin:0  1.7vw;
        }
        p:nth-child(1){
          display: flex;
          align-items: center;
          height: 100%;
          span:nth-child(1){
            display: inline-block;
            width:0.3vw;
            height:0.7vw;
            background:$--largeHome-span1;
            box-shadow:0px 0px 0.3vw $--largeHome-span1;
          }
          span:nth-child(2){
            display: inline-block;
            width:0.3vw;
            height:0.8vw;
            background:$--largeHome-span2;
            box-shadow:0px 0px 0.3vw $--largeHome-span2;
            margin-left: 0.6vw;
          }
          span:nth-child(3){
            display: inline-block;
            width:0.3vw;
            height:0.9vw;
            background:$--largeHome-span3;
            box-shadow:0px 0px 0.3vw $--largeHome-span3;
            margin-left: 0.6vw;
          }
          span:nth-child(4){
            display: inline-block;
            width:0.3vw;
            height:1vw;
            background:$--largeHome-span4;
            box-shadow:0px 0px 0.3vw $--largeHome-span4;
            margin-left: 0.6vw;
          }
        }
        p:nth-child(3){
          display: flex;
          align-items: center;
          height: 100%;
          span:nth-child(4){
            display: inline-block;
            width:0.3vw;
            height:0.7vw;
            background:$--largeHome-span1;
            box-shadow:0px 0px 0.6vw $--largeHome-span1;
            margin-left:0.6vw;
          }
          span:nth-child(3){
            display: inline-block;
            width:0.3vw;
            height:0.8vw;
            background:$--largeHome-span2;
            box-shadow:0px 0px 0.3vw $--largeHome-span2;
            margin-left: 0.6vw;
          }
          span:nth-child(2){
            display: inline-block;
            width:0.3vw;
            height:0.9vw;
            background:$--largeHome-span3;
            box-shadow:0px 0px 0.3vw $--largeHome-span3;
            margin-left: 0.6vw;
          }
          span:nth-child(1){
            display: inline-block;
            width:0.3vw;
            height:1vw;
            background:$--largeHome-span4;
            box-shadow:0px 0px 0.3vw $--largeHome-span4;
          }
        }
      }
    }
  }
  .platform-home {
    height: 100%;
    width: 100%;
  }

  /deep/ .el-table {
    &__header {
      display: inline-block;
      width: 100% !important;

      .cell {
        font-size: 0.8vw;
        padding: 0
      }

      th {
        padding: 0 0 0 0.5vw;
      }
    }

    &__body {
      display: inline-block;
      width: 100% !important;

      .cell {
        font-size: 0.7vw;
      }

      td {
        padding: 0;
      }
    }
  }

  .platform {
    &>.c-titlePanel {
      /deep/ .c-titlePanel-header {
        padding: 0 0 20px 0;
      }
    }

    height: 100%;
    width: 100%;

    /deep/ .c-titlePanel {
      height: 100%;

      .header-blowUp {
        width: 1vw;
        height: 1vw;
        background: url('~@/assets/images/platHome/blowUp.png') no-repeat;
        background-size: 100% 100%;
      }

      &-body {
        .c-titlePanel {
          &-header {
            padding: 1vw;
            padding-bottom: 0.5vw;
            .c-titlePanel-header__title {
              width: 100%
            }

            .title {
              font-size: 1vw;
              color: $--color-text-primary;
              font-weight: 400;
              padding-left: 2.25vw;
              background: url('~@/assets/images/platHome/1.png') no-repeat left center;
              background-size: 2.18vw auto;
            }
          }
        }

        display: flex;

        .platform-left {
          width: 28%;
          display: flex;
          flex-direction: column;

          &>div {
            width: 100%;
          }

          .left_header {
            height: 25%;
            margin-bottom: 1vw;

            .content {
              width: 100%;
              height: 100%;
              display: flex;
              flex-wrap: wrap;

              &>div {
                width: 50%;
                height: 50%;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;

                p {
                  width: 100%;
                  text-align: center;
                  font-weight: bold;
                  &:nth-child(1) {
                    font-size: 0.8vw;
                    color: $--platHome-swiperheaderColor;
                  }

                  &:nth-child(2) {
                    font-style: oblique;
                    font-size: 1.5vw;
                    font-family:Arial;
                    color: $--color-text-primary;
                  }
                }
              }
            }
          }

          .left_section {
            flex: 1;
            margin-bottom: 1vw;

            .content {
              width: 100%;
              display: flex;
              flex-direction: column;

              &-top {
                display: flex;
                height: 4vw;

                div:nth-child(2n) {
                  p:nth-child(2) {
                    color: #FF3D00
                  }
                }

                &>div {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;

                  p {
                    width: 100%;
                    text-align: center;

                    &:nth-child(1) {
                      font-size: 0.8vw;
                      color: #6E7999;
                    }

                    &:nth-child(2) {
                      font-style: oblique;
                      font-size: 1.5vw;
                      font-weight: bold;
                      font-family:Arial;
                      color: $--color-text-primary;
                    }

                    i {
                      font-size: 12px;
                    }
                  }
                }
              }

              &-footer {
                flex: 1;
              }
            }
          }

          .left_footer {
            height: 25%;
          }
        }

        .platform-center {
          flex: 1;
          margin: 0 1vw;
          display: flex;
          flex-direction: column;

          &>div {
            width: 100%;
          }

          .center_header {
            flex: 1;
          }

          .center_footer {
            margin-top: 1vw;
            height: 25%;
          }
        }

        .platform-right {
          width: 28%;
          display: flex;
          flex-direction: column;

          &>div {
            width: 100%;
          }

          .right_header {
            height: 25%;
            margin-bottom: 1vw;
          }

          .right_section {
            flex: 1;
            margin-bottom: 1vw;
          }

          .right_footer {
            height: 25%;

            .c-titlePanel-body {
              display: flex;
              justify-content: center;
              align-items: center
            }
          }
        }
      }
    }
  }

</style>
