<template>
  <dv-border-box-12 dur=10 class="totalContainerBorder">
    <dv-Loading v-if="loading">
      正在加载购买地域
    </dv-Loading>
    <div v-else class="totalContainer">
      <div class="item">
        <div class="title">
          购买地域统计
        </div>
        <div class="flop">
          (次)
        </div>
      </div>
      <div class="item" v-for="i in index" :key="i">
        <div class="title">
          {{totalConfig[i].province}}
        </div>
        <div class="flop">
          <dv-digital-flop :config="totalConfig[i]" style="width:160px;height:40px;" />
        </div>
      </div>
    </div>
  </dv-border-box-12>
</template>

<script>
export default {
  name: 'total',
  data () {
    return {
      loading: false,
      index: [0, 1, 2, 3, 4, 5],
      totalConfig1: [
        {
          province: '广东',
          number: [827],
          content: '{nt}'
        },
        {
          province: '福建',
          number: [118],
          content: '{nt}'
        },
        {
          province: '江苏',
          number: [821],
          content: '{nt}'
        },
        {
          province: '四川',
          number: [617],
          content: '{nt}'
        },
        {
          province: '湖南',
          number: [2959],
          content: '{nt}'
        },
        {
          province: '西藏',
          number: [34],
          content: '{nt}'
        },
      ],
      totalConfig2: [
        {
          province: '安徽',
          number: [827],
          content: '{nt}'
        },
        {
          province: '北京',
          number: [802],
          content: '{nt}'
        },
        {
          province: '台湾',
          number: [12],
          content: '{nt}'
        },
        {
          province: '海南',
          number: [6],
          content: '{nt}'
        },
        {
          province: '新疆维吾尔族自治区',
          number: [6],
          content: '{nt}'
        },
        {
          province: '宁夏回族自治区',
          number: [3],
          content: '{nt}'
        },
      ],
      totalConfig: [],
      totalConfigs: [[], [], [], [], [], []],
      totalFlag: 0
    };
  },

  methods: {
    changeTotalConfig () {
      this.totalFlag++;
      if (this.totalFlag >= 6) {
        this.totalFlag = this.totalFlag % 6;
      }
      this.totalConfig = this.totalConfigs[this.totalFlag]
    }
  },
  created: function () {
    this.totalConfig = this.totalConfig1;
  },

  mounted: function () {
    //政策总数
    let that = this
    this.$axios.get("http://39.103.169.155:8080/policy/getTotalList")
      .then(res => {
        let map = res.data.data;
        let i = 0, j = 0;
        Object.keys(map).forEach(function (key) {
          if (j == 6) {
            j = 0;
            i++;
          }
          j++
          that.totalConfigs[i].push({
            province: key,
            number: [map[key]],
            content: '{nt}'
          })
        })
        that.totalConfigs[i].push({
          province: '',
          number: [],
          content: '{nt}'
        })
        that.totalConfigs[i].push({
          province: '',
          number: [],
          content: '{nt}'
        })
        this.totalConfig = this.totalConfigs[0]
        this.loading = false
        setInterval(() => {
          this.changeTotalConfig()
        }, 2000)
      })
  }
}

</script>
<style lang='scss' scoped>
.totalContainerBorder {
  height: 12%;
  .totalContainer {
    display: flex;
    height: 100%;
    align-items: center;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 80%;
      justify-content: center;
      align-items: center;
      border-left: 1.5px solid #061e5d;
      border-right: 1.5px solid #061e5d;
      .title {
        font-size: 18px;
      }
      .flop {
        font-size: 18px;
      }
    }
  }
}
</style>