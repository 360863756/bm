<template>
<div class="page h-full d-horizontal">
  <panel>
    <div class="page-title" slot="title">
      人员添加
    </div>
  </panel>
  <panel class="flex-1 h-scroll" title="基础信息">
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
        <el-input v-model="userForm.account" placeholder="请输入账号" autofocus></el-input>
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
          v-if="activeRole"
          :organization-id="$route.query.orgId"
          :type="permissionType"
          :role="activeRole && activeRole.roleCode"
          default-check-all
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
// import { flatArrayMap } from '@/utils';
export default {
  name: 'UserAdd',
  components: {
    PermissionPicker,
  },
  data() {
    // 账户验证
    const countValidator = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入账号'));
      } else {
        // const reg = /^[\u0391-\uFFE5A-Za-z]+$/;
        // 只要数字、中文、英文
        const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!reg.test(value)) {
          cb(new Error(rule.message));
        };
        cb();
      }
    };
    // 账号唯一性校验
    const uniqueAccountValidator = async(rule, value, cb) => {
      try {
        const payload = {
          teamId: this.$route.query.orgId
        };
        const { errcode, data: avaliable } = await this.$api.userMgr.getUserByAccount(value, payload);
        if (errcode === 0 && avaliable) {
          cb();
        } else {
          cb(new Error(rule.message));
        }
        // if (avaliable) {
        // cb();
        // } else {
        //   cb(new Error(rule.message));
        // }
      } catch (error) {
        console.error(error);
        cb(new Error('异常错误'));
      }
    };
    // 密码验证
    const passwdValidator = (rule, value, cb) => {
      if (value === '') {
        cb(new Error(rule.message));
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
        password: '',
        fixPassword: '',
        role: '',
        modelIds: [],
      },
      userFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { validator: uniqueAccountValidator, message: '账号已存在', trigger: 'blur' },
          { validator: countValidator, message: '账号名称不能包括非法字符', trigger: 'blur' },
        ],
        userCnName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入8位以上的密码，且必须同时包含英文字母及数字，字符可选', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度必须在8位以上', trigger: 'blur' },
          { validator: passwdValidator, message: '密码长度需在8位以上，必须同时包含英文字母及数字，英文字母区分大小写，字符可选', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
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
    permissionType() {
      if (this.org) {
        const {
          teamType,
        } = this.org;
        const {
          ENTERPRISE,
          SUPERVISION,
        } = this.$const.orgMgr.ORG_TYPE;
        return teamType === ENTERPRISE.value
          ? 'ENTERPRISE'
          : teamType === SUPERVISION.value
            ? 'SUPERVISION'
            : '';
      } else {
        return 'MGR';
      }
    }
  },
  created() {
    this.fetchRoles();
    const {
      orgId,
    } = this.$route.query;
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
      const userForm = this.$refs.userForm;
      if (userForm) {
        try {
          this.saveLoading = true;
          await userForm.validate();
          const payload = {
            ...this.userForm,
            roleIds: [this.userForm.role],
            companyId: this.$route.query && this.$route.query.orgId,
            password: encryptPassword(this.userForm.password),
            fixPassword: encryptPassword(this.userForm.fixPassword),
          };
          let promise;
          if (this.permissionType === 'MGR') {
            promise = this.$api.userMgr.addSystemUser(payload);
          } else {
            promise = this.$api.userMgr.addUser(payload);
          }
          const { errcode } = await promise;
          if (errcode === 0) {
            this.$message.success('添加成功');
            this.$router.back();
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.saveLoading = false;
        }
      }
    },
    async fetchRoles() {
      const params = {
        type: this.$route.query && this.$route.query.roleType,
      };
      const { errcode, data: roles } = await this.$api.roleMgr.getRoles(params);
      if (errcode === 0) {
        this.roles = roles;
        const empRole = roles.find(({ roleCode }) => {
          return ['COMPANY_STAFF', 'ORGANIZATION_STAFF', 'SYSTEM_ADMIN'].includes(roleCode);
        });
        this.userForm.role = empRole && empRole.roleId;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.page-title {
  font-size: 18px;
}
</style>
