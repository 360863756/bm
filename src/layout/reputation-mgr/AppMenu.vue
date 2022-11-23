<template>
  <div class="app-menu">
    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
      <el-menu
        class="app-menu__menu"
        :default-active="activeIndex ? activeIndex : $route.path"
        :background-color="CSSVariables.mgrAppAsideBackgroundColor"
        :text-color="CSSVariables.colorWhite"
        :active-text-color="CSSVariables.colorWhite"
        :collapse="isCollapse"
        :unique-opened="true"
        router
      >
        <app-menu-item
          v-for="menu in displayMenus"
          :key="menu.name"
          :menu="menu"
          :index='menu.path'
        ></app-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CSSVariables from '@/style/var.scss';
import AppMenuItem from './AppMenuItem';

const {
  mapState,
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'MgrAppMenu',
  components: {
    AppMenuItem,
  },
  data() {
    return {
      CSSVariables,
      activeIndex: ''
    };
  },
  computed: {
    ...mapState({
      isCollapse: 'isMenuCollapse',
    }),
    ...mapGetters({
      displayMenus: 'displayMenus',
    })
  },
  created() {
    if (this.$route.meta.config.routerPath) {
      this.activeIndex = this.$route.meta.config.routerPath;
    }
  },
  watch: {
    '$route': function(val) {
      if (val.meta.config.routerPath) {
        this.activeIndex = val.meta.config.routerPath;
      } else {
        this.activeIndex = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.app-menu {
  flex: 1;
  overflow: hidden;
  padding: 35px 0 0 0;
  display: flex;
  flex-direction: column;
  /deep/ &__menu > &-item:nth-child(1){
    svg{
      position: relative;
      top: 2px;
    }
  }
  &__menu {
    border-right: 0;
    &:not(.el-menu--collapse) {
      width: $--mgr-app-menu-width;
    }
    &.el-menu--collapse /deep/ {
      .el-submenu > .el-submenu__title {
        .app-menu-item__title,
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
  &__scrollbar {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    /deep/ {
      .app-menu__wrap {
        overflow-x: hidden;
        // overflow-y: hidden;
      }
    }
  }
}
</style>
