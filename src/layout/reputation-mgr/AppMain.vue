<template>
  <div class="app-main">
    <keep-alive :include="$store.state.app.cachedRoutes">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
