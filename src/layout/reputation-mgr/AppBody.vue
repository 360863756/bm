<template>
  <div class="app-body">
    <div class="app-body__header">
      <div class="app-body__header-left">
        <!-- <span
          :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="toggleMenu"
        ></span> -->
      </div>
      <div class="app-body__header-right">
        <!-- <global-search class="header-search app-header__bar-item"></global-search> -->
        <!-- <el-input
          v-model="searchKey"
          placeholder="请输入功能关键词"
          suffix-icon="el-icon-search"
          clearable
          @input="search"
        ></el-input>
        <notification class="app-header__notify"></notification> -->
        <message-push></message-push>
        <span class="app-header__name">{{this.$store.state.app.userInfo.userCnName}}</span>
        <profile class="app-header__bar-item"></profile>
      </div>
    </div>
    <div class="app-body__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Profile from '@/components/Profile/Index.vue';
import MessagePush from '@/components/MessagePush/Index.vue';
// import Notification from '@/components/Notification/Index.vue';
// import GlobalSearch from '@/components/GlobalSearch/Index.vue';

const {
  mapState,
  mapMutations,
} = createNamespacedHelpers('app');
export default {
  components: {
    Profile,
    MessagePush,
    // Notification,
    // GlobalSearch,
  },
  data() {
    return {
      searchKey: '',
    };
  },
  computed: {
    ...mapState({
      isCollapse: 'isMenuAollapse',
    }),
  },
  methods: {
    ...mapMutations({
      toggleMenu: 'TOGGLE_MENU_COLLAPSE',
    }),
    search() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.app-body {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 4.3vw;
    padding: 0 24px;
    // background-color: $--color-white;
    // background-color: $--color-black;
    box-shadow:0px 4px 7px 0px rgba(0,0,0,0.05);
    .el-icon-s-unfold {
      color: #fff;
    }
    &-right {
      display: flex;
      align-items: center;
      /deep/ .el-input__inner {
        width: 288px;
        height: 40px;
        background-color:rgba(255,255,255,0.03);
        opacity: 0.94;
        border-radius: 27px;
        border-color: rgba(255,255,255,0.03);
        color: $--color-text-regular;
        font-size: 16px;
      }
      /deep/.el-input__inner::-webkit-input-placeholder{
        color: $--color-text-regular;
      }
      /deep/.el-input__inner:focus {
        border-color: rgba(255,255,255,0.03);
      }
      /deep/ .el-input__icon {
        font-size: 18px;
        margin-right: 12px;
        cursor: pointer;
        font-weight: bolder;
        color: #fff;
      }
    }
  }
  &__body {
    flex: 1;
    // overflow-y: scroll;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 22px;
    background-color: $--mgr-app-aside-background-color;
    background: linear-gradient(-45deg,rgba(0,114,255,.7),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0));
  }
  &__body::-webkit-scrollbar {
    display: none;
  }
  .app-header {
    &__notify {
    margin-left: 24px;
    }
    &__bar-item {
    margin-left: 15px;
    }
    &__name {
    color: #fff;
    font-size: 16px;
    margin-left: 27px;
    width: 80px;
    }
  }
  /deep/.el-badge__content {
    border: none;
    background-color: #FFC06A;
  }
}
</style>
