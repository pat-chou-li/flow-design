<template>
  <div class="header">
    <dv-decoration-8 class="left" />
    <div class="middleContainer">
      <div class="text">Mapiser | 服务编排数据分析</div>
      <dv-decoration-5 class="middle" :dur=3 />
    </div>
    <dv-decoration-8 class="right" :reverse="true" />
  </div>
</template>

<script>
export default {
  name: 'headerPolicy',
  data () {
    return {
    };
  },

  components: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 7%;
  display: flex;
  .left {
    width: 22%;
    height: 100%;
  }
  .middleContainer {
    width: 56%;
    height: 100%;
    .text {
      margin-top: 1vh;
      position: relative;
      top: 1vh;
      width: 100%;
      text-align: center;
      font-size: 28px;
      color: #0ff;
    }
    .middle {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 22%;
    height: 100%;
  }
}
</style>