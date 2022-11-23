<template>
  <div class="c-route-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in breadcrumbItems"
        :key="item.name"
        :to="item.path"
      >{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'RouteBreadcrumb',
  computed: {
    breadcrumbItems() {
      return this.$route.matched
        .slice(0)
        .filter(matched => matched.name && matched.meta.title);
    }
  }
};
</script>
