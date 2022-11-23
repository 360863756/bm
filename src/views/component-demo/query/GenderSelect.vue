<template>
  <el-radio-group v-model="innerValue" @change="handleChange">
    <el-radio-button v-if="allowUnknown" label="privite">隐私</el-radio-button>
    <el-radio-button label="male">男</el-radio-button>
    <el-radio-button label="female">女</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  inject: ['query'], // 注入查询组件Query示例
  props: {
    value: {
      required: true
    },
    allowUnknown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value || 'male',
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.innerValue = newVal;
      }
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value);
      this.query.emitChange(); // 自定义触发change事件
    }
  }
};
</script>
