<template>
  <div>
    <div class="c-examinationCard__title">
      <div>{{examinationBh}}</div>
      <div :class="isHiddenTitle ? 'c-examinationCard__hiddenTitle' : ''" :title="examinationTitle">{{examinationTitle}}<slot name="title-append"></slot>
      </div>
    </div>
    <el-scrollbar class="app-menu__scrollbar" wrap-class="app-menu__wrap">
      <div :style="{...height}" class="c-examinationCard__content" v-if="examinationType === 'single'">
        <div class="c-examinationCard__check" v-for="(i,index) in examinationContent" :key="index+'A'">
          <el-checkbox :checked="JSON.parse(i.selected)">{{i.answer}}</el-checkbox>
        </div>
      </div>
      <div :style="{...height}" class="c-examinationCard__content" v-else>{{examinationContent}}</div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'ExaminationCard',
  props: {
    examinationType: {
      type: [String],
      default: 'single'
    },
    examinationTitle: {
      type: String,
      require: true
    },
    examinationContent: {
      type: [Array, String],
      require: true
    },
    itemData: {
      type: Object
    },
    contentHeight: {
      type: String,
      default: '160px'
    },
    isHiddenTitle: {
      type: Boolean,
      default: true
    },
    examinationBh: {
      type: [String, Number]
    }
  },
  computed: {
    height() {
      return {
        height: this.contentHeight
      };
    },
  },
};

</script>
<style lang='scss'>
  @import "@/style/var.scss";

  .app-menu__scrollbar {
    overflow: hidden;

    .app-menu__wrap {
      overflow-x: hidden;
    }
  }
  .c-examinationCard {
    &__title {
      display: flex;
      margin-bottom: 20px;

      div:nth-child(1) {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $--color-text-primary;
        background-color: $--color-text-secondary;
      }

      div:nth-child(2) {
        flex: 1;
        padding-left: 20px;
        color: $--color-text-regular;
        font-size: 20px;
      }
    }
    &__hiddenTitle{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    &__check {
      display: flex;
      position: relative;
      padding-bottom: 20px;
      &::after{
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        top: 0;
        z-index: 2;
        background: transparent
      }
      &:nth-child(1) {
        padding-top: 20px;
      }

      /deep/ .el-checkbox__input {
        .el-checkbox__inner {
          display: inline-block;
          border: 2px solid $--color-text-regular;
          border-radius: 7px;
          background-color: transparent;
        }

        &.is-checked {
          .el-checkbox__inner {
            border-color: $--color-text-secondary;
            background-color: transparent;

            &::after {
              content: '\2022';
              border: none;
              display: flex;
              justify-content: center;
              align-items: center;
              color: $--color-text-secondary;
              font-size: 25px;
              left: 5.2px;
              top: 0px;
            }
          }
        }
      }
    }
    &__content{
      padding-left: 50px;
      color: $--color-text-primary;
    }
  }

</style>
