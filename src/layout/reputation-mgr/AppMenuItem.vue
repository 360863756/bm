<template>
  <div class="app-menu-item">
    <el-submenu v-if="children && children.length" :index="menu.path">
      <template slot="title">
        <icon class="app-menu-item__icon" :name="menu.icon"></icon>
        <span class="app-menu-item__title">
          {{ menu.title }}
        </span>
      </template>
      <app-menu-item
        v-for="menu in children"
        :key="menu.name"
        :menu="menu"
        class="app-menu-item__inline"
      >
      <!-- <template slot="title">
        <icon class="app-menu-item__second--icon" :name="menu.icon"></icon>
      </template> -->
      </app-menu-item>
    </el-submenu>
    <el-menu-item v-else class="app-menu-item__inner" :index="menu.path">
      <icon class="app-menu-item__icon" :name="menu.icon"></icon>
      <span slot="title" class="app-menu-item__title">
        {{ menu.title }}
      </span>
    </el-menu-item>
  </div>
</template>

<script>
import Icon from '@/components/Icon/Index.vue';

export default {
  name: 'AppMenuItem',
  components: {
    Icon,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  computed: {
    children() {
      return this.menu && this.menu.children;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.app-menu-item {
  &__icon {
    color: $--color-text-regular;
    margin-right: 10px;
  }
  &__second--icon {
    width:6px;
    height:6px;
    background-color: $--color-text-regular;
  }
  &__title {
    color: $--color-text-regular;
    font-size: 16px;
  }
  &__inline {
    // svg {
    //   height: 6px;
    //   width: 6px;
    //   background-color: #fff;
    // }
    /deep/ .c-svg-icon {
      height: 6px;
      width: 6px;
      // background-color: #fff;
    }
  }
  &__inner {
    border-right: 6px solid transparent;
    &.is-active {
      // background-color: #212121 !important;
      // color: $--color-primary;
      // border-color: $--color-primary;
      .app-menu-item__title {
        color: $--color-primary;
        font-size: 16px;
      }
      .app-menu-item__icon {
        color: $--color-primary;
      }
      /deep/ .app-menu-item__inline {
        svg {
          color: $--color-primary !important;
        }
      }
    }
  }
  /deep/ {
    .el-submenu__title,
    .el-menu-item {
      font-size: 14px;
    }
  }
  .el-submenu__title{
    svg{
     position: relative;
     top: 2px;
    }
  }
  /deep/ .el-icon-arrow-down:before{
    content: ' ';
    display: inline-block;
    height: 6px;
    width: 12px;
    background: url('~@/assets/images/background-select.png');
  }
}
/deep/ .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}
/deep/ .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
}
/deep/ .el-submenu__icon-arrow{
  margin-top: -3px;
}
</style>
