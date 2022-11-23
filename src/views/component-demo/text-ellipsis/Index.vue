<template>
<div class="page">
  <div class="demo-item">
    <text-ellipsis>长文本不需要截断</text-ellipsis>
  </div>
  <div class="demo-item">
    <text-ellipsis :length="5">long english text</text-ellipsis>
  </div>
  <div class="demo-item">
    <text-ellipsis :length="5">长文本需要截断</text-ellipsis>
  </div>
  <div class="demo-item">
    <text-ellipsis :length="5" title="长文本需要截断，并且显示title">长文本需要截断，并且显示title</text-ellipsis>
  </div>
</div>
</template>

<script>
import TextEllipsis from '@/components/TextEllipsis/Index.vue';

export default {
  name: 'TextEllipsisDemo',
  components: {
    TextEllipsis,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

</style>
