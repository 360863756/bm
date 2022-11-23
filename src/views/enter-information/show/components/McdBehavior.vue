<template>
    <div class="mcdBehavior">
        <el-form :model="formData">
             <table border="1">
                <tbody>
                    <tr>
                    <td><span class="pydocx-center"><span class="pydocx-insert"><strong>观察项目</strong></span></span></td>
                    <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert"><strong>行为状况</strong></span></span></td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">健康状况</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.jkzk">
                                <el-radio :label="'良好'">良好</el-radio>
                                <el-radio :label="'生活不能力自理'">生活不能力自理</el-radio>
                                <el-radio :label="'残疾'">残疾</el-radio>
                                <el-radio :label="'智力障碍'">智力障碍</el-radio>
                                <el-radio :label="'多种疾病'">多种疾病</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">心理状况表现</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.xlzk">
                                <el-radio :label="'健康'">健康</el-radio>
                                <el-radio :label="'心理障碍'">心理障碍</el-radio>
                                <el-radio :label="'精神病'">精神病</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">情绪行为表现</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.qxxw">
                                <el-radio :label="'极不稳定'">极不稳定</el-radio>
                                <el-radio :label="'不稳定'">不稳定</el-radio>
                                <el-radio :label="'比较稳定'">比较稳定</el-radio>
                                <el-radio :label="'稳定'">稳定</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">怀疑患有重病</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.hyzb">
                                <el-radio :label="'重度'">重度</el-radio>
                                <el-radio :label="'中度'">中度</el-radio>
                                <el-radio :label="'轻度'">轻度</el-radio>
                                <el-radio :label="'无'">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">同犯人间人际处理</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.rjcl">
                                <el-radio :label="'矛盾冲突'">矛盾冲突</el-radio>
                                <el-radio :label="'不协调'">不协调</el-radio>
                                <el-radio :label="'比较协调'">比较协调</el-radio>
                                <el-radio :label="'协调'">协调</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">发生矛盾处理方式</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.mdcl">
                                <el-radio :label="'伺机报复'">伺机报复</el-radio>
                                <el-radio :label="'争吵打闹'">争吵打闹</el-radio>
                                <el-radio :label="'自己处理'">自己处理</el-radio>
                                <el-radio :label="'向民警汇报'">向民警汇报</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">对民警执法处理纠纷的认识</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.jfcl">
                                <el-radio :label="'极为不公'">极为不公</el-radio>
                                <el-radio :label="'不太公正'">不太公正</el-radio>
                                <el-radio :label="'尚可'">尚可</el-radio>
                                <el-radio :label="'认同'">认同</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">对生活的信心状态</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.xxzt">
                                <el-radio :label="'丧失信心'">丧失信心</el-radio>
                                <el-radio :label="'信心不足'">信心不足</el-radio>
                                <el-radio :label="'无所谓'">无所谓</el-radio>
                                <el-radio :label="'较有信心'">较有信心</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">对法院判决的认识</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.pjrs">
                                <el-radio :label="'定罪不准、量刑不当'">定罪不准、量刑不当</el-radio>
                                <el-radio :label="'定罪适当、量刑太重'">定罪适当、量刑太重</el-radio>
                                <el-radio :label="'定罪不当、量刑尚能接受'">定罪不当、量刑尚能接受</el-radio>
                                <el-radio :label="'定罪和量刑都认可'">定罪和量刑都认可</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">上诉申诉情况</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.ssqk">
                                <el-radio :label="'多次申诉'">多次申诉</el-radio>
                                <el-radio :label="'已提出申诉'">已提出申诉</el-radio>
                                <el-radio :label="'打算以后申诉'">打算以后申诉</el-radio>
                                <el-radio :label="'未上申诉'">未上申诉</el-radio>
                                <el-radio :label="'上诉后重审加重'">上诉后重审加重</el-radio>
                                <el-radio :label="'申诉后改判减轻'">申诉后改判减轻</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">余漏罪坦白及后果</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.tbhg" style="display:block">
                                <el-radio :label="'被他人检举揭发'">被他人检举揭发</el-radio>
                                <el-radio :label="'他人检举后自己交待'">他人检举后自己交待</el-radio>
                                <el-radio :label="'主动交待'">主动交待</el-radio>
                                <el-radio :label="'有余漏罪嫌疑尚未查证'">有余漏罪嫌疑尚未查证</el-radio>
                                <el-radio :label="'坦白交待基本属实'">坦白交待基本属实</el-radio>
                                <el-radio :label="'暴发后加刑较重'">暴发后加刑较重</el-radio>
                                <el-radio :label="'加刑较轻'">加刑较轻</el-radio>
                                <el-radio :label="'未加刑'">未加刑</el-radio>
                                <el-radio :label="'有立功表现'">有立功表现</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">公开宣扬罪犯史</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.xyfzs">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'造成一般影响'">造成一般影响</el-radio>
                                <el-radio :label="'造成较坏影响'">造成较坏影响</el-radio>
                                <el-radio :label="'造成严重影响'">造成严重影响</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">煽动他人有罪不认罪</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.sdtr">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'造成一般影响'">造成一般影响</el-radio>
                                <el-radio :label="'造成较坏影响'">造成较坏影响</el-radio>
                                <el-radio :label="'造成严重影响'">造成严重影响</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">对抗民警管理或侮辱民警</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.dkwr">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'较少'">较少</el-radio>
                                <el-radio :label="'多次'">多次</el-radio>
                                <el-radio :label="'严重'">严重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">打架斗殴</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.djdo">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'情节较轻'">情节较轻</el-radio>
                                <el-radio :label="'情节较重'">情节较重</el-radio>
                                <el-radio :label="'情节严重'">情节严重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">私自制造锐器、钝器和其他工具</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.szzz">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'有'">有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">诬陷其他罪犯</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.wxtr">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'有'">有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">交流犯罪经验或作案手段</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.jljy">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'有'">有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">脱逃</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.tt">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'流露言行'">流露言行</el-radio>
                                <el-radio :label="'预谋'">预谋</el-radio>
                                <el-radio :label="'实施'">实施</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">行凶</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.xx">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'流露言行'">流露言行</el-radio>
                                <el-radio :label="'预谋'">预谋</el-radio>
                                <el-radio :label="'实施'">实施</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">自杀</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.zs">
                                <el-radio :label="'无'">无</el-radio>
                                <el-radio :label="'流露言行'">流露言行</el-radio>
                                <el-radio :label="'预谋'">预谋</el-radio>
                                <el-radio :label="'实施'">实施</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </td>
                    </tr>
                    <tr>
                    <td><span class="pydocx-left"><span class="pydocx-insert">生活作息规律</span></span></td>
                    <td colspan="2">
                        <el-form-item class="row-radio">
                            <el-radio-group  v-model="formData.shzxgl">
                                <el-radio :label="'正常'">正常</el-radio>
                                <el-radio :label="'较为紊乱'">较为紊乱</el-radio>
                                <el-radio :label="'严重紊乱'">严重紊乱</el-radio>
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
</template>
<script>
export default {
  name: 'mcdBehavior',
  data() {
    return {
      formData: {}
    };
  },
  computed: {
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let option = {
        zfbh: this.$route.query.zfbh,
        cplb: 'MCD-BH',
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
            cplb: 'MCD-BH',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-0`,
            zbz: data[`${index}-0`],
            pglx: '1'
          });
          mcdArr.push({
            cplb: 'MCD-BH',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-1`,
            zbz: data[`${index}-1`],
            pglx: '1'
          });
        } else {
          mcdArr.push({
            cplb: 'MCD-BH',
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
  @import "@/style/var.scss";
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
    .mcdBehavior {
        width: 100%;
        margin: 40px auto;
    }
    /deep/ .el-radio__input.is-.is-checked .el-radio__inner{
        background-color: $--color-primary;
        border-color: $--color-primary;
        &::after{
        background-color: $--color-white
    }
    }
</style>
