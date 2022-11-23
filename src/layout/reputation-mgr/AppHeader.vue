<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__left">
        <img class="app-header__logo" :src="APP_LOGO" :alt="APP_TITLE">
        <h1 class="app-header__title">
          <span>{{ APP_TITLE }}</span>
        </h1>
      </div>
      <div class="app-header__right">
        <header-search class="header-search app-header__bar-item"></header-search>
        <notification class="app-header__bar-item"></notification>
        <profile class="app-header__bar-item"></profile>
      </div>
    </div>
  </header>
</template>

<script>
import {
  APP_TITLE,
  APP_SUB_TITLE,
  APP_LOGO,
} from '@/constant/app';
import HeaderSearch from '@/components/HeaderSearch/Index.vue';
import Notification from '@/components/Notification/Index.vue';
import Profile from '@/components/Profile/Index.vue';

export default {
  components: {
    HeaderSearch,
    Notification,
    Profile,
  },
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

.app-header {
  height: $--app-header-height;
  background-color: $--app-header-background-color;
  box-shadow:0px 1px 4px 0px rgba(0,0,0,0.1);
  &__inner {
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__center {
    flex: 1;
  }
  &__left {
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
  &__logo {
    height: 100%;
    & + .app-header__title {
      padding: 12px 0;
      margin-left: 12px;
    }
  }
  &__title {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: $--app-header-font-size-title;
    small {
      font-size: $--app-header-font-size-title*$--app-header-font-size-ratio-subtitle;
    }
  }
  &__right {
    display: inline-flex;
    align-items: center;
  }
  &__bar-item {
    margin-right: 24px;
  }
  .header-search {
    /deep/ {
      .el-input__inner {
        border: 1px solid $--border-color-base;
        color: $--color-text-primary;
        &::placeholder {
          color: rgba($--color-text-primary, 0.5);
        }
      }
    }
  }
}
</style>
