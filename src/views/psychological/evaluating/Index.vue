<template>
<title-panel title="评测内容配置">
        <query-table
            ref="queryTable"
            :table-fields="tableFields"
            :fetch-method="fetchTableM"
            :show-row-operation='false'
            row-operation-width="80px"
            layout="total, sizes , -> , pager, next"
            :max-table-height='true'
        >
        <div class="c-query-table-caution" slot="caution-append">
           <el-button  type="primary"  @click="openPerpleSet">人员配置</el-button>
        </div>
        </query-table>
        <el-dialog
          title="人员配置"
          :visible.sync="dialogVisible"
          width="50%"
          top="200px"
          :before-close="handleClose">
              <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="ruleForm">
                <p class="form-title">基础信息</p>
                   <el-form-item label="监区:" prop="jqdm">
                        <el-select @change='jqdmChange'  v-model="ruleForm.jqdm" placeholder="选择">
                          <el-option v-for="item in ruleFormData.jqdmList" :key="item.areacode" :label="item.arecname" :value="item.areacode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="编号:" prop="zfbh">
                        <el-select @change='zfbhChange' filterable  clearable  v-model="ruleForm.zfbh" placeholder="请输入">
                          <el-option v-for="item in ruleFormData.zfbhList" :key="item.areacode" :label="item.zfxm+'('+item.zfbh+')'" :value="item.zfbh"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="姓名:" prop="zfxm">
                        <el-input clearable  v-model="ruleForm.zfxm" placeholder="请输入">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="评估终端:" prop="cpzd">
                        <el-select clearable  v-model="ruleForm.cpzd" placeholder="请选择">
                          <el-option v-for="item in ruleFormData.cpzdList" :key="item.value" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <p class="form-title">评估内容</p>
                    <el-form-item  label="评估阶段:" prop="cpjd">
                        <el-select @change="cpjdChange" clearable  v-model="ruleForm.cpjd" placeholder="请选择">
                          <el-option v-for="item in ruleFormData.cpjdList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评估主题:" prop="cplb">
                        <el-select @change="cplbChange" clearable filterable multiple v-model="ruleForm.cplb" placeholder="请选择">
                           <el-option v-for="item in ruleFormData.cplbList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="cancel">取 消</el-button>
              </span>
        </el-dialog>
</title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryTable from '@/components/QueryTable/Index.vue';
import { tableFields } from './tableFields';
export default {
  name: 'PsychologicalAnswerInformation',
  components: {
    TitlePanel,
    QueryTable
  },
  data() {
    return {
      tableFields,
      cautionDataNumber: 10,
      dialogVisible: false,
      ruleFormData: {
        jqdmList: [],
        zfbhList: [],
        cpzdList: [],
        cpjdList: [],
        cplbList: []
      },
      ruleForm: {
        jqdm: '',
        zfbh: '',
        zfxm: '',
        cpzd: '',
        cpjd: '',
        cplb: ''
      },
      rules: {
        jqdm: [{ required: true, message: '请选择监区', trigger: 'change' }],
        zfbh: [{ required: true, message: '请输入编号', trigger: 'change' }],
        zfxm: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        cpzd: [{ required: true, message: '请选择评估终端', trigger: 'change' }],
        cpjd: [{ required: true, message: '请选择评估阶段', trigger: 'change' }],
        cplb: [{ required: true, message: '请选择评估主题', trigger: 'change' }],
      },
      file: {}
    };
  },
  computed: {
  },
  async created() {
    this.getPrisonData();
  },
  methods: {
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.psychological.getPsychologicalEvaluatingData(params);
    },
    async getPrisonData() {
      const { data } = await this.$api.app.getPrisonData();
      this.ruleFormData.jqdmList = data['areaList_data'];
    },
    async jqdmChange(value) {
      const params = {
        jqdm: value
      };
      const { data } = await this.$api.psychological.getCrimianlList(params);
      this.ruleFormData.zfbhList = data['criminal_info_data'];
    },
    async zfbhChange(value) {
      const obj = this.ruleFormData.zfbhList.find(item => {
        return item.zfbh === value;
      });
      this.ruleForm.zfxm = obj.zfxm;
    },
    async cplbChange(value) {
    },
    async cpjdChange(value) {
      const obj = this.ruleFormData.cpjdList.find(item => {
        return item.value === value;
      });
      let params = {
        cpjd: obj.value
      };
      const { data } = await this.$api.psychological.getEvaluatingCpztData(params);
      this.ruleFormData.cplbList = data['fxpg_xlcp_lbbm_data'];
    },
    async openPerpleSet() {
      this.dialogVisible = true;
      const { data } = await this.$api.psychological.getDimListMutiple();
      this.ruleFormData.cpzdList = data['evaluationTerminal'];
      this.ruleFormData.cpjdList = data['scaleType'];
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs['ruleForm'].resetFields();
          done();
        })
        .catch(_ => {});
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs['ruleForm'].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const cplblist = this.ruleForm.cplb;
          let cpdata = [];
          for (let i = 0; i < cplblist.length; i++) {
            cpdata.push({ ...this.ruleForm });
            cpdata[i].cplb = cplblist[i];
            cpdata[i].cpzt = '0';
            cpdata[i].is_delete = '1';
            cpdata[i].creator = this.$store.state.app.userInfo.userCnName;
            cpdata[i].createTime = new Date().toLocaleDateString().replace(/\//g, '-');
          }
          this.ruleForm.cplb = this.ruleForm.cplb.toString();
          const options = {
            'data': cpdata,
            // ...this.ruleForm,
            // 'cpzt': 0,
            // 'is_delete': '1',
            // 'createTime': new Date().getTime()
          };
          const { errcode } = await this.$api.psychological.uploadPersonInformation(options);
          if (errcode === 0) {
            this.$message.success('添加数据成功');
            this.cancel();
          } else {
            this.$message.warning('上传字段有误');
          }
        } else {
          return false;
        }
      });
    },
    handleChange(file) {
      this.file = file;
    },
    customRequest({
      file,
      onSuccess,
      onError
    }) {
      let formData = new FormData();
      formData.append('file', file);
      return this.FesApi.fetch('service/fileUpload', formData).then(rst => {
        onSuccess(rst);
      }, onError);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.c-query-table-caution{
  display: flex;
  flex-direction: row-reverse;
  p{
    display: flex;
    align-items: center;
    flex: 1;
  }
  /deep/ .el-upload{
    width: 100px;
    height: 40px;
    margin-left: 20px;
    .el-button{
      width: 100%;
      height: 100%;
      font-size: 14px;
    }
  }
}
.ruleForm{
  width: 60%;
  margin:0 20%;
  .el-form-item__content{
    .el-select{
      width: 100%;
    }
  }
  .el-form-item.is-required{
    /deep/ .el-form-item__label::before{
      content: ''
    }
  }
}
/deep/ .el-dialog{
  background-color: rgba(24,33,61, 0.99);
  padding: 0 20px;
  .el-dialog__header{
    border-bottom: 1px solid rgba(36,120,255,0.25);
    padding: 20px 0 10px;
    .el-dialog__title{
      color: $--color-primary;
    }
    button{
      i{
        color: $--color-primary;
      }
    }
  }
  .el-dialog__body{
    padding-top: 0px;
  }
  .form-title{
    color: $--color-primary;
    margin:20px 0;
  }
  .dialog-footer{
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    justify-content: center;
    .el-button{
      width: 150px;
      height: 40px;
      margin: 0 30px;
      &:nth-child(2){
        background-color: transparent;
        border-color: $--color-text-regular;
    }
    }
  }
  .el-dialog__headerbtn{
    .el-dialog__close::before{
      color:$--color-text-regular
    }
  }
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #2478FF;
    background-color: #18213c;
}
</style>
