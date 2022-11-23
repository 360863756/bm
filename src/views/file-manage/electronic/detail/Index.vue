<template>
    <title-panel title="个人档案详情信息">
        <div @click="$router.back()" slot="header-append"> <i class="el-icon-arrow-left"></i> 返回</div>
        <div>
          <div class="electronic-header">基本信息</div>
          <div class="electronic-content">
            <div class="content-left">
              <div class="content-left__box"><img :src="information.zftx" alt="图片"></div>
            </div>
            <div class="content-right">
              <template v-for="i in peopleInformation">
              <div class="content-right__box"  :key="i.lable">
                <div class="box-left">{{i.label}}:</div>
                <div class="box-right" :title="information[i.key]">{{information[i.key] ? information[i.key] : ''}}</div>
              </div>
              </template>
            </div>
          </div>
        </div>
    </title-panel>
</template>

<script>
import peopleInformation from './peopleInformation.js';
import TitlePanel from '@/components/TitlePanel/Index.vue';
export default {
  name: 'fileElectronicDetail',
  components: {
    TitlePanel,
  },
  data() {
    return {
      peopleInformation,
      information: {}
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      let params = {
        zfbh: this.$route.query.zfbh
      };
      let { data } = await this.$api.fileManage.getElectronicDetailData(params);
      this.information = data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
/deep/ .c-titlePanel-header__append{
    color: $--color-primary;
    font-size: 20px;
    cursor: pointer;
  }
/deep/ .c-titlePanel-body{
    padding-right: 40px;
  }
.electronic{
    &-header{
        font-size:18px;
        padding-bottom: 14px;
        font-weight:600;
        color:$--color-text-primary;
        border-bottom: 1px solid $--color-text-regular;
    }
    &-content{
      padding-top: 20px;
      display: flex;
      .content-left{
        width: 13.3%;
        &__box{
          background-color: rgba(255, 255, 255, 0.05);
          padding: 12px;
        }
      }
      .content-right{
        padding:0 10px;
        flex:1;
        display: flex;
        flex-wrap: wrap;
        &__box{
          width: 25%;
          display: flex;
          margin-bottom: 31px;
          .box-left{
            width: 50%;
            display: flex;
            flex-direction: row-reverse;
            font-size:16px;
            font-weight:400;
            color:$--color-text-regular;
          }
          .box-right{
            padding-left: 10px;
            flex:1;
            font-size:16px;
            font-weight:400;
            color:$--color-text-primary;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap
          }
        }
      }
    }
}
</style>
