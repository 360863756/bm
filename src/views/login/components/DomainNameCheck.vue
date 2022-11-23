<template>
  <div>
    <el-form
    ref="form"
    :model="form"
    :rules="formModelRules"
    @submit.native.prevent="handleNextStep">
      <el-form-item prop="domainName">
        <div class="domain-body">
          <el-input
          v-model="form.domainName"
          placeholder="请输入企业域名"
          ref="autofocus"
          ></el-input>
          <span>stcn.com</span>
        </div>
      </el-form-item>
    </el-form>
    <el-button
    type="primary"
    @click="handleNextStep"
    :loading="loading"
    >下一步</el-button>
  </div>
</template>

<script>
export default {
  name: 'DomainNameCheck',
  data() {
    return {
      form: {
        domainName: ''
      },
      formModelRules: {
        domainName: [
          { required: true, message: '请输入企业域名', trigger: 'blur' },
          { pattern: /^\w[\w-]+\w$/, message: '请输入合法的域名', trigger: 'blur' },
        ]
      },
      loading: false,
    };
  },
  created() {
    // 设置默认聚焦输入框
    this.$nextTick(() => {
      this.$refs['autofocus'].$refs.input.focus();
    });
  },
  methods: {
    async handleNextStep() {
      try {
        const form = this.$refs.form;
        const valid = form && await form.validate();
        if (valid) {
          const payload = {
            realmName: this.form.domainName
          };
          this.loading = true;
          const { errcode, data } = await this.$api.app.checkDomainName(payload);
          if (errcode === 0) {
            if (JSON.stringify(data) === '{}') {
              this.$message({
                message: '域名不存在',
                type: 'error'
              });
            } else {
              this.$emit('check-domain', true, data.realmName);
            }
          }
        }
      } catch {
        console.warn('域名不合法');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.domain-body {
  display: flex;
  justify-content: space-between;
}
.domain-body span {
  color: #655B5B;
  font-size: 14px;
  line-height: $--login-box-input-height;
}
.domain-body .el-input {
  width: 70%;
  line-height: $--login-box-input-height;
  height: $--login-box-input-height;
}
.el-button {
  width: 100%;
  border-radius: 4px;
  line-height: 12px;
}
</style>
