<template>
  <dv-border-box-8 :reverse="true" class="revenue" :dur=10>
    <div class="title">
      上半年热门产品排名(购买人次)
    </div>
    <dv-capsule-chart :config="revenueConfig" class="chart" />
  </dv-border-box-8>
</template>

<script>
export default {
  name: 'revenue',
  data () {
    return {
      revenueConfig: {
        data: [
          {
            name: '灵便存1年',
            value: 8882
          },
          {
            name: '微详云12号',
            value: 7599
          },
          {
            name: '灵动存4号',
            value: 5647
          },
          {
            name: '微详云7号',
            value: 5314
          },
          {
            name: '得亿存1年',
            value: 4731
          },
          {
            name: '满亿存7天',
            value: 4300
          },
          {
            name: '增亿存2年',
            value: 3254
          },
          {
            name: '智能存款1年',
            value: 2577
          },
          {
            name: '灵便存3年',
            value: 2446
          },
          {
            name: '增亿存1年',
            value: 2042
          },
          {
            name: '微详云11号',
            value: 1999
          },
          {
            name: '微详云5号',
            value: 1956
          },
          {
            name: '灵动存1号',
            value: 1713
          },
          {
            name: '灵动存12号',
            value: 1708
          },
        ],
        showValue: true,
        unit: "次"
      },
    };
  },

  components: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.revenue {
  width: 20%;
  height: 100%;
  display: flex;
  .title {
    text-align: center;
    margin-top: 2vh;
    font-size: 18px;
  }
  .chart {
    margin-top: 5vh;
    margin-left: 10%;
    height: 85%;
    width: 80%;
    font-size: 22px;
  }
}
</style>