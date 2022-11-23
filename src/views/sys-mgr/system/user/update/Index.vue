<template>
<div class="page h-full d-horizontal">
  <panel>
    <div class="page-title" slot="title">
      人员编辑
    </div>
  </panel>
  <panel class="flex-1 h-scroll" title="基础信息" label-position="left">
    <el-form
    class="form--max-width"
    ref="userForm"
    :model="userForm"
    :rules="userFormRules"
    label-width="7em"
    label-position="left">
      <el-form-item label="机构名称" v-if="org">
        <el-input :value="org.teamName" placeholder="机构名称" disabled></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account" placeholder="请输入账号" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="userCnName">
        <el-input v-model="userForm.userCnName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option
            v-for="role in roles"
            :key="role.roleId"
            :value="role.roleId"
            :label="role.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限设置" prop="modelIds">
        <permission-picker
          :organization-id="$route.query.orgId"
          :type="permissionType"
          :role="activeRole && activeRole.roleCode"
          v-model="userForm.modelIds"
        ></permission-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button
        class="btn-wider"
        type="primary"
        :loading="saveLoading"
        @click="save"
      >保存</el-button>
      <el-button class="btn-wider" @click="$router.back()">取消</el-button>
    </div>
  </panel>
</div>
</template>

<script>
import PermissionPicker from '@/components/PermissionPicker/Index.vue';
import { encryptPassword } from '@/utils/auth';

export default {
  name: 'Update',
  components: {
    PermissionPicker,
  },
  data() {
    // 密码验证
    const passwdValidator = (rule, value, cb) => {
      if (value === '') {
        // cb(new Error(rule.message));
        cb();
      } else {
        const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,20}$/;
        if (!reg.test(value)) {
          cb(new Error(rule.message));
        };
        cb();
      }
    };
    return {
      org: null,
      roles: [],
      userForm: {
        account: '',
        userCnName: '',
        role: '',
        modelIds: [],
        password: '',
        flag: false, // 是否已经修改密码
      },
      userFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
        userCnName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        password: [
          { message: '请输入8位以上的密码，且必须同时包含英文字母及数字，字符可选', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度必须在8位以上', trigger: 'blur' },
          { validator: passwdValidator, message: '密码长度需在8位以上，必须同时包含英文字母及数字，英文字母区分大小写，字符可选', trigger: 'blur' },
        ],
        modelIds: [
          { required: true, message: '请设置相关权限', trigger: 'blur' },
        ]
      },
      saveLoading: false,
    };
  },
  computed: {
    activeRole() {
      return this.roles.find(({ roleId }) => {
        return roleId === this.userForm.role;
      });
    },
  },
  created() {
    this.fetchRoles();
    this.fetchUser();
    const { orgId } = this.$route.query;
    orgId && this.fetchOrganization(orgId);
  },
  methods: {
    async fetchOrganization(id) {
      const { errcode, data } = await this.$api.orgMgr.getOrganization(id);
      if (errcode === 0) {
        this.org = data || null;
      }
    },
    async save() {
      try {
        this.saveLoading = true;
        const userForm = this.$refs.userForm;
        const valid = userForm && await userForm.validate();
        if (valid) {
          const payload = {
            ...this.userForm,
            roleIds: [this.userForm.role],
            companyId: this.$route.query.orgId
          };
          // delete payload.roleIds;
          if (payload.password !== '') {
            payload.flag = true;
            payload.password = encryptPassword(payload.password);
          }
          let promise;
          if (this.permissionType === 'MGR') {
            promise = this.$api.userMgr.updateSystemUser(payload);
          } else {
            promise = this.$api.userMgr.updateUser(payload);
          }
          const { errcode } = await promise;
          if (errcode === 0) {
            this.$message.success('保存成功');
            setTimeout(() => {
              this.$router.back();
            }, 500);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.saveLoading = false;
      }
    },
    async fetchRoles() {
      const params = {
        type: this.$route.query && this.$route.query.roleType,
      };
      const { errcode, data: roles } = await this.$api.roleMgr.getRoles(params);
      if (errcode === 0) {
        this.roles = roles;
      }
    },
    async fetchUser() {
      const {
        id,
      } = this.$route.query || {};
      if (id) {
        const { errcode, data: user } = await this.$api.userMgr.getUserById(id);
        if (errcode === 0) {
          this.userForm = {
            ...user,
            role: user.roleIds && user.roleIds[0] && user.roleIds[0].roleId,
            modelIds: user.modules || [],
            password: '',
            flag: false
          };
        }
      } else {
        console.warn('用户id为空');
        this.$router.push('/sys-mgr/system/user');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.page-title {
  font-size: 18px;
}
</style>
