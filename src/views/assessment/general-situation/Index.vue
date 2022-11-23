<template>
  <div class="general-situation">
    <title-panel title="总体概况">
      <div class="general-situation__content">
        <div class="content-top">
          <div class="content-top__left">
            <div>
              <p>服刑人员总数量</p>
              <p>{{fxpg_pgzx_pggl_data.fxryzrs}}<i>人</i></p>
            </div>
            <div>
              <p>本月出监人员数量</p>
              <p>{{fxpg_pgzx_pggl_data.bycjrs}}<i>人</i></p>
            </div>
            <div>
              <p>本月新增人员数量</p>
              <p>{{fxpg_pgzx_pggl_data.byrjrs}}<i>人</i></p>
            </div>
          </div>
          <div class="content-top__right">
            <div class="content-top__right-left">
              <p>参与评估人员</p>
              <p>{{fxpg_pgzx_pggl_data.pgzrs}}<i>人</i></p>
            </div>
            <div class="content-top__right-right">
              <div>
                <p>高风险人员</p>
              </div>
              <div>
                <p>
                  <span>动态评估 <i>{{fxpg_pgzx_pggl_data.dtgfxrs}}</i><i>人</i></span>
                  <span>静态评估 <i>{{fxpg_pgzx_pggl_data.jtgfxrs}}</i><i>人</i></span>
                  <span>心理评估 <i>{{fxpg_pgzx_pggl_data.xlgfxrs}}</i><i>人</i></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="content-center">
          <div class="content-center__box" style="width:30%">
            <Panel title="动态评估月变动情况" header-class='content-center__box-header'>
              <div ref="echarts" class="echartsStyle"></div>
            </Panel>
          </div>
          <div class="content-center__box" style="width:30%">
            <Panel title="静态评估月变动情况" header-class='content-center__box-header'>
              <div ref="echarts1" class="echartsStyle"></div>
            </Panel>
          </div>
          <div class="content-center__box" style="width:30%">
            <Panel title="心理评估月风险数量" header-class='content-center__box-header'>
              <div ref="echarts2" class="echartsStyle"></div>
            </Panel>
          </div>
        </div>
        <div class="content-footer">
          <div class="content-footer__left">
            <Panel title="动态评估超时提醒" header-class='left-header'>
              <div slot="title">动态评估超时提醒</div>
              <div v-if="leftListData.length" class="swiper-container swiperautoPlay">

                <div class="swiper-wrapper">

                  <div class="swiper-slide" v-for="i in leftListData" :key="i.zfbh">
                    <general-list :data="i"></general-list>
                  </div>
                </div>

              </div>
            </Panel>

          </div>
          <div class="content-footer__right">
            <Panel title="高危记录提醒" header-class='right-header'>
              <div slot="title">高危记录提醒</div>
              <!-- <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                <query-list ref="queryList" row-key="id" query-reverse :fetch-method="fetchMethod1"
                  :show-query-operation="false" :show-pagination="false" dataType='highRiskList_data'>
                  <div slot-scope="{ item }">
                    <general-list :data="item"></general-list>
                  </div>
                </query-list>
              </el-scrollbar> -->
              <div v-if="rightListData.length" class="swiper-container swiperautoPlay1">

                <div class="swiper-wrapper">

                  <div class="swiper-slide" v-for="i in rightListData" :key="i.zfbh">
                    <general-list :data="i"></general-list>
                  </div>
                </div>

              </div>
            </Panel>
          </div>
        </div>
      </div>
    </title-panel>
  </div>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import GeneralList from './commonets/GeneralList/Index.vue';
import Panel from '@/components/Panel/Index.vue';
import Swiper from 'swiper';
export default {
  name: 'GeneralSituation',
  components: {
    TitlePanel,
    GeneralList,
    Panel
  },
  data() {
    return {
      fxpg_pgzx_pggl_data: {},
      fxpg_pgzx_ypgqk_data: [],
      zdtxList_data: [],
      echarts: {},
      echarts1: {},
      echarts2: {},
      leftListData: [],
      rightListData: [],
      mySwiper: {},
      mySwiper1: {},
      flag: true,
      flag1: true
    };
  },
  computed: {
    fxpg_pgzx_ypgqk_data_dynamic() {
      let arr = this.fxpg_pgzx_ypgqk_data.filter(item => {
        return item.pglx === '动态评估';
      });
      return arr;
    },
    fxpg_pgzx_ypgqk_data_static() {
      let arr = this.fxpg_pgzx_ypgqk_data.filter(item => {
        return item.pglx === '静态评估';
      });
      return arr;
    },
    fxpg_pgzx_ypgqk_data_pasycholo() {
      let arr = this.fxpg_pgzx_ypgqk_data.filter(item => {
        return item.pglx === '心理评估';
      });
      return arr;
    },
  },
  created() {
    this.fetchMethod();
    this.fetchMethod1();
  },
  async mounted() {
    await this.getData();
    this.echarts = this.draw('echarts', this.fxpg_pgzx_ypgqk_data_dynamic);
    this.echarts1 = this.draw('echarts1', this.fxpg_pgzx_ypgqk_data_static);
    this.echarts2 = this.draw('echarts2', this.fxpg_pgzx_ypgqk_data_pasycholo);
  },
  updated() {
    if (this.flag && this.leftListData.length) {
      this.flag = false;
      this.mySwiper = new Swiper('.swiperautoPlay', {
        autoplay: true,
        loop: true,
        speed: 300,
        slidesPerView: 'auto',
        freeMode: true,
        direction: 'vertical',
        setWrapperSize: true,
      });
    }
    if (this.flag1 && this.rightListData.length) {
      this.flag1 = false;
      this.mySwiper1 = new Swiper('.swiperautoPlay1', {
        autoplay: true,
        loop: true,
        speed: 300,
        slidesPerView: 'auto',
        freeMode: true,
        direction: 'vertical',
        setWrapperSize: true,
      });
    }
  },
  methods: {
    async fetchMethod() {
      let { errcode, data } = await this.$api.assessment.getGeneralSituationListLeftData();
      if (errcode === 0) {
        this.leftListData = data['dynamicRiskList_data'];
      }
    },
    async fetchMethod1() {
      let { errcode, data } = await this.$api.assessment.getGeneralSituationListRightData();
      if (errcode === 0) {
        this.rightListData = data['highRiskList_data'];
      }
    },
    async getData() {
      let {
        data
      } = await this.$api.assessment.getGeneralSituationData();
      this.fxpg_pgzx_pggl_data = data['fxpg_pgzx_pggl_data'][0];
      this.fxpg_pgzx_ypgqk_data = data['fxpg_pgzx_ypgqk_data'];
    },
    draw(name, arrAy) {
      let chart = this.$refs.echarts && this.$echarts.init(this.$refs[name], 'default');
      let arr = [{
        name: '高',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.HIGH.color,
        smooth: true,
        data: []
      }, {
        name: '中',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.CENTER.color,
        smooth: true,
        data: []
      }, {
        name: '低',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.LOW.color,
        smooth: true,
        data: []
      }];
      arrAy.forEach(item => {
        arr.forEach(i => {
          if (i.name === item.pgdj) {
            i.data.push(item.rs);
          }
        });
      });
      let session = {
        title: {
          text: '人数指数',
          center: 'right',
          left: -6,
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              color: '#222'
            }
          },
        },
        grid: {
          x: 23,
          y: 40,
        },
        legend: {
          data: ['高', '中', '低'],
          right: 10,
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          type: 'category',
          nameTextStyle: {
            color: 'red'
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: Array.from(new Set(arrAy.map(item => {
            return item.rq;
          })))
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: arr
      };
      if (chart) {
        chart.setOption(session, true);
      }
      return chart;
    }
  },
  beforeDistory() {
    if (this.echarts) {
      this.echarts.dispose();
    }
    if (this.echarts1) {
      this.echarts1.dispose();
    }
    if (this.echarts1) {
      this.echarts2.dispose();
    }
  }
};

</script>

<style lang="scss" scoped>
  @import "@/style/var.scss";
  .swiper-container{
      width: 100%;
      height:16.5vw;
    }
    .swiper-slide {
      width: 100%;
      height:5vw;
      margin-bottom: 0.5vw;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  /deep/ .app-menu__scrollbar {
    height: 20vw;
    width: 101%;
    overflow: hidden;

    .app-menu__wrap {
      overflow-x: hidden;
      // overflow-y: hidden;
    }
  }

  /deep/ .c-titlePanel-body {
    border: 6px solid #4192F3;
    border-right: none;
    border-image: linear-gradient(to right, #1680ff, rgba(22, 128, 255, 0.06)) 40 40;
  }

  .general-situation {
    &__content {
      padding: 30px 0;
      background: url('~@/assets/images/assessment-generalNew.png') no-repeat right 0;
      background-size: 70%;

      .content-top {
        display: flex;

        &__left {
          flex: 69;
          border-right: 5px solid #4192F3;
          border-image: linear-gradient(to bottom, #1680ff, rgba(22, 128, 255, 0.06)) 40 40;
          display: flex;
          justify-content: center;

          div {
            margin-right: 5%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            p {
              text-align: center;

              &:nth-child(1) {
                font-size: 1.09vw;
                font-weight: bold;
                color: rgba(22, 128, 255, 1);
                text-shadow: 0px 3px 10px $--color-black;
                margin-bottom: 0.55vw;
              }

              &:nth-child(2) {
                font-size: 2.2vw;
                font-weight: bold;
                font-family: Arial;
                color: rgba(255, 255, 255, 1);
                font-style: oblique;

                i {
                  font-size: 1.09vw;
                  margin-left: 2px;
                  font-style: initial;
                }
              }
            }
          }
        }

        &__right {
          flex: 90;
          display: flex;

          &-left {
            margin-left: 5%;

            p {
              text-align: center;

              &:nth-child(1) {
                font-size: 1.09vw;
                font-weight: bold;
                color: rgba(22, 128, 255, 1);
                text-shadow: 0px 3px 10px $--color-black;
                margin-bottom: 0.55vw;
              }

              &:nth-child(2) {
                font-size: 2.2vw;
                font-weight: bold;
                font-family: Arial;
                font-style: oblique;
                color: $--color-text-primary;

                i {
                  font-size: 1.09vw;
                  margin-left: 2px;
                  font-style: initial;
                }
              }
            }
          }

          &-right {
            margin-left: 3%;
            display: flex;
            flex-wrap: wrap;

            div:nth-child(1) {
              width: 100%;
              font-size: 1.09vw;
              font-weight: bold;
              color: rgba(22, 128, 255, 1);
              text-shadow: 0px 3px 10px $--color-black;
            }

            div:nth-child(2) {
              flex: 1;

              p {
                font-size: 1.09vw;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                display: flex;
                justify-content: space-between;

                i {
                  font-style: initial;
                  font-family: Arial;
                  color: rgba(255, 61, 0, 1);

                  &:nth-child(1) {
                    font-size: 2.2vw;
                    font-weight: bold;
                    font-style: oblique;
                  }

                  &:nth-child(2) {
                    margin-left: 2px;
                    font-size: 1.09vw;
                  }
                }
              }
            }
          }
        }
      }

      .c-panel {
        background-color: transparent;
      }

      /deep/ .c-panel-body {
        padding: 20px 0 0;
      }

      .c-query-list {
        background-color: transparent;
      }

      .content-center {
        display: flex;
        justify-content: space-between;
        padding: 20px 5% 0 5%;

        .echartsStyle {
          width: 100%;
          height: 210px
        }

        /deep/ .content-center__box-header {
          height: 43px;
          width: 100%;
          line-height: 43px;
          padding-left: 16px;
          border-left: 3px solid $--list-color-primary;
          font-size: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0px 0px 6px $--list-color-regular;
          background: linear-gradient(90deg, rgba(0, 76, 255, 0.6) 0%, rgba(0, 76, 255, 0) 100%);
        }
      }

      .content-footer {
        display: flex;
        justify-content: space-between;
        padding: 0 0 0 5%;

        /deep/ .c-query-list__item {
          padding-left: 0;
          padding-right: 0;
        }

        &__left {
          width: 47%;

          /deep/ .left-header {
            height: 43px;
            width: 60%;
            line-height: 43px;
            padding-left: 16px;
            border-left: 3px solid rgba(185, 0, 255, 1);
            font-size: 20px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 0px 6px $--list-color-regular;
            background: linear-gradient(90deg, rgba(185, 0, 255, 0.6) 0%, rgba(185, 0, 255, 0) 100%);
            ;
          }
        }

        &__right {
          width: 47%;

          /deep/ .right-header {
            height: 43px;
            width: 60%;
            line-height: 43px;
            padding-left: 16px;
            border-left: 3px solid rgba(255, 61, 0, 1);
            font-size: 20px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 0px 6px $--list-color-regular;
            background: linear-gradient(90deg, rgba(255, 61, 0, 0.6) 0%, rgba(255, 61, 0, 0) 100%);
          }
        }
      }
    }
  }

</style>
