<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        default: 'project'
      },
    },
    data() {
      return {
        chart: null,
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(new_val, old_val) {
          if (new_val) {
            this.setOptions(new_val)
          } else {
            this.setOptions(old_val)
          }

          console.log('init', new_val)
          this.$nextTick(() => {
            this.initChart()
          })
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
        var that = this;
        if(this.type == 'project') {
          this.chart.on('click', function(params) {
            that.$nextTick(() => {
              that.$router.replace({
                path: '/redirect' + '/projected/index',
                query: {
                  project_stage: params.name
                }
              })
            })
          })
        } else {
          this.chart.on('click', function(params) {
            that.$nextTick(() => {
              that.$router.replace({
                path: '/redirect' + '/service/index',
                query: {
                  service_stage: params.name
                }
              })
            })
          })
        }


      },
      setOptions({
        expectedData,
        actualData
      } = {}) {
        this.chart.setOption({
          bar: {
            barMinHeight: '10',
          },

          colorStops: [{
            offset: 0,
            color: 'red' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'blue' // 100% 处的颜色
          }],
          title: {
            text: this.chartData.title + ' (总计：' + this.chartData.sum_number + ')',
            // subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
          },
          legend: {
            data: [],


          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],


          },
          yAxis: {
            type: 'category',
            data: this.chartData.y_data,
            axisLabel: {
              textStyle: {

              }
            }

          },
          series: [{
              name: '',
              type: 'bar',
              data: this.chartData.x_data,
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  },

                  // color: function (params){
                  //     var colorList = ['#ff4844','#9ac3e5','#66ac52','#ffc032','#549bd3','#f47e39'];
                  //     return colorList[params.dataIndex];
                  // }
                },

              }
            }

          ]
        })
      }
    },
  }
</script>
