<template>
<title-panel title="风险阀值设置">
  <div>
    <span class="block-span">静态评估</span>
    <el-form :inline="true" :model="jtpg" :rules="jtpgRules" ref="jtpgForm">
      <el-row type="flex" justify="space-around">
        <el-col :offset="1" :span="6" v-for="(item,index) in jtpg" :key="index">
          <el-form-item :label="`${item.fxdj}:`" >
            <el-form-item :prop="`${index}.zdf`">
            <el-input v-model.number="item.zdf" maxlength="3"></el-input>
            <span class="line" style="margin-right:-4px"></span>
            </el-form-item>
            <el-form-item :prop="`${index}.zgf`">
            <el-input v-model.number="item.zgf" maxlength="3"></el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr style="border:none;height:1px;background:rgba(110,121,153,1); margin-bottom:20px">
    <span class="block-span">动态评估</span>
    <el-form :model="dtpg" :rules="dtpgRules" ref="dtpgForm">
        <el-table
      :data="dtpg.wxdj"
      style="width: 100%;"
      :row-style="{height:'30px'}"
      :cell-style="{padding:'5px,0'}">
      <el-table-column  :label="labelName(item)" :align="alignPos(item)" v-for="(item,index) in dtpg.wxdj[0]" :key="index">
          <template slot-scope="scope" >
            <el-form-item v-if="(typeof item) === 'string'">
              <el-input class="long-el-input_inner" readonly v-model="scope.row.fxdj"/>
            </el-form-item>
            <el-form-item v-if="(typeof item) === 'object'">
              <!-- :ref="scope.row[index].fxdjbm+index+'zdf'" -->
                <el-form-item :prop="`wxdj.${scope.$index}.${index}.zdf`">
                  <el-input v-model.number="scope.row[index].zdf" :ref="`wxdj.${scope.$index}.${index}.zdf`" maxlength="3"/>
                  <span class="line"></span>
                </el-form-item>
                <el-form-item :prop="`wxdj.${scope.$index}.${index}.zgf`">
                  <el-input v-model.number="scope.row[index].zgf" :ref="`wxdj.${scope.$index}.${index}.zgf`" maxlength="3"/>
                </el-form-item>
              </el-form-item>
          </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="dtpg.xqyz"
      style="width: 100%; margin-top:20px"
      :row-style="{height:'30px'}"
      :cell-style="{padding:'5px,0'}">
      <el-table-column  :label="labelName(item)" :align="alignPos(item)" v-for="(item,index) in dtpg.xqyz[0]" :key="index">
          <template slot-scope="scope" >
            <el-form-item v-if="(typeof item) === 'string'">
              <el-input class="long-el-input_inner" readonly v-model="scope.row.fxdj"/>
            </el-form-item>
            <el-form-item v-if="(typeof item) === 'object'">
              <!-- :ref="scope.row[index].fxdjbm+index+'zdf'" -->
                <el-form-item :prop="`xqyz.${scope.$index}.${index}.zdf`">
                  <el-input v-model.number="scope.row[index].zdf" :ref="`xqyz.${scope.$index}.${index}.zdf`" maxlength="3"/>
                  <span class="line"></span>
                </el-form-item>
                <el-form-item :prop="`xqyz.${scope.$index}.${index}.zgf`">
                  <el-input v-model.number="scope.row[index].zgf" :ref="`xqyz.${scope.$index}.${index}.zgf`" maxlength="3"/>
                </el-form-item>
              </el-form-item>
          </template>
      </el-table-column>
    </el-table>
    </el-form>
    <hr style="border:none;height:1px;background:rgba(110,121,153,1); margin-top:15px;margin-bottom:20px">
    <div style="display:flex; justify-content:flex-end">
      <el-button  type="primary" @click="handleSubmit()">提交</el-button>
      <el-button  type="primary">清除</el-button>
    </div>
  </div>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
export default {
  name: 'ParameterWarning',
  components: {
    TitlePanel
  },
  data() {
    return {
      jtpg: {
        gfx: {
          zgf: '',
          zdf: ''
        },
        zfx: {
          zgf: '',
          zdf: ''
        },
        dfx: {
          zgf: '',
          zdf: ''
        }
      },
      wxdj: [],
      xqyz: [],
      dtpg: {
        xqyz: [],
        wxdj: []
      },
      dtpgRules: {},
      jtpgRules: {},
    };
  },
  computed: {},
  created() {
    this.fetchJtpg();
    this.fetchDtpg();
  },
  methods: {
    getJtpgRules() {
      let temp = {};
      /** 将jtpg的key值单独取出作为数组 */
      let jtpgKey = Object.keys(this.jtpg);
      for (let key in this.jtpg) {
        temp[`${key}.zdf`] = [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { type: 'number', message: '必须是数字类型', trigger: 'blur' },
          { validator: (rule, value, callback, source, options) => {
            if (Number(value) < 0) {
              return callback(new Error('分值不能小于0'));
            }
            if (Number(value) >= Number(this.jtpg[key].zgf)) {
              return callback(new Error('分值过高'));
            } else {
              return callback();
            }
          },
          trigger: 'blur' }
        ];
        temp[`${key}.zgf`] = [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { type: 'number', message: '必须是数字类型', trigger: 'blur' },
          { validator: (rule, value, callback, source, options) => {
            if (Number(value) < 0) {
              return callback(new Error('分值不能小于0'));
            }
            for (var index = 0; index < jtpgKey.length; index++) {
              if (jtpgKey[index] !== key && index === jtpgKey.indexOf(key) - 1) {
                if (jtpgKey.indexOf(key) !== 0) {
                  this.jtpg[jtpgKey[index]].zdf = Number(value) + 1;
                  return callback();
                }
                if (Number(value) >= Number(this.jtpg[jtpgKey[index]].zdf)) {
                  return callback(new Error('分值过高'));
                } else {
                  return callback();
                }
              }
            }
            return callback();
          },
          trigger: 'blur' }
        ];
      }
      return temp;
    },
    getDtpgRules() {
      let temp = {};
      var self = this;
      self.dtpg.wxdj.forEach((item, index) => {
        for (let key in item) {
          /** 对最小值做校验 */
          temp[`wxdj.${index}.${key}.zdf`] = [
            { required: true, message: '请输入分值', trigger: 'blur' },
            { type: 'number', message: '必须是数字类型', trigger: 'blur' },
            { validator: (rule, value, callback, source, options) => {
              if (Number(value) < 0) {
                return callback(new Error('分值不能小于0'));
              }
              if (Number(value) >= Number(this.$refs[`wxdj.${index}.${key}.zgf`][0].value)) {
                return callback(new Error('分值过高'));
              } else {
                return callback();
              }
            },
            trigger: 'blur' }
          ];
          /** 对最大值做校验 */
          temp[`wxdj.${index}.${key}.zgf`] = [
            { required: true, message: '请输入分值', trigger: 'blur' },
            { type: 'number', message: '必须是数字类型', trigger: 'blur' },
            { validator: (rule, value, callback, source, options) => {
            /** 当前风险的最高分+1赋值给高一级风险的最低分 */
              if (index !== 0) {
                self.dtpg.wxdj[index - 1][key].zdf = Number(value) + 1;
                return callback();
              }
              if (Number(value) < 0) {
                return callback(new Error('分值不能小于0'));
              } else {
                return callback();
              }
            },
            trigger: 'blur' }
          ];
        }
      });
      self.dtpg.xqyz.forEach((item, index) => {
        for (let key in item) {
          /** 对最小值做校验 */
          temp[`xqyz.${index}.${key}.zdf`] = [
            { required: true, message: '请输入分值', trigger: 'blur' },
            { type: 'number', message: '必须是数字类型', trigger: 'blur' },
            { validator: (rule, value, callback, source, options) => {
              if (Number(value) < 0) {
                return callback(new Error('分值不能小于0'));
              }
              if (Number(value) >= Number(this.$refs[`xqyz.${index}.${key}.zgf`][0].value)) {
                return callback(new Error('分值过高'));
              } else {
                return callback();
              }
            },
            trigger: 'blur' }
          ];
          /** 对最大值做校验 */
          temp[`xqyz.${index}.${key}.zgf`] = [
            { required: true, message: '请输入分值', trigger: 'blur' },
            { type: 'number', message: '必须是数字类型', trigger: 'blur' },
            { validator: (rule, value, callback, source, options) => {
              /** 当前风险的最高分+1赋值给高一级风险的最低分 */
              if (index !== 0) {
                self.dtpg.xqyz[index - 1][key].zdf = Number(value) + 1;
                return callback();
              }
              if (index !== 0) {
                if (Number(value) < 0) {
                  return callback(new Error('分值不能小于0'));
                }
                if (Number(value) >= Number(this.dtpg.xqyz[index - 1][key].zdf)) {
                  return callback(new Error('分值过高'));
                } else {
                  return callback();
                }
              } else {
                return callback();
              }
            },
            trigger: 'blur' }
          ];
        }
      });
      return temp;
    },
    alignPos(item) {
      if ((typeof item) === 'object') {
        return 'center';
      } else {
        return 'left';
      }
    },
    labelName(item) {
      if ((typeof item) === 'object') {
        return item.pgmc;
      } else {
        return '风险等级';
      }
    },
    handleSubmit() {
      this.$refs.jtpgForm.validate((valid) => {
        if (valid) {
          this.$refs.dtpgForm.validate((valid) => {
            if (valid) {
              let dtpg = [...this.dtpg.wxdj, ...this.dtpg.xqyz];
              let temp = [];
              Object.keys(this.jtpg).forEach((key) => {
                this.$api.parameter.updateStaticEvaluation(this.jtpg[key]);
              });
              dtpg.forEach((item) => {
                for (let index in item) {
                  if (Object.prototype.toString.call(item[index]) === '[object Object]') {
                    temp.push(item[index]);
                    this.$api.parameter.updateDynamicEvaluationn(item[index]);
                  }
                }
              });
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message.error('请检查分值是否合理');
            }
          });
        } else {
          self.$message.error('请检查分值是否合理');
        }
      });
    },
    async fetchJtpg() {
      var self = this;
      const { errcode, data } = await self.$api.parameter.fetchStaticEvaluation();
      if (errcode === 0) {
        data.fxpg_fxfz_jtpg_data.forEach((item, index, aray) => {
          self.jtpg[item.fxdjbm] = item;
        });
        /** 当jtpg中有值后，添加验证规则 */
        self.jtpgRules = self.getJtpgRules();
      }
    },
    async fetchDtpg() {
      const { errcode, data } = await this.$api.parameter.fetchDynamicEvaluation();
      if (errcode === 0) {
        // let tempWxdj = [];
        data.fxpg_fxfz_dtpg_data.forEach((item, index, aray) => {
          item.fxx === '危险等级' ? this.fetchWxdj(item) : this.fetchXqyz(item);
        });
        this.dtpg.wxdj = JSON.parse(JSON.stringify(this.wxdj));
        this.dtpg.xqyz = JSON.parse(JSON.stringify(this.xqyz));
        /** 当动态评估有值后，添加验证规则 */
        this.dtpgRules = this.getDtpgRules();
      }
    },
    fetchWxdj(item) {
      // 当wxdj无数据时，添加一条初始数据
      if (this.wxdj.length === 0) {
        this.wxdj.push({});
        this.wxdj[0]['fxdj'] = item.fxdj;
        this.wxdj[0][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id, pgmc: item.pgmc, fxdjbm: item.fxdjbm };
        return;
      }
      // 将item的风险等级与wxdj数组中的对象里面的风险等级做比较，如果相等，则追加一条评估项数据
      for (let i = 0; i < this.wxdj.length; i++) {
        if (item.fxdj === this.wxdj[i].fxdj) {
          this.wxdj[i][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id, pgmc: item.pgmc, fxdjbm: item.fxdjbm };
          return null;
        }
      }
      // 当wxdj中没有与item的风险等级相同的数据，则将数组长度加1，添加一条新的危险等级数据
      this.wxdj.push({});
      this.wxdj[this.wxdj.length - 1]['fxdj'] = item.fxdj;
      this.wxdj[this.wxdj.length - 1][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id, pgmc: item.pgmc, fxdjbm: item.fxdjbm };
      return null;
    },
    fetchXqyz(item) {
      if (this.xqyz.length === 0) {
        this.xqyz.push({});
        this.xqyz[0]['fxdj'] = item.fxdj;
        this.xqyz[0][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id, pgmc: item.pgmc };
        return null;
      }
      for (let i = 0; i < this.xqyz.length; i++) {
        if (item.fxdj === this.xqyz[i].fxdj) {
          this.xqyz[i][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id, pgmc: item.pgmc };
          return null;
        }
      }
      this.xqyz.push({});
      this.xqyz[this.xqyz.length - 1]['fxdj'] = item.fxdj;
      this.xqyz[this.xqyz.length - 1][item.pgmcbm] = { zgf: item.zgf, zdf: item.zdf, id: item.id };
      return null;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.block-span{
  width:80px;
  height:26px;
  font-size:20px;
  display: block;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:26px;
  color:rgba(255,255,255,1);
  margin-bottom: 10px;
}
.line{
  display: inline-block;
  width:16px;
  height:0px;
  border:1px solid rgba(255,255,255,1);
  margin-top: 40%;
  margin-left: 2px;
  margin-right: 2px;
}
/deep/
.el-input__inner {
  padding: 4px 3px;
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
}
/deep/ .el-input {
  display: inline;
}
/deep/
.long-el-input_inner .el-input__inner{
  width: 100px;
}
/deep/ .cell {
  height: 55px;
}
/deep/ .el-table td, .el-table th.is-leaf{
  border-bottom: 0px solid #EBEEF5;
}
/deep/ .el-table th.is-leaf{
  border-bottom: 0px solid #EBEEF5;
}
/deep/ .el-table::before{
  height: 0px;
}
/deep/ .el-table__header-wrapper{
  height: 50px;
}
.el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
  vertical-align: top;
}
/deep/ .el-form-item__content{
  display: flex;
  justify-content: center;
}
/deep/ .el-form-item__error {
  padding-top: 0px;
  // width: 200%;
  white-space: nowrap;
  text-align: left;
}
</style>
