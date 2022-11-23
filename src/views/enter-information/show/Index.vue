<template>
    <div class="informationShow">
        <div class="informationShow-left">
            <el-tabs :value="activeName"  class="tabs" type="border-card">
                <el-tab-pane  v-if="isMCDNCI"  label="MCD新收押罪犯个人信息报告表" name="1">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <mcd-new-custody></mcd-new-custody>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane v-for="(item,index) in zfotherList" :key="item.id" :label="item.cplb" :name="String(index - 0 + 2)">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <answer-reult :id="item.id"></answer-reult>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="informationShow-right">
            <el-tabs :value="activeName1" class="tabs" type="border-card" >
                <el-tab-pane v-if="isMCDBO" label="MCD行为观察表" name="1">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <mcd-behavior></mcd-behavior>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane v-if="isMCDISQ" label="MCD面谈甄别问题清单" name="2">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <mcd-interview-pro></mcd-interview-pro>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane v-if="isMCDCA" label="MCD综合评定表" name="3">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <mcd-comprehensive></mcd-comprehensive>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane v-for="(item,index) in jcotherList" :key="item.id" :label="item.cplb" :name="String(index - 0 + 4)">
                    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
                        <answer-reult :id="item.id"></answer-reult>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import McdBehavior from './components/McdBehavior.vue';
import McdNewCustody from './components/McdNewCustody.vue';
import AnswerReult from './components/AnswerReult.vue';
import McdInterviewPro from './components/McdInterviewPro.vue';
import McdComprehensive from './components/McdComprehensive.vue';
export default {
  name: 'InformationShow',
  components: {
    McdBehavior,
    McdNewCustody,
    AnswerReult,
    McdInterviewPro,
    McdComprehensive
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    isMCDNCI() {
      return this.list.filter(item => {
        return item.cplb === 'MCD-NCI';
      }).length;
    },
    isMCDBO() {
      return this.list.filter(item => {
        return item.cplb === 'MCD-BO';
      }).length;
    },
    isMCDISQ() {
      return this.list.filter(item => {
        return item.cplb === 'MCD-ISQ';
      }).length;
    },
    isMCDCA() {
      return this.list.filter(item => {
        return item.cplb === 'MCD-CA';
      }).length;
    },
    activeName() {
      if (this.isMCDNCI) {
        return '1';
      } else {
        return '2';
      }
    },
    activeName1() {
      if (this.isMCDBO) return '1';
      if (this.isMCDISQ) return '2';
      if (this.isMCDNCA) return '3';
      return '4';
    },
    zfotherList() {
      let arr = this.list.filter(item => {
        return item.type === 'zf';
      });
      return arr.filter(item => {
        return item.cplb !== 'MCD-NCI';
      });
    },
    jcotherList() {
      let arr = this.list.filter(item => {
        return item.type === 'jc';
      });
      return arr.filter(item => {
        return item.cplb !== 'MCD-BO' && item.cplb !== 'MCD-ISQ' && item.cplb !== 'MCD-CA';
      });
    }
  },
  created() {
    this.$api.enterInformation.getCriminalScaleList({ zfbh: 'equals$' + this.$route.query.zfbh }).then(res => {
      if (res.errcode === 0) {
        if (res.data && res.data.fxpg_xlcp_cp_cplb_data) {
          this.list = res.data.fxpg_xlcp_cp_cplb_data;
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
    .informationShow{
        display: flex;
        background: url('~@/assets/images/enter_info_bg2.png');
        background-size: 100% 100%;
        height: 100%;
        overflow-y: hidden;
        width: 100%;
        &>div{
            width: 50%;
        }
        /deep/ .el-tabs--border-card{
            background: transparent;
            min-height: 100%;
            &>.el-tabs__header{
              background-color: transparent
            }
        }
    }
    .el-tabs{
        height: 100%;
        /deep/ &__content{
        height: 100%;
            .el-tab-pane{
                height: 100%;
            }
        }
    }
    .app-menu__scrollbar {
        height: 100%;
        width: 100%;
        overflow: hidden;
          .app-menu__wrap {
            overflow-x: hidden;
          }
      }
</style>
