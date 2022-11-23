<template>
  <div class="topic-body">
    <div class="topic-panel">
      <div class="topic-panel__desc">
        <div class="topic-panel__line"></div>
        <i class="topic-panel__bulb"></i>
      </div>
      <div class="topic-panel__question">
        <question ref="question" :index="count" :topic="curTopic" :topicAnswer="curTopicAnswer" :answerChange="answerChange"></question>
      </div>
      <el-progress class="topic-panel__progress" :color="'rgba(171,145,255,0.51)'" :show-text="false" :stroke-width="11" :percentage="percent"></el-progress>
      <div class="topic-panel__footer">
        <el-button class="question-btn" :class="count > 1 ? 'active':''" :disabled="count === 1" round>
          <i class="btn-icon pre-icon pre-icon-active"></i>
          <span class="btn-text" @click="preQuestion">上一题</span>
        </el-button>
        <div class="question-percent"><span class="count">{{ count }}</span> / {{ total }}</div>
        <el-button class="question-btn active" round>
          <span class="btn-text" @click="nextQuestion">{{ count === total ? '提交' : '下一题'}}</span>
          <i class="btn-icon next-icon next-icon-active"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Question from './Question';
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'enterInfoAnswer',
  components: {
    Question
  },
  data() {
    return {
      count: 1,
      total: 100,
      scaleDesc: '',
      audio: {},
      scaleSpeechUrl: '',
      topicAnswer: [],
      commitAnswer: [],
      tempTopicAnswer: {},
      topic: [],
      tryNext: true
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
    percent: function() {
      return this.count / this.total * 100;
    },
    curTopic: function() {
      return this.topic[this.count - 1] || {};
    },
    curTopicAnswer: function() {
      return this.topicAnswer[this.count - 1] || {};
    }
  },
  created() {
    this.audio = new Audio();
    this.fetchScaleInfo({ main_scale: this.$route.query.scale });
    this.fetchQuestion({ scale: this.$route.query.scale, titleNumber: this.count + '' });
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    fetchScaleInfo(data) {
      this.$api.enterInformation.getScaleTitleNum({ main_scale: 'equals$' + data.main_scale }).then(res => {
        if (res.errcode === 0) {
          if (res.data && res.data.fxpg_xlcp_titleNumber_data && res.data.fxpg_xlcp_titleNumber_data.length > 0) {
            const { titlenum } = res.data.fxpg_xlcp_titleNumber_data[0];
            this.total = titlenum;
          }
        }
        // this.total = 2;
      });
    },
    fetchQuestion(data) {
      return this.$api.enterInformation.getQuestion(data).then(res => {
        this.$set(this.topic, data.titleNumber - 1, res.data.dataList[0]);
      });
    },
    saveScale(data) {
      return this.$api.enterInformation.saveScale(data).then(res => {
        return res.errcode;
      });
    },
    answerChange(answerData, type) {
      let topic = { ...this.curTopic };
      topic.answer = answerData;
      this.tempTopicAnswer = topic;
      this.topicAnswer[this.count - 1] = this.tempTopicAnswer;
      if (type === 'xuanze') {
        this.commitAnswer[this.count - 1] = this.getAnswer(this.tempTopicAnswer);
      }
      if (type === 'tiankong') {
        this.commitAnswer[this.count - 1] = {
          main_scale: this.tempTopicAnswer.main_scale,
          title_number: this.tempTopicAnswer.title_number + '',
          topic_type: this.tempTopicAnswer.topic_type,
          answer_number: answerData
        };
      }
    },
    getAnswer(topicAnswer) {
      let res = {
        main_scale: topicAnswer.main_scale,
        title_number: topicAnswer.title_number + '',
        topic_type: topicAnswer.topic_type,
      };
      res.answer_number = topicAnswer.answer.map(a => a.answer_number).join(',');
      return res;
    },
    async nextQuestion() {
      // 是否需要请求下一道题
      this.$refs.question._data.inputAnswer = '';
      if (this.count >= this.topic.length && !this.tryNext) return;
      if (this.count <= this.total) {
        // 获取当前题目答案
        this.tempTopicAnswer = this.topicAnswer[this.count - 1];
        if (!(this.tempTopicAnswer && this.tempTopicAnswer.answer && this.tempTopicAnswer.answer.length > 0)) {
          this.$message.warning('请作答');
          return;
        }
        if (this.count < this.total) {
          if (this.count >= this.topic.length) {
            try {
              this.tryNext = false;
              await this.fetchQuestion({ scale: this.$route.query.scale, titleNumber: (this.count + 1) + '' });
              this.tryNext = true;
            } catch (exception) {
              this.tryNext = true;
              this.$message.error('题目获取失败!');
            }
          }
          this.count++;
        } else {
          // 提交
          const data = {
            cpid: this.$route.query.cpid,
            jh: this.userInfo.userName,
            zfbh: this.$route.query.zfbh,
            answer: this.commitAnswer
          };
          try {
            this.tryNext = false;
            const resState = await this.saveScale(data);
            this.tryNext = true;
            if (resState === 0) {
              this.$router.push({
                path: '/enter-information/complete',
                query: {
                  cpid: this.$route.query.cpid,
                  zfbh: this.$route.query.zfbh,
                  final: this.$route.query.final
                }
              });
            } else {
              this.$message.error('答案提交失败!');
            }
          } catch (exception) {
            this.tryNext = true;
            this.$message.error('答案提交失败!');
          }
        }
      }
    },
    preQuestion() {
      if (this.count > 1) {
        this.count--;
        this.tempTopicAnswer = this.topicAnswer[this.count - 1];
      }
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
  overflow-y: auto;
  padding-top: 3vw;
  height: 100%;
  background-image: url('~@/assets/images/enter_info_bg2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topic-panel{
    margin: 0 auto;
    padding-top: 1vw;
    width: 78%;
    color: $--color-white;
    position: relative;
    &__desc{
      width: 100%;
      margin-bottom: 31px;
    }
    &__line{
      width: 100%;
      height: 4px;
      // border: 1px dashed;
      background-color: rgba(255,255,255,0.12);
    }
    &__bulb{
      display: inline-block;
      width: 60px;
      height: 47px;
      position: absolute;
      top: -30px;
      left: calc(50% - 16px);
      background-color: rgba(0, 16, 83, 1);
      background-image: url('~@/assets/images/enter-info-topic.png');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 45px 47px;
    }
    .desc-box{
      width: 100%;
      display: flex;
      justify-content: center;
      &__content{
        margin-top: 20px;
        width: 85%;
        font-size: 18px;
        font-family:Source Han Sans CN;
        line-height: 36px;
        text-indent:2em;
      }
    }
    &__question{
      height: 33.3vw;
      margin: 16px auto;
      background:rgba(255,255,255,0.15);
      display: flex;
      justify-content: center;
      padding: 3.5vw 2.5vw 4vw 2.5vw;
      .question-title{
        margin-top: 69px;
        margin-bottom: 49px;
        font-size: 24px;
        line-height: 30px;
      }
    }
    &__progress{
      margin: 3vw auto;
      /deep/ .el-progress-bar{
        &__outer{
          background-color: rgba(255,255,255,0.16);
        }
      }
    }
    &__footer{
      margin: 1vw auto 0;
      display: flex;
      justify-content: space-between;
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
        letter-spacing: 5px;
        color: $--color-white;
        padding: 0;
        span{
          vertical-align: middle;
        }
        .btn-text{
          display: inline-block;
          padding-bottom: 15px;
        }
        .btn-icon{
          display: inline-block;
          width: 20px;
          height: 31px;
          margin-top: 15px;
        }
        .pre-icon{
          margin-right: 10px;
          background-image: url('~@/assets/images/enter-info-pre-icon.png');
        }
        .next-icon{
          margin-left: 10px;
          background-image: url('~@/assets/images/enter-info-pre-icon.png');
          transform: rotateY(180deg);
        }
      }
      .question-btn.active{
        background:linear-gradient(180deg,rgba(120,92,255,1) 0%,rgba(130,95,244,1) 34%,rgba(36,41,165,1) 100%);
        border: transparent;
        .pre-icon-active{
          margin-right: 10px;
          background-image: url('~@/assets/images/enter-info-next-icon.png');
          transform: rotateY(180deg);
          border: transparent;
        }
        .next-icon-active{
          margin-left: 10px;
          background-image: url('~@/assets/images/enter-info-next-icon.png');
          transform: none;
        }
      }
      .question-percent{
        font-size: 24px;
        line-height:36px;
        .count{
          color: $--answer-count-color;
        }
      }
    }
  }
}
.horn-icon{
  display: inline-block;
  width: 23px;
  height: 23px;
  vertical-align: middle;
  cursor: pointer;
  background-image: url('~@/assets/images/horn.png');
}
</style>
