<template>
  <div class="c-avatar" :class="[row?'c-avtar--row':'c-avatar--column']">
    <div @click='routePath ? goRoutePath() : ""' class="c-avatar__content" :style="style">
      <level-tags
      class="c-avatar__tag"
      :level="levelType"
      ></level-tags>
      <img :src="imgSrc" class="c-avatar__img" />
    </div>
    <div class="c-avatar__title" :class="[row?'c-avatar-title--row':'c-avatar-title--column']">
      <span class="c-avatar__name" :name=name>{{ name }}</span>
      <span class="c-avatar__id" :id=id>Id: {{ id }}</span>
    </div>
  </div>
</template>

<script>
import LevelTags from '@/components/LevelTags/Index.vue';

export default {
  name: 'HeadPortrait',
  components: {
    LevelTags,
  },
  data() {
    return {
      borderColor: {},
    };
  },
  props: {
    name: String,
    id: {
      type: [String, Number],
      required: true
    },
    levelTypes: [String, Number],
    imgSrc: {
      type: String,
      default: require('../../assets/images/Avatar.png'),
    },
    row: Boolean, // 横向
    column: Boolean, // 纵向
    color: String,
    routePath: String,
    queryList: Array,
    itemData: Object
  },
  computed: {
    levelType() {
      const {
        DANGER_TYPES,
      } = this.$const.app;
      const dangerType = DANGER_TYPES.find(type => +type.value === +this.levelTypes);
      return dangerType;
    },
    style() {
      return {
        borderColor: this.color || (this.levelType && this.levelType.color),
      };
    }
  },
  methods: {
    goRoutePath() {
      let query = this.queryList.length && this.itemData && this.queryList.reduce((obj, item) => {
        let obj1 = {};
        if (this.itemData[item]) {
          obj1[item] = this.itemData[item];
        } else {
          obj1[item] = '';
        }
        return { ...obj, ...obj1 };
      }, {});
      this.$router.push({
        path: this.routePath,
        query
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.c-avatar {
  // width: 150px;
  height: 175px;
  margin-left: 114px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &__content {
    cursor: pointer;
    width: 90px;
    height: 90px;
    margin-top: 40px;
    padding: 4px;
    border-radius: 50%;
    border-width: 3px;
    border-style: solid;
    border-right-color: transparent !important;
    transform: translate(-30deg);
    -webkit-transform: rotate(-30deg);
    position: relative;
  }
  &__tag {
    position: absolute;
    top: -12px;
    left: 6px;
    z-index: 2;
    transform: translate(30deg);
    -webkit-transform: rotate(30deg);
  }
  &__img {
    width: 91px;
    height: 91px;
    transform: translate(30deg);
    -webkit-transform: rotate(30deg);
  }
  &-title--row {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &-title--column {
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &--row {
    flex-direction: row;
    // align-items: center;
    justify-content: space-between;
    padding-right: 33px;
  }
  &--column {
    flex-direction: column;
    justify-content: space-around;
  }
  &__name {
    color: $--color-text-regular;
  }
  &__id {
    margin-top: 3px;
    color: $--color-text-regular;
  }
}
</style>
