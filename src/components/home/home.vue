<template>
  <div id="home">
    <div class="top">
      <div class="bank">
        <img src="../../static/bank.png" alt="">
      </div>
      <div class="middle"></div>
      <div class="login">
        <div class="btn" @click="go()">登录/注册</div>
      </div>
    </div>
    <div class="top white"></div>
    <div class="router">
      <div class="item" @click="anchor('flow')">
        <div class="up">流程图拖动</div>
        <div class="down">Artomichi Sevice</div>
      </div>
      <div class="item" @click="anchor('atom')">
        <div class="up">原子服务简介</div>
        <div class="down">atomic services</div>
      </div>
      <div class="item" @click="anchor('manage')">
        <div class="up">后台服务管理</div>
        <div class="down">service management</div>
      </div>
      <div class="item" @click="anchor('last')">
        <div class="up">关于我们</div>
        <div class="down">about us</div>
      </div>
    </div>
    <div class="headline">
      <div class="up">湖南三湘银行</div>
      <div class="down">服务编排系统 1.0</div>
      <div class="btn" @click="go()">立即使用</div>
    </div>
    <div class="playerContainer">
      <iframe class="markdown-player" src="http://player.bilibili.com/player.html?aid=16572686&p=7&amp;high_quality=0&amp;danmaku=1&amp;as_wide=0" width="1100" height="520" scrolling="no" border="0"
        frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    </div>
    <div class="deliver">
      <div class="left">
        <div class="shadow"></div>
        <img src="../../static/无代码新时代.png" alt="">
      </div>
      <div class="right">
        <div class="shadow"></div>
        <img src="../../static/无代码相关白皮书.png" alt="">
      </div>
    </div>
    <div class="flow" id="flow">
      <div class="left">
        <img src="../../static/flow.png" alt="">
      </div>
      <div class="right">
        <div class="line1">流程图拖动</div>
        <div class="line2">无代码开发·新时代</div>
        <div class="line3">No-code development New Era</div>
        <div class="line4">拖拽添加字段、点击设置业务流、勾选分配权限，三步操作让业务数据规范严谨地流转</div>
        <div class="btn" @click="go()">立即使用</div>
      </div>
    </div>
    <div class="atom" id="atom">
      <div class="headline">
        <div class="up">原子服务简介</div>
        <div class="down">atomic services</div>
      </div>
      <div class="atomContainer">
        <div class="item" @mouseover="activeNum = i" :class="{active: activeNum == i }" v-for="(item,i) in atoms" :key="i">
          <div class="activeContainer" v-show="activeNum == i">
            <div class="headline">
              {{item.name}}
            </div>
            <div class="detail">
              {{item.detail}}
            </div>
          </div>
          <div class="Container" v-show="activeNum != i">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="shadow"></div>
    </div>
    <div class="manage">
      <div class="line1">后台可视化服务管理</div>
      <div class="line2">无代码开发·新时代</div>
      <div class="line3">
        <div class="text">No-code development New Era</div>
        <div class="btn" @click="go()">立即使用</div>
      </div>
      <div class="line4">清晰管理已上线与未上线服务，可增添新服务</div>
    </div>
    <div class="manageImgContainer" id="manage">
      <img src="../../static/后台管理.png" alt="">
    </div>
    <div class="lastImgContainer" id="last">
      <img src="../../static/last.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      atoms: [{
        name: '证件审查接口',
        detail: '在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台，而其中微信凭借高达9.38亿的月活跃用户以及高达29%的日均手机应用使用率，成为各款APP选择最多、排位最靠前的分享途径。即便同样是腾讯系下的QQ，也在QQ空间中加入了分享到微信好友和朋友圈的功能。',
      }, {
        name: '用户信息检验接口',
        detail: '',
      }, {
        name: '白名单购买控制接口',
        detail: '',
      }, {
        name: '地域购买控制接口',
        detail: '',
      }, {
        name: '用户标签控制接口',
        detail: '',
      }, {
        name: '利息计算接口',
        detail: '',
      }, {
        name: '库存锁定接口',
        detail: '',
      }, {
        name: '库存释放接口',
        detail: '',
      }, {
        name: '库存更新接口',
        detail: '',
      }, {
        name: '日志录入接口',
        detail: '',
      }],
      activeNum: 0
    };
  },

  components: {},

  methods: {
    anchor (id) {
      document.getElementById(id).scrollIntoView({ block: 'end', behavior: 'smooth' })
    },
    go () {
      this.$router.push('/commodity')
    }
  }
}

</script>
<style lang='scss' scoped>
#home {
  scroll-behavior: smooth;
  width: calc(100vw - 17px);
  background: #f2f2f2;
  .white {
    background: none !important;
    position: static !important;
    z-index: 0;
  }
  .top {
    height: 60px;
    z-index: 100;
    width: 100%;
    display: flex;
    position: fixed;
    background: white;
    .bank {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 8.17vw;
      img {
        width: 157px;
      }
    }
    .middle {
      width: 1120px;
      height: 100%;
    }
    .login {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 8.17vw;
      .btn {
        width: 157px;
        height: 36px;
        line-height: 36px;
        color: white;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(
          to right,
          rgba(255, 0, 0, 1),
          rgba(255, 107, 33, 1)
        );
      }
    }
  }
  .router {
    height: 125px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0 17.8vw;
    align-items: center;
    justify-content: space-between;
    .item {
      cursor: pointer;
    }
    .up {
      color: rgba(89, 89, 89, 1);
      text-align: center;
    }
    .down {
      color: rgba(143, 143, 143, 1);
      text-align: center;
    }
  }
  .headline {
    width: 100%;
    text-align: center;
    align-items: center;
    .up {
      font-size: 1.875vw;
    }
    .down {
      font-size: 3.7vw;
    }
    .btn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      color: white;
      border-radius: 10px;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
      background: linear-gradient(
        to right,
        rgba(255, 0, 0, 1),
        rgba(255, 107, 33, 1)
      );
    }
  }
  .playerContainer {
    box-sizing: border-box;
    margin: 3vh 21.3vw;
    display: flex;
    justify-content: center;
  }
  .deliver {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10vh 25vw;
    box-sizing: border-box;
    .left,
    .right {
      width: 20vw;
      height: 100%;
      position: relative;
      .shadow {
        background: rgba(14, 39, 62, 1);
        background-blend-mode: normal;
        border-radius: 40px;
        filter: blur(20px);
        mix-blend-mode: normal;
        width: 20vw;
        height: 13.2vw;
        position: absolute;
        left: 2vw;
        top: 5vh;
        opacity: 0.15;
        z-index: 0;
      }
    }
    .left img,
    .right img {
      position: relative;
      width: 20vw;
      z-index: 99;
    }
  }
  .flow {
    width: 58.2vw;
    height: 73.1vh;
    padding-left: 25.8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      flex: 4;
      img {
        height: 70vh;
      }
    }
    .right {
      flex: 6;
      .line1 {
        text-align: center;
        font-size: 3.7vw;
      }
      .line2 {
        text-align: center;
        font-size: 3.2vw;
        color: rgba(150, 150, 150, 1);
      }
      .line3 {
        text-align: center;
        color: rgba(97, 96, 96, 1);
        font-size: 0.8vw;
      }
      .line4 {
        color: rgba(46, 46, 46, 1);
        font-size: 1.2vw;
        margin: 4vh 5vw;
      }
      .btn {
        width: 150px;
        height: 40px;
        line-height: 40px;
        color: white;
        border-radius: 10px;
        margin: 0 auto;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(
          to right,
          rgba(255, 0, 0, 1),
          rgba(255, 107, 33, 1)
        );
      }
    }
  }
  .atom {
    position: relative;
    padding: 10vh 0;
    .headline {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .up {
        font-size: 3.2vw;
        color: black;
        font-weight: 700;
      }
      .down {
        color: rgba(255, 166, 166, 1);
        font-size: 1.2vw;
      }
    }
    .shadow {
      height: 54.3vh;
      width: 73.2vw;
      position: absolute;
      z-index: 0;
      background: rgba(178.5, 91.03500000000001, 91.03500000000001, 1);
      background-blend-mode: normal;
      border-radius: 40px;
      filter: blur(30px);
      opacity: 0.15;
      mix-blend-mode: normal;
      left: 20vw;
      top: 30vh;
    }
    .atomContainer {
      height: 54.3vh;
      width: 73.2vw;
      margin-top: 2vh;
      margin-left: 13.4vw;
      background: white;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      padding: 0 2vw;
      position: relative;
      z-index: 99;
    }
    .item {
      margin: 6vh 0.8vw;
      transition: all 0.5s;
      flex: 1;
      z-index: 99;
      background: linear-gradient(
        to bottom,
        rgba(255, 0, 0, 0.75),
        rgba(255, 107, 33, 0.77)
      );
      border-radius: 20px;
    }
    .active {
      transition: all 0.5s;
      flex: 3;
      background: linear-gradient(
        to right,
        rgba(255, 0, 0, 0.75),
        rgba(255, 107, 33, 0.77)
      );
      .activeContainer {
        padding: 3vh 1vw;
        .headline {
          color: white;
          font-size: 1.2vw;
          animation: 0.8s opacity;
        }
        .detail {
          margin-top: 3vh;
          color: white;
          font-size: 0.6vw;
          font-weight: 200;
          animation: 0.8s opacity;
        }
        @keyframes opacity {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
    .Container {
      height: 100%;
      letter-spacing: 0.2vh;
      color: white;
      padding: 0 1vw;
      font-size: 1.8vw;
      text-align: center;
      writing-mode: vertical-lr;
      cursor: default;
    }
  }
  .manage {
    margin-top: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .line1 {
      font-size: 3.6vw;
      font-weight: 700;
      text-align: center;
    }
    .line2 {
      color: rgba(150, 150, 150, 1);
      font-size: 3.2vw;
      text-align: center;
    }
    .line3 {
      color: rgba(97, 96, 96, 1);
      font-size: 0.8vw;
      display: flex;
      .btn {
        width: 13vw;
        height: 5vh;
        line-height: 5vh;
        color: white;
        margin-left: 1vw;
        border-radius: 0 25px;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(
          to right,
          rgba(255, 0, 0, 0.75),
          rgba(255, 107, 33, 0.75)
        );
      }
    }
    .line4 {
      color: rgba(46, 46, 46, 1);
      margin-top: 1vh;
      font-size: 1vw;
    }
  }
  .manageImgContainer {
    width: 100%;
    height: 60vh;
    padding: 5vh 10vw;
    box-sizing: border-box;
    img {
      width: 80vw;
    }
  }
  .lastImgContainer {
    width: 100%;
    height: 60vh;
    padding: 10vh 0 0 0;
    box-sizing: border-box;
    img {
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>