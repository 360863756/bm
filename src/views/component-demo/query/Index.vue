<template>
<div class="page">
  <panel>
    <query
      ref="query"
      v-model="model"
      :fields="queryFields"
      label-width="5em"
    >
      <template slot="operation">
        <el-button type="primary">检索</el-button>
        <el-button @click="reset">重置</el-button>
      </template>
      <template slot="append">
        <el-button type="primary">添加</el-button>
      </template>
    </query>
  </panel>
</div>
</template>

<script>
import Query from '@/components/Query/Index.vue';
import Panel from '@/components/Panel/Index.vue';
import {
  userQueryFields as queryFields,
} from './query-fileds';

export default {
  name: 'QueryDemo',
  components: {
    Query,
    Panel,
  },
  data() {
    return {
      queryFields,
      model: {
        gender: 'female'
      },
    };
  },
  methods: {
    reset() {
      const query = this.$refs.query;
      query && query.resetFields();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

</style>
