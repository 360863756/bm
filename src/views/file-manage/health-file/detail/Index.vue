<template>
  <title-panel title="健康档案详情" class="panel">
    <div class="back" slot="header-append" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>返回
    </div>
    <div class="panel-left">
        <card @fetch-card-info="fetchCardInfo" :params="cardFields"></card>
    </div>
    <div class="panel-right">
        <query-list
            ref="queryList"
            row-key="id"
            layout="total, sizes , -> , pager, next"
            class="query"
            :fetch-method="fetchDetail"
            :handle-data="handleData"
            :next-text="'下一页'"
            :page-sizes="[3,9,18,27,36,45]"
            :page-size="3"
            >
            <div slot="query-operation" class="operation"></div>
            <div class="item" slot-scope="{ item }">
                <title-panel class="sub-panel">
                    <div class="sub-panel__title" slot="title">就诊时间：{{ '2020-01-04' }}</div>
                    <div class="data-col" v-for="(col, index) in cardParams" :key="'info_' + index">
                        <table class="content__table">
                            <tr v-for="row in col" :key="row.index">
                                <td class="desc">{{ row.label }}</td>
                                <td class="val">
                                    {{ item[row.index] || '' }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </title-panel>
            </div>
        </query-list>
    </div>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryList from '../../components/QueryList/Index.vue';
import Card from '@/views/assessment/detail/components/Card/Index.vue';
import { cardFields } from './cardFields';
import { cardParams } from './cardParams';
export default {
  name: 'FileDetail',
  components: {
    TitlePanel,
    QueryList,
    Card,
  },
  data() {
    return {
      cardFields,
      cardParams,
    };
  },
  created() {
  },
  methods: {
    fetchCardInfo(cb) {
      this.$api.fileManage.healthFileDetailInfo(this.$route.query).then(res => {
        if (res && res.data) {
          let data = res.data.fxpg_zf_jkxx_data;
          if (data && data.length > 0) {
            cb(res.data.fxpg_zf_jkxx_data[0]);
          }
        }
      });
    },
    handleData(data) {
      return data.dataList;
    },
    fetchDetail(options = {}) {
      return this.$api.fileManage.healthFileDetailList(options.pageNo, options.pageSize, this.$route.query).then(res => {
        if (res && res.data) {
          res.data.totalElements = res.data.totalNum;
        }
        return res;
      });
    }
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
.c-query-list{
    background-color: transparent;
}
/deep/ .c-titlePanel-body{
  display: flex;
  justify-content: space-around;
}
.panel{
  &-left{
      width: 220px;
      color: $--color-white;
      padding: 15px;
  }
  &-right {
      width: calc(90% - 250px);
      min-width: 900px;
  }
}
.sub-panel{
  /deep/ .c-titlePanel{
    &-header{
      border-bottom: 1px solid $--color-text-regular;
      padding-bottom: 10px;
    }
    &-body{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  &__title{
      height:25px;
      font-size:18px;
  }
}
.content__table{
    width: 100%;
    height: 100%;
    .desc{
        line-height: 30px;
        text-align: right;
        color:$--color-text-regular;
    }
    .val{
        padding-left: 10px;
        color:$--color-white;
    }
    .finish{
        color: $--color-info;
    }
}
/deep/ .c-query-list{
  &__item:hover{
    background-color: transparent;
  }
  &__pagination{
    .el-pagination{
      .btn-next{
      background-color: transparent;
      }
    }
    .el-pagination__sizes{
      input{
        background-color: transparent;
        border: transparent;
      }
    }
    .el-pager{
      li{
        background-color:transparent;
        border-radius: $--border-radius-base;
        border:1px solid $--color-text-regular;
        color:$--color-text-regular;
        font-size:16px;
        line-height:26px;
      }
      li.active{
        border: 0;
        background-color:$--color-primary;
        color:$--color-white;
      }
    }
  }
}
</style>
