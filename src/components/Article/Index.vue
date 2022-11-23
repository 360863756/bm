<template>
  <div class="c-article">
    <div class="c-article-header" @click="$emit('title-click')">
      <div slot="title">
        <div  class="c-article-title">
          <div>
            <label class="c-article-date">
              <span class="c-article-date__value">
                {{ date | dateFormat }}
              </span>
            </label>
          </div>
          <text-ellipsis
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
    itemData: Object
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
      const dangerType = ASSESSMENT_TYPES.find(type => +type.value === +this.levelTypes);
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
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-article {
  &-header {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
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
      margin-right: 50px;
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
}
</style>
