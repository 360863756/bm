<template>
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
</template>
<script>
import QueryList from '@/components/QueryList/Index.vue';
import ExaminationCard from '@/components/ExaminationCard/Index.vue';
export default {
  name: 'PsychologicalAnswerInformationDetail',
  components: {
    QueryList,
    ExaminationCard
  },
  props: {
    id: {
      type: [Number, String]
    }
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
        id: this.id
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
      &:hover{
      background: transparent;
    }
    }
    .c-query-list__item-content div{
      color: $--color-text-primary;
      .el-checkbox{
      color: $--color-text-primary;
      }
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
