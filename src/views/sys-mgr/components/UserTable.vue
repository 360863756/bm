<template>
<div class="user-table">
  <panel class="panel">
    <query
      ref="query"
      v-model="searchModel"
      :fields="queryFields"
      @change="search"
    >
      <template slot="operation">
        <el-button type="primary" @click="search">检索</el-button>
        <el-button @click="reset">重置</el-button>
      </template>
    </query>
  </panel>
  <panel class="panel">
    <query-table
      ref="queryTable"
      :query-fields="[]"
      :table-fields="tableFields"
      :fetch-method="fetchMethod"
      :adaptive="{ bottomOffset: 34 }"
      :page-size="20"
      show-selection
      row-operation-width="200"
      :show-query-operation="false"
      row-key="userId"
      query-reverse
      reserve-selection
      :roles="roles"
      @selection-change="handleSelectionChange"
    >
      <template slot="query-append">
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button
          :disabled="selectedUsers.length === 0"
          @click="exportUsers"
        >导出</el-button>
        <el-button
          :disabled="selectedUsers.length === 0"
          @click="deleteUsers"
        >删除</el-button>
      </template>
      <template slot="row-operation" slot-scope="{ row }">
        <el-button type="text" @click="changeStatus(row)">
          {{
            row.status === STATUS.NORMAL.value
            ? STATUS.NORMAL.operationLabel
            : STATUS.DISABLED.operationLabel
          }}
        </el-button>
        <el-button type="text" @click="editUser(row)">编辑</el-button>
        <!-- <el-button type="text" @click="changePassword(row)">修改密码</el-button> -->
        <el-button type="text" @click="deleteUser(row)">删除</el-button>
      </template>
    </query-table>
  </panel>
</div>
</template>

<script>
import Query from '@/components/Query/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import {
  userQueryFields as queryFields,
} from './query-fields';
import {
  userTableFields as tableFields,
} from './table-fields';
import { downloadFormAxiosRes } from '@/utils/downloadFile.js';

export default {
  name: 'UserTable',
  components: {
    Query,
    QueryTable,
  },
  props: {
    orgId: String,
    roleType: {
      type: String,
      // validator(value) {
      //   return ROLE_TYPE_LIST.some(item => item.value === value);
      // },
    },
  },
  data() {
    const {
      STATUS,
      ROLE_TYPE,
    } = this.$const.sysMgr;
    return {
      STATUS,
      ROLE_TYPE,
      queryFields,
      tableFields,
      searchModel: {},
      selectedUsers: [],
      roles: [],
    };
  },
  computed: {
    selectedUserIds() {
      return this.selectedUsers
        ? this.selectedUsers.map(user => user.userId)
        : [];
    },
  },
  watch: {
    orgId: {
      handler() {
        this.reset();
      },
    }
  },
  created() {
    this.fetchRoles();
  },
  methods: {
    fetchMethod(options) {
      const params = {
        ...options,
        ...this.searchModel,
        teamId: this.orgId,
      };
      if (this.orgId) {
        return this.$api.userMgr.getUsers(params);
      }
      return this.$api.userMgr.getMgrUsers(params);
    },
    handleSelectionChange(selection) {
      this.selectedUsers = [...selection];
    },
    async fetchRoles() {
      const params = {
        type: this.roleType || this.ROLE_TYPE.PLATFORM.value
      };
      const { errcode, data: roles } = await this.$api.roleMgr.getRoles(params);
      if (errcode === 0) {
        this.roles = roles;
      }
    },
    async exportUsers() {
      await this.$confirm(`确认导出选中的${this.selectedUserIds.length}条数据？`, '确认导出');
      const payload = {
        ids: this.selectedUserIds
      };
      const fileRes = await this.$api.userMgr.exportUsers(payload);
      await downloadFormAxiosRes(fileRes);
      await this.$message.success('导出成功');
    },
    async deleteUsers() {
      await this.$confirm(`确认删除选中的${this.selectedUserIds.length}条数据？`, '确认删除');
      const { errcode } = await this.$api.userMgr.deleteUsers(this.selectedUserIds);
      if (errcode === 0) {
        const queryTable = this.$refs.queryTable;
        queryTable && queryTable.onSearch();
        this.$message.success('删除成功');
      }
    },
    async changeStatus({ userId: id, status }) {
      let operationLabel;
      let changedStatus;
      if (status === this.STATUS.NORMAL.value) {
        operationLabel = this.STATUS.NORMAL.operationLabel;
        changedStatus = this.STATUS.DISABLED.value;
      } else {
        operationLabel = this.STATUS.DISABLED.operationLabel;
        changedStatus = this.STATUS.NORMAL.value;
      }
      await this.$confirm(`确认${operationLabel}该用户？`, '确认');
      const { errcode } = await this.$api.userMgr.changeUserStatus(id, changedStatus);
      if (errcode === 0) {
        const queryTable = this.$refs.queryTable;
        queryTable && queryTable.onFetchData();
        this.$message.success('修改成功');
      }
    },
    async deleteUser({ userId: id }) {
      await this.$confirm(`确认删除该用户？`, '确认');
      const { errcode } = await this.$api.userMgr.deleteUser(id);
      if (errcode === 0) {
        const queryTable = this.$refs.queryTable;
        queryTable && queryTable.onFetchData();
        this.$message.success('删除成功');
      }
    },
    editUser({ userId: id }) {
      this.$router.push({
        path: '/sys-mgr/system/user/update',
        query: {
          id,
          orgId: this.orgId,
          roleType: this.roleType || this.ROLE_TYPE.PLATFORM.value
        },
      });
    },
    changePassword({ userId: id }) {
      this.$router.push({
        path: '/sys-mgr/system/user/change-password',
        query: {
          id,
        },
      });
    },
    addUser() {
      console.log(this.roleType);
      this.$router.push({
        path: '/sys-mgr/system/user/add',
        query: {
          orgId: this.orgId,
          roleType: this.roleType
        },
      });
    },
    search() {
      const queryTable = this.$refs.queryTable;
      queryTable && queryTable.onSearch();
    },
    reset() {
      const query = this.$refs.query;
      if (query) {
        query.resetFields();
        this.search();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.panel + .panel {
  margin-top: 16px;
}
</style>
