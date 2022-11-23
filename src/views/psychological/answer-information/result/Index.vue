<template>
    <title-panel title='评估结果'>
      <div class="back" slot="header-append" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>返回
      </div>
      <div class="info-box">
        <div class="info-box__header">基本信息</div>
        <div class="content">
            <div class='content__left img-bgc'>
                <div class="avatar">
                  <el-avatar shape="square" :fit="'fill'" :src="info[cardParams.imgIndex]" @error="errorHandler">
                    <img src="@/assets/images/image-people.png"/>
                  </el-avatar>
                    <!-- <img :src="info[cardParams.imgIndex]"/> -->
                </div>
            </div>
            <div class="content__right">
                <div class="data-col" v-for="(col, index) in colFields" :key="'info_' + index">
                    <table class="content__table">
                        <tr v-for="item in col" :key="item.index">
                            <td class="desc">{{ item.label }}</td>
                            <td class="val " :class="item.stateClass">
                                {{ info[item.index] }}
                                <i v-if="item.valClass"></i>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-box__header result-header">评估结果</div>
        <div class="content">
            <div class='content__left'>
                <div class="result-item">
                    <p class="result-item__desc">评估民警</p>
                    <i class="result-item__val">{{ info.pgmj || 'XXX' }}</i>
                </div>
                <div class="result-item">
                    <p class="result-item__desc">评估得分</p>
                    <i class="grade">{{ info.pgdf }}</i>
                </div>
                <div class="result-item">
                    <p class="result-item__desc">评估结论</p>
                    <span class="result-item__val">{{ info.pgjl }}</span>
                </div>
            </div>
            <div class="content__right">
                <div class="sub-content">
                    <div class="sub-content__title">表现形式</div>
                    <div class="sub-content__desc">{{ info.bxxs }}</div>
                </div>
            </div>
        </div>
      </div>
    </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import { cardParams } from './cardParams';
export default {
  name: 'PsychologicalAnswerInformationResult',
  components: {
    TitlePanel
  },
  data() {
    return {
      cardParams,
      info: {}
    };
  },
  created() {
    this.fetchEvalResult();
  },
  computed: {
    colFields: function() {
      let { rowCount, fields } = this.cardParams;
      let cols = [];
      for (let i = 0; i < this.colCount; i++) {
        if (i !== this.colCount - 1) {
          cols.push(fields.slice(i * rowCount, (i + 1) * rowCount));
        } else {
          cols.push(fields.slice(i * rowCount));
        }
      }
      return cols;
    },
    colCount: function() {
      let { rowCount, fields } = this.cardParams;
      let len = fields.length;
      return len / rowCount;
    }
  },
  methods: {
    fetchEvalResult() {
      let data = this.$route.query;
      this.$api.psychological.psychologicalResult(data).then(res => {
        if (res.errcode === 0) {
          let data = res.data.fxpg_xlcp_pgjg_data;
          if (data && data.length > 0) {
            this.info = data[0];
          }
        }
      });
    },
    errorHandler() {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.back{
  font-size:20px;
  line-height: 26px;
  color: $--color-primary;
  cursor: pointer;
}
/deep/ .c-titlePanel{
  &-body {
    height: auto;
    border: 6px solid #4192F3;
    border-right: none;
    border-image: linear-gradient(to right, #1680ff, rgba(22, 128, 255, 0.06)) 40 40;
  }
}
.info-box{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  margin-left: 40px;
  margin-bottom: 40px;
  &__header{
    width: 30%;
    height: 43px;
    line-height: 43px;
    padding-left: 16px;
    border-left: 3px solid rgba(22,128,255,1);
    font-size:20px;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-shadow:0px 0px 6px rgba(0,162,255,0.42);
    background:linear-gradient(90deg,rgba(0,76,255,0.6) 0%,rgba(0,76,255,0) 100%);
  }
  .result-header{
    border-left: 3px solid rgba(255,61,0,1);
    background:linear-gradient(90deg,rgba(255,61,0,0.6) 0%,rgba(255,61,0,0) 100%);
  }
  .content{
    div{
      cursor: auto;
    }
    width: 100%;
    height: auto;
    // min-height: 210px;
    min-height: 106px;
    display: flex;
    justify-content: flex-start;
    border-radius:$--border-radius-base;
    margin-top: 40px;
    margin-left: 40px;
    &__left{
      width: 164px;
      margin-right: 100px;
      .avatar{
        width: 104px;
        height: 112px;
        border-radius:4px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .result-item{
        width: 80%;
        height: 30%;
        margin-left: 10%;
        text-align: center;
        &__desc{
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 20px;
          color: $--color-primary;
        }
        &__val{
          opacity: 0.9;
          color: $--color-red;
        }
        .grade{
          font-size: 25px;
          font-weight: 600;
          color: $--color-red;
        }
      }
    }
    .img-bgc{
      width: 119px;
      height: 128px;
      padding: 7px;
      background: $--color-light-grey;
      border-radius:$--border-radius-base;
    }
    &__right{
      width: calc(85% - 164px);
      min-width: 700px;
      display: flex;
      justify-content: space-around;
      .data-col{
        flex: 1;
        height: 100%;
      }
    }
    .sub-content{
      &__title{
        color: $--color-primary;
        margin-bottom: 10px;
      }
      &__desc{
        color: $--color-text-regular;
        line-height: 30px;
        letter-spacing: 2px;
      }
    }
    &__table{
      width: 100%;
      height: 100%;
      .desc{
        text-align: right;
        color:$--color-text-regular;
      }
      .val{
        padding-left: 10px;
        color:$--color-white;
      }
      .finish{
        color: $--color-info;
      }
    }
  }
}
</style>
