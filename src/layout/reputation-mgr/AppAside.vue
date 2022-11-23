<template>
 <!-- <div> -->
  <div class="app-aside">
    <div class="app-aside__light-top"></div>
    <div class="app-aside__header">
      <!-- <img class="app-aside__logo" :src="APP_LOGO" :alt="APP_TITLE"> -->
      <h1 class="app-aside__title" v-if="!isCollapse">
        <span>{{ APP_TITLE }}</span>
      </h1>
    </div>
      <div class="app-header">
        <img src="../../assets/images/Avatar.png" alt="">
        <div><span class="app-header__text">{{this.$store.state.app.userInfo.userCnName}}</span></div>
      </div>
    <div class="app-aside__body">
      <app-menu></app-menu>
    </div>
  </div>
 <!-- </div> -->
</template>

<script>
import AppMenu from './AppMenu';
// import { createNamespacedHelpers, mapGetters } from 'vuex';
import { createNamespacedHelpers } from 'vuex';

const {
  mapState,
} = createNamespacedHelpers('app');
export default {
  name: 'MgrAppAside',
  components: {
    AppMenu,
  },
  data() {
    const {
      APP_TITLE,
      APP_SUB_TITLE,
      APP_LOGO,
    } = this.$const.app;
    return {
      APP_TITLE,
      APP_SUB_TITLE,
      APP_LOGO,
    };
  },
  computed: {
    ...mapState({
      isCollapse: 'isMenuCollapse',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.app-aside {
  display: flex;
  flex-direction: column;
  background-color: $--mgr-app-aside-background-color;
  color: $--color-primary;
  box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
  background:no-repeat linear-gradient(135deg,rgba(255,81,81,.8),rgba(0,0,0,0),rgba(0,0,0,0));
  background-size: 60% 30%;
  &__header {
    height: $--mgr-app-header-height;
    line-height: $--mgr-app-header-height;
    text-align: center;
    // border-bottom: 2px solid rgba($--color-white, 0.14);
  }
  &__light-top {
    width: 250px;
    height: 250px;
    position: fixed;
    top: 0;
    left: 0;
  }
  &__title {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1vw;
    padding-left: 20px;
    font-weight: bold;
  }
  &__body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: $--mgr-app-aside-background-color;
  }
  &__body::-webkit-scrollbar {
    display: none;
  }
}
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  &>div {
    margin-top: 22px;
  }
  &__text {
    color: $--color-text-regular;
  }
}
</style>
