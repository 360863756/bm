<template>
  <title-panel :title="dialogType">
    <div @click="$router.back()" slot="header-append"> <i class="el-icon-arrow-left"></i> 返回</div>
    <el-form :model="formData" ref="formData" class="el-form" :rules="formRules">
      <el-row style="margin-bottom:15px;">
        <el-col :span="24">
          <div class="little-title_inner">评估因子信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="评估因子名称" label-width="140px" prop="name">
            <el-input v-model="formData.name"
                      style="width: 80%"
                      placeholder="输入因子名称"
                      maxlength="100"></el-input>
            <el-tooltip style="margin: -12px 8px" placement="bottom">
              <div class="info1" slot="content">多个以 / 分隔</div>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风险分值" label-width="140px" prop="riskValue">
            <el-input type="text"
                      v-model.number="formData.riskValue"
                      placeholder="输入0-100的数字" style="width: 55%"
                      maxlength="20"
                      auto-complete="off">
            </el-input><span class="el-form-item__label" style="float:none;color:#FFF;">分</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="评估因子描述" label-width="140px" prop="remark">
            <el-input type="text"
                      v-model="formData.remark"
                      placeholder="输入描述" style="width: 80%"
                      maxlength="1000"
                      auto-complete="off">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"  v-if="kind === 'dt'">
          <el-form-item label="评估标签组" label-width="140px" prop="groupId">
            <el-select v-model="formData.groupId"
                        style="width: 300px"
                        placeholder="选择标签组">
              <el-option
                v-for="item in constCfg.labelGroupList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="label-row">
        <el-col :span="3">
          <div class="little-title_inner">标签规则</div>
        </el-col>
      </el-row>
      <div v-for="(list,fieldIndex) in condList" :key="fieldIndex">
        <el-row v-for="(condData,index) in list" :key="index">
          <el-col :span="24"  v-if="fieldIndex>0 && index==0">
                <el-form-item  label="关系" label-width="140px" prop="field">
                  <el-select v-model="condData.rela"
                             style="width:15%;"
                             placeholder="选择关系">
                    <el-option
                      v-for="item in constCfg.LABEL_RELATION"
                      :key="item.text"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          <el-col :span="5">
            <el-form-item label="主题" v-if="index==0"
                          label-width="140px" prop="field">
              <el-select v-model="condData.tableName"
                          filterable  placeholder="选择主题"
                          clearable @change="fetchField(condData.tableName)">
                <el-option v-for=" table in tableList"
                            :key="table.value"
                            :label="(table.text||table.value)"
                            :value="table.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="index>0"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="getFieldTitle(fieldIndex)"
                          label-width="70px" prop="field" v-if="index==0">
              <el-select v-model="condData.field"
                          filterable
                          placeholder="选择字段"
                          clearable>
                <el-option v-for=" field in tableFieldList"
                            :key="field.value"
                            :label="(field.text||field.value)"
                            :value="field.value"></el-option>
              </el-select>
              <i  v-if="index==0 && dialogType !== 'view'"
                  class="el-icon-plus"
                  style="cursor: pointer;margin-left:5px;margin-top:5px;color:#FFF;"
                  title="增加字段" @click="addFieldRow"></i>
            </el-form-item>
            <el-form-item v-if="index>0"></el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="条件" label-width="50px" prop="cond">
              <el-select v-model="condData.cond"
                          placeholder="选择条件"
                          clearable>
                <el-option
                  v-for="item in constCfg.LABEL_CONDITION"
                  :key="item.text"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="index>0"></el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="值"
                          label-width="50px" prop="val">
              <el-input v-model="condData.val"
                        clearable
                        maxlength="100"
                        placeholder="输入条件对应值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="" style="margin-left:20px">
              <el-button
                @click="addCondtion(fieldIndex)"
                type="info"
                round size="small"
              >
                增加条件
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label=""  v-if="fieldIndex>0 || index>0">
              <el-button style="margin-left: 15px;"
                          v-if="dialogType !== 'view'"
                          @click="deleteFieldCondRow(fieldIndex,index)"
                          button-type="custom"
                          type="text"
                          icon="el-icon-delete"
                          comp-name="删除"
                          title="删除标签"
                          class="text-danger"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:right;margin-top: 25px;">
        <el-button type="primary" @click="formConfirm()"
                    icon="el-icon-success" size="small">
          保 存
        </el-button>
      </div>
    </el-form>
  </title-panel>
</template>
<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
export default {
  name: 'ParameterStatic',
  components: {
    TitlePanel,
  },
  data() {
    return {
      dim: 'cxgx,cxtj,dtpgz',
      dialogType: '动态评估因子新增',
      tableFieldList: [],
      condList: [],
      condData: [],
      formData: {},
      kind: 'dt',
      tableList: [],
      // subjectTableName: ['fxpg_zf_jbxx'],
      constCfg: {
        LABEL_CONDITION: [],
        LABEL_RELATION: [],
        labelGroupList: [],
        LABEL_TYPE: [],
        ZM_TYPE: [],
        ZM_LIST: [],
      },
      formRules: {
        name: [{
          required: true,
          message: '请输入标签名称',
        }],
        remark: [{
          required: true,
          message: '请输入描述',
        }],
        groupId: [{
          required: true,
          message: '请选择标签分组',
        }],
        type: [{
          required: true,
          message: '请选择标签类别',
        }],
        riskValue: [{
          required: true,
          message: '请输入风险值',
        }, { type: 'number', message: '风险值必须为0-100之间的数字' }],
      },
    };
  },
  async created() {
    let id = this.$route.query.id;
    if (id) {
      this.dialogType = '动态评估因子修改';
      this.getCondList(id);
    } else {
      this.addFieldRow();
    }
    this.fetchSubject();
    this.getDimListMutiple(this.dim);
  },
  methods: {
    async getCondList(id) {
      const { data } = await this.$api.parameter.getLabelData(id);
      this.formData = { ...data['labelData'] };
      this.formData.riskValue = Number(this.formData.riskvalue);
      this.condList = data['condList'];
    },
    fetchTableM(options) {
      const params = {
        ...options
      };
      return this.$api.parameter.getTableData(params);
    },
    handSelectionChange(selection) {
      this.selection = [...selection];
    },
    async fetchSubject() {
      const params = { 'type': 'dt' };
      const { data } = await this.$api.parameter.getSubjects(params);
      this.tableList = [...data['fxpg_label_subject_data']];
    },
    async fetchField(newVal) {
      const params = {
        table_name: newVal,
      };
      const { data } = await this.$api.parameter.getFields(params);
      this.tableFieldList = [...data['fxpg_label_subject_field_data']];
    },
    async getDimListMutiple(param) {
      const { data } = await this.$api.parameter.getDimListMutiple(param);
      this.constCfg.LABEL_CONDITION = [...data['cxtj']];
      this.constCfg.LABEL_RELATION = [...data['cxgx']];
      this.constCfg.labelGroupList = [...data['dtpgz']];
    },
    handleUpdate() {
    },
    handleDelete() {
    },
    search(value) {
    },
    addFieldRow() {
      let newCondData = [];
      newCondData.push({
        field: '', // 字段 公用
        fieldname: '', // 字段中文 公用
        cond: '', // 条件  基础标签用
        val: '', // 条件值  基础标签用
        rela: 'and', // 条件关系 基础标签用
        orderNo: '', // 字段顺序 公用
      });
      this.condList.push(newCondData);
    },
    addCondtion(fieldIndex) {
      let selfield = '';
      if (this.condList[fieldIndex].length > 0) {
        selfield = this.condList[fieldIndex][0].field;
      }
      this.condList[fieldIndex].push({
        field: selfield,
        fieldname: '',
        cond: '',
        val: '',
        rela: 'and',
        orderNo: '',
      });
    },
    getFieldTitle(fieldIndex) {
      if (this.condList.length <= 1) {
        return '字段';
      } else {
        return '字段' + (fieldIndex + 1);
      }
    },
    deleteFieldCondRow(fieldIndex, index) {
      this.condList[fieldIndex].splice(index, 1);
      if (this.condList[fieldIndex].length === 0) {
        this.condList.splice(fieldIndex, 1);
      }
    },
    checkValidate() {
      const self = this;
      for (let i = 0; i < self.condList.length; i++) {
        if (self.condList[i][0].field === '') {
          self.$message.error('请选择字段');
          return false;
        }
        for (let k = 0; k < self.condList[i].length; k++) {
          if (self.condList[i][k].cond === '') {
            self.$message.error('请选择条件');
            return false;
          }
          if (self.condList[i][k].val === '' && self.condList[i][0].field !== 'zm') {
            self.$message.error('请输入条件对应的值');
            return false;
          }
          self.condList[i][k].fieldname = self.getFieldCnName(self.condList[i][0].field);
        }
      }
    },
    formConfirm() {
      const self = this;
      try {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            if (self.condList.length === 0) {
              self.$message.error('请配置标签规则');
              return false;
            }
            if (this.checkValidate() === false) return false;
            if (self.dialogType === '动态评估因子修改') {
              self.updateStaticLabel(self.$route.query.id);
            } else {
              console.log(self.condList);
              self.addStaticLabel();
            }
            self.$router.back();
          }
        });
      } catch (error) {
        this.$message.error('提交失败');
        console.error(error);
      }
    },
    async addStaticLabel() {
      const whereSql = this.getWhereSql();
      const rule = this.getRule();
      const fieldName = this.getFieldName();
      const { data } = await this.$api.parameter.getUuid();
      const params = {
        'id': data.uuid,
        'name': this.formData.name,
        'risk_value': this.formData.riskValue,
        'remark': this.formData.remark,
        'where_sql': whereSql,
        'rule': rule,
        'field_name': fieldName,
        'kind': 'dt',
        'subject_table': 'fxpg_zf_jbxx',
        'group_id': this.formData.groupId,
        'creator': this.$store.state.app.userInfo.userCnName,
      };
      const addBatchData = {
        'data': this.getSaveData(data.uuid)
      };
      await this.$api.parameter.addSubLabel(addBatchData);
      const { errcode } = await this.$api.parameter.addLabel(params);
      if (errcode === 0) {
        this.$message.success('添加数据成功');
      } else {
        this.$message.warning('字段有误');
      }
    },
    async updateStaticLabel(id) {
      const whereSql = this.getWhereSql();
      const rule = this.getRule();
      const fieldName = this.getFieldName();
      const params = {
        'id': id,
        'name': this.formData.name,
        'risk_value': this.formData.riskValue,
        'remark': this.formData.remark,
        'where_sql': whereSql,
        'rule': rule,
        'field_name': fieldName,
        'kind': 'dt',
        'subject_table': 'fxpg_zf_jbxx',
        'creator': this.$store.state.app.userInfo.userCnName,
      };
      const addBatchData = {
        'data': this.getSaveData(id)
      };
      await this.$api.parameter.updateSubLabel(addBatchData);
      const { errcode } = await this.$api.parameter.updateLabel(params);
      if (errcode === 0) {
        this.$message.success('修改数据成功');
      } else {
        this.$message.warning('字段有误');
      }
    },
    getSaveData(parentId) {
      let addData = this.condList;
      let addSubData = [];
      console.log(addData.length);
      for (let i = 0; i < addData.length; i++) {
        for (let k = 0; k < addData[i].length; k++) {
          addData[i][k].parent_id = parentId;
          addData[i][k].table_name = 'fxpg_zf_jbxx';
          addSubData.push(addData[i][k]);
        }
      }
      return addSubData;
    },
    getWhereSql() {
      let rulesql = '';
      for (let k = 0; k < this.condList.length; k++) {
        for (let i = 0; i < this.condList[k].length; i++) {
          const cond = this.condList[k][i].cond;
          const val = this.condList[k][i].val;
          if (i === 0) {
            rulesql = rulesql + '(' + this.condList[k][0].field;
          } else {
            rulesql = rulesql + ' and ' + this.condList[k][0].field;
          }
          if (this.condList[k][0].field === 'zm') { // 罪名时特殊处理
            if (val === '') {
              rulesql = rulesql + ' in (\'' + cond + '\')';
            } else {
              rulesql = rulesql + ' in (\'' + val + '\')';
            }
          } else {
            if (cond === 'in') {
              // rulesql = rulesql + ' in (\'' + val + '\')';
              rulesql = rulesql + ' like \'%' + val + '%\'';
            } else if (cond === 'not in') {
              // rulesql = rulesql + ' not in (\'' + val + '\')';
              rulesql = rulesql + ' not like \'%' + val + '%\'';
            } else if (cond === 'like_head%') {
              rulesql = rulesql + ' like \'' + val + '%\'';
            } else if (cond === 'not_like_head%') {
              rulesql = rulesql + ' not like \'' + val + '%\'';
            } else if (cond === 'like_tail%') {
              rulesql = rulesql + ' like \'%' + val + '\'';
            } else if (cond === 'not_like_tail%') {
              rulesql = rulesql + ' not like \'%' + val + '\'';
            } else {
              rulesql = rulesql + cond + '\'' + val + '\'';
            }
          }
          if (i === this.condList[k].length - 1) { // 每个字段的结束条件加（
            rulesql = rulesql + ')';
          }
        }
        if (k < this.condList.length - 1) { // 如果是多个字段，字段之间需要and or
          rulesql = rulesql + ' ' + this.condList[k + 1][0].rela + ' ';
        }
      }
      if (this.condList.length === 1) { // 如果只有一个字段，则不加（）
        rulesql = rulesql.substr(1, rulesql.length - 2);
      }
      return rulesql;
    },
    async getSubject() {
      let subjectStr = '';
      for (let k = 0; k < this.condList.length; k++) {
        if (k === 0) {
          subjectStr += "'" + this.condList[0][0].tableName + "'";
        } else if (k !== 0 && subjectStr.indexOf(this.condList[k][0].tableName) === -1) {
          subjectStr += ',' + "'" + this.condList[k][0].tableName + "'";
        }
      }
      const { data } = await this.$api.parameter.getFields(subjectStr);
      const temp = data.defalutFields || [];
      const fieldArr = [];
      if (temp !== null && temp.length > 0) {
        for (let i = 0; i < temp.length; i++) {
          fieldArr.push(temp[i].columnname);
        }
      }
      this.selectField = fieldArr;
      this.tableTitle = data.defalutFields;
      this.subjectField = data.subjectFields;
    },
    getRule() {
      let rulestr = '';
      for (let k = 0; k < this.condList.length; k++) {
        for (let i = 0; i < this.condList[k].length; i++) {
          // this.condList[i].fieldname = this.getFieldCnName(this.condData[i].field);
          if (rulestr !== '' && i !== 0) { // 同一字段的不同条件之间用and关联
            rulestr = rulestr + ' 并且 ';
          }
          if (i === 0) { // 每个字段的开始条件加（
            rulestr = rulestr + '(';
          }
          if (this.condList[k][0].field === 'zm') {
            rulestr = rulestr + this.condList[k][0].fieldname.trim() + '=' + this.getCondCn(this.condList[k][i].cond);
            if (this.condList[k][i].val !== '') {
              rulestr = rulestr + '-' + this.condList[k][i].val;
            }
          } else {
            rulestr = rulestr + this.condList[k][0].fieldname.trim() + this.getCondCn(this.condList[k][i].cond) + this.condList[k][i].val;
          }
          if (i === this.condList[k].length - 1) { // 每个字段的结束条件加（
            rulestr = rulestr + ')';
          }
        }
        if (k < this.condList.length - 1) { // 基础标签，如果是多个字段，字段之间需要and or
          rulestr = rulestr + ' ' + this.getRelaCn(this.condList[k + 1][0].rela) + ' ';
        }
      }
      if (this.condList.length === 1) { // 基础标签，如果只有一个字段，则不加（）
        rulestr = rulestr.replace('(', '').replace(')', '');
      }
      return rulestr;
    },
    getCondCn(cond) {
      for (let i = 0; i < this.constCfg.LABEL_CONDITION.length; i++) {
        if (this.constCfg.LABEL_CONDITION[i].value === cond) {
          return this.constCfg.LABEL_CONDITION[i].text;
        }
      }
      return cond;
    },
    getRelaCn(rela) {
      for (let i = 0; i < this.constCfg.LABEL_RELATION.length; i++) {
        if (this.constCfg.LABEL_RELATION[i].value === rela) {
          return this.constCfg.LABEL_RELATION[i].text;
        }
      }
      return rela;
    },
    getFieldCnName(field) {
      for (let i = 0; i < this.tableFieldList.length; i++) {
        if (this.tableFieldList[i].value === field) {
          return this.tableFieldList[i].text;
        }
      }
      return field;
    },
    getFieldName() {
      let fieldName = '';
      for (let i = 0; i < this.condList.length; i++) {
        fieldName = fieldName + ',' + this.condList[i][0].fieldname;
      }
      return fieldName.substring(1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
  /deep/ .c-titlePanel-header__append{
    color: $--color-primary;
    font-size: 20px;
    cursor: pointer;
  }
  .little-title_inner{
    color: $--color-text-primary;
    font-size: 16px;
  }
  .text-danger{
    color:#ff0000;
  }
</style>
