<template>
<div class="mcdInterviewPro">
    <div class="mcdInterviewPro-content">
    <div>
        <el-form :model="formData" style="width:100%">
        <div style="display:flex;justify-content: space-around">
        <el-form-item label="编号：" style="display:flex;">
             <el-input  v-model="formData.zfbh"></el-input>
        </el-form-item>
        <el-form-item label="服刑人员姓名：" style="display:flex;">
             <el-input  v-model="formData.zfxm"></el-input>
        </el-form-item>
        </div>
        <table border="1" style="table-layout:fixed;">
        <tbody>
            <tr>
            <td><span class="pydocx-center">面谈时间</span></td>
            <td>
                <el-form-item>
                    <el-date-picker
                        prefix-icon="<span></span>"
                        v-model="formData.mtsj"
                        value-format="yyyy年M月d日"
                        type="date">
                    </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2"><span class="pydocx-center">面谈地点</span></td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.mtdd"></el-input>
                </el-form-item>
            </td>
            <td><span class="pydocx-center">面谈民警</span></td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.mtmj"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><span class="pydocx-center">问题清单</span></td>
            <td colspan="6"><span class="pydocx-center">回答情况记载</span></td>
            </tr>
            <tr>
            <td colspan="1"><strong>精神状态：</strong><br />1、外观形象、行为表现、体型、衣着、典型（或反常）行为表现。<br />2、近期有无感到苦恼或不愉快、愉快的经历。<br />3、回答中自相矛盾或存在疑问的方面。</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.jszt"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><strong>个人成长史：</strong><br />1、生活状况。<br />2、兴趣爱好。<br />3、与自己交往最多、最密切的人有几个及对自己的影响。<br />4、交往朋友中有无违法犯罪的（无、多、少）。5、重大生活事件：（家庭变故、打架斗殴、逃学、吸毒、恋爱挫折、非法性关系、酗酒、赌博、同性恋等及对自己有何影响。）<br />6是否服过刑，对此次服刑的看法。</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="18"  v-model="formData.grczs"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><strong>教育状况：</strong><br />1、学业成绩：好的方面、差的方面。<br />2、与老师、同学间的关系（关系不良的原因）</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.jyzk"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><strong>工作状况：</strong><br />1、工作类型、工作时间。2、调换工作原因。<br />3、与同事关系。<br />4、有无压力和焦虑</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.gzzk"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><strong>家庭状况：</strong><br />1、对父母的评价：（是个什么样的人）<br />2、与兄弟姐妹的关系：（和谁最好，为什么；父母喜欢其中谁，不喜欢谁，为什么。）<br />3、与妻子（女友）的关系，对妻子的评价。<br />4、与子女的关系：（有几个子女，最喜欢谁，不喜欢谁，为什么？）<br />5、你对自己的评价：（个性、优缺点）</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="18"  v-model="formData.jtzk"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">犯罪经过：<br />1、作案动机。2、作案过程。3、当时的心理状况。4、事后的心理状况。</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.fzjg"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">心理健康史：<br />有无心理咨询、心理治疗、用药历史及过程</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.xljks"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">其它<br />最担心的问题；目前存在的困难或影响改造的因素</td>
            <td colspan="6">
                <el-form-item>
                    <el-input type="textarea" :rows="8"  v-model="formData.qt"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td rowspan="7" colspan="1">心理评估：<br />从心理健康、人格倾向、行为偏差等方面分析，是否存在严重情况，并深入剖析深层次原因。</td>
            <td colspan="2">心理健康程度</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.xljkcd">
                        <el-radio :label="'高'">高</el-radio>
                        <el-radio :label="'中'">中</el-radio>
                        <el-radio :label="'低'">低</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">人格特点：</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.nwx">
                        <el-radio :label="'内向'">内向</el-radio>
                        <el-radio :label="'外向'">外向</el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="formData.xg">
                        <el-radio :label="'性格急躁'">性格急躁</el-radio>
                        <el-radio :label="'性格不急躁'">性格不急躁</el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="formData.pz">
                        <el-radio :label="'偏执'">偏执</el-radio>
                        <el-radio :label="'不偏执'">不偏执</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">生理健康状况</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.sljkzk">
                        <el-radio :label="'健康'">健康</el-radio>
                        <el-radio :label="'一般'">一般</el-radio>
                        <el-radio :label="'残疾'">残疾</el-radio>
                        <el-radio :label="'有严重疾病'">有严重疾病</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">社会支持系统</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.shzcxt">
                        <el-radio :label="'良好'">良好</el-radio>
                        <el-radio :label="'一般'">一般</el-radio>
                        <el-radio :label="'差'">差</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">对判决的态度</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.pjtd">
                        <el-radio :label="'服从判决'">服从判决</el-radio>
                        <el-radio :label="'有异议能接受'">有异议能接受</el-radio>
                        <el-radio :label="'有异议'">有异议</el-radio>
                        <el-radio :label="'完全不认同'">完全不认同</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">行为方式（是否喜欢用暴力方式或极端方式解决问题）</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.xwfs">
                        <el-radio :label="'是'">是</el-radio>
                        <el-radio :label="'否'">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2">当前情绪状态</td>
            <td colspan="4">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.qxzt">
                        <el-radio :label="'稳定'">稳定</el-radio>
                        <el-radio :label="'异常'">异常</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1"><span class="pydocx-left">危险程度分类</span></td>
            <td colspan="6">
            <el-form-item class="row-radio">
                <el-radio-group v-model="formData.wxcdfl">
                    <el-radio :label="'A'">A</el-radio>
                    <el-radio :label="'B'">B</el-radio>
                    <el-radio :label="'C'">C</el-radio>
                </el-radio-group>
            </el-form-item>
            </td>
            </tr>
        </tbody>
        </table>
        <el-form-item style="margin-top:20px;margin-bottom:20px;float:right">
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
        </el-form-item>
        </el-form>
    </div>
</div>
</div>
</template>
<script>
export default {
  name: 'mcdInterviewPro',
  data() {
    return {
      formData: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let option = {
        zfbh: this.$route.query.zfbh,
        cplb: 'MCD-IP',
        pglx: '1'
      };
      let { errcode, data } = await this.$api.mcd.fetchData(option);
      if (errcode === 0) {
        data.fxpg_mcd_data.forEach((item) => {
          if (item.zbj.indexOf('-') !== -1) {
            if (this.formData[item.zbj.slice(0, item.zbj.indexOf('-'))] === undefined) {
              this.$set(this.formData, item.zbj.slice(0, item.zbj.indexOf('-')), [item.zbz]);
            } else {
              this.formData[item.zbj.slice(0, item.zbj.indexOf('-'))].push(item.zbz);
            }
          } else {
            this.$set(this.formData, item.zbj, item.zbz);
          }
        });
        Object.keys(this.formData).forEach((index) => {
          // 判断日期数组内元素值大小，需要保证第一个数小于第二个数
          if (this.formData[index] instanceof Object) {
            if (Number(this.formData[index][0]) > Number(this.formData[index][1])) this.formData[index].reverse();
          }
        });
      }
    },
    async handleSubmit() {
      let mcdArr = [];
      var data = JSON.parse(JSON.stringify(this.formData));
      Object.keys(this.formData).forEach((index, item) => {
        if (this.formData[index] instanceof Object) {
          data[`${index}-0`] = this.formData[index][0];
          data[`${index}-1`] = this.formData[index][1];
          delete data[index];
          mcdArr.push({
            cplb: 'MCD-IP',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-0`,
            zbz: data[`${index}-0`],
            pglx: '1'
          });
          mcdArr.push({
            cplb: 'MCD-IP',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-1`,
            zbz: data[`${index}-1`],
            pglx: '1'
          });
        } else {
          mcdArr.push({
            cplb: 'MCD-IP',
            zfbh: this.$route.query.zfbh,
            zbj: index,
            zbz: data[index],
            pglx: '1'
          });
        }
      });
      let option = {
        data: mcdArr
      };
      let { errcode } = await this.$api.mcd.insertData(option);
      if (errcode === 0) {
        this.$message({
          message: '量表数据已成功保存',
          type: 'success'
        });
      } else {
        this.$message.error('请检查数据是否有误');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ {
    .el-form .el-input__inner{
        width: 100%;
        background: rgba(255, 255, 255, 0);
        color: #FFFFFF;
    }
    .el-form-item{
        margin-bottom: 0px;
    }
    .el-textarea__inner{
        min-height: 10px !important;
        border: 0px solid #DCDFE6;
        font-size: large;
        background-color: rgba(255,255,255,0);
        color: #FFFFFF;
        resize:none
    }
    .el-range-input{
        background-color: rgba(255,255,255,0);
        color: #FFFFFF;
    }
    .el-radio{
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 10px;
        color: #FFFFFF;
    }
    .row-radio .el-radio-group{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .el-input--prefix .el-input__inner{
        padding-left: 5px
    }
    .el-input--suffix .el-input__inner{
        padding-right: 20px;
    }
    .el-form-item__label{
        color: #FFFFFF;
    }
}
    table{
    border: 1px solid #FFFFFF;
    width: 100%;
    table-layout:fixed;
    }
    td{
        text-align: center;
        color: #FFFFFF;
        padding: 10px;
        word-break:break-all;
        word-wrap:break-word;
    }
    .pydocx-center {
        text-align: center;
    }
    .pydocx-insert {
        color: #FFFFFF
    }
    .mcdInterviewPro {
        width: 100%;
        margin: 0 auto;
    }
</style>
