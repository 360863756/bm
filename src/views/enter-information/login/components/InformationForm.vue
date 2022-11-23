<template>
  <el-form
    size="medium"
    :model="loginInfo"
    :rules="loginRules"
    ref="loginForm"
    @keyup.native.enter="login"
    class="form"
  >
    <el-form-item  prop="zfbh">
      <el-select
        filterable
        clearable
        @change="Change('zfbh')"
        placeholder="请输入编号"
        prefix-icon="el-icon-user"
        v-model="loginInfo.zfbh"
        size="medium"
      ><template slot="prefix">编号
      </template>
      <el-option
      v-for="item in List"
      :key="item.zfbh"
      :label="item.zfbh"
      :value="item.zfbh"
      >
    </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="zfxm">
      <el-select
        filterable
        clearable
        @change="Change('zfxm')"
        type="zfxm"
        prefix-icon="el-icon-lock"
        placeholder="请输入姓名"
        v-model="loginInfo.zfxm"
        size="medium"
      ><template slot="prefix">姓名
      </template><el-option
      v-for="item in List"
      :key="item.zfxm"
      :label="item.zfxm"
      :value="item.zfxm"
      >
    </el-option></el-select>
    </el-form-item>
    <el-form-item prop="status">
      <el-radio-group v-model="loginInfo.status">
          <el-radio :label="1" >汉语</el-radio>
          <el-radio :label="2">་འགྲུལ་གྱི་སྒྲིག་</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button
      class="login-button"
      type="primary"
      @click="login"
      :loading="loading"
      >开始测评<i class="el-icon-right"></i></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'zfbhLogin',
  data() {
    return {
      flag: false,
      List: [],
      loginInfo: {
        zfbh: '',
        zfxm: '',
        status: 1,
      },
      loginRules: {
        zfbh: [
          { required: true, message: '请输入编号', trigger: 'change' }
        ],
        zfxm: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ]
      },
      loading: false,
      curZF: {}
    };
  },
  async created() {
    const { data } = await this.$api.enterInformation.getEnterInformationCriminalCodes({ jh: this.userInfo.userName });
    this.List = data['dataList'];
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    })
  },
  methods: {
    async login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return false;
        }
        this.$router.push({
          path: '/enter-information/library',
          query: {
            zfbh: this.curZF.zfbh
          }
        });
      });
    },
    Change(string) {
      switch (string) {
        case 'zfbh':
          this.curZF = this.List.find((item) => item.zfbh === this.loginInfo.zfbh);
          this.loginInfo.zfxm = this.curZF.zfxm;
          break;
        case 'zfxm':
          this.curZF = this.List.find((item) => item.zfxm === this.loginInfo.zfxm);
          this.loginInfo.zfbh = this.curZF.zfbh;
          break;
        default:
          this.$message.warning('没有匹配对应的编号或者姓名');
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.form {
  padding: 70px 95px;
  /deep/ {
    .el-form-item {
      margin-bottom: 31px;
      &:nth-child(3) {
        .el-form-item__content > div {
          height: 25px;
          display: flex;
          justify-content: space-between;
          padding: 0 21px;
          .el-radio{
            .el-radio__label{
              font-size:18px;
              font-weight:400;
              height: 25px;
              line-height: 25px;
              color:$--color-text-primary;
            }
              .el-radio__inner {
            border-color: $--color-white;
            background-color: transparent;

            &::after {
              content: '\2022';
              border: none;
              display: flex;
              justify-content: center;
              align-items: center;
              color: $--color-white;
              font-size: 25px;
              left: 6px;
              top: 4px;
            }
          }
          }
        }
      }
    }
    .el-form-item__content > div {
      width: 100%;
      height:57px;
      .el-input__prefix {
        left: 0;
        width:84px;
        height:57px;
        line-height: 57px;
        background:$--enterInformation-prefix;
        border-radius:100px 0px 0px 100px;
      }
      .el-input__suffix{
        right: 0;
        width:68px;
        height:57px;
        line-height: 57px;
        background:$--enterInformation-suffix;
        border-radius: 0px 100px 100px 0px;
      }
      .el-input__icon{
        font-size: 20px
      }
    }
    .el-input--medium .el-input__inner{
        display: inline-block;
        width: calc(100% - 152px) !important;
        background:$--enterInformation-suffix;
        border-radius: 0px;
        height:57px;
        line-height: 57px;
        margin-left: 84px;
        font-size:18px;
        font-weight:400;
        color:$--color-text-primary;
    }
    .el-form-item:last-of-type {
      margin-bottom: 0;
    }
    .login-button{
        width: 100%;
        height:61px;
        background:linear-gradient(180deg,rgba(120,92,255,1) 0%,rgba(130,95,244,1) 34%,rgba(36,41,165,1) 100%);
        border-radius:100px;
        border:none;
        span{
          font-size:25px;
          font-weight:bold;
          line-height:43px;
          letter-spacing: 18px;
          color:$--color-text-primary;
        }
    }
  }
}
</style>
