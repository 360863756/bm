<template>
  <title-panel class='sub-panel' title='罪犯基本信息'>
    <div class="info">
      <div class="info-row">
        <div class="info-row-item">
          <span class="desc">监区：</span>
          <span class="valbg"><span class="val">{{ baseInfo.jq || '' }}</span></span>
        </div>
        <div class="info-row-item">
          <span class="desc">出生日期：</span>
          <span class="valbg"><span class="val">{{ baseInfo.csrq || '' }}</span></span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-item">
          <span class="desc">罪名：</span>
          <span class="valbg"><span class="val">{{ baseInfo.zm || '' }}</span></span>
        </div>
        <div class="info-row-item">
          <span class="desc">原判刑期：</span>
          <span class="valbg"><span class="val">{{ baseInfo.ypxq || '' }}</span></span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-long-item">
          <span class="desc">家庭住址：</span>
          <span class="valbg long-valbg"><span class="val">{{ baseInfo.jtzz || '' }}</span></span>
        </div>
      </div>
      <div class="info-row">
         <div class="info-row-item">
          <span class="desc">分管等级：</span>
          <span class="valbg"><span class="val">{{ baseInfo.fgdj || '' }}</span></span>
        </div>
       <div class="info-row-item">
          <span class="desc">捕前职业：</span>
          <span class="valbg"><span class="val">{{ baseInfo.bqzy || '' }}</span></span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-item">
          <span class="desc">入监时间：</span>
          <span class="valbg"><span class="val">{{ baseInfo.rjrq || '' }}</span></span>
        </div>
         <div class="info-row-item">
          <span class="desc">在押标志：</span>
          <span class="valbg"><span class="val">{{ baseInfo.zfzt || '' }}</span></span>
        </div>
      </div>
    </div>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
export default {
  name: '',
  components: {
    TitlePanel,
  },
  data() {
    return {
      baseInfo: ''
    };
  },
  created() {
    this.fetchBaseInfo();
  },
  methods: {
    async fetchBaseInfo() {
      // this.$api.staticEvaluation.queryBaseInfo(this.$route.query).then((res) => {
      //   this.baseInfo = res.data || {};
      // });
      let { errcode, data } = await this.$api.assessment.getEvalCriminalInfo({ zfbh: this.$route.query.zfbh });
      if (errcode === 0) {
        this.baseInfo = data['fxpg_pgzx_zfjbxx_data'][0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.sub-panel{
  padding-left: 5%;
  /deep/ .c-titlePanel-header__title {
    width: 120px;
    height: 26px;
    color: $--color-white;
    font-size: 20px;
    line-height: 26px;
  }
  .info{
    width: 100%;
    min-width: 800px;

    &-row{
      height: 55px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      min-width: 700px;

      &-item{
        width: 50%;
      }
      &-long-item{
        width: 100%;
      }
    }
  }
  .info-table{
    width: 90%;

    td{
      height: 55px;
      line-height: 40px;
    }
    .valtd{
      width: 199px;
    }
  }

  .desc{
    display: inline-block;
    width: 100px;
    padding-top: 5px;
    font-size:16px;
    line-height:30px;
    color:$--color-text-regular;
    text-align:right;
    margin-right: 20px;
  }
  .valbg{
    display: inline-block;
    width:199px;
    height:30px;
    color: #FFF;
    background:rgba(110,121,153,0.15);
    border-radius:$--border-radius-base;

    .val{
      display: inline-block;
      margin-left: 10px;
      height: 41px;
      font-size:16px;
      line-height:26px;
      color:$--color-white;
      vertical-align: middle;
    }
  }
  .long-valbg{
    width: calc(100% - 430px);
    min-width: 650px;
  }
}
</style>
