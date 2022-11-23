<template>
<div class="mcdComprehensive">
        <div class="mcdComprehensive-content">
<el-form :model="formData">
<table border="1">
    <tbody>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">信息源</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">个人信息</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">自述报告</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">行为观察</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">心理测试</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">人身危险</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">性检测</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">结构性</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">面谈</span></span> </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">参考 结论</span></span> </td>
     <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.ckjl" :rows="6"></el-input>
        </el-form-item>
     </td>
     <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.zsbg" :rows="6"></el-input>
        </el-form-item>
     </td>
     <td>
        <el-form-item>
            <el-radio-group v-model="formData.xwgc">
                <el-radio :label="'A'">A</el-radio>
                <el-radio :label="'B'">B</el-radio>
                <el-radio :label="'C'">C</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
        <el-form-item>
            <el-radio-group v-model="formData.xlcs">
                <el-radio :label="'A'">A</el-radio>
                <el-radio :label="'B'">B</el-radio>
                <el-radio :label="'C'">C</el-radio>
            </el-radio-group>
        </el-form-item>
    </td>
     <td>
        <el-form-item>
            <el-radio-group v-model="formData.rswxxjc">
                <el-radio :label="'A'">A</el-radio>
                <el-radio :label="'B'">B</el-radio>
                <el-radio :label="'C'">C</el-radio>
            </el-radio-group>
        </el-form-item>
    </td>
     <td>
        <el-form-item>
            <el-radio-group v-model="formData.jgxmt">
                <el-radio :label="'A'">A</el-radio>
                <el-radio :label="'B'">B</el-radio>
                <el-radio :label="'C'">C</el-radio>
            </el-radio-group>
        </el-form-item>
    </td>
    </tr>
    <tr>
     <td rowspan="5"> <span class="pydocx-center"> <span class="pydocx-insert">综合 评定</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">分类筛查结论</span></span> </td>
     <td colspan="4" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.flscjl">
                <el-radio :label="'A'">A</el-radio>
                <el-radio :label="'B'">B</el-radio>
                <el-radio :label="'C'">C</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">综合评定人员</span></span> </td>
    </tr>
    <tr>
     <td rowspan="3"> <span class="pydocx-center"> <span class="pydocx-insert">重点评估结论（A类罪犯分级）</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">危险指向</span></span> </td>
     <td colspan="3" class="row-radio">
          <el-form-item>
            <el-radio-group v-model="formData.wxzx">
                <el-radio :label="'脱逃'">脱逃</el-radio>
                <el-radio :label="'自杀'">自杀</el-radio>
                <el-radio :label="'暴力'">暴力</el-radio>
                <el-radio :label="'其他'">其他</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td rowspan="3">
        <el-form-item>
            <el-input type="textarea" v-model="formData.zhpdry" :rows="5"></el-input>
        </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"><span class="pydocx-insert">危险等级</span></span> </td>
     <td colspan="3" class="row-radio">
         <el-form-item>
            <el-radio-group v-model="formData.wxdj">
                <el-radio :label="'高度'">高度</el-radio>
                <el-radio :label="'中度'">中度</el-radio>
                <el-radio :label="'低度'">低度</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">诱因提示</span></span> </td>
     <td colspan="3">
         <el-form-item>
            <el-input type="textarea" v-model="formData.yyts" :rows="2"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-left"> <span class="pydocx-insert">改造难易程度</span></span> </td>
     <td colspan="5" class="row-radio">
         <el-form-item>
            <el-radio-group v-model="formData.gznycd">
                <el-radio :label="'难'">难</el-radio>
                <el-radio :label="'一般'">一般</el-radio>
                <el-radio :label="'易'">易</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
    </tr>
    <tr>
     <td colspan="2"> <span class="pydocx-center"> <span class="pydocx-insert">时间</span></span> </td>
     <td colspan="2"> <span class="pydocx-center"> <span class="pydocx-insert">内容摘要</span></span> </td>
     <td colspan="2"> <span class="pydocx-center"> <span class="pydocx-insert">评估结论</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">中后期评估人员</span></span> </td>
    </tr>
    <tr>
     <td rowspan="5"> <span class="pydocx-center"> <span class="pydocx-insert">服</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">刑</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">中</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">期 </span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">年</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">终 </span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">评</span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert"><br /></span> <span class="pydocx-insert">估</span></span> </td>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">一年</span></span> </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.ynnrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.ynpgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.ynzhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">二年</span></span> </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.ennrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.enpgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.enzhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">三年</span></span> </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.snnrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.snpgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.snzhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">四年</span></span> </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.sinnrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.sinpgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.sinzhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">五年</span></span> </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.wnnrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.wnpgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.wnzhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td rowspan="3"> <span class="pydocx-center"> <span class="pydocx-insert">特殊评估</span></span> </td>
     <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.tspg1" :rows="3"></el-input>
        </el-form-item>
     </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg1Nrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.tspg1Pgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg1Zhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.tspg2" :rows="3"></el-input>
        </el-form-item>
     </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg2Nrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.tspg2Pgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg2Zhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.tspg3" :rows="3"></el-input>
        </el-form-item>
     </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg3Nrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.tspg3Pgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.tspg3Zhqpgry" :rows="3"></el-input>
         </el-form-item>
     </td>
    </tr>
    <tr>
     <td> <span class="pydocx-center"> <span class="pydocx-insert">服刑后期</span></span> </td>
          <td>
        <el-form-item>
            <el-input type="textarea" v-model="formData.fxhq" :rows="3"></el-input>
        </el-form-item>
     </td>
     <td colspan="2">
         <el-form-item>
            <el-input type="textarea" v-model="formData.fxhqNrzy" :rows="3"></el-input>
         </el-form-item>
     </td>
     <td colspan="2" class="row-radio">
        <el-form-item>
            <el-radio-group v-model="formData.fxhqPgjl">
                <el-radio :label="'高'">高</el-radio>
                <el-radio :label="'中'">中</el-radio>
                <el-radio :label="'低'">低</el-radio>
            </el-radio-group>
        </el-form-item>
     </td>
     <td>
         <el-form-item>
            <el-input type="textarea" v-model="formData.fxhqZhqpgry" :rows="3"></el-input>
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
</template>
<script>
export default {
  name: 'mcdComprehensive',
  data() {
    return {
      formData: {
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let option = {
        zfbh: this.$route.query.zfbh,
        cplb: 'MCD-CE',
        pglx: '1'
      };
      let { errcode, data } = await this.$api.mcd.fetchData(option);
      if (errcode === 0) {
        data.fxpg_mcd_data.forEach((item) => {
          this.$set(this.formData, item.zbj, item.zbz);
        });
      }
    },
    async handleSubmit() {
      let mcdArr = [];
      Object.keys(this.formData).forEach((item) => {
        mcdArr.push({
          cplb: 'MCD-CE',
          zfbh: this.$route.query.zfbh,
          zbj: item,
          zbz: this.formData[item],
          pglx: '1'
        });
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
/deep/{
    .el-form-item{
        margin-bottom: 0px;
    }
    .el-textarea__inner{
        min-height: 10px !important;
        border: 0px solid #DCDFE6;
        font-size: large;
         background-color: rgba(255,255,255,0);
         resize: none;
         color: #FFFFFF;
    }
    .el-radio{
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 10px;
        color: #FFFFFF;
    }
    .row-radio .el-radio-group{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
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
    .mcdComprehensive {
        width: 100%;
        margin: 20px auto;
    }
</style>
