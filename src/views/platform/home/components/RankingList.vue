<template>
  <div class="rankingList">
    <div ref="echarts" class="echarts"></div>
  </div>
</template>
<script>
export default {
  name: 'RankingListEcharts',
  data() {
    return {
      echarts: {},
      echartsData: [],
    };
  },
  async created() {
    let { data, errcode } = await this.$api.platform.getQtListData({ index_type: 'equals$lb' });
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
    draw(name, arrAy) {
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
          top: 10,
          width: '88%', // 宽度
          height: '65%'// 高度
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
                color: '#7940D5'
              }, {
                offset: 1,
                color: '#9A03F8'
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
.rankingList {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

.echarts {
    width: 100%;
    height: 100%;
}
}

</style>
