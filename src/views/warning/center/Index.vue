<template>
  <div class="bgc" @click="handleClick"></div>
</template>

<script>
export default {
  name: 'WarningCenter',
  components: {
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      // this.$router.push({ path: '/file-manage/file-query/data-query' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.bgc {
  width: 100%;
  height: 50vw;
  cursor: pointer;
  background-image: url('~@/assets/images/preview/04-4.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>
