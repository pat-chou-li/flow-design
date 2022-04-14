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
      <!-- 1100*520 -->
      <video src="../../static/vedio.mp4" width="1100" height="520" muted autoplay="true">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="deliver">
      <div class="left">
        <div class="shadow"></div>
        <img src="../../static/newEra.png" alt="">
      </div>
      <div class="right">
        <div class="shadow"></div>
        <img src="../../static/whiteBook.png" alt="">
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
            <div style="white-space: pre-wrap" class="detail">
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
      <img src="../../static/backend.png" alt="">
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
        detail: "本接口用于校验姓名和身份证号的真实性和一致性，您可以通过输入姓名和身份证号或传入身份证人像面照片提供所需验证信息。\n默认接口请求频率限制：100次/秒\nAPI Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。\n您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。",
      }, {
        name: '用户信息检验接口',
        detail: `传入姓名和身份证号，校验两者的真实性和一致性。
默认接口请求频率限制：100次/秒。
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '白名单购买控制接口',
        detail: `黑名单启用后，被列入到黑名单的用户（或IP地址、IP包、邮件、病毒等）不能通过。
在白名单中的用户（或IP地址、IP包、邮件等）会优先通过，不会被当成垃圾邮件拒收，安全性和快捷性都大大提高
默认接口请求频率限制：100次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '地域购买控制接口',
        detail: `指定一个或多个地区，设置不同程度的操作限制
默认接口请求频率限制：100次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '用户标签控制接口',
        detail: `可以使用用户标签管理的相关接口，实现对公众号的标签进行创建、查询、修改、删除等操作，
也可以对用户进行打标签、取消标签等操作。
默认接口请求频率限制：100次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '利息计算接口',
        detail: `依据用户所买产品及购入金额，通过大数据分析预测，计算得出用户在不同阶段获得的利息
默认接口请求频率限制：1次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '库存锁定接口',
        detail: `在用户在产品订单页面确定数额后为付款成功的十分分钟内将该部分库存划为该用户所有
（注：在秒杀类产品中不适用）
默认接口请求频率限制：1次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '库存释放接口',
        detail: `用户在订单页面中确定数额后十分钟内未付款成功，则该部分库存释放
默认接口请求频率限制：1次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '库存更新接口',
        detail: `用户在订单页中确认数额付款成功后，即将该部分库存更新
默认接口请求频率限制：1次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
      }, {
        name: '日志录入接口',
        detail: `在用户操作完一个流程后，即将改过程，如时间，配置等录入至系统用户日志中记录下来
用户在订单页中确认数额付款成功后，即将该部分库存更新
默认接口请求频率限制：10次/秒
API Explorer 提供了在线调用、签名验证、SDK 代码生成和快速检索接口等能力。
您可查看每次调用的请求内容和返回结果以及自动生成 SDK 调用示例。`,
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