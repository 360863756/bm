<template>
  <el-card class="c-content-panel__box-card">
    <div slot="header" class="box-card__header">
      <div>评估内容：{{ content.cplb }}</div>
      <div>评估时间：{{ content.pgsj }}</div>
      <el-button type="primary" class="box-card__header-btn" @click="() => goDetail(content.id)">试题情况</el-button>
    </div>
    <div class="text item">
      <div class="box-card__subheader">
        <div class="box-card__subheader-item">
          <span class="item-title">评估得分</span><i class="grade">{{ content.cpdf }}</i>
        </div>
        <div class="box-card__subheader-item">
          <span class="item-title">评估结论</span><span class="desc">{{ content.pgjl }}</span>
        </div>
      </div>
      <div class="box-card__content">
        <span class="item-title">表现形式</span>
        <div class="item-content">{{ content.bxxs }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ContentPanel',
  components: {
  },
  props: {
    content: Object,
  },
  data() {
    return {};
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: '/psychological/answer-information/detail',
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.item-title{
  display: inline-block;
  width: 90px;
  line-height: 30px;
}
.el-card{
  background-color: transparent;
  border: transparent;
  margin-bottom: 20px;
  /deep/ .el-card__header{
    padding: 0;
    padding-bottom: 10px;
    border-color: $--color-text-regular;
  }
  .item-title{
    display: inline-block;
    width: 90px;
    line-height: 30px;
  }
}
.box-card{
  &__header{
    color: $--color-primary;
    display: flex;
    justify-content: space-between;
    &-btn{
      width:92px;
      height:34px;
      background-color: transparent;
      color: $--color-primary;
      padding: 10px;
      // &:hover{
      //   background: transparent;
      //   background-color: transparent;
      //   color: $--color-primary;
      // }
    }
  }
  &__subheader{
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    &-item{
      margin-right: 80px;
      .grade{
        color: $--color-red;
        font-size: 20px;
      }
      .desc{
        color: $--color-red;
      }
    }
  }
  &__content{
    width: 100%;
    .item-title{
      vertical-align: top;
      line-height: 30px;
    }
    .item-content{
      display: inline-block;
      width: calc(100% - 90px);
      color: $--color-text-regular;
      line-height: 30px;
      letter-spacing: 2px;
    }
  }
}
</style>
