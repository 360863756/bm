<template>
    <!-- <title-panel :title="title+'详情'"> -->
      <title-panel title="评估详情">
      <div class="back" slot="header-append" @click="$router.push(fromPath)">
        <i class="el-icon-arrow-left"></i>返回
      </div>
        <el-tabs class="tabs" type="border-card" v-model="active" @tab-click="handleClick">
        <el-tab-pane v-for="i in assessment" :label="i.title" :name="i.path" :key="i.path">
        </el-tab-pane>
        <router-view></router-view>
        </el-tabs>
    </title-panel>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import TitlePanel from '@/components/TitlePanel/Index.vue';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  components: {
    TitlePanel,
  },
  data() {
    return {
      assessment: [],
      fromPath: '',
      title: '',
      active: '',
    };
  },
  computed: {
    ...mapGetters({
      normalizedMenus: 'normalizedMenus',
    })
  },
  created() {
    this.assessment = this.parseJson(this.normalizedMenus, 'path', '/assessment/detail')[0].children;
    this.getData();
  },
  methods: {
    parseJson(jsonObj, key, value) {
      let array = [];
      for (let v in jsonObj) {
        let element = jsonObj[v];
        if (typeof (element) === 'object') {
          let result = this.parseJson(element, key, value);
          if (result.length) {
            array = array.concat(result);
          }
        } else {
          if (v === key) {
            if (element === value) {
              array.push(jsonObj);
            }
          }
        }
      }
      return array;
    },
    handleClick(tab, e) {
      let getObj = this.assessment.filter(item => {
        return item.title === e.target.innerHTML;
      })[0];
      this.$router.push({
        path: getObj.children[0].path,
        query: this.$route.query
      });
      this.getData();
    },
    getData() {
      let result = this.assessment.filter(item => {
        return this.$route.path.indexOf(item.path) !== -1;
      })[0];
      this.active = result.path;
      this.title = result.title;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullPath === '/') {
      next(vm => {
        vm.fromPath = '/platform/home';
      });
    }
    next(vm => {
      vm.fromPath = from.fullPath;
    });
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

.tabs{
  background-color: transparent;
  border: transparent;
  /deep/ .el-tabs__header{
    background-color: transparent;
    border-bottom: 1px solid $--color-text-regular;

    .el-tabs__nav{
      margin-left: 5px;
      transition: transparent;
    }
    .el-tabs__item.is-active{
      background-color: $--color-black;
      color: $--color-primary;
      border-color: $--color-text-regular;
      border-radius:$--border-radius-base;
      border-bottom: none;
      position: relative;
      top: 2px;
      &:hover{
        color: $--color-primary;
      }
    }
  }
}
/deep/ .el-tabs__item{
  color: $--color-text-regular;
  font-size: 20px;
  -webkit-transition: transparent;
  transition: transparent;
}
.content{
  display: flex;
  &-left{
    width: 210px;
  }
  &-right{
    flex: 1
  }
}
</style>
