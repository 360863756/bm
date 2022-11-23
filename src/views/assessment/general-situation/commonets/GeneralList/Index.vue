<template>
  <div class="c-general-list">
      <div class="c-general-list-left">
        <div @click="goDetail()" class="left-content__left" :style="style">
            <img :src="imgSrc" class="c-general-list__img" />
        </div>
        <div class="left-content__right">
            <p @click="goDetail()">{{data.zfxm}}</p>
            <p>ID: {{data.zfbh}}</p>
        </div>
      </div>
      <div class="c-general-list-right">
          <div>
            <p>危险等级</p>
            <p>
              <DangrousGrade
              width="36"
              height="18"
              :levelTypes="data.wxdj"
              :is-show-low-background-color="true"
              >
                <span>{{data.wxdj | dengrious(self)}}</span>
              </DangrousGrade>
            </p>
          </div>
          <div>
            <p>危险倾向</p>
            <p class="c-general-list__dengrious">
              <template v-for="(i,key) in data">
                <div v-if="isShow(i,key)" class="c-general-list__dengrious c-general-list__dengriou" :key="key">
                <DangrousGrade
                  width="10"
                  height="10"
                  :levelTypes="isShow(i,key).grade"
                  :is-show-low-background-color="true"
                  :customStyle="customStyle"
                >
                </DangrousGrade>
                <div>{{isShow(i,key).value}}</div>
                </div>
              </template>
            </p>
          </div>
          <div>
            <p>预警时间</p>
            <p>{{data.yjsj}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import DangrousGrade from '@/components/DangrousGrade/Index.vue';
export default {
  name: '',
  components: {
    DangrousGrade
  },
  props: {
    imgSrc: {
      type: String,
      default: require('@/assets/images/Avatar.png'),
    },
    data: {
      type: Object
    }
  },
  filters: {
    dengrious(val, self) {
      const {
        COLOR_GRADES,
      } = self.$const.dengrous;
      const dangerType = COLOR_GRADES.find(type => +type.value === +val);
      return dangerType ? dangerType.label : '';
    }
  },
  data() {
    return {
      self: this,
      borderColor: {},
      customStyle: {
        borderRadius: '5px'
      }
    };
  },
  computed: {
    levelType() {
      const {
        COLOR_GRADES,
      } = this.$const.dengrous;
      const dangerType = COLOR_GRADES.find(type => +type.value === +this.data.wxdj);
      return dangerType;
    },
    style() {
      return {
        borderColor: this.color || (this.levelType && this.levelType.color)
      };
    }
  },
  methods: {
    goDetail() {
      let { pgsj, zfbh } = this.data;
      this.$router.push({
        path: this.$const.assessment.ASSESSMENT['dynamic']['detailPath']['onePage'].path,
        query: {
          pgsj,
          zfbh
        }
      });
    },
    isShow(i, key) {
      let arr = [{
        name: 'kgwxdj',
        value: '抗改'
      }, {
        name: 'ttwxdj',
        value: '脱逃'
      }, {
        name: 'zswxdj',
        value: '自杀'
      }, {
        name: 'xxwxdj',
        value: '行凶'
      }, {
        name: 'phwxdj',
        value: '破坏'
      }];
      let boole = arr.some(item => {
        return item.name === key;
      });
      let filterArr = [];
      if (boole) {
        filterArr = arr.filter(item => {
          return item.name === key;
        });
      }
      if (boole && i !== '0' && i) {
        return {
          ...filterArr[0],
          'grade': i
        };
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.c-general-list{
  display: flex;
  width: 100%;
  &-left {
    display: flex;
    width: 40%;
    border-right: 2px solid #004CFF;
    border-image: linear-gradient(180deg,rgba(0,76,255,0.55) 0%,rgba(0,76,255,0) 100%) 20 20;
    .left-content__left {
      cursor: pointer;
      width: 52px;
      height: 52px;
      padding: 2px;
      border-radius: 50%;
      border-width: 3px;
      border-style: solid;
      border-right-color: transparent !important;
      transform: translate(-30deg);
      -webkit-transform: rotate(-30deg);
      position: relative;
    }
    .left-content__right{
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      p{
        width:100%;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,0.60);
        &:nth-child(1){
          cursor: pointer;
        }
      }
    }
  }
    &__tag {
    position: absolute;
    top: -12px;
    left: 6px;
    transform: translate(30deg);
    -webkit-transform: rotate(30deg);
  }
  &__img {
    display: inline-block;
    width: 52px;
    height: 52px;
    transform: translate(30deg);
    -webkit-transform: rotate(30deg);
  }
  &-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    div{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      p{
        text-align: center;
        &:nth-child(1){
        font-size:14px;
        font-weight:400;
        color:rgba(110,121,153,1);
        }
      }
      &:nth-child(1){
        p:nth-child(2){
          /deep/ .c-dangrousGrade__box{
            margin: 0 auto;
            span{
              display: block;
              font-weight:400;
              height: 16px;
              font-size:11px;
              line-height: 16px;
              color:rgba(255,255,255,1);
            }
          }
        }
      }
       &:nth-child(3){
        p:nth-child(2){
            font-size:14px;
            font-weight:400;
            color:rgba(22,128,255,1);
        }
      }
    }
  }
  &__dengrious{
    display: flex !important;
    flex-wrap: nowrap !important;
    flex-direction: row !important;
    font-size:12px;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  &__dengriou{
    div:nth-child(1) {
      position: relative;
      top: 3px;
      margin-right: 2px;
    }
    margin-left: 2px
  }
}
</style>
