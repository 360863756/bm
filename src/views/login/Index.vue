<template>
<div class="page--full login">
  <div class="box">
    <div class="box-title">
      <h2>{{ APP_TITLE }}</h2>
    </div>
    <div class="box-form">
      <account-login />
    </div>
  </div>
</div>
</template>

<script>
// import BoxAside from './components/BoxAside.vue';
// import AccountLogin from '@/view/login/components/AccountLogin.vue';
// import DomainNameCheck from '@/view/login/components/DomainNameCheck.vue';
import AccountLogin from './components/AccountLogin.vue';
import {
  getToken,
  removeToken,
} from '@/utils/auth';
import {
  APP_TITLE,
} from '@/constant/app';

export default {
  name: 'BackLogin',
  components: {
    // BoxAside,
    AccountLogin,
  },
  data() {
    return {
      APP_TITLE,
      flag: false,
      domainName: '' // 登录传域名
    };
  },
  computed: {},
  watch: {},
  created() {
    if (getToken()) {
      // 移出Token
      removeToken();
      location.reload();
    }
  },
  mounted() {},
  methods: {
    handleCheck(flagVal, domainVal) {
      this.flag = flagVal;
      this.domainName = domainVal;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0E2949;
  background-image: url('../../assets/images/login-background.jpg');
  background-size: 100% 100%;
  background-position: center;
}
.box {
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: $--login-box-background-color;
  border-radius: $--login-box-border-radius;
  box-shadow:0px 17px 33px 0px rgba(64,169,255,0.33);
}
.box-title {
  color: #3f3f3f;
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
}
.box-form {
  min-width: 260px;
}
</style>
