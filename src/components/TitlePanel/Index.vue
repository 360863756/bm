<template>
<div class="c-titlePanel">
  <div
    v-if="title || $slots.title || $slots['header-append']"
    class="c-titlePanel-header"
  >
    <div class="c-titlePanel-header__title" :class="titleClass">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="c-titlePanel-header__append" v-if="$slots['header-append']">
      <slot name="header-append"></slot>
    </div>
  </div>
  <div class="c-titlePanel-body" :class="bodyClass" v-if="$slots.default">
    <slot></slot>
  </div>
  <div class="c-titlePanel-footer" v-if="$slots.footer">
    <slot name="footer"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'TitlePanel',
  props: {
    title: String, // 标题文本
    bold: Boolean, // 标题加粗
    alignCenter: Boolean, // 标题居中
    padding: {
      type: Boolean,
      default: true,
    }
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
    },
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";
.row {
  & > .c-titlePanel + .c-titlePanel {
    margin-top: 0;
  }
}
.c-titlePanel {
  width: 100%;
  // height: 100%;
  // margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  // background-color: $--color-black;
  border-radius: $--border-radius-base;
  // padding-bottom: 28px;
  padding-right: 8px;
  // & + .c-titlePanel {
  //   margin-top: 10px;
  // }
  &-header {
    // padding: 0 0 36px 0;
    padding: 0 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85vw;
    &__title {
      // padding-left: 16px;
      color: $--color-primary;
      font-size: 1.5vw;
      font-weight: 400;
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
    width: 100%;
    height: 100%;
    &.is-no-padding {
      padding: 0;
    }
  }
  &-footer {
    padding: 10px 20px;
  }
}
</style>
