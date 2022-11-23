<template>
    <title-panel title="试题情况">
        <div @click="$router.back()" slot="header-append"> <i class="el-icon-arrow-left"></i> 返回</div>
        <query-list
                ref="queryList"
                row-key="id"
                query-reverse
                :fetch-method="fetchMethod"
                :show-query-operation="false"
                layout="total, sizes , -> , pager, next"
                next-text='下一页'
                :show-pagination='false'
                data-type='question'
                @data-responsed='responsedData'
                >
                <div class="header__pointer" slot="query-append">
                  <span>测评量表：<i>{{peopleInformation.cplb}}</i></span>
                  <span>编号：<i>{{peopleInformation.zfbh}}</i></span>
                  <span>姓名：<i>{{peopleInformation.zfxm}}</i></span>
                </div>
                  <div slot-scope="{ item }">
                      <examination-card
                        :itemData='item'
                        :examination-bh='item.title_number'
                        :examination-type='topicType(item)'
                        :examination-title='item.title'
                        :examination-content='item.answer'
                        :is-hidden-title='false'
                      >
                      </examination-card>
                  </div>
        </query-list>
    </title-panel>
</template>
<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryList from '@/components/QueryList/Index.vue';
import ExaminationCard from '@/components/ExaminationCard/Index.vue';
export default {
  name: 'PsychologicalAnswerInformationDetail',
  components: {
    QueryList,
    TitlePanel,
    ExaminationCard
  },
  data() {
    return {
      peopleInformation: {}
    };
  },
  created() {
  },
  methods: {
    fetchMethod() {
      let params = {
        id: this.$route.query.id
      };
      return this.$api.psychological.getAnswerInformationDetail(params);
    },
    responsedData(res) {
      let { data } = res;
      this.peopleInformation = data.scaleInfo;
    },
    topicType(item) {
      return item['topic_type'] === '单选' ? 'single' : 'completion';
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/style/var.scss";
  /deep/ .c-titlePanel-header__append{
    color: $--color-primary;
    font-size: 20px;
    cursor: pointer;
  }
  /deep/ .c-query-list{
    background-color: transparent
  }
  /deep/ .c-query-list__query{
    padding-left: 0px;
    padding-top: 0px;
    .c-query__append{
    height: 40px;
    font-size: 20px;
    margin-bottom: 0px;
    width: 100%;
    border-bottom: 1px solid $--color-text-regular;
  }
  }
  /deep/ .c-query-list__list{
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .c-query-list__item{
      width: 46%;
    }
  }
  .header__pointer{
    width: 100%;
    color: $--color-text-primary;
    span{
      margin-right: 30px;
    }
    i{
      font-style: inherit;
    }
  }
</style>
