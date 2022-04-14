<template>
  <div class="allContainer">
    <div class="topContainer">
      <dv-border-box-7 :color="['rgb(16,11,56)','#77dff5']" class="acitivityContainer">
        <dv-Loading v-if="provincesLoading">正在加载水位图</dv-Loading>
        <div v-else class="acitivity">
          <div class="title">{{provinces.province}}人最爱购买</div>
          <div class="title">共计 <div class="number">{{provinces.newPolicy}}</div> 次购买
          </div>
          <dv-water-level-pond class="water" :config="provinces" style="width:200px;height:200px" />
        </div>
      </dv-border-box-7>
      <dv-border-box-7 :color="['rgb(16,11,56)','#77dff5']" class="totalContainer">
        <dv-Loading v-if="totalLoading">
          正在加载热词排名动态图
        </dv-Loading>
        <dv-scroll-board v-else :config="total" />
      </dv-border-box-7>
      <dv-border-box-7 :color="['rgb(16,11,56)','#77dff5']" class="proportionContainer">
        <div class="proportion">
          <div class="title" v-if="!loadingProportion">总体热门基础属性分布Top5</div>
          <dv-Loading v-if="loadingProportion">正在加载</dv-Loading>
          <dv-active-ring-chart v-else :config="proportion" style="width:300px;height:300px" />
        </div>
      </dv-border-box-7>
    </div>
    <div class="bottomContainer">
      <dv-border-box-8 v-for="i in index" :key="i" class="border">
        <dv-Loading v-if="loadingItems">正在热词具体数据</dv-Loading>
        <div class="title" v-if="!loadingItems">
          <div class="left">
            {{proportion.data[i].name}}
          </div>
          <div class="right">
            0{{i+1}}
          </div>
        </div>
        <dv-charts class="circle" :option="items[i]" v-if="!loadingItems" />
        <div class="bottom" v-if="!loadingItems">
          <div class="numberContainer">
            <div class="title">
              共计购买
            </div>
            <div class="number">
              {{proportion.data[i].value}}
            </div>
            <div class="char">
              次
            </div>
          </div>
        </div>
      </dv-border-box-8>
    </div>
  </div>
</template>

<script>
export default {
  name: 'acitivity',
  data () {
    return {
      loadingProportion: false,
      loadingItems: false,
      totalLoading: false,
      provincesLoading: false,
      hotWordsData: [
        {
          province: '总体',
          hotWords: [
            {
              name: '进口税收',
              value: 89
            },
            {
              name: '推动产业转型',
              value: 72
            },
            {
              name: '推动服务业发展',
              value: 53
            },
            {
              name: '新能源汽车',
              value: 29
            },
            {
              name: '出产咸鱼',
              value: 18
            },
          ],
          hotWordsitems: [30, 25, 20, 15, 10],
        }
      ],
      index: [0, 1, 2, 3, 4],
      provinces: {
        province: '湖南',
        newPolicy: '2959',
        data: [100],
        shape: 'round'
      },
      provincesList: [],
      provincesListFlag: 0,
      total: {
        header: ['基础属性名称', '具体属性'],
        data: [
          ['起存金额', '1500'],
          ['风险等级', '高'],
          ['年化利率', '2.1%'],
          ['结息方式', '当日'],
          ['递增金额', '200'],
        ],
        index: true,
        columnWidth: [50],
        align: ['center']
      },
      proportion: {
        data: [
          {
            name: '起存金额',
            value: 1205
          },
          {
            name: '风险等级',
            value: 802
          },
          {
            name: '年化利率',
            value: 781
          },
          {
            name: '结息方式',
            value: 668
          },
          {
            name: '递增金额',
            value: 552
          },
        ],
        lineWidth: 10,
      },
      items: [{
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 5,
            data: [
              { name: 'itemA', value: 1500, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '{value}元',
              style: {
                fill: '#1ed3e5',
                fontSize: 20
              }
            }
          }
        ]
      }, {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 5,
            data: [
              { name: 'itemA', value: "", gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '低',
              style: {
                fill: '#1ed3e5',
                fontSize: 20
              }
            }
          }
        ]
      }, {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 5,
            data: [
              { name: 'itemA', value: 2.1, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '{value}%',
              style: {
                fill: '#1ed3e5',
                fontSize: 20
              }
            }
          }
        ]
      }, {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 5,
            data: [
              { name: 'itemA', value: "", gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '当日',
              style: {
                fill: '#1ed3e5',
                fontSize: 20
              }
            }
          }
        ]
      }, {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 5,
            data: [
              { name: 'itemA', value: 200, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '{value}',
              style: {
                fill: '#1ed3e5',
                fontSize: 20
              }
            }
          }
        ]
      }],
    };
  },

  components: {},

  methods: {
    change: function () {
      this.provincesListFlag++
      if (this.provincesListFlag >= this.provincesList.length) {
        this.provincesListFlag %= this.provincesList.length
      }
      console.log(this.provincesList.length)
      this.provinces = this.provincesList[this.provincesListFlag]
      this.provinces = { ...this.provinces }
      //   this.provinces.province = '福建';
      //   this.provinces.newPolicy = '112,413';
      //   this.provinces.data = [15];
      //   this.proportion.data = this.hotWordsData[0].hotWords;
      //   for (let i = 0; i < 5; i++) {
      //     this.items[i].series[0].data[0].value = this.hotWordsData[0].hotWordsitems[i];
      //     this.items[i] = { ...this.items[i] };
      //   }
      //   this.items = { ...this.items }
      //   this.proportion = { ...this.proportion }
      //   this.provinces = { ...this.provinces }
    }
  },

  mounted: function () {
    //这边是设置中间那个排名轮播图的代码哦
    let that = this
    this.axios.post('/dpp-theme-word/search/all/word/number')
      .then(res => {
        res.data.data.deleteByString()
        let hotWords = res.data.data.slice(0, 20)
        for (let i = 0; i < hotWords.length; i++) {
          hotWords[i] = [hotWords[i].word, hotWords[i].size];
        }
        that.total.data = hotWords
        that.total = { ...that.total }
        that.totalLoading = false
        //这边开始设置top5的数据
        for (let i = 0; i < 5; i++) {
          that.proportion.data[i] =
          {
            name: hotWords[i][0],
            value: hotWords[i][1]
          }
        }
        that.proportion = { ...that.proportion }
        that.loadingProportion = false
        //这边是下面的环图
        let top5 = [];
        let sum = 0
        for (let i = 0; i < 5; i++) {
          top5.push(hotWords[i][1])
          sum += hotWords[i][1]
        }
        for (let i = 0; i < 5; i++) {
          top5[i] /= sum;
        }
        for (let i = 0; i < 5; i++) {
          that.items[i].series[0].data[0].value = top5[i] * 100
          that.items[i] = { ...that.items[i] };
        }
        that.items = { ...that.items }
        this.loadingItems = false
        that.$emit("loadOver", true)
      })
    //水位图、活跃度
    // this.$axios.get("http://39.103.169.155:8080/policy/rank?endTime=2025-01-01&startTime=1900-01-01")
    //   .then(res => {
    //     for (let item of res.data.data) {
    //       that.provincesList.push({
    //         province: item.province,
    //         newPolicy: item.policyNum,
    //         data: [item.vitality],
    //         shape: 'round'
    //       })
    //     }
    //   })
    that.provincesLoading = false;
    //setInterval(this.change, 3000);
  }
}

</script>
<style lang='scss' scoped>
.allContainer {
  width: 100%;
  height: 100%;
  .topContainer {
    margin-top: 1%;
    width: 100%;
    height: 40%;
    display: flex;
    .acitivityContainer {
      width: 27%;
      height: 100%;
      .acitivity {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 20px;
          height: 15%;
          .number {
            display: inline-block;
            font-size: 24px;
            color: #3addc1;
          }
        }
      }
    }
    .totalContainer {
      width: 45%;
      height: 100%;
      margin-left: 1%;
    }
    .proportionContainer {
      margin-left: 1%;
      width: 25%;
      height: 100%;
      .proportion {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          text-align: center;
          font-size: 20px;
        }
      }
    }
  }
  .bottomContainer {
    height: 60%;
    width: 100%;
    display: flex;
    .border {
      margin-top: 1%;
      margin-right: 1%;
      flex: 1;
      height: 72.5%;
      .title {
        height: 20%;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 20px;
          font-weight: bold;
          position: relative;
          left: 1vw;
          top: 3vh;
        }
        .right {
          font-size: 35px;
          color: #3addc1;
          font-weight: bold;
          position: relative;
          right: 1vw;
          top: 2vh;
        }
      }
      .circle {
        height: 60%;
      }
      .bottom {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        .numberContainer {
          .title {
            display: inline-block;
            font-size: 20px;
          }
          .number {
            display: inline-block;
            color: #3addc1;
            font-size: 30px;
          }
          .char {
            font-size: 20px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>