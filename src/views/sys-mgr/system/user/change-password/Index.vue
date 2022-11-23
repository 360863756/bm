<template>
<div class="page h-full d-horizontal">
  <panel>
    <div class="page-title" slot="title">
      密码修改
    </div>
  </panel>
  <panel class="flex-1 h-scroll" title="基础信息">
    <el-form
    class="form--max-width"
    ref="userForm"
    :model="userForm"
    :rules="userFormRules"
    label-width="6em"
    label-position="left">
      <el-form-item label="账号" prop="account">
        <el-input :value="userForm.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" placeholder="请输入密码" autofocus></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="fixPassword">
        <el-input type="password" v-model="userForm.fixPassword" placeholder="请再次输入密码"></el-input>
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
import { encryptPassword } from '@/utils/auth';

export default {
  name: 'UserEdit',
  data() {
    const confirmPasswordValidator = (rule, value, cb) => {
      if (value !== this.userForm.password) {
        cb(new Error(rule.message));
      } else {
        cb();
      }
    };
    return {
      roles: [],
      userForm: {
        account: '',
        password: '',
        fixPassword: '',
      },
      userFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码长度必须在8位以上', trigger: 'blur' },
        ],
        fixPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码长度必须在8位以上', trigger: 'blur' },
          { validator: confirmPasswordValidator, message: '两次输入的密码不一致', trigger: 'blur' },
        ],
      },
      saveLoading: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async save() {
      try {
        this.saveLoading = true;
        const userForm = this.$refs.userForm;
        const valid = userForm && await userForm.validate();
        if (valid) {
          const {
            password,
            fixPassword,
          } = this.userForm;
          const payload = {
            ...this.userForm,
            password: encryptPassword(password),
            fixPassword: encryptPassword(fixPassword),
          };
          const { errcode } = await this.$api.userMgr.changePassword(payload);
          if (errcode === 0) {
            this.$message.success('修改成功');
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
    async fetchUser() {
      const {
        id,
      } = this.$route.query || {};
      if (id) {
        const { errcode, data: user } = await this.$api.userMgr.getUserById(id);
        if (errcode === 0) {
          const { account } = user;
          this.userForm.account = account;
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
