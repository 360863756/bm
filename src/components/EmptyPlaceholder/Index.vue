<template>
<div class="c-empty-placeholder">
  <slot>
    {{ emptyText }}
  </slot>
</div>
</template>

<script>
export default {
  name: 'EmptyPlaceholder',
  props: {
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-empty-placeholder {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: $--color-text-secondary;
}
</style>
