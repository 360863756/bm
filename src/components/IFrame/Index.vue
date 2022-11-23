<template>
  <div class="c-iframe">
    <iframe
      :src="src || routeSrc"
      width="100%"
      height="100%"
      frameborder="0"
      border="0"
      marginwidth="0"
      marginheight="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
  computed: {
    routeSrc() {
      return `${this.$route.fullPath}`.replace(/\/+/g, '/');
    },
  },
};
</script>

<style lang="scss" scoped>
.c-iframe {
  height: 100%;
  iframe {
    height: 100%;
  }
}
</style>
