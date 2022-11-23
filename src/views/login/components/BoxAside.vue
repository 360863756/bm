<template>
  <div class="box-aside">
    <div class="header">
      <img class="logo" src="@/assets/images/login-logo.png">
      <h2 class="title">
        <span>{{ APP_TITLE }}</span>
        <small>{{ APP_SUB_TITLE }}</small>
      </h2>
    </div>
    <div class="body"></div>
  </div>
</template>

<script>
import {
  APP_TITLE,
  APP_SUB_TITLE,
  APP_LOGO,
} from '@/constant/app';
export default {
  name: 'BoxAside',
  data() {
    return {
      APP_TITLE,
      APP_SUB_TITLE,
      APP_LOGO,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.box-aside {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 70px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  .logo {
    height: 100%;
  }
  .title {
    margin-left: 12px;
    align-self: center;
    color: $--color-primary;
    font-size: 24px;
    small {
      margin-top: 12px;
      display: block;
      font-size: 12px;
    }
  }
}
.body {
  flex: 1;
}
</style>
