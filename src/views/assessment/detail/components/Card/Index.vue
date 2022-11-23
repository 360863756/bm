<template>
  <div class="c-card-content">
    <div class='c-card-content__avatar'>
      <el-avatar shape="square" :fit="'fill'" :src="cardInfo[params.imgIndex]" @error="errorHandler">
        <img src="@/assets/images/image-people.png"/>
      </el-avatar>
      <!-- <img :src="cardInfo[params.imgIndex]" /> -->
        <!-- <img :src="@/assets/images/Avatar.png" /> -->
    </div>
    <table class="c-card-content__table">
        <tr v-for="item in params.fields" :key="item.index">
            <td class='c-card-content__subtitle'>{{item.label}}</td>
            <td :class="item.valClass">
                <i class='c-card-content__sign' v-if="item.valIcon" :class="cardInfo[item.valIcon]"></i>
                {{ cardInfo[item.index] }}
                <span v-if="cardInfo && cardInfo[item.index] != null && item.appendText">{{ item.appendText }}</span>
            </td>
        </tr>
        <slot name="footer" :data="cardInfo"></slot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {
  },
  props: {
    params: Object,
    info: Object
  },
  data() {
    return {
      cardInfo: {},
    };
  },
  created() {
    if (!this.info) {
      this.$emit('fetch-card-info', res => {
        this.cardInfo = res;
      });
    } else {
      this.cardInfo = this.info;
    }
  },
  methods: {
    errorHandler() {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.c-card-content {
  div{
    line-height: 20px;
  }
  &__table{
    width: 191px;
    tr{
      line-height: 20px;
      font-size: 16px;
      td:first-child{
        color: $--color-text-regular;
      }
    }
    tr td:nth-child(2){
      font-size: 16px;
      line-height: 20px;
    }
  }
  &__avatar {
    width: 191px;
    height: 205px;
    background: rgba(3, 20, 38, 1);
    margin-bottom: 10px;
    padding: 12px;

    // img{
    //   width: 166px;
    //   height: 180px;
    // }
  }
  &__subtitle {
    display: inline-block;
    width: 80px;
    line-height: 30px;
    font-size: 16px;
    text-align: right;
    color: $--color-text-regular;
  }
  // .merge {
  //   text-align: center;
  //   color: $--color-white;
  //   font-size: 16px;
  //   span {
  //     display: inline-block;
  //     background-image: url('~@/assets/images/static-assess.png');
  //     width: 42px;
  //     height: 49px;
  //     vertical-align: middle;
  //     padding-top: 13px;
  //     margin-left: 5px;
  //   }
  // }
  &__sign {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    position: relative;
    top: 2px;
  }
  .high{
    background: $--color-grade-high;
  }
  .center{
    background: $--color-grade-center;
  }
  .low{
    background: $--color-grade-low;
  }
}
</style>
