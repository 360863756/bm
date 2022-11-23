<template>
  <div class="topic-body">
    <div class="topic-panel">
      <div class="topic-panel__desc">
        <div class="topic-panel__line"></div>
        <div class="topic-panel__title">选择题库</div>
      </div>
      <div class="topic-panel__subject">
        <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
          <div class="subject">
            <div
              class="subject-item"
              :class="getState(item)"
              v-for="(item, index) in scales"
              :key="'subject_' + index"
              @click="handleClickQuestion(item)"
            >
              {{ item.name }}
              <i class="el-icon-success checked-icon" v-if="item.enable && curQuestion === scaleList[item.id]"></i>
              <!-- <i class="el-icon-success checked-icon" :class="getState(item)+'icon'" v-if="getState(item) === 'disable'"></i> -->
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="topic-panel__footer">
        <el-button class="question-btn active" round>
          <span class="btn-text" @click="handleOk">确认</span>
        </el-button>
        <el-button class="question-btn" round>
          <span class="btn-text" @click="$router.push({ path: '/enter-information/login' })">返回</span>
        </el-button>
      </div>
    </div>
    <el-dialog
          title="民警登录"
          :visible.sync="dialogVisible"
          width="40%"
          top="200px"
          :close-on-click-modal="false"
          :close-on-press-escape='false'
          :show-close='false'>
           <el-form  :model="ruleForm" ref="ruleForm" :rules="rules"  class="ruleForm">
            <el-form-item  label="民警编号" prop="jc">
                          <el-input @keyup.enter.native="submitForm('ruleForm')" autofocus clearable v-model="ruleForm.jc" placeholder="请输入">
                          </el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">进入</el-button>
          </el-form>
          </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'enterInfoLibrary',
  components: {
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === this.userInfo.userName) {
        callback();
      } else {
        callback(new Error('请输入正确编号'));
      }
    };
    return {
      curQuestion: {},
      list: [],
      dialogVisible: false,
      flag: true,
      ruleForm: {
        jc: ''
      },
      rules: {
        jc: [{ required: true, message: '请输入编号', trigger: 'blur' }, {
          validator: validatePass, trigger: 'blur'
        }],
      },
    };
  },
  created() {
    this.fetchScales(this.$route.query);
  },
  updated() {
    if (this.flag && !this.noList.length) {
      this.flag = false;
      this.$message.success('全部测评做完了');
      this.dialogVisible = true;
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
    scaleList() {
      return this.list.filter(item => {
        return item.type === 'zf';
      });
    },
    jcList() {
      return this.list.filter(item => {
        return item.type === 'jc';
      });
    },
    noList() {
      return this.scales.filter(item => {
        return item.enable === true;
      });
    },
    scales: function() {
      if (this.scaleList && this.scaleList.length > 0) {
        return this.scaleList.map((item, index) => {
          index++;
          let name = '';
          if (index < 11) {
            name = this.getScaleName(index);
          } else if (index < 20) {
            name = '十' + this.getScaleName(index % 10);
          } else {
            name = this.getScaleName(index / 10 % 10) + '十' + this.getScaleName(index % 10);
          }
          return {
            id: index - 1,
            name: `第${name}套题目`,
            enable: Number(item.cpzt) === 0
          };
        });
      }
      return [];
    }
  },
  methods: {
    getScaleName(index) {
      const nums = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      return nums[index];
    },
    fetchScales(data) {
      if (data && data.zfbh) {
        this.$api.enterInformation.getCriminalScaleList({ zfbh: 'equals$' + data.zfbh }).then(res => {
          if (res.errcode === 0) {
            if (res.data && res.data.fxpg_xlcp_cp_cplb_data) {
              this.list = res.data.fxpg_xlcp_cp_cplb_data;
            }
          }
        });
      }
    },
    handleOk() {
      if (!this.curQuestion || !this.curQuestion.cplb) {
        this.$message.warning('请选择题目!');
        return;
      }
      const enableScale = this.scales.filter(s => s.enable);
      let filterObj = this.$route.meta.config.lb.find(item => {
        return item.name === this.curQuestion.cplb;
      });
      if (!filterObj) {
        this.$router.push({
          path: '/enter-information/attention',
          query: {
            cpid: this.curQuestion.id,
            zfbh: this.$route.query.zfbh,
            scaleId: this.curQuestion.cplb,
            final: this.jcList.length = 0 && enableScale.length <= 1
          }
        });
      }
      this.$router.push({
        path: filterObj.path,
        query: {
          cpid: this.curQuestion.cpjd,
          cplb: this.curQuestion.cplb,
          zfbh: this.$route.query.zfbh,
          id: this.curQuestion.id,
          final: enableScale.length <= 1
        }
      });
    },
    handleClickQuestion(question) {
      if (question.enable) {
        this.curQuestion = this.scaleList[question.id];
      }
    },
    getState(question) {
      let clas = [];
      if (!question.enable) {
        clas.push('disable');
      }
      if (this.curQuestion === this.scaleList[question.id]) {
        clas.push('checked');
      }
      return clas.join(' ');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            path: '/enter-information/show',
            query: {
              zfbh: this.$route.query.zfbh
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.topic-body{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 3vw;
  height: 100%;
  background-image: url('~@/assets/images/enter_info_bg2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topic-panel{
    margin: 0 auto;
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
      line-height: 47px;
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
        text-indent: 2em;
      }
    }
    &__subject{
      margin: 16px auto;
      background:rgba(255,255,255,0.15);
      .question-title{
        margin-top: 3.5vw;
        margin-bottom: 3vw;
        font-size: 24px;
        line-height: 30px;
      }
      .attention{
        height: 33.3vw;
      }
      .subject{
        height: 28.5vw;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-left: 3vw;
        padding-top: 5vw;
        &-item{
          width: 10vw;
          height: 10vw;
          line-height: 10vw;
          font-size: 1.6vw;
          text-align: center;
          background:rgba(120,92,255,0.32);
          border:3px solid $--answer-select-color;
          border-radius: 10px;
          margin: 0px 50px 50px 20px;
          cursor: pointer;
          &.disable{
            cursor: default;
            color: rgba(255,255,255,0.32);
            position: relative;
            .checked-icon{
              font-size: 35px;
              position: absolute;
              right: 7px;
              bottom: 7px;
            }
          }
          &.checked{
            background: $--answer-select-color;
            position: relative;
            .checked-icon{
              font-size: 35px;
              position: absolute;
              right: 7px;
              bottom: 7px;
            }
          }
          .disableicon{
            color: green;
          }
        }
      }
    }
    &__footer{
      margin: 91px auto 0;
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
        }
        &.active{
          background:linear-gradient(180deg,rgba(120,92,255,1) 0%,rgba(130,95,244,1) 34%,rgba(36,41,165,1) 100%);
          border: transparent;
        }
        &:nth-child(2){
          margin-left: 53px;
        }
      }
    }
  }
}
/deep/ .app-menu__scrollbar {
  overflow: hidden;
  height: 100%;
  border: transparent;
  .app-menu__wrap {
    overflow-x: hidden;
    border: transparent;
  }
}
/deep/ .el-dialog{
  background-color: rgba(24,33,61, 0.99);
  .el-dialog__header{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
/deep/ .el-form-item__label::before{
      content: '' !important;
    }
</style>
