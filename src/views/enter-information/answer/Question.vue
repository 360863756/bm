<template>
  <div class="question">
    <el-scrollbar class="app-menu__scrollbar menu-width" wrap-class="app-menu__wrap">
    <div class="question-title">
      <i class="horn-icon" @click="play([topic.title_speech_url, topic.title_tibetan_speech_url])"></i>
      <span>{{ curNum }}</span>
      <div class="lang">
        <p>{{ title }}</p>
        <p>{{ topic.title_tibetan }}</p>
      </div>
    </div>
    </el-scrollbar>
    <div class="question-option__fill" v-if="this.topic.topic_type==='填空'">
      <el-input type="textarea" :rows="4" @change="handleChange($event, 'tiankong')" v-model="inputAnswer" placeholder="请输入答案"></el-input>
    </div>
    <div class="question-option" v-if="this.topic.topic_type==='单选' || this.topic.topic_type==='多选'">
      <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
        <el-checkbox-group v-model="checkList" @change="handleChange($event, 'xuanze')">
          <div class="question-option__item" v-for="(option, index) in allAnswer" :key="'option_' + index">
            <i class="horn-icon answer-horn" @click="play([option.answer_speech_url, option.answer_tibetan_speech_url])"></i>
            <el-checkbox :label="option.answer">
              <span class="zh">{{ option.answer }}</span>
              <span>{{ option.answer_tibetan }}</span>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    topic: Object,
    answerChange: Function,
    topicAnswer: Object,
    index: Number
  },
  data() {
    return {
      inputAnswer: '',
      checkList: [],
      audio: {},
      oldAnswer: [],
      testMusic1: 'http://www.w3school.com.cn/i/horse.ogg',
      testMusic2: 'http://m10.music.126.net/20200525180951/5b047077072d203598a3dd80987cf1c4/ymusic/2332/43e0/546c/19e9d443265f17b270eaebe9868e6dfd.mp3'
    };
  },
  created() {
    this.audio = new Audio();
  },
  computed: {
    selectedAnswer: function() {
      const answerArr = this.topicAnswer.answer;
      if (answerArr && answerArr.length > 0) {
        return answerArr.map(answerObj => answerObj.answer);
      }
      return [];
    },
    curNum: function() {
      if (this.index) {
        return this.index + '、';
      }
      return '';
    },
    title: function() {
      if (this.topic && this.topic.title) {
        return this.topic.title + (this.topic.topic_type ? `(${this.topic.topic_type})` : '');
      }
      return '';
    },
    allAnswer: function() {
      let answer = this.topic.answer;
      if (answer && answer.length > 1) {
        for (let i = answer.length - 1; i >= 0; i--) {
          let end = true;
          for (let j = 0; j < i; j++) {
            if (answer[j].answer_number > answer[j + 1].answer_number) {
              let t = answer[j];
              answer[j] = answer[j + 1];
              answer[j + 1] = t;
              end = false;
            }
          }
          if (end) {
            break;
          }
        }
      }
      return answer;
    }
  },
  watch: {
    topicAnswer(val) {
      if (val.answer instanceof Object) {
        this.audio.src = '';
        this.checkList = this.selectedAnswer;
      } else {
        this.inputAnswer = val.answer;
      }
    }
  },
  methods: {
    play(urls = []) {
      if (urls.length < 1) return;
      let count = 1;
      this.audio.src = urls[0];
      this.audio.play();
      this.audio.addEventListener('ended', () => {
        if (count < urls.length) {
          this.audio.src = urls[count++];
          this.audio.play();
        }
      }, false);
    },
    handleChange(e, type) {
      // 单选处理
      if (type === 'xuanze') {
        if (this.topic.topic_type === '单选') {
          if (e.length > 0) {
            this.checkList = [e[e.length - 1]];
          } else {
            this.checkList = this.oldAnswer;
          }
        }
        this.oldAnswer = this.checkList;
        this.answerChange(this.checkList.map(item => this.topic.answer.find(opt => opt.answer === item)), type);
      }
      if (type === 'tiankong') {
        this.answerChange(this.inputAnswer, type);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
/deep/ .app-menu__scrollbar {
  width: 100%;
  overflow: hidden;
  height: 220px;
  border: transparent;
  &.menu-width{
    height: 150px;
  }
  .app-menu__wrap {
    overflow-x: hidden;
    border: transparent;
  }
  .el-checkbox-group{
    .el-checkbox{
      &__label{
        font-size: 1.3vw;
        color: $--color-white;
        line-height: 35px;
        padding-left: 16px;
      }
      &__input{
        margin-top: 4px;
        vertical-align: top;
      }
      &__input.is-focus{
        .el-checkbox__inner{
          border-color: $--color-white;
        }
      }
      &.is-checked{
        .el-checkbox__label{
          color: $--answer-select-color;
        }
        .el-checkbox__inner{
          border-color: $--answer-select-color;
          position: relative;
          &::after{
            position: absolute;
            content: '\2022';
            transform: none;
            transition: none;
            width: 16px;
            height: 16px;
            font-size: 60px;
            color: $--answer-select-color;
            top: -22px;
            left: -1.5px;
          }
        }
      }
      &__inner{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: $--border-radius-small $--border-style-base $--color-white;
        background: transparent;
        &::after{
          border: transparent;
        }
      }
    }
  }
}
.question{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-title{
    align-self: flex-start;
    text-indent: 1em;
    font-size: 1.6vw;
    line-height: 30px;
    position: relative;
    span{
      vertical-align: top;
    }
    .lang{
      max-width: 1200px;
      display: inline-block;
      margin-left: -30px;
      p{
        word-break: break-word;
      }
    }
  }
  &-option{
    margin-top: 70px;
    &__item{
      max-width: 900px;
      margin-bottom: 26px;
      white-space: nowrap;
      .zh{
        margin-right: 20px;
      }
    }
    &__fill{
      width: 80%;
      height: 60%;
      /deep/ .el-textarea{
        height: 100%;
        .el-textarea__inner{
          height: 100%;
          background: transparent;
          color: $--color-text-primary;
          font-size: 20px;
        }
      }
    }
  }
}
.horn-icon{
  display: inline-block;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-image: url('~@/assets/images/horn.png');
  background-repeat: no-repeat;
  background-size: 34px;
  margin-right: 10px;
  vertical-align: top;
  flex: 0 0 34px;
  &.answer-horn{
    margin-left: 0px;
    margin-right: 38px;
    vertical-align: top;
  }
}
</style>
