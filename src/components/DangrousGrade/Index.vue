<template>
 <div class="c-dangrousGrade" v-if="levelType">
  <div class="c-dangrousGrade__box" :class="className" v-if="!isShowLowBackgroundColor && levelType.value == 3" :style="{width: width + 'px',height : height + 'px',...customStyles}" >
    <slot></slot>
  </div>
  <div v-else :class="className" :style="{'background':levelType.color,width: width + 'px',height : height + 'px',...customStyles}" class="c-dangrousGrade__box">
    <slot></slot>
  </div>
 </div>
</template>
<script>
export default {
  name: 'DangrousGrade',
  components: {},
  props: {
    levelTypes: [String, Number],
    width: {
      type: [String, Number],
      default: 16
    },
    height: {
      type: [String, Number],
      default: 16
    },
    isShowLowBackgroundColor: {
      type: Boolean,
      default: false
    },
    shapeType: {
      type: String,
      default: 'square'
    },
    customStyle: {
      type: [Object, String]
    },
    colorList: {
      type: [Array]
    },
    className: {
      type: String
    }
  },
  computed: {
    levelType() {
      const {
        COLOR_GRADES,
      } = this.$const.dengrous;
      const dangerType = this.colorList ? this.colorList.find(type => +type.value === +this.levelTypes) : COLOR_GRADES.find(type => +type.value === +this.levelTypes);
      return dangerType;
    },
    customStyles() {
      if (this.customStyle) {
        return this.customStyle;
      } else {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";
 .c-dangrousGrade__box{
   height: 16px;
   width: 16px;
   margin-left: 4px;
   display: flex;
   justify-content: center;
   align-items: center;
 }
</style>
