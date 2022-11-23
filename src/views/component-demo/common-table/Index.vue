<template>
<div class="page">
  <common-table
    :fields="tableFields"
    show-pagination
    show-row-operation
    show-selection
    row-operation-width="300px"
    :total="100"
    :data="data"
    :loading="loading"
  >
    <template slot="row-operation" slot-scope="scope">
      <el-button type="text">编辑{{ scope.row.userCnName }}</el-button>
    </template>
  </common-table>
</div>
</template>

<script>
import CommonTable from '@/components/CommonTable/Index.vue';

import {
  userTableFields as tableFields
} from './table-fileds';

export default {
  name: 'CommonTableDemo',
  components: {
    CommonTable,
  },
  data() {
    return {
      tableFields,
      data: [],
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const { errcode, data } = await this.$api.componentDemo.getCommonTableData();
        if (errcode === 0) {
          this.data = data.content || [];
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

</style>
