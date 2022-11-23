<template>
    <div style="display:flex">
      <div>
        <el-form :ref="'formList'+index" :model="formList" v-for="(formList,index) in formRows" :key="index" :inline="true" label-width="55px">
           <el-row>
               <el-form-item label="关系" v-if="index !=0">
                   <el-select v-model="formList.cxgx" placeholder="请选择">
                            <el-option
                            v-for="item in cxgx"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
               </el-form-item>
           </el-row>
           <el-row>
               <el-col :span="6.5">
                    <el-form-item label="主题" prop="ztb"  :rules="[{ required: true, message: '主题不能为空',trigger:'change'}]">
                         <!-- //<el-input v-model="formList.ztb" placeholder="请输入内容"></el-input> -->
                        <el-select v-model="formList.ztb" placeholder="请选择">
                            <el-option
                            v-for="item in ztb"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                         <div style="float:right">
                            <span @click="handleSub(formList)"><i class="el-icon-sub"><p>-</p></i></span>
                            <span @click="handleAdd(formList)"><i class="el-icon-add"><p>+</p></i></span>
                        </div>
                    </el-form-item>
               </el-col>
               <el-col :span="5.5">
                    <el-form-item label="字段">
                        <el-select v-model="formList.zdmc" placeholder="请选择" @visible-change="handleZdChange($event,formList.ztb)">
                            <el-option
                            v-for="item in zdmc"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
               </el-col>
               <el-col :span="11.5">
                    <el-form-item>
                        <div class="el-form-nest">
                            <el-form v-for='(item,index) in formList.singleForm' :key="index">
                                <el-form-item label="条件">
                                <el-select v-model="item.tj" placeholder="请选择">
                                    <el-option
                                        v-for="item in tj"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item label="值">
                                    <el-input v-model="item.tjz" placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <!-- <slot name="dynamic"></slot> -->
                                    <div>
                                        <span @click="handleConditionSub(item,formList)"><i class="el-icon-sub"><p>-</p></i></span>
                                        <span @click="handleConditionAdd(item,formList)"><i class="el-icon-add"><p>+</p></i></span>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
               </el-col>
            </el-row>
        </el-form>
      </div>
        <div>
          <slot name="query-operation">
              <el-button  type="primary" @click="handleValidate()">查询</el-button>
          </slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'form-list',
  props: {
    formLis1t: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      cxgx: [],
      ztb: [],
      zdmc: [],
      tj: [],
      tableArr: [],
      options: [],
      tempFormList: {
        singleForm: [{ tj: '', tjz: '' }],
        ztb: '',
        zdmc: '',
        cxgx: 'and',
      },
      formRows: [{
        singleForm: [{ tj: '', tjz: '' }],
        ztb: '',
        zdmc: '',
        cxgx: 'and'
      }],
    };
  },
  created() {
    this.getCxgx();
    this.getCxtj();
    this.getZtb();
  },
  methods: {
    handleAdd(formList) {
      console.log(formList);
      var index = this.formRows.indexOf(formList);
      this.formRows.splice(index + 1, 0, {
        singleForm: [{ tj: '', tjz: '' }],
        ztb: '',
        zdmc: '',
        cxgx: 'and',
      });
    },
    handleSub(formList) {
      var index = this.formRows.indexOf(formList);
      if (this.formRows.length !== 1) {
        this.formRows.splice(index, 1);
      }
    },
    handleConditionAdd(item, formList) {
      var index = formList.singleForm.indexOf(item);
      formList.singleForm.splice(index + 1, 0, { tj: '', tjz: '' });
    },
    handleConditionSub(item, formList) {
      var index = formList.singleForm.indexOf(item);
      if (formList.singleForm.length !== 1) {
        formList.singleForm.splice(index, 1);
      };
    },
    handleValidate() {
      var self = this;
      /* self.tableArr = [];
            this.formRows.forEach((item,index,array) => {
                if(self.tableArr.indexOf(item.ztb) == -1&&item.ztb!=""){
                    console.log(self.tableArr.indexOf(item))
                    self.tableArr.push(item.ztb);
                }
            });
           let option = {
               "table_num": "in$"
           };
           option.table_num = option.table_num.concat(self.tableArr.join(","));
           const {errcode,data} =await  self.$api.fileQuery.getDtbt(option);
           if( errcode == 0){
            self.$emit('dynamicTableData',self.formRows,data.fxpg_glcx_dtbt_data)
           } */

      let newArr = [];
      self.formRows.forEach((item, index) => {
        checkForm('formList' + index);
      });
      function checkForm(arrName) {
        var result = new Promise(function(resolve, reject) {
          self.$refs[arrName][0].validate((valid) => {
            if (valid) {
              resolve();
            } else {
              reject(new Error());
            }
          });
        });
        newArr.push(result);
      };
      Promise.all(newArr).then(function() {
        self.handleSearch();
      }).catch(function() {
        self.$message({
          message: '请选择主题表',
          type: 'error',
        });
      });
    },
    async handleSearch() {
      var self = this;
      self.tableArr = [];
      this.formRows.forEach((item, index, array) => {
        if (self.tableArr.indexOf(item.ztb) === -1 && item.ztb !== '') {
          console.log(self.tableArr.indexOf(item));
          self.tableArr.push(item.ztb);
        }
      });
      let option = {
        'table_num': 'in$'
      };
      option.table_num = option.table_num.concat(self.tableArr.join(','));
      const { errcode, data } = await self.$api.fileQuery.getDtbt(option);
      if (errcode === 0) {
        self.$emit('dynamicTableData', self.formRows, data.fxpg_glcx_dtbt_data);
      }
    },
    async getCxgx() {
      const { data } = await this.$api.fileQuery.getCxgx();
      data.dimData.forEach((item, index, array) => {
        this.cxgx.splice(index, 0, { value: item.value, label: item.text });
      });
    },
    async getCxtj() {
      const { data } = await this.$api.fileQuery.getCxtj();
      data.dimData.forEach((item, index, array) => {
        this.tj.splice(index, 0, { value: item.value, label: item.text });
      });
    },
    async getZtb() {
      const { errcode, data } = await this.$api.fileQuery.getZtb();
      if (errcode === 0) {
        data.fxpg_clcx_ztb_data.forEach((item, index, array) => {
          this.ztb.splice(index, 0, { value: item.table_num, label: item.table_name });
        });
      }
    },
    async handleZdChange(status, ztb) {
      if (status === true) {
        const option = {
          table_num: ztb
        };
        const { errcode, data } = await this.$api.fileQuery.getZdmc(option);
        if (errcode === 0) {
          data.fxpg_glcx_zd_data.forEach((item, index, aray) => {
            this.zdmc.splice(index, 0, { value: item.field_num, label: item.field_name });
          });
        }
      }
      if (status === false) {
        this.zdmc = [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-nest{
    /deep/ .el-form-item{
        margin-bottom: 20px;
    }
}
.el-icon-add, .el-icon-sub{
   width:18px;
   height:18px;
   background:rgba(255,255,255,1);
   opacity:1;
   float: left;
   margin-top: 10px;
   border-radius: 50%;
   cursor: pointer;
   p{
     text-align: center;
     font-weight: bold;
   }
}
i{
    margin-right: 5px;
}
</style>
