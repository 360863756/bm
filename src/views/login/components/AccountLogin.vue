<template>
  <el-form
    size="medium"
    :model="loginInfo"
    :rules="loginRules"
    ref="loginForm"
    @keyup.native.enter="login"
    class="form"
  >
    <el-form-item prop="account">
      <el-input
        placeholder="用户名"
        prefix-icon="el-icon-user"
        v-model="loginInfo.account"
        size="medium"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        prefix-icon="el-icon-lock"
        placeholder="请输入密码"
        v-model="loginInfo.password"
        size="medium"
      ></el-input>
    </el-form-item>
    <el-form-item prop="validateCode" v-if="true">
      <div class="validate">
        <el-input
          class="validate-code"
          placeholder="验证码"
          v-model="loginInfo.validateCode"
          size="medium"
        ></el-input>
        <img
          class="validate-image"
          alt="验证码"
          title="点击切换验证码"
          :src="`${$BASE_API}/getPicture.jpeg?${timeStamp}`"
          @click="timeStamp = Date.now()"
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
      class="login-button"
      type="primary"
      @click="login"
      :loading="loading"
      >登录</el-button>
    </el-form-item>
    <!-- <el-form-item>
      <div class="full-width d-flex justify-content-between">
        <el-checkbox class="checkbox" v-model="remmemberPassword" name="rememberPassword">记住密码</el-checkbox>
        <el-button class="button" type="text">忘记密码？</el-button>
      </div>
    </el-form-item>-->
  </el-form>
</template>

<script>
// import { setToken, encryptPassword } from '@/utils/auth';
import { setToken } from '@/utils/auth';
import CryptoJS from 'crypto-js';
export default {
  name: 'AccountLogin',
  data() {
    return {
      flag: false,
      timeStamp: Date.now(),
      // tipsTitle: '',
      loginInfo: {
        account: '',
        password: '',
        validateCode: '',
      },
      loginConfig: null,
      loginRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'change' }
          // { min: 3, max: 15, message: '用户名长度在 3 到 15 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
          // { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'change' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码为 4 个字符', trigger: 'blur' },
          { validator: this.validateCodeValidator, trigger: 'blur' }
        ]
      },
      remmemberPassword: false,
      loading: false
    };
  },
  created() {
    this.getLoginConfig();
  },
  methods: {
    // 获取用户配置信息
    async getLoginConfig() {
      try {
        const { data, errcode } = await this.$api.app.fetchLoginConfig();
        if (errcode === 0) {
          this.loginConfig = data;
        }
      } catch (e) {
        console.warn(e);
      }
    },
    async validateCodeValidator(rule, value, cb) {
      try {
        const params = {
          checkcode: value,
          userId: this.loginInfo.account
        };
        if (this.flag) {
          return cb();
        }
        const { data, errcode } = await this.$api.app.checkCode(params) || {};
        if (errcode === 0 && data.comparecode) {
          if (data.comparecode === true) {
            this.flag = true;
          }
          return cb();
        }
        this.timeStamp = Date.now();
        cb(new Error('验证码错误'));
      } catch (e) {
        console.error(e);
      }
    },
    // 加密方法
    aesEncrypt(message) {
      var encrypted = CryptoJS.AES.encrypt(
        message,
        CryptoJS.enc.Utf8.parse('d9e6b141f8c26d74'),
        {
          iv: CryptoJS.enc.Utf8.parse(this.loginConfig.aesIvKey),
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC
        }
      );
      return encrypted;
    },
    async login() {
      try {
        this.$refs.loginForm.validate(async valid => {
          if (!valid) {
            this.timeStamp = Date.now();
            return;
          }
          let params =
            'userId=' +
            encodeURIComponent(this.aesEncrypt(this.loginInfo.account)) +
            '&encodepwd=' +
            encodeURIComponent(this.aesEncrypt(this.loginInfo.password));
          this.loading = true;
          const { errcode, data } = await this.$api.app.login(params);
          if (errcode === 0) {
            // const { token, redirect: loginRedirect } = data;
            const { token } = data;
            setToken(token);
            const { redirect: queryRedirect } = this.$route.query || {};
            const redirect = queryRedirect || '/';
            this.$router.push({
              path: redirect
            });
          } else {
            this.timeStamp = Date.now();
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.form {
  /deep/ {
    .el-form-item:last-of-type {
      margin-bottom: 0;
    }
    .el-form-item__label {
      font-size: $--login-box-font-size;
      line-height: 2;
    }
  }
}
.input {
  /deep/ {
    .el-input__inner {
      height: $--login-box-input-height;
      line-height: $--login-box-input-height;
      font-size: $--login-box-font-size;
    }
  }
}
.checkbox {
  font-size: $--login-box-font-size;
  /deep/ .el-checkbox__label {
    font-size: $--login-box-font-size;
  }
}
.login-button {
  width: 100%;
  height: $--login-box-input-height;
  font-size: $--login-box-font-size;
}
.button {
  font-size: $--login-box-font-size;
}
.validate {
  display: flex;
}
</style>
