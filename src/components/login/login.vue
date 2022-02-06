<template>
  <div class="allContainer">
    <div class="topContainer">
      <div class="topleftContainer">
        <img class="bank" src="../../static/bank.png" alt="">
        <div class="deliver"></div>
        <img class="back" src="../../static/back.png" alt="">
        <div class="deliver"></div>
      </div>
    </div>
    <div class="bac"></div>
    <div class="fixedCard" @click="changeReg()" :class="{fixedCardIsReg:isReg}">
      <div class="left">
        <div class="top">
          <img class="bank" src="../../static/whiteBank.png" alt="">
        </div>
        <img class="ch" src="../../static/loginCh.png" alt="">
        <div class="bottom">
          <img class="textImg" src="../../static/注册.png" alt="">
          <img class="step" src="../../static/step0.png" alt="">
          <img class="step" src="../../static/step1.png" alt="">
          <img class="step" src="../../static/step2.png" alt="">
          <div class="text">REGISTERED</div>
        </div>
        <div class="final">
          <img class="monkey" src="../../static/monkey.png" alt="">
          <div class="textContainer">
            <img class="text" src="../../static/打造百年三湘.png" alt="">
            <img class="text" src="../../static/力创民族精品.png" alt="">
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <img class="bank" src="../../static/whiteBank.png" alt="">
        </div>
        <img class="ch" src="../../static/loginCh.png" alt="">
        <div class="bottom">
          <img class="textImg" src="../../static/登陆.png" alt="">
          <img class="step" src="../../static/step0.png" alt="">
          <img class="step" src="../../static/step1.png" alt="">
          <img class="step" src="../../static/step2.png" alt="">
          <div class="text">LOG IN</div>
        </div>
        <div class="final">
          <img class="monkey" src="../../static/monkey.png" alt="">
          <div class="textContainer">
            <img class="text" src="../../static/湖南三湘银行.png" alt="">
            <img class="text2" src="../../static/老百姓自己的银行.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="switchCard" :class="{switchCardIsReg:isReg}">
      <transition name="fade">
        <div class="login" v-if="!isReg">
          <div class="top">
            <img class="taiji" src="../../static/太极.png" alt="">
            <div class="text">湖南三湘银行服务编排系统</div>
            <img class="saoyisao" src="../../static/扫一扫@2x.png" alt="">
          </div>
          <div class="middle">
            <div class="bank">
              <img class="bank" src="../../static/bank.png" alt="">
            </div>
            <div class="account">
              <el-input prefix-icon="el-icon-s-custom" v-model="loginAccount" placeholder="请输入账户"></el-input>
            </div>
            <div class="password">
              <el-input prefix-icon="el-icon-key" v-model="loginPassword" placeholder="请输入密码"></el-input>
            </div>
            <div class="findpw">找回密码</div>
            <div class="loginBtn" @click="login()">登录</div>
          </div>
          <el-divider>第三方登录</el-divider>
          <div class="bottom">
            <div class="circleContainer">
              <div class="circle1">
                <img class="circleImg" src="../../static/vx.png" alt="">
              </div>
              <div class="circle2">
                <img class="circleImg" src="../../static/qq.png" alt="">
              </div>
            </div>
            <div class="text">让银行成为一种随时可得的服务</div>
          </div>
        </div>
        <div class="register" v-else>
          <div class="top">
            <img class="taiji" src="../../static/太极.png" alt="">
            <div class="text">湖南三湘银行服务编排系统</div>
          </div>
          <div class="middle">
            <div class="bank">
              <img class="bank" src="../../static/bank.png" alt="">
            </div>
            <div class="account">
              <el-input prefix-icon="el-icon-s-custom" v-model="regAccount" placeholder="请输入账户"></el-input>
            </div>
            <div class="password">
              <el-input prefix-icon="el-icon-key" v-model="regPassword" placeholder="请输入密码"></el-input>
            </div>
            <div class="password">
              <el-input prefix-icon="el-icon-paperclip" v-model="regNickName" placeholder="请输入昵称"></el-input>
            </div>
            <div class="loginBtn" @click="register()" id="regBtn">注册</div>
          </div>
          <div class="bottom">
            <div class="text">让银行成为一种随时可得的服务</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      isReg: true,
      loginAccount: '',
      loginPassword: '',
      regAccount: '',
      regPassword: '',
      regNickName: '',
      userToken: ''
    };
  },

  components: {},
  methods: {
    ...mapMutations(['changeLogin']),
    changeReg () {
      this.isReg = !this.isReg
    },
    login () {
      let _this = this;
      if (this.loginAccount === '' || this.loginPassword === '') {
        this.$message({
          type: 'error',
          message: '请填写所有内容！'
        })
        return;
      }
      let form = {
        adminName: this.loginAccount,
        adminPassword: this.loginPassword
      }
      let data = JSON.stringify(form);
      this.axios({
        method: 'post',
        url: '/admin/login',
        data: data
      }).then(res => {
        if (res.data.code == 200) {
          _this.userToken = res.data.token;
          // 将用户token保存到vuex中
          _this.changeLogin({ token: _this.userToken });
          const redirect = _this.$route.query.redirect
          if (redirect) {
            this.$router.replace({
              path: redirect
            })
          } else {
            this.$router.replace({
              path: "/home"
            })
          }
          _this.$message.success('登录成功')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error('未知错误，回调落入了catch,请联系管理员')
        console.log(error)
      })
    }
    ,
    register () {
      let _this = this;
      if (this.regAccount === '' || this.regPassword === '' || this.regNickName == '') {
        this.$message({
          type: 'error',
          message: '请填写所有内容！'
        })
        return;
      }
      let form = {
        adminName: this.regAccount,
        adminPassword: this.regPassword,
        adminNickName: this.regNickName
      }
      let data = JSON.stringify(form);
      this.axios({
        method: 'post',
        url: '/admin/register',
        data: data
      }).then(res => {
        if (res.data.code == 200) {
          _this.userToken = res.data.token;
          // 将用户token保存到vuex中
          _this.changeLogin({ token: _this.userToken });
          const redirect = _this.$route.query.redirect
          if (redirect) {
            this.$router.replace({
              path: redirect
            })
          } else {
            this.$router.replace({
              path: "/home"
            })
          }
          _this.$message.success('注册成功')
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error('未知错误，回调落入了catch,请联系管理员')
        console.log(error)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
* {
  transition: all 0.5s;
}
.allContainer {
  .topContainer {
    background: rgba(255, 255, 255, 1);
    height: 4.3vh;
    .topleftContainer {
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
  }
  .bac {
    width: 100%;
    height: 95.7vh;
    background-image: url('../../static/loginBac.jpg');
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    opacity: 0.1;
  }
  .fixedCard {
    width: 41.6vw;
    height: 43vh;
    background: rgba(255, 94, 0, 1);
    box-shadow: -10px -15px 15px rgba(255, 255, 255, 1);
    box-shadow: 5px 10px 15px rgba(208, 213, 217, 1);
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -21.5vh;
    margin-left: -20.8vw;
    display: flex;
    cursor: pointer;
    .left {
      box-sizing: border-box;
      padding: 1.5vw;
      height: 100%;
      position: relative;
      flex: 1;
      .top {
        width: 1vw;
        height: 10%;
        .bank {
          width: 10vw;
        }
      }
      .ch {
        width: 3.5vw;
        position: absolute;
        right: 2vw;
        top: 1.8vw;
      }
      .bottom {
        height: 65%;
        .textImg {
          width: 4vw;
          margin-top: 1vh;
        }
        .text {
          color: rgba(255, 255, 255, 1);
          font-size: 15px;
          text-decoration: underline;
        }
        .step {
          width: 0.8vw;
          transform: rotate(180deg);
          margin-left: 0.5vw;
          position: relative;
          bottom: 1.5vh;
        }
      }
      .final {
        .monkey {
          height: 10vh;
        }
        .textContainer {
          float: right;
          width: 9vw;
          margin-top: 2vh;
          .text {
            margin-top: 0.4vh;
            width: 8vw;
          }
        }
      }
    }
    .right {
      transform: rotateY(180deg);
      box-sizing: border-box;
      padding: 1.5vw;
      height: 100%;
      position: relative;
      flex: 1;
      .top {
        width: 1vw;
        height: 10%;
        .bank {
          transform: rotateY(180deg);
          width: 10vw;
        }
      }
      .ch {
        transform: rotateY(180deg);
        width: 3.5vw;
        position: absolute;
        right: 2vw;
        top: 1.8vw;
      }
      .bottom {
        height: 65%;
        .textImg {
          transform: rotateY(180deg);
          width: 4vw;
          margin-top: 1vh;
        }
        .text {
          position: absolute;
          transform: rotateY(180deg);
          color: rgba(255, 255, 255, 1);
          font-size: 15px;
          text-decoration: underline;
        }
        .step {
          width: 0.8vw;
          transform: rotate(180deg);
          margin-left: 0.5vw;
          position: relative;
          bottom: 1.5vh;
        }
      }
      .final {
        .monkey {
          height: 10vh;
        }
        .textContainer {
          float: right;
          width: 9vw;
          margin-top: 2vh;
          transform: rotateY(180deg);
          .text {
            margin-top: 0.4vh;
            width: 8vw;
          }
          .text2 {
            margin-top: 0.4vh;
            width: 12vw;
          }
        }
      }
    }
  }
  .fixedCardIsReg {
    background: rgba(255, 94, 0, 1);
    box-shadow: -10px -15px 15px rgba(255, 255, 255, 1);
    box-shadow: 5px 10px 15px rgba(208, 213, 217, 1);
  }
  .switchCard {
    height: 65vh;
    width: 25vw;
    position: absolute;
    left: 24.5vw;
    top: 50%;
    margin-top: -32.5vh;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: -10px -15px 15px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 5px 15px rgba(179, 179, 179, 1);
    border-radius: 30px;
    .login,
    .register {
      width: 100%;
      height: 100%;
      padding: 1.5vw;
      box-sizing: border-box;
      .top {
        height: 10%;
        display: flex;
        .taiji {
          width: 25px;
          height: 25px;
        }
        .text {
          font-size: 12px;
          text-align: center;
          line-height: 25px;
          margin-left: 0.5vw;
          font-weight: 600;
        }
        .saoyisao {
          height: 25px;
          width: 25px;
          position: absolute;
          right: 2vw;
          cursor: pointer;
        }
      }
      .middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 8vh;
        .bank {
          width: 150px;
          margin-bottom: 1vh;
        }
        .account,
        .password {
          display: flex;
          margin-bottom: 1vh;
        }
        .findpw {
          font-size: 9px;
          cursor: pointer;
          color: rgba(99, 99, 99, 1);
        }
        .loginBtn {
          text-align: center;
          height: 4.3vh;
          width: 7.8vw;
          line-height: 4vh;
          font-weight: 600;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 1);
          border: 0.5px solid rgba(166, 166, 166, 1);
          box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.5);
          box-shadow: 2px 2px 5px rgba(207, 207, 207, 0.5);
          border-radius: 10px;
          margin-top: 4vh;
          color: rgba(252, 61, 61, 1);
          &:hover {
            background: rgb(255, 220, 220);
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .circleContainer {
          height: 10%;
          display: flex;
          .circle1 {
            border: 0.5px solid rgba(27, 255, 10, 1);
            box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5);
            box-shadow: 1px 1px 4px rgba(224, 224, 224, 0.5);
            margin-right: 5vw;
            &:hover {
              background: rgba(178, 253, 173, 0.5);
            }
          }
          .circle2 {
            border: 0.5px solid rgba(0, 187, 250, 1);
            box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5);
            box-shadow: 1px 1px 4px rgba(224, 224, 224, 0.5);
            &:hover {
              background: rgba(185, 234, 250, 0.5);
            }
          }
          .circle1,
          .circle2 {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .circleImg {
              width: 15px;
              height: 15px;
            }
          }
        }
        .text {
          margin-top: 5vh;
          font-size: 9px;
          color: rgba(99, 99, 99, 1);
          letter-spacing: 5px;
        }
      }
    }
    #regBtn {
      margin-top: 8vh;
      position: relative;
    }
  }
  .switchCardIsReg {
    left: 51vw;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style>
.el-input__inner {
  height: 4.5vh !important;
}
.el-divider__text {
  font-size: 9px !important;
  color: rgba(179, 179, 179, 1) !important;
}
</style>