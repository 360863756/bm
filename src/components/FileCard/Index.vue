<template>
  <div class="c-filecard-content">
    <div class='c-filecard-content__left'>
        <div class="avatar">
            <el-avatar shape="square" :fit="'fill'" :src="info[params.imgIndex]" @error="errorHandler">
                <img src="@/assets/images/image-people.png"/>
            </el-avatar>
            <!-- <img :src="info[params.imgIndex]" /> -->
        </div>
    </div>
    <div class="c-filecard-content__right">
        <div class="left-data">
            <table class="c-filecard-content__table">
                <tr v-for="item in leftFields" :key="item.index">
                    <td class="desc">{{ item.label }}</td>
                    <td class="val " :class="item.stateClass">
                        {{ info[item.index] }}
                        <i v-if="item.valClass"></i>
                    </td>
                </tr>
            </table>
        </div>
        <div class="right-data" v-if="(rightFields && rightFields.length > 0) || $slots.footerAppend">
            <table class="c-filecard-content__table tiny">
                <tr v-for="item in rightFields" :key="item.index">
                    <td class="desc">{{ item.label }}</td>
                    <td class="val" :class="item.stateClass">
                        {{ info[item.index] }}
                        <i v-if="item.valClass"></i>
                    </td>
                </tr>
            </table>
            <div class="footer-append">
                <slot name="footer-append" :item="info"></slot>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileCard',
  props: {
    params: Object,
    info: Object
  },
  data() {
    return {
      leftFields: [],
      rightFields: [],
    };
  },
  created() {
    let { fields, leftCount } = this.params;
    this.rightFields = fields.slice(leftCount);
    this.leftFields = fields.slice(0, leftCount);
  },
  methods: {
    errorHandler() {
      return true;
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-filecard-content{
    height: 100%;
    display: flex;
    background:$--color-light-grey;
    border-radius:$--border-radius-base;

    &__left{
        width: 8vw;
        height: 100%;
        margin-right: 10px;
        background: $--color-light-grey;
        border-radius:$--border-radius-base;
        .avatar{
            height: 6.6vw;
            width: 6vw;
            background:rgba(255,255,255,0.05);
            border-radius:4px;
            margin: 1.6vw auto auto 0.8vw;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    &__right{
        flex: 1;
        display: flex;
        .left-data{
            flex: 1;
            height: 100%;
            tr{
                display: flex;
                height: 20%;
                td{
                    display: flex;
                    align-items: center;
                    &:nth-child(1){
                        width: 2vw;
                    }
                    &:nth-child(2){
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .right-data{
            width: 60%;
            display: flex;
            flex-direction: column;
            height: 100%;
            .footer-append{
                flex: 1;
            }
            tr{
                display: flex;
                height: 34.5%;
            }
        }
    }
    &__table{
        width: 100%;
        height: 100%;
        font-size: 0.83vw;
        tr{
            display: flex;
        }
        .desc{
            width: 3.5vw;
            line-height: 30px;
            color:$--color-text-regular;
        }
        .val{
            flex: 1;
            line-height: 30px;
            color:$--color-white;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .finish{
            color: $--color-info;
        }
    }
    .tiny{
        height: 60%;
        .val{
            padding-left: 10px;
        }
    }
}
</style>
