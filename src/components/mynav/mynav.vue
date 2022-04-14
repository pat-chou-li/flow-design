<!--  -->
<template>
  <div class="topContainer">
    <div class="topleftContainer">
      <img class="bank" src="../../static/bank.png" alt="">
      <div class="deliver"></div>
      <img @click="back()" class="back" src="../../static/back.png" alt="">
      <div class="deliver"></div>
      <div class="serverText">{{pageName}}</div>
      <div class="middle"></div>
      <div class="right">
        <el-popover placement="top-start" :title="pageName" width="200" trigger="hover" :content="content">
          <div slot="reference">
            <img src="../../static/帮助.png" alt="">
          </div>
        </el-popover>
        <div class="deliver"></div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more el-icon--right dropdown"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="data">数据分析</el-dropdown-item>
            <el-dropdown-item command="commodity">我的产品</el-dropdown-item>
            <el-dropdown-item command="logOut" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageName', 'content'],
  data () {
    return {
    };
  },

  components: {},

  methods: {
    back () {
      this.$router.back(-1)
    },
    handleCommand (command) {
      if (command == "logOut")
        this.logOut();
      if (command == "home") {
        this.backHome();
      }
      if (command == "data") {
        this.$router.push('/data')
      }
    },
    logOut () {
      window.sessionStorage.clear()
      window.localStorage.clear()
      this.$store.commit('changeLogin', { token: '' })
      this.$message.success('注销成功')
      this.$router.push('/login')
    },
    backHome () {
      this.$router.push('/home')
    }
  }
}

</script>
<style lang='scss' scoped>
.topContainer {
  background: rgba(255, 255, 255, 1);
  height: 4.3vh;
  display: flex;
  .topleftContainer {
    flex: 2;
    height: 100%;
    display: flex;
    align-items: center;
    .bank {
      width: 100px;
      margin-left: 0.67vw;
    }
    .deliver {
      margin-left: 0.8vw;
      width: 0px;
      height: 55%;
      border: 0.1px solid rgba(217, 87, 87, 1);
    }
    .back {
      height: 2.5vh;
      margin-left: 0.8vw;
      cursor: pointer;
    }
    .serverText {
      color: rgba(0, 0, 0, 0.9);
      font-size: 13px;
      margin-left: 0.8vw;
      font-weight: 600;
    }
  }
  .middle {
    flex: 20;
  }
  .right {
    flex: 1;
    display: flex;
    height: 100%;
    margin-top: 1.8vh;
    img {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .deliver {
      margin-left: 0.8vw;
      margin-right: 0.4vw;
      width: 0px;
      height: 55%;
      border: 0.1px solid rgba(217, 87, 87, 1);
    }
    .dropdown {
      cursor: pointer;
    }
  }
}
</style>