<template>
  <div class="swiperList">
    <div class="swiperList-header">
      <div>
        <p>动态超时预警<span>{{swiperListData.dtcsyjrs}}<i>人</i></span></p>
      </div>
      <div>
        <p>高危记录预警<span>{{swiperListData.gwcsyjrs}}<i>人</i></span></p>
      </div>
    </div>
    <div class="swiperList-swiper cursor-pointer">
      <div  ref="swiperWrapper" class="swiper">
        <div v-if="allData.length" class="swiper-container">
          <div  class="swiper-wrapper">
            <div v-for="(item,index) in allData" :key="index+''" class="swiper-slide"><img src="@/assets/images/platHome/avater.png" alt="" srcset=""></div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
    <div class="swiperList-footer">
        <p><span>姓名</span><span>{{activeData.zfxm}}</span></p>
        <p><span>监区</span><span>{{activeData.jq}}</span></p>
        <p><span>罪名</span><span>抢劫罪</span></p>
        <p><span>年龄</span><span>{{activeData.nl}}</span></p>
        <p><span>监舍</span><span>502</span></p>
        <p><span>刑种</span><span>刑种</span></p>
        <p><span>编号</span><span>{{activeData.zfbh}}</span></p>
        <p><span>婚姻</span><span>未婚</span></p>
        <p><span>分管等级</span><span>严管</span></p>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
export default {
  name: 'SwiperList',
  props: {
    swiperListData: {
      type: Object
    }
  },
  data() {
    return {
      mySwiper: {},
      allData: [],
      activeData: '',
      flag: true
    };
  },
  async created() {
    let { data, errcode } = await this.$api.platform.getZfxxListData();
    if (errcode === 0) {
      this.allData = data['fxpg_index_zdtx_data'];
      this.activeData = data['fxpg_index_zdtx_data'][0];
    }
  },
  updated() {
    if (this.flag && this.allData.length) {
      let width = this.$refs.swiperWrapper.clientWidth;
      this.flag = false;
      this.mySwiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        loop: true,
        autoplay: true,
        slidesPerView: 1.5,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: width / 8,
          depth: width,
          modifier: 1.6,
          slideShadows: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChangeTransitionStart: () => {
            if (this.mySwiper.activeIndex) {
              this.activeData = this.allData[this.mySwiper.activeIndex - 3];
            }
          },
        },
      });
    }
  },
  methods: {}
};

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
  .swiperList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3.4vw 5vw;
    &-header {
      display: flex;
      justify-content: space-between;

      &>div {
        p {
          font-size: 0.8vw;
          font-weight: bold;
          color: $--platHome-swiperheaderColor;

          span {
            font-size: 2vw;
            font-weight: bold;
            margin-left: 0.8vw;
            font-style: oblique;
            font-family:Arial;
            background: url('~@/assets/images/platHome/elliptical.png') no-repeat bottom;
            background-size: 100% auto;
            i {
              font-style: inherit;
              font-size: 0.7vw;
            }
          }
        }

        &:nth-child(1) {
          span {
            color: $--platHome-swiperheaderLeftColor;
          }
        }

        &:nth-child(2) {
          span {
            color: $--platHome-swiperheaderRightColor;
          }
        }
      }
    }

    &-swiper {
      display: flex;
      justify-content: center;
      align-items: center;

      .swiper {
        width: 22.4vw;
        height: 15.6vw;

        .swiper-container {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          background: $--platHome-swiperImage;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 90%;
            height: 90%;
          }
        }
        .swiper-button-next:after,.swiper-button-prev:after{
          font-size: 1.6vw;
          color: $--platHome-swiperImageNext;
          font-weight: 900;
        }
        // .swiper-button-prev{
        //   left: -20px;
        // }
      }
    }
    &-footer{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      p{
        width: 30%;
        span{
          font-size:0.8vw;
          font-weight:400;
          &:nth-child(1){
            color:$--color-text-regular;
            margin-right: 0.5vw;
          }
          &:nth-child(2){
            color:$--color-text-primary
          }
        }
      }
    }
  }

</style>
