<template>
<component :is="componentName" :to="to" class="c-text-ellipsis" :style="style">
  <slot></slot>
</component>
</template>

<script>
export default {
  name: 'TextEllipsis',
  props: {
    length: Number,
    to: [String, Object],
  },
  computed: {
    componentName() {
      return this.to ? 'router-link' : 'span';
    },
    style() {
      return {
        width: this.length === undefined ? undefined : `${this.length + 1}em`,
      };
    }
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-text-ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: $--color-text-primary;
}
</style>
