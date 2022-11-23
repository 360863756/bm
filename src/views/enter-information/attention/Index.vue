<template>
  <div class="topic-body">
    <div class="topic-panel">
      <div class="topic-panel__desc">
        <div class="topic-panel__line"></div>
        <div class="topic-panel__title">注意事项</div>
      </div>
      <div class="topic-panel__subject">
        <div class="attention">
          <div class="attention-item">
            <i class="horn-icon" @click="play(attention.scale_speech_url)"></i>
            <div class="chs-desc">
              {{ attention.scale_desc }}
            </div>
          </div>
          <div class="attention-item" v-if="attention.scale_tibetan_desc">
            <i class="horn-icon" @click="play(attention.scale_tibetan_speech_url)"></i>
            <div class="chs-desc">
              {{ attention.scale_tibetan_desc }}
            </div>
          </div>
        </div>
      </div>
      <div class="topic-panel__footer">
        <el-button class="question-btn active" round>
          <span class="btn-text" @click="handleOk">开始答题</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'enterInfoAttention',
  components: {
  },
  data() {
    return {
      attention: {},
      audio: {}
    };
  },
  created() {
    this.audio = new Audio();
    this.fetchScaleInfo(this.$route.query);
  },
  computed: {
  },
  methods: {
    fetchScaleInfo(data) {
      if (data && data.scaleId) {
        this.$api.enterInformation.getScaleInfo({ scale_id: 'equals$' + data.scaleId }).then(res => {
          if (res.errcode === 0) {
            if (res.data && res.data.fxpg_xlcp_scaleInfo_data && res.data.fxpg_xlcp_scaleInfo_data.length > 0) {
              this.attention = res.data.fxpg_xlcp_scaleInfo_data[0];
            }
          }
        });
      }
    },
    handleOk() {
      this.$router.push({
        path: '/enter-information/answer',
        query: {
          cpid: this.$route.query.cpid,
          zfbh: this.$route.query.zfbh,
          scale: this.$route.query.scaleId,
          final: this.$route.query.final
        }
      });
    },
    play(url) {
      this.audio.src = url;
      this.audio.play();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.topic-body{
  width: 100%;
  padding-top: 3vw;
  overflow-y: auto;
  height: 100%;
  background-image: url('~@/assets/images/enter_info_bg2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topic-panel{
    margin: 0 auto;
    height: 100%;
    padding-top: 1vw;
    width: 75%;
    color: $--color-white;
    position: relative;
    &__desc{
      width: 100%;
      margin-bottom: 31px;
    }
    &__line{
      width: 100%;
      height: 4px;
      background-color: rgba(255,255,255,0.12);
    }
    &__title{
      width: 200px;
      text-align: center;
      position: absolute;
      top: -10px;
      left: calc(50% - 100px);
      background-color: rgba(0, 16, 83, 1);
      font-size: 40px;
    }
    .desc-box{
      width: 100%;
      display: flex;
      justify-content: center;
      &__content{
        margin-top: 20px;
        width: 85%;
        font-size: 18px;
        font-family: Source Han Sans CN;
        line-height: 36px;
        text-indent: 2em;
      }
    }
    &__subject{
      // width: 88%;
      margin: 16px auto;
      background: rgba(255,255,255,0.15);
      .question-title{
        margin-top: 69px;
        margin-bottom: 49px;
        font-size: 1.25vw;
        line-height: 1.56vw;
      }
      .attention{
        height: 33.3vw;
        padding: 3vw 3.5vw 0px 3.5vw;
        &-item{
          display: flex;
          justify-content: flex-start;
          .chs-desc{
            font-size: 26px;
            line-height: 50px;
            margin-bottom: 65px;
          }
        }
      }
    }
    &__footer{
      // width: 88%;
      margin: 91px auto 0px;
      display: flex;
      justify-content: center;
      align-items: baseline;
      .question-btn{
        width: 212px;
        height: 75px;
        border: 1px solid $--answer-count-color;
        border-radius: 100px;
        font-size: 24px;
        line-height: 41px;
        text-align: center;
        background-color: transparent;
        letter-spacing: 10px;
        color: $--color-white;
        padding: 0;
        span{
          vertical-align: middle;
        }
        .btn-text{
          display: inline-block;
          margin-left: 15px;
        }
        &.active{
          background: linear-gradient(180deg,rgba(120,92,255,1) 0%,rgba(130,95,244,1) 34%,rgba(36,41,165,1) 100%);
          border: transparent;
        }
        &:nth-child(2){
          margin-left: 53px;
        }
      }
    }
  }
}
.horn-icon{
  display: inline-block;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  margin-top: 10px;
  margin-right: 20px;
  vertical-align: middle;
  cursor: pointer;
  background-image: url('~@/assets/images/horn.png');
  background-repeat: no-repeat;
  background-size: 34px;
}
</style>
