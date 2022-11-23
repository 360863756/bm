<template>
<div class="c-panel">
  <div
    v-if="title || $slots.title || $slots['header-append']"
    class="c-panel-header"
    :class="headerClass ? headerClass : ''"
  >
    <div class="c-panel-header__title" :class="titleClass">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="c-panel-header__append" v-if="$slots['header-append']">
      <slot name="header-append"></slot>
    </div>
  </div>
  <div class="c-panel-body" :class="bodyClass" v-if="$slots.default">
    <slot></slot>
  </div>
  <div class="c-panel-footer" v-if="$slots.footer">
    <slot name="footer"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String, // 标题文本
    bold: Boolean, // 标题加粗
    alignCenter: Boolean, // 标题居中
    padding: {
      type: Boolean,
      default: true,
    },
    headerClass: String
  },
  computed: {
    titleClass() {
      return {
        'is-bold': this.bold,
        'is-align-center': this.alignCenter,
      };
    },
    bodyClass() {
      return {
        'is-no-padding': !this.padding,
      };
    }
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";
.row {
  & > .c-panel + .c-panel {
    margin-top: 0;
  }
}
.c-panel {
  background-color: $--color-black;
  border-radius: $--border-radius-base;
  & + .c-panel {
    margin-top: 10px;
  }
  &-header {
    border-left: 3px solid #1680FF;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    // border-bottom: $--border-base;
    // background-color: $--mgr-app-body-background-color;
    background: linear-gradient(to right,rgba(0,76,255,0.31), rgba(0,76,255,0));
    &__title {
      // padding-left: 16px;
      color: $--color-white;
      font-size: $--font-size-extra-large;
      font-weight: 400;
      // border-left: 4px solid $--color-primary;
      &.is-bold {
        font-weight: bold;
      }
      &.is-align-center {
        flex: 1;
        text-align: center;
      }
    }
  }
  &-body {
    padding: 10px 20px;
    // background-color: $--mgr-app-body-background-color;
    &.is-no-padding {
      padding: 0;
    }
  }
  &-footer {
    padding: 10px 20px;
  }
}
</style>
