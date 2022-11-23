<template>
  <div class="faceRecognition">
    <div class="faceRecognition__header">
      <div class="faceRecognition__header__top">
          <div><p>正面情绪次数</p><p>{{facerecognitionData.zmqxcs}}<b>次</b><span>占比<i>{{facerecognitionData.zmqxzb}}%</i></span></p></div>
          <div><p>负面情绪次数</p><p>{{facerecognitionData.fmqxcs}}<b>次</b><span>占比<i>{{facerecognitionData.fmqxzb}}%</i></span></p></div>
      </div>
      <p>服刑人员情绪统计</p>
    </div>
    <div class="faceRecognition__footer">
      <div ref="echarts" class="echarts"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FaceRecognition',
  props: {
    facerecognitionData: {
      type: Object
    }
  },
  data() {
    return {
      echarts: {},
      echartsData: []
    };
  },
  async created() {
    let { data, errcode } = await this.$api.platform.getQtListData({ index_type: 'equals$xq' });
    if (errcode === 0) {
      this.echartsData = data['fxpg_index_echart_data'];
      this.echarts = this.draw('echarts');
    }
  },
  mounted() {
    this.echarts = this.draw('echarts');
  },
  methods: {
    getArrayProps(array, key) {
      var res = [];
      if (array) {
        array.forEach(function(t) {
          res.push(t[key]);
        });
      }
      return res;
    },
    draw(name) {
      let chart = this.$refs.echarts && this.$echarts.init(this.$refs[name], 'default');

      let session = {
        xAxis: {
          type: 'category',
          data: this.getArrayProps(this.echartsData, 'index_name'),
          axisLabel: {
            interval: 0
          },
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          bottom: 40,
          width: '88%', // 宽度
          height: '40%'// 高度
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          data: this.getArrayProps(this.echartsData, 'index_value'),
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#1BB3A0'
              }, {
                offset: 1,
                color: '#03FFE0'
              }]),
            }
          },
        }]

      };
      if (chart) {
        chart.setOption(session, true);
      }
      return chart;
    }
  },
  beforeDistory() {
    if (this.echarts) {
      this.echarts.dispose();
    }
  }
};

</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.faceRecognition {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    height: 1.67vw;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &>p:nth-child(2) {
      color: $--color-text-regular;
      font-size: 0.8vw;
      padding-left: 0.8vw;
      margin-top: 2vw
    }
    &__top{
        display: flex;
        justify-content: space-between;
        padding:0 2vw;
        p:nth-child(1){
            font-size:0.8vw;
            font-weight:400;
            color:$--color-text-regular;
        }
        p:nth-child(2){
            font-size:1.5vw;
            font-weight:400;
            font-family:Arial;
            font-style: oblique;
            color:$--color-text-primary;
            span{
                font-size:0.6vw;
                font-family:Arial;
                font-style: initial;
                i{
                    color: #F78A00
                }
            }
            b{
                display: inline-block;
                margin-left: 2px;
                font-size:0.6vw;
                font-style: initial;
                margin-right: 0.6vw;
            }
        }
    }
  }

  &__footer {
    flex: 1;
    .echarts{
      width: 100%;
      height: 100%;
    }
  }
}

</style>
