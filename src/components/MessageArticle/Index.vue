<template>
  <div class="c-article">
    <!-- @click="$emit('title-click')" -->
    <div class="c-article-header">
      <div slot="title">
        <div  class="c-article-title">
          <div>
            <el-badge :is-dot="isDot" class="item2">
            <label class="c-article-date">
              <span class="c-article-date__value">
                {{ date | dateFormat }}
              </span>
            </label>
            </el-badge>
          </div>
          <text-ellipsis
          @click.native="$emit('title-click')"
          class="c-article-title__text"
          :to="routePath ? toRoute: '' "
          :length="50"
          :title="title"
          :target="locationHrefWays ? locationHrefWays : ''"
        >{{ title }}</text-ellipsis>
        </div>
      </div>
    </div>
    <div class="c-article-footer">
      <slot>
        <div class="c-article-footer__content">
          <div>
            <level-tags class="c-article-footer__tag" :level="levelType"></level-tags>
          </div>
          <div class="c-article-footer__abstract" :title="abstract">{{ abstract | isHiddenContent }}</div>
        </div>
        <hr style="border:1px solid rgba(64,73,104,1); margin-top:20px;opacity:0.5;"/>
      </slot>
    </div>
  </div>
</template>

<script>
import LevelTags from '@/components/LevelTags/Index.vue';
import TextEllipsis from '@/components/TextEllipsis/Index.vue';

export default {
  name: 'Article',
  components: {
    TextEllipsis,
    LevelTags,
  },
  props: {
    id: {
      type: String,
      required: true
    },
    date: String,
    title: String,
    levelTypes: [String, Number],
    abstract: String,
    sourceTable: String,
    routePath: String,
    locationHrefWays: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['_blank', '_parent', '_self', '_top'].indexOf(value) !== -1;
      }
    },
    queryList: Array,
    itemData: Object,
    isDot: Boolean,
  },
  data() {
    return {};
  },
  filters: {
    isHiddenContent(value) {
      if (!value) return '';
      if (value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    }
  },
  computed: {
    levelType() {
      const {
        ASSESSMENT_TYPES,
      } = this.$const.platform;
      const dangerType = ASSESSMENT_TYPES.find(type => type.label === this.levelTypes);
      const {
        COLOR_GRADES,
      } = this.$const.dengrous;
      const obj = COLOR_GRADES.find(type => +type.value === +this.itemData.wxdj);
      dangerType.color = obj.color;
      return dangerType;
    },
    // 点击标题要跳转的路径
    toRoute() {
      let query = this.queryList.length && this.itemData && this.queryList.reduce((obj, item) => {
        let obj1 = {};
        if (this.itemData[item]) {
          obj1[item] = this.itemData[item];
        } else {
          obj1[item] = '';
        }
        return { ...obj, ...obj1 };
      }, {});
      return {
        path: this.routePath,
        query
      };
    },
    href() {
      const resolvedRoute = this.$router.resolve(this.toRoute);
      return resolvedRoute && resolvedRoute.href;
    },
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-article {
  &-header {
    display: flex;
    margin-bottom: 10px;
  }
  &-date {
    color: $--color-primary;
    margin-right: 29px;
    &__value {
      display: inline-block;
    }
  }
  &-title {
    // flex: 1;
    display: flex;
    align-items: center;
    &__text {
      color: $--color-text-primary;
    }
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    &__content {
      display: flex;
      align-items: center;
    }
    &__tag {
      margin-left: 31px;
      margin-right: 10px;
    }
    &__abstract {
      color: $--color-text-primary;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2;
    }
  }
  .item2{
  margin-top: 10px;
  margin-right: 40px;
  }
}
</style>
