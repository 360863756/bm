<template>
<div class="c-level-tag" :style="style">
  {{ this.level ? this.level.label || this.level.value : this.level }}
</div>
</template>

<script>
export default {
  name: 'LevelTags',
  props: ['level'],
  computed: {
    style() {
      return {
        backgroundColor: this.level.color,
      };
    }
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-level-tag {
  width: 38px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  line-height: 18px;
  color: $--color-white;
  border-radius: $--border-radius-small;
}
</style>
