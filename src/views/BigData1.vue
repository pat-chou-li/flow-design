<template>
  <div class="data-view">
    <dv-full-screen-container class='bc'>
      <!-- <dv-loading id="Loading">
        正在加载数据
      </dv-Loading> -->
      <headerPolicy>
      </headerPolicy>

      <div class="main">
        <revenue></revenue>
        <div class="rightContainer">
          <total></total>
          <hotWords @loadOver="loadOver"></hotWords>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import headerPolicy from '../components/BigData1/headerPolicy.vue'
import revenue from '../components/BigData1/revenue.vue'
import total from '../components/BigData1/total.vue'
import hotWords from '../components/BigData1/hotWords.vue'
export default {
  name: 'BigData1',
  components: { headerPolicy, revenue, total, hotWords },
  data () {
    return {
      totalIsLoading: true,
      hotWordsIsLoading: false
    }
  },
  methods: {
    loadOver (data) {
      this.hotWordsIsLoading = true
    }
  },
  computed: {
    isLoading: function () {
      return this.totalIsLoading && this.hotWordsIsLoading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.data-view {
  width: 100%;
  height: 100%;
  color: #dadada;
}
.bc {
  background-color: #03071b;
  display: flex;
  flex-direction: column;
}
.main {
  margin-top: 6vh;
  margin-left: 1vw;
  height: 91%;
  width: 100%;
  display: flex;
  .rightContainer {
    margin-left: 1vw;
    width: 78%;
    height: 100%;
  }
}
</style>
