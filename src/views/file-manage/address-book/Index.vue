<template>
  <title-panel title="通讯录" class="panel">
    <query-list
      ref="queryList"
      row-key="id"
      layout="total, sizes , -> , pager, next"
      :fields="queryFields"
      :fetch-method="fetchAddressBookList"
      class="query"
      :handle-data="handleData"
      :displayCustom="displayCustom"
      :next-text="'下一页'"
      :page-sizes="[9,18,27,36,45]"
    >
      <div slot="query-operation" class="operation"></div>
      <div slot="query-append" class="append">
        <div class="card" :class="!displayCustom ? 'card-active': ''" @click="displayCustom = false"></div>
        <div class="list" :class="displayCustom ? '': 'list-active'" @click="displayCustom = true"></div>
        <el-button type='primary' @click="handleExportData">导出</el-button>
      </div>
      <div slot-scope="scope" class="item">
        <file-card
          :params="fileCardParams"
          :info="scope.item"
        >
          <div slot="footer-append" class="footer-append">
            <el-button>查看详情</el-button>
          </div>
        </file-card>
      </div>
      <div slot="body" slot-scope="scope" class="query-list-body">
        <common-table
          class="c-query-table__table"
          ref="table"
          :data="scope.data"
          :fields="tableFields"
          rowOperationWidth='157px'
          @current-change="onPageNoChange"
          @size-change="onPageSizeChange"
          :showPagination="false"
          :showSelection="true"
          @selection-change="handleSelectionChange"
        >
          <template slot="row-operation" slot-scope="{ row, column, $index }">
            <slot name="row-operation" :row="row" :column="column" :$index="$index"></slot>
          </template>
        </common-table>
      </div>
    </query-list>
  </title-panel>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/Index.vue';
import QueryList from '../components/QueryList/Index.vue';
import CommonTable from '@/components/CommonTable/Index.vue';
import FileCard from '@/components/FileCard/Index.vue';
import { tableFields } from './tableFields';
import { fileCardParams } from './fileCardParams';
import { refQueryFields as queryFields } from './queryFields';
export default {
  name: 'addressBookQuery',
  components: {
    TitlePanel,
    QueryList,
    FileCard,
    CommonTable
  },
  data() {
    return {
      displayCustom: false,
      tableFields,
      queryFields,
      selection: [],
      searchModel: {},
      fileCardParams,
      queryParams: {}
    };
  },
  methods: {
    onPageNoChange() {
      console.log('onPageNoChange');
    },
    onPageSizeChange() {
      console.log('onPageSizeChange');
    },
    fetchFileInfo(cb) {
      // cb()
    },
    handleData(data) {
      console.log('handleData');
      console.log(data);
      return data.dataList;
    },
    fetchAddressBookList(options = {}) {
      let data = options.params;
      this.queryParams = { ...data };
      return this.$api.fileManage.addressBookList(options.pageNo, options.pageSize, { ...data }).then(res => {
        if (res && res.data) {
          res.data.totalElements = res.data.totalNum;
        }
        return res;
      });
    },
    handleSelect(v) {
      console.log(v);
    },
    handleSelectionChange(e) {
      this.selection = e;
    },
    handleExportData() {
      if (this.selection && this.selection.length > 0) {
        let jh = this.selection.map(c => c.jh);
        this.handleExport({ jh: jh.join(',') });
      } else {
        this.handleExport(this.queryParams);
      }
    },
    handleExport(data) {
      console.log(data);
      this.$api.fileManage.exportAddressBook(data).then(res => {
        window.open(this.$BASE_API + res.data.filePath);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
/deep/ .c-query-list{
  background-color: transparent;
  &__list{
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    padding-top: 20px;
    .query-list-body{
      width: 100%;
    }

    .el-table{
      th{
        background:rgba(110,121,153,0.2);
        .cell{
          font-size: 20px;
          line-height: 39px;
          text-align: center;
        }
      }
      td .cell{
        font-size: 16px;
        line-height: 39px;
        text-align: center;
      }
    }
  }
  &__item{
    width: 31%;
    height: 9.3vw;
    margin-right: 1%;
    margin-bottom: 20px;
    background-color: transparent;
    padding: 0;
    .c-filecard-content__right{
      padding-left: 10%;
    }
    .avatar{
      margin-top: 10%;
    }
    .item{
      width: 100%;
      height: 100%;
    }
    /deep/ td{
      display: inline-block;
      height: 1.8vw;
      &:nth-child(2){
        margin-left: 1vw
      }
    }
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
.panel{
  /deep/ .c-query__form{
    .el-form-item:nth-child(2){
      flex: 1;
    }
    .el-form-item__content{
      width: 100%;
    }
  }
  .append{
    width: 220px;
    display: flex;
    justify-content: space-around;
    .card{
      width: 17px;
      height: 17px;
      background-image: url('~@/assets/images/cardicon.png');
      margin-top: 10px;
      cursor: pointer;
    }
    .card-active{
      background-image: url('~@/assets/images/cardicon2.png');
    }
    .list{
      cursor: pointer;
      width: 20px;
      height: 17px;
      background-image: url('~@/assets/images/listicon2.png');
      margin-top: 10px;
    }
    .list-active{
      background-image: url('~@/assets/images/listicon.png');
    }
    /deep/ .el-button{
      width:100px;
      height:40px;
    }
  }
  .item{
    .footer-append{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: 10px;
      padding-right: 10px;
      /deep/ .el-button{
        background-color: transparent;
        width:81px;
        height:30px;
        border:1px solid $--color-primary;
        border-radius:$--border-radius-base;
        padding: 0;
        color: $--color-primary;
      }
    }
  }
}
</style>
