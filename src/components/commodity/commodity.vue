<template>
  <div class="allContainer">
    <div class="topContainer">
      <div class="topleftContainer">
        <img class="bank" src="../../static/bank.png" alt="">
        <div class="deliver"></div>
        <img class="back" src="../../static/back.png" alt="">
        <div class="deliver"></div>
        <div class="serverText">我的产品</div>
        <div class="middle"></div>
        <div class="right">
          <el-popover placement="top-start" title="我的产品" width="200" trigger="hover" content="在这里可以对产品进行上架、下架、更改、新增、删除等">
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
              <el-dropdown-item command="usermsg">用户信息</el-dropdown-item>
              <el-dropdown-item command="commodity">我的产品</el-dropdown-item>
              <el-dropdown-item command="logOut" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="bankContainer">
      <img src="../../static/bank.png" alt="">
    </div>
    <div class="searchContainer">
      <div class="search">
        <div class="el-icon-search icon"></div>
        <input @input="fliter()" v-model="fliterWords" placeholder="输入服务名或编号" type="text">
      </div>
    </div>
    <div class="searchAndSort"></div>
    <div class="sortContainer">
      <div class="sortItem">创建时间
        <el-dropdown @command="sortByCreatedTime" size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">升序</el-dropdown-item>
            <el-dropdown-item command="2">降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="sortItem">已上架
        <el-dropdown @command="sortByPublic" size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>优先</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="sortItem">未上架
        <el-dropdown @command="sortByUnPublic" size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>优先</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="sortItem">客户数量
        <el-dropdown size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>升序</el-dropdown-item>
            <el-dropdown-item>降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="mainContainer">
      <div class="mainItem" v-for="(item, index) in currentCommodity" :key="item.commodityID">
        <div class="top">
          <div class="state" :class="{isPublic:item.isPublished}"></div>
          <div class="text">{{item.commodityName}}</div>
          <el-popover v-model="deleteVisible[index]" trigger="click" placement="top" width="200">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="_cancel(index)">取消</el-button>
              <el-button size="mini" type="primary" @click="_delete(index)">确定</el-button>
            </div>
            <div slot="reference" class="el-icon-delete delete"></div>
          </el-popover>
        </div>
        <div class="date">
          {{(item.showDay)}}
        </div>
        <div class="middle">
          <el-progress type="circle" :width="40" :stroke-width="2" color="rgba(255, 106, 0, 1)" :percentage="item.percentage"></el-progress>
        </div>
        <div class="bottom">
          <div class="text">
            {{item.commodityId}}
          </div>
          <div class="buttonContainer">
            <div class="down btn" :class="{isPubliced:item.isPublished}">
              ↓
            </div>
            <div class="up btn" :class="{isPubliced:!item.isPublished}">
              ↑
            </div>
          </div>
        </div>
      </div>
      <div class="mainItem add">
        <div class="el-icon-circle-plus-outline"></div>
      </div>
    </div>
    <div class="bottomContainer">
      <div class="block">
        <el-pagination :current-page="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="9" :total="this.allCommodity.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      allCommodity: [],
      groupedCommodity: [],
      currentCommodity: [],
      fliterWords: '',
      currentPage: 1,
      deleteVisible: [false, false, false, false, false, false, false, false, false]
    };
  },
  mounted: function () {
    this.init()
  },

  components: {},
  methods: {
    ...mapMutations(['changeLogin']),
    init () {
      this.$axios.get('/admin/getAllCommodity')
        .then(res => {
          this.allCommodity = res.data.data
          for (let i = 0; i < this.allCommodity.length; i++) {
            let date = new Date(this.allCommodity[i].createdTime)
            let year = date.getFullYear()
            let month = date.getMonth() + 1;
            let day = date.getDate()
            this.allCommodity[i].showDay = year + '.' + month + '.' + day
            this.allCommodity[i].percentage = Math.round(Math.random() * 100)
          }
          this.groupCommodity(this.allCommodity)
        })
    },
    _delete (index) {
      let data = JSON.stringify({ commodityId: this.currentCommodity[index].commodityId + '' })
      this.$axios({
        method: 'get',
        url: '/admin/deleteCommodityById',
        data: data
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('删除成功');
            refresh()
            this._cancel(index)
          }
          else {
            this.$message.error('删除失败，请重试')
            this._cancel(index)
          }
        })
    },
    refresh () {
      init()
      handleCurrentChange(this.currentPage)
    },
    _cancel (index) {
      this.$set(this.deleteVisible, index, false)
    },
    fliter () {
      this.currentCommodity = [];
      let tempAllCommodity = []
      let value = this.fliterWords
      for (let i = 0; i < this.allCommodity.length; i++) {
        if (this.allCommodity[i].commodityName.match(value) || (this.allCommodity[i].commodityId + '').match(value))
          tempAllCommodity.push(this.allCommodity[i]);
      }
      this.groupCommodity(tempAllCommodity)
    },
    groupCommodity (allCommodity) {
      let result = []
      for (var i = 0; i < allCommodity.length; i += 9) {
        result.push(allCommodity.slice(i, i + 9));
      }
      this.groupedCommodity = result;
      this.currentCommodity = result[0];
      console.log(result)
      this.currentPage = 1
      return result
    },
    handleCommand (command) {
      if (command == "logOut")
        this.logOut();
    },
    logOut () {
      window.sessionStorage.clear()
      window.localStorage.clear()
      this.$store.commit('changeLogin', { token: '' })
      this.$message.success('注销成功')
      this.$router.push('/login')
    },
    sortByCreatedTime (command) {
      if (command == "1") {
        this.allCommodity.sort(
          (a, b) => {
            return Date.parse(a.createdTime) - Date.parse(b.createdTime)
          }
        )
        this.groupCommodity(this.allCommodity)
      }
      else {
        this.allCommodity.sort(
          (a, b) => {
            return Date.parse(b.createdTime) - Date.parse(a.createdTime)
          }
        )
        this.groupCommodity(this.allCommodity)
      }
      console.log(this.allCommodity[0])
    },
    sortByPublic () {
      this.allCommodity.sort(
        (a, b) => {
          return -(a.isPublished - b.isPublished)
        }
      )
      this.groupCommodity(this.allCommodity)
    },
    sortByUnPublic () {
      this.allCommodity.sort(
        (a, b) => {
          return a.isPublished - b.isPublished
        }
      )
      this.groupCommodity(this.allCommodity)
    },
    handleCurrentChange (page) {
      this.currentPage = page
      page--
      this.currentCommodity = this.groupedCommodity[page]
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
  .bankContainer {
    height: 18.6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 15.6vw;
    }
  }
  .searchContainer {
    height: 6.4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .search {
      display: flex;
      width: 31.25vw;
      height: 100%;
      box-shadow: -2px -2px 4px rgba(237, 237, 237, 0.5),
        2px 2px 4px rgba(242, 242, 242, 0.5),
        -4px -4px 4px rgba(255, 255, 255, 0.53),
        4px 4px 4px rgba(230, 230, 230, 0.5);
      border-radius: 10px;
      .icon {
        height: 100%;
        margin-left: 1vw;
        font-size: 24px;
        color: rgba(255, 0, 0, 1);
        line-height: 6.4vh !important;
        display: inline-block;
      }
      input {
        margin-left: 1vw;
        margin-top: 0.5vh;
        border-color: #878787;
        border-style: solid;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
        border-left-width: 0px;
        width: 90%;
        height: 90%;
      }
      input:focus {
        outline: none;
        border-color: #878787;
        border-style: solid;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
        border-left-width: 0px;
      }
    }
  }
  .searchAndSort {
    height: 4vh;
  }
  .sortContainer {
    height: 3.2vh;
    width: 28.6vw;
    position: relative;
    left: 35.6vw;
    display: flex;
    justify-content: space-between;
    .sortItem {
      padding-left: 1vw;
      box-shadow: -2px -2px 4px rgba(255, 255, 255, 1),
        2px 2px 4px rgba(212, 212, 212, 0.5);
      border-radius: 8px;
      flex: 1;
      text-align: center;
      color: rgba(112, 112, 112, 1);
      font-size: 8px;
      .icon {
        color: rgba(255, 0, 0, 1);
        line-height: 2.5vh;
      }
    }
  }
  .mainContainer {
    height: 48.7vh;
    width: 90vw;
    margin: 3vh 5vw 0 5vw;
    background-color: rgba(249.9, 249.9, 249.9, 1);
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.39),
      5px 5px 5px rgba(227, 227, 227, 0.5);
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(5, 16%);
    grid-template-rows: repeat(5, 35%);
    grid-row-gap: 7vh;
    grid-column-gap: 3.5vw;
    padding-top: 7.5vh;
    box-sizing: border-box;
    padding-left: 5vw;
    .mainItem {
      background-color: rgba(255, 255, 255, 1);
      border: 0.5px solid rgba(0, 0, 0, 1);
      box-shadow: -3px -3px 4px rgba(255, 255, 255, 1),
        3px 3px 4px rgba(227, 227, 227, 0.5);
      border-radius: 15px;
      box-sizing: border-box;
      padding: 1vh;
      .top {
        height: 25%;
        display: flex;
        position: relative;
        .state {
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background-color: rgba(235, 0, 0, 1);
        }
        .isPublic {
          background-color: rgba(72, 227, 0, 1);
        }
        .text {
          margin-left: 0.4vw;
          line-height: 2vh;
          font-size: 9px;
        }
        .delete {
          width: 25px;
          height: 25px;
          color: red;
          position: absolute;
          right: 0;
          cursor: pointer;
        }
      }
      .date {
        font-family: 'Source Han Sans CN';
        font-family: 'noto sans';
        font-size: 5px;
        color: rgba(166, 166, 166, 1);
        position: absolute;
      }
      .middle {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bottom {
        display: flex;
        position: relative;
      }
      .buttonContainer {
        position: absolute;
        right: 0;
        display: flex;
        .btn {
          width: 30px;
          height: 25px;
          box-shadow: -2px -2px 4px rgba(255, 255, 255, 1),
            2px 2px 4px rgba(184, 184, 184, 0.5);
          border-radius: 8px;
          cursor: pointer;
          color: white;
          text-align: center;
          line-height: 25px;
          font-size: 6px;
        }
        .down {
          background: rgba(252, 63, 63, 1);
        }
        .up {
          background-color: rgba(72, 227, 0, 1);
          margin-left: 0.3vw;
        }
        .isPubliced {
          background: rgba(171, 171, 171, 1);
          cursor: not-allowed;
        }
      }
    }
    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      color: rgba(166, 166, 166, 1);
      cursor: pointer;
    }
  }
  .bottomContainer {
    margin-top: 3vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<style>
.el-pager li.active {
  color: red !important;
  cursor: default;
}
</style>