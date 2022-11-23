<template>
  <div class="c-dangerCheckBox__checkLists">
    <el-checkbox class="c-dangerCheckBox__allChecked"  v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
    <el-checkbox-group @change="change" v-model="checkList">
      <div class="c-dangerCheckBox__checkList" v-for="i in options" :class="i.className" :key="i.value">
        <el-checkbox  :name="i.className" :label="i.value">{{i.label}}</el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'DangerCheckBox',
  components: {},
  props: {
    label: {
      type: String
    }
  },
  data() {
    return {
      options: this.$const.dengrous['COLOR_GRADES'],
      checkList: [],
      checkAll: false,
    };
  },
  created() {
  },
  methods: {
    change(arr) {
      this.checkList = arr;
      this.checkAll = arr.length === this.options.length;
      let str = '';
      arr.forEach((item, index) => {
        if (index === arr.length - 1) {
          str += item;
          return;
        }
        str += item + ',';
      });
      this.$emit('change', str);
    },
    handleCheckAllChange(val) {
      let arr = [];
      this.options.forEach(item => {
        arr.push(item.value);
      });
      this.checkList = val ? arr : [];
      this.change(this.checkList);
    },
  },
};

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.el-form-item__content{
   display: flex;
   .c-dangerCheckBox__checkLists{
     display: flex;
   }
   .c-dangerCheckBox__allChecked{
     /deep/ .el-checkbox__inner{
           background: transparent;
           border:1px solid $--color-text-regular;
     }
   }
   .el-checkbox-group{
     margin-left: 20px;
     display: flex;
     .c-dangerCheckBox__checkList{
       margin-right: 10px;
     }
     .high{
         /deep/ .el-checkbox__inner{
           background: $--color-grade-high;
         }
       }
     .center{
        /deep/ .el-checkbox__inner{
           background: $--color-grade-center;
         }
     }
     .low{
       /deep/ .el-checkbox__inner{
           background: $--color-grade-low;
         }
     }
   }
}
</style>
