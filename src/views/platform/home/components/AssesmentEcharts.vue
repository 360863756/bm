<template>
  <div class="assesmentEcharts">
    <div class="assesmentEcharts__header">
      <p>近半年高中低风险人数月变动情况</p>
      <p><button :class="flag ? 'active' : ''" class="cursor-pointer" @click="checkstatic">静态</button><button class="cursor-pointer" :class="flag ? '' : 'active'" @click="checkDym">动态</button></p>
    </div>
    <div class="assesmentEcharts__footer">
      <div ref="echarts" class="echarts"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'assesmentEchartsEcharts',
  data() {
    return {
      flag: true,
      echartsList: [],
      echarts: {},
      dtData: [],
      jtData: []
    };
  },
  created() {
    this.getJtData();
  },
  mounted() {
    this.echarts = this.draw('echarts', this.echartsList);
  },
  methods: {
    checkstatic() {
      this.flag = true;
      this.echartsList = this.jtData;
      this.draw('echarts', this.echartsList);
    },
    checkDym() {
      this.flag = false;
      this.echartsList = this.dtData;
      this.draw('echarts', this.echartsList);
    },
    async getJtData() {
      this.flag = true;
      let options = {
        pglx: '静态评估'
      };
      let { data, errcode } = await this.$api.platform.getAssesmentEchartsData(options);
      if (errcode === 0) {
        this.echartsList = data['fxpg_index_data'];
        this.jtData = data['fxpg_index_data'];
      }
      this.echarts = this.draw('echarts', this.echartsList);
      setTimeout(() => {
        this.getDtData();
      }, 4000);
    },
    async getDtData() {
      this.flag = false;
      let options = {
        pglx: '动态评估'
      };
      let { data, errcode } = await this.$api.platform.getAssesmentEchartsData(options);
      if (errcode === 0) {
        this.echartsList = data['fxpg_index_data'];
        this.dtData = data['fxpg_index_data'];
      }
      this.echarts = this.draw('echarts', this.echartsList);
      setTimeout(() => {
        this.checkjtData();
      }, 4000);
    },
    checkjtData() {
      this.flag = true;
      this.echartsList = this.jtData;
      this.echarts = this.draw('echarts', this.echartsList);
      setTimeout(() => {
        this.checkDtData();
      }, 4000);
    },
    checkDtData() {
      this.flag = false;
      this.echartsList = this.dtData;
      this.echarts = this.draw('echarts', this.echartsList);
      setTimeout(() => {
        this.checkjtData();
      }, 4000);
    },
    draw(name, arrAy) {
      let chart = this.$refs.echarts && this.$echarts.init(this.$refs[name], 'default');
      let arr = [{
        name: '高',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.HIGH.color,
        smooth: true,
        data: []
      }, {
        name: '中',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.CENTER.color,
        smooth: true,
        data: []
      }, {
        name: '低',
        type: 'line',
        color: this.$const.dengrous.COLOR_GRADE.LOW.color,
        smooth: true,
        data: []
      }];
      arrAy.forEach(item => {
        arr.forEach(i => {
          if (i.name === item.pgdj) {
            i.data.push(item.rs);
          }
        });
      });
      let session = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              color: '#222'
            }
          },
        },
        grid: {
          bottom: 40,
          width: '80%', // 宽度
          height: '50%'// 高度
        },
        legend: {
          data: ['高', '中', '低'],
          left: 10,
          height: '20px',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          type: 'category',
          nameTextStyle: {
            color: 'red'
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: Array.from(new Set(arrAy.map(item => {
            return item.rq;
          })))
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: arr
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
.assesmentEcharts {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    height: 1.67vw;
    width: 100%;
    display: flex;
    justify-content: space-between;
    p:nth-child(1) {
      color: $--color-text-regular;
      font-size: 0.8vw;
      padding-left: 15px;
    }
    p:nth-child(2) {
      display: flex;
      button{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0;
        width: 3vw;
        height: 1.6vw;
        border: 1px solid $--color-text-secondary;
        color:$--color-text-regular;
        background-color: transparent;
      }
      .active{
        color:$--color-white;
        background:rgba(36,120,255,0.35);
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
