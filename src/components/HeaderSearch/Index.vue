<template>
  <div class="c-header-search">
    <el-autocomplete
      ref="query"
      class="c-header-search__autocomplete"
      placeholder="请输入功能关键词"
      v-model="search"
      highlight-first-item
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      suffix-icon="el-icon-search"
      @select="handlerSelect"
      @blur="reset"
    >
      <span slot-scope="{ item }">{{ item.title.join(' > ') }}</span>
    </el-autocomplete>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Fuse from 'fuse.js';
import path from 'path';
import { MODULE_TYPES } from '@/constant/app';

export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      searchPool: [],
      fuse: undefined,
    };
  },
  computed: {
    ...mapGetters('app', {
      routes: 'normalizedMenus',
    }),
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      this.initFuse(list);
    },
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    reset() {
      this.search = '';
      const query = this.$refs.query;
      const input = query && query.$refs.input;
      input && input.blur();
    },
    handlerSelect(val) {
      this.$router.push(val.path);
      this.reset();
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      });
    },
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      const allowSearchTypes = [
        MODULE_TYPES.PAGE.value,
        MODULE_TYPES.VIEW.value,
        MODULE_TYPES.IFRAME.value,
      ];
      return routes.reduce((acc, route) => {
        const res = [];
        const data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixTitle]
        };

        if (route.title && allowSearchTypes.includes(route.type)) {
          data.title = [...data.title, route.title];
          res.push(data);
        }
        const childRoutes = this.generateRoutes(route.children || [], data.path, data.title);
        return [...acc, ...res, ...childRoutes];
      }, []);
    },
    querySearch(query, cb) {
      let options = [];
      if (query !== '') {
        options = this.fuse.search(query);
      }
      cb(options);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";

.c-header-search {
  &__autocomplete {
    width: 280px;
  }
  /deep/ {
    .el-input__inner {
      height: 40px;
      line-height: 40px;
      background-color: rgba($--color-white, 0.2);
      color: $--color-white;
      border-radius: 20px;
      border: 0;
      font-size: 16px;
      &::placeholder {
        color: rgba($--color-white, 0.8);
      }
    }
    .el-input__icon {
      font-size: 16px;
      line-height: 40px;
      color: rgba($--color-white, 0.8);
    }
  }
}
</style>
