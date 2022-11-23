<template>
<div class="page">
  <query-list
    ref="queryList"
    stripe
    row-key="id"
    query-reverse
    :query-fields="queryFields"
    :fetch-method="$api.componentDemo.getCommonTableData"
    @selection-change="handleSelectionChange"
  >
    <template slot="query-append">
      <el-button @click="selectAll">全选</el-button>
    </template>
    <div slot-scope="scope">
      {{ JSON.stringify(scope.item) }}
    </div>
  </query-list>
</div>
</template>

<script>
import QueryList from '@/components/QueryList/Index.vue';
import {
  userQueryFields as queryFields,
} from './queryFields';

export default {
  name: 'QueryListDemo',
  components: {
    QueryList,
  },
  data() {
    return {
      queryFields,
    };
  },
  methods: {
    handleSelectionChange(selection) {
      console.log(selection);
    },
    selectAll() {
      const queryList = this.$refs.queryList;
      queryList && queryList.selectAll();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

</style>
