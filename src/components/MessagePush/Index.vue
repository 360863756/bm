<template>
    <el-popover
      placement="bottom-end"
      width="400"
      title="待办事项"
      v-model="popoverVisible"
      :visible-arrow="false"
      trigger="click">
      <el-scrollbar class="menu__scrollbar" wrap-class="menu__wrap">
        <hr style="border:1px solid rgba(64,73,104,1);opacity:0.5;"/>
              <query-list
                ref="queryList"
                row-key="id"
                query-reverse
                :fetch-method="fetchMethod"
                :show-query-operation="false"
                :show-pagination="false"
                dataType='fxpg_dbsx_data'
              >
                <div slot-scope="{ item }" >
                  <c-article
                    :ref="item.id"
                    :route-path="getRoutePath(item)"
                    :id="item.id"
                    :title="item.zfxm"
                    :levelTypes="item.tslx"
                    :date="item.pgsj"
                    :item-data='item'
                    :is-dot="item.sfyd === '1' ? false : true"
                    :query-list='["pgsj","zfbh"]'
                    :abstract="item.tsnr"
                    @title-click="titleClick(item)"
                  ></c-article>
                  <hr style="border:1px solid rgba(64,73,104,1); margin-top:20px;opacity:0.5;"/>
                </div>
                </query-list>
      </el-scrollbar>
      <el-badge is-dot class="item" slot="reference">
        <span class="el-dropdown-link">
        <i class="el-icon-message-solid"></i>
        </span>
      </el-badge>
    </el-popover>
</template>
<script>
import CArticle from '@/components/MessageArticle/Index.vue';
import QueryList from '@/components/QueryList/Index.vue';
import { createNamespacedHelpers } from 'vuex';
const {
  mapGetters,
} = createNamespacedHelpers('app');
export default {
  name: 'MessagePush',
  components: {
    CArticle,
    QueryList,
  },
  data() {
    return {
      active: 3,
      popoverVisible: false
    };
  },
  async created() {
    // this.fetchHeadMethod();
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
  },
  methods: {
    fetchMethod() {
      let option = {
        fixQL: ` and (sfyb='0'and tsmjjh='${this.userInfo.userName}')`
      };
      return this.$api.platform.fetchPushData(option);
    },
    titleClick(item) {
      if (item.sfyd === '0') {
        let option = {
          'id': item.id,
          'sfyd': 1
        };
        this.popoverVisible = false;
        this.$api.platform.updatePushData(option);
        // this.$refs[item.id].isDot = false
        item.sfyd = '1';
      }
    },
    getRoutePath(item) {
      let { ASSESSMENT } = this.$const.assessment;
      return item.tslx === '动态'
        ? ASSESSMENT['dynamic']['detailPath']['twoPage'].path
        : item.tslx === '测评' ? ASSESSMENT['measurement'].path : ASSESSMENT['static']['detailPath']['twoPage'].path;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
  .item {
  margin-top: 10px;
  margin-right: 40px;
  }
  .el-dropdown-link  i {
    display: block;
    font-size: 25px;
    margin-bottom: 0px;
    color: rgba(255,255,255,1);
    background: RGBA(3, 11, 38, 1);
    transition: color .15s linear;
  }
  /deep/ .c-query-list__item {
    padding: 2px 1px;
  }
  /deep/ .c-article-footer__tag {
    margin-left: 31px;
    margin-right: 23px;
  }
</style>
<style lang="scss">
  .el-popover {
    background: rgba(15, 23, 50, 1) !important;
    border: 1px solid rgba(15, 23, 50, 1) !important;
    height: 500px;

  }
  .el-popover::before{
    filter:blur(100px);
  }
  .menu__scrollbar {
        height: 95%;
        overflow: hidden;
          .menu__wrap {
            overflow-x: hidden;
            // overflow-y: hidden;
          }
      }
</style>
