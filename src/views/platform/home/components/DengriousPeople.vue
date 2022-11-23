<template>
  <div class="dengriousPeople">
      <div v-for="item in data" :key="item.index_name">
          <div class="dengriousPeople_title">{{item.index_name}}</div>
          <div class="dengriousPeople_range"><div :style="{width: cd(item.index_value)}"></div></div>
          <div class="dengriousPeople_num">{{item.index_value}}人</div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'DengriousPeople',
  data() {
    return {
      data: []
    };
  },
  async created() {
    let { data, errcode } = await this.$api.platform.getQtListData({ index_type: 'equals$wxqx' });
    if (errcode === 0) {
      this.data = data['fxpg_index_echart_data'];
    }
  },
  methods: {
    cd(val) {
      return val / (Number(this.data[0].index_value) + Number(this.data[this.data.length - 1].index_value)) * 10 + 'vw';
    }
  }
};

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
@keyframes myfirst
{
from {width: 0}
}
.dengriousPeople {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
 &>div{
     display: flex;
     align-items: center;
     margin-bottom: 0.1vw;
     .dengriousPeople_title{
        width: 25%;
        text-align: right;
        font-size:14px;
        font-weight:400;
        color:$--color-text-primary;
     }
     .dengriousPeople_range{
        height: 0.8vw;
        width: 10vw;
        margin: 0 0.3vw;
        display:flex;
        align-items: center;
        background:$--platHome-dengriousRange;
        div{
            height: 0.4vw;
            width: 0;
            animation:myfirst 3s;
            background:linear-gradient(90deg,rgba(255,51,0,0.1) 0%,rgba(255,93,0,1) 100%);
            border-radius:0px 2px 2px 0px;
        }
     }
    .dengriousPeople_num{
            font-size:14px;
            font-weight:400;
            color:$--platHome-dengriousNum
    }
 }
}

</style>
