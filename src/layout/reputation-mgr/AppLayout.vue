<template>
  <div class="app-layout app-layout--mgr">
    <app-aside class="app-aside"></app-aside>
    <app-body class="app-body"></app-body>
  </div>
</template>

<script>
import AppAside from './AppAside';
import AppBody from './AppBody';

export default {
  components: {
    AppAside,
    AppBody,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.app-layout--mgr {
  &.app-layout {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    background-color: $--app-layout-background-color;
  }
  .app-aside {
    flex-shrink: 0;
  }
  .app-body {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
}
</style>
