<template>
  <div v-if="traitementgradeData" class="traitementGrade">
    <div ref="echarts" class="echarts"></div>
  </div>
</template>
<script>
export default {
  name: 'traitementGradeEcharts',
  props: {
    traitementgradeData: {
      type: Object
    }
  },
  data() {
    return {
      echarts: {}
    };
  },
  mounted() {
    this.echarts = this.draw('echarts', this.echartsList);
  },
  methods: {
    draw(name, arrAy) {
      let chart = this.$refs.echarts && this.$echarts.init(this.$refs[name], 'default');
      let width = document.body.clientWidth;
      let session = {

        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [{
            value: this.traitementgradeData.pgrs,
            name: `普管  ${this.traitementgradeData.pgrs}人`,
            itemStyle: {
              color: '#A540C1'
            },
            labelLine: {
              length: 1,
              length2: 10
            },
            label: {
              formatter: '{b}  {abg|}',
              rich: {
                abg: {
                  width: width * (1 / 192),
                  height: width * (1 / 192),
                  borderColor: '#A540C1',
                  borderWidth: 2,
                  borderRadius: 5
                }
              }
            }
          },
          {
            value: this.traitementgradeData.kgrs,
            name: `宽管  ${this.traitementgradeData.kgrs}人`,
            itemStyle: {
              color: '#23B3A1'
            },
            labelLine: {
              length: 1,
              length2: 1
            },
            label: {
              formatter: '{b}  {abg|}',
              rich: {
                abg: {
                  width: width * (1 / 192),
                  height: width * (1 / 192),
                  borderColor: '#23B3A1',
                  borderWidth: 2,
                  borderRadius: 5
                },
                b: {
                  padding: [10, 0]
                }
              }
            }
          },
          {
            value: this.traitementgradeData.kcrs,
            name: `考察 ${this.traitementgradeData.kcrs}人`,
            itemStyle: {
              color: '#0845B1'
            },
            labelLine: {
              length: 1,
              length2: 1
            },
            label: {
              formatter: '{abg|}  {b}',
              rich: {
                abg: {
                  width: width * (1 / 192),
                  height: width * (1 / 192),
                  borderColor: '#0845B1',
                  borderWidth: 2,
                  borderRadius: 5
                }
              }
            }
          },
          {
            value: this.traitementgradeData.ygrs,
            name: `严管  ${this.traitementgradeData.ygrs}人`,
            itemStyle: {
              color: '#F7891C'
            },
            labelLine: {
              length: 1,
              length2: 1
            },
            label: {
              formatter: '{abg|}  {b}',
              rich: {
                abg: {
                  width: width * (1 / 192),
                  height: width * (1 / 192),
                  borderColor: '#F7891C',
                  borderWidth: 2,
                  borderRadius: 5
                }
              }
            }
          }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 1)'
          },
          labelLine: {
            show: false,
          },
          // eslint-disable-next-line no-dupe-keys
          radius: [0, '70%'],
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
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
.traitementGrade {
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
