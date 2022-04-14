<template>
  <div class="allContainer">
    <mynav :content="'在这里可以对产品进行上架、下架、更改、新增、删除等'" :pageName="'我的产品'"></mynav>
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
      <div class="sortItem">是否上架
        <el-dropdown @command="sortByPublic" size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">已上架</el-dropdown-item>
            <el-dropdown-item command="1">未上架</el-dropdown-item>
            <el-dropdown-item command="2">全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="sortItem">产品类型
        <el-dropdown @command="sortByUnPublic" size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>存款</el-dropdown-item>
            <el-dropdown-item>贷款</el-dropdown-item>
            <el-dropdown-item>基金</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div class="sortItem">客户数量
        <el-dropdown size="mini">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>升序</el-dropdown-item>
            <el-dropdown-item>降序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>
    <div class="mainContainer">
      <div class="mainItem" @click.stop="changeMain(index, item)" v-for="(item, index) in currentCommodity" :key="item.commodityID">
        <div class="top">
          <div class="state" :class="{isPublic:item.isPublished}"></div>
          <div class="text">{{item.commodityName}}</div>
          <div @click.stop>
            <el-popover v-model="deleteVisible[index]" popper-append-to-body="false" trigger="click" placement="top" width="200">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" @click="_cancel(index)">取消</el-button>
                <el-button size="mini" type="primary" @click="_delete(index)">确定</el-button>
              </div>
              <div slot="reference" class="el-icon-delete delete"></div>
            </el-popover>
          </div>
        </div>
        <div class="date">
          {{(item.showDay)}}
        </div>
        <div class="middle">
          <el-progress type="circle" :width="40" :stroke-width="2" color="rgba(255, 106, 0, 1)" :percentage="parseFloat(item.percentage)"></el-progress>
        </div>
        <div class="bottom">
          <div class="text">
            {{item.commodityId}}
          </div>
          <div class="buttonContainer">
            <div class="down btn" @click.stop="down(index, item.isPublished)" :class="{isPubliced:!item.isPublished}">
              ↓
            </div>
            <div class="up btn" @click.stop="up(index, item.isPublished)" :class="{isPubliced:item.isPublished}">
              ↑
            </div>
          </div>
        </div>
      </div>
      <div class="mainItem add" @click="addItem()">
        <div class="el-icon-circle-plus-outline"></div>
      </div>
    </div>
    <div class="bottomContainer">
      <div class="block">
        <el-pagination :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="9" :total="this.allCommodity.length">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="24%">
      <div class="dialog" slot="">
        <div class="inputItem">
          <div class="label">产品名称</div>
          <input type="text" v-model="selectedCommodity.commodityName">
        </div>
        <div class="inputItem">
          <div class="label">风险等级</div>
          <input type="text" v-model="selectedCommodity.riskLevel">
        </div>
        <div class="inputItem">
          <div class="label">产品编号</div>
          <input id="number" disabled="disabled" type="text" v-model="selectedCommodity.commodityId">
        </div>
        <div class="inputItem">
          <div class="label">年化利率(%)</div>
          <input type="text" v-model.number="selectedCommodity.yearInterestRate">
        </div>
        <div class="inputItem">
          <div class="label">起存金额(元)</div>
          <input type="number" v-model.number="selectedCommodity.startMoney">
        </div>
        <div class="inputItem">
          <div class="label">产品期限</div>
          <input type="text" v-model="selectedCommodity.commodityTimeLimit">
        </div>
        <div class="inputItem">
          <div class="label">单人限额(元)</div>
          <input type="text" v-model.number="selectedCommodity.personLimit">
        </div>
        <div class="inputItem">
          <div class="label">单日限额(元)</div>
          <input type="text" v-model.number="selectedCommodity.dayLimit">
        </div>
        <div class="inputItem">
          <div class="label">起息日(精确到天)</div>
          <input type="date" placeholder="20xx-xx-xx" v-model="selectedCommodity.startDay">
        </div>
        <div class="inputItem">
          <div class="label">结息方式</div>
          <input type="text" v-model="selectedCommodity.interestWay">
        </div>
        <div class="inputItem">
          <div class="label">到期日(精确到天)</div>
          <input type="date" placeholder="20xx-xx-xx" v-model="selectedCommodity.deadline">
        </div>
        <div class="inputItem">
          <div class="label">递增金额(元)</div>
          <input type="text" v-model.number="selectedCommodity.increaseMoney">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btnContainer">
          <div class="left" @click="go()">流程编排</div>
          <div class="right" @click="save()">保存</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="newDialogVisible" width="24%">
      <div class="dialog" slot="">
        <div class="inputItem">
          <div class="label">产品名称</div>
          <input type="text" v-model="selectedCommodity.commodityName">
        </div>
        <div class="inputItem">
          <div class="label">风险等级</div>
          <input type="text" v-model="selectedCommodity.riskLevel">
        </div>
        <div class="inputItem">
          <div class="label">产品编号</div>
          <input id="number" disabled="disabled" type="text" v-model="selectedCommodity.commodityId">
        </div>
        <div class="inputItem">
          <div class="label">年化利率(%)</div>
          <input type="text" v-model.number="selectedCommodity.yearInterestRate">
        </div>
        <div class="inputItem">
          <div class="label">起存金额(元)</div>
          <input type="text" v-model.number="selectedCommodity.startMoney">
        </div>
        <div class="inputItem">
          <div class="label">产品期限</div>
          <input type="text" v-model="selectedCommodity.commodityTimeLimit">
        </div>
        <div class="inputItem">
          <div class="label">单人限额(元)</div>
          <input type="text" v-model.number="selectedCommodity.personLimit">
        </div>
        <div class="inputItem">
          <div class="label">单日限额(元)</div>
          <input type="text" v-model.number="selectedCommodity.dayLimit">
        </div>
        <div class="inputItem">
          <div class="label">起息日(精确到天)</div>
          <input type="date" placeholder="20xx-xx-xx" v-model="selectedCommodity.startDay">
        </div>
        <div class="inputItem">
          <div class="label">结息方式</div>
          <input type="text" v-model="selectedCommodity.interestWay">
        </div>
        <div class="inputItem">
          <div class="label">到期日(精确到天)</div>
          <input type="date" placeholder="20xx-xx-xx" v-model="selectedCommodity.deadline">
        </div>
        <div class="inputItem">
          <div class="label">递增金额(元)</div>
          <input type="text" v-model.number="selectedCommodity.increaseMoney">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btnContainer new">
          <div class="right" @click="addItemConfirm()">保存</div>
        </div>
      </div>
    </el-dialog>
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
      deleteVisible: [false, false, false, false, false, false, false, false, false],
      dialogVisible: false,
      newDialogVisible: false,
      selectedCommodity: {}
    };
  },
  mounted: function () {
    this.init()
  },

  components: {},
  methods: {
    ...mapMutations(['changeLogin']),
    go () {
      let commodityId = this.selectedCommodity.commodityId
      this.$router.push(`flow/?id=${commodityId}`)
    },
    dateParse (_date) {
      let date = new Date(_date)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0')
      return year + '-' + month + '-' + day
    },
    init () {
      this.$axios.get('1/admin/getAllCommodity')
        .then(res => {
          this.allCommodity = res.data.data
          for (let i = 0; i < this.allCommodity.length; i++) {
            this.allCommodity[i].showDay = this.dateParse(this.allCommodity[i].createdTime)
            this.allCommodity[i].startDay = this.dateParse(this.allCommodity[i].startDay)
            this.allCommodity[i].deadline = this.dateParse(this.allCommodity[i].deadline)
            let _now = new Date(this.allCommodity[i].startDay).getTime() - new Date('2015/1/1').getTime()
            let _last = new Date(this.allCommodity[i].deadline).getTime() - new Date('2020/1/1').getTime()
            let per = _last / _now <= 1 ? _last / _now : _now / _last
            this.allCommodity[i].percentage = Math.abs(per * 100).toFixed(0)
          }
          this.groupCommodity(this.allCommodity)
        })
    },
    _delete (index) {
      this.$axios({
        method: 'get',
        url: '1/admin/deleteCommodityById',
        params: { commodityId: this.currentCommodity[index].commodityId }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('删除成功');
            this.refresh()
            this._cancel(index)
          }
          else {
            this.$message.error('删除失败，请重试')
            this._cancel(index)
          }
        })
    },
    refresh () {
      this.init()
      this.handleCurrentChange(this.currentPage)
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
      if (result.length >= this.currentPage) {
        this.currentCommodity = result[this.currentPage - 1];
      } else if (result.length == 1) {
        this.currentCommodity = result[0]
      } else {
        this.currentCommodity = result[this.currentPage - 2]
      }
      //   this.currentPage = 1
      return result
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
    },
    sortByPublic (type) {
      //   this.allCommodity.sort(
      //     (a, b) => {
      //       return -(a.isPublished - b.isPublished)
      //     }
      //   )
      // 已上架
      if (type == 0) {
        this.currentCommodity = [];
        let tempAllCommodity = [];
        for (let i = 0; i < this.allCommodity.length; i++) {
          if (this.allCommodity[i].isPublished == 1) {
            tempAllCommodity.push(this.allCommodity[i]);
          }
        }
        this.groupCommodity(tempAllCommodity);
      } else if (type == 1) {
        //未上架
        this.currentCommodity = [];
        let tempAllCommodity = [];
        for (let i = 0; i < this.allCommodity.length; i++) {
          if (this.allCommodity[i].isPublished == 0) {
            tempAllCommodity.push(this.allCommodity[i]);
          }
        }
        this.groupCommodity(tempAllCommodity);
      } else
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
    },
    up (index, isPublished) {
      if (isPublished) {
        return
      }
      this.$axios({
        method: 'get',
        url: '1/admin/publishCommodity',
        params: { commodityId: this.currentCommodity[index].commodityId }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.currentCommodity[index].isPublished = 1
            this.$message.success('上架成功')
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch(res => {
          console.log(res)
          this.$message.error(res.message)
          this.init()
        })
    },
    down (index, isPublished) {
      if (!isPublished) {
        return
      }
      let data = {
        commodityId: this.currentCommodity[index].commodityId,
        isPublished: 0
      }
      data = JSON.stringify(data)
      console.log(data)
      this.$axios.post('1/admin/updateCommodity', data)
        .then(res => {
          if (res.data.code == 200) {
            this.currentCommodity[index].isPublished = 0
            this.$message.success('下架成功')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(res => {
          console.log(res)
          this.$message.error(res.message)
          this.init()
        })
    },
    changeMain (index, item) {
      this.selectedCommodity = item
      this.dialogVisible = true

    },
    handleClose (index) {
      this.dialogVisible = false
      this.newDialogVisible = false
    },
    save () {
      this.selectedCommodity.startDay = this.dateParse(this.selectedCommodity.startDay)
      this.selectedCommodity.deadline = this.dateParse(this.selectedCommodity.deadline)
      let data = JSON.stringify(this.selectedCommodity)
      this.$axios.post('1/admin/updateCommodity', data)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('修改成功')
            this.dialogVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(res => {
          this.$message.error(res.message)
          this.init()
        })
    },
    addItem () {
      this.selectedCommodity = {
        startDay: this.dateParse(new Date()),
        deadline: this.dateParse(new Date())
      }
      this.newDialogVisible = true
    },
    addItemConfirm () {
      this.selectedCommodity.startDay = this.dateParse(this.selectedCommodity.startDay)
      this.selectedCommodity.deadline = this.dateParse(this.selectedCommodity.deadline)
      this.selectedCommodity.isPublished = 0;
      console.log(this.selectedCommodity)
      let data = JSON.stringify(this.selectedCommodity)
      this.$axios.post('1/admin/insertCommodity', data)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('添加成功')
            let commodityId = res.data.data.commodityId
            this.init()
            this.newDialogVisible = false
            if (this.currentCommodity.length < 9) {
              this.currentCommodity.push(this.selectedCommodity)
            } else {
              this.init()
            }
            //添加成功后询问要不要直接流程编排
            this.$confirm('是否直接进行流程编排?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '稍后',
              type: 'warning'
            }).then(() => {
              this.$router.push(`flow/?id=${commodityId}`)
            })
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(res => {
          this.$message.error(res.message)
          this.init()
        })
    }
  },
}

</script>
<style lang='scss' scoped>
.mainContainer * {
  transition: all 0.5s;
}
.allContainer {
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
      cursor: pointer;
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
  .dialog {
    display: grid;
    grid-template-columns: repeat(2, 9vw);
    grid-template-rows: repeat(6, 12%);
    grid-row-gap: 3vh;
    grid-column-gap: 3.5vw;
    input {
      width: 100%;
      height: 60%;
      box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.5),
        2px 2px 4px rgba(227, 227, 227, 0.5),
        -3px -3px 4px rgba(255, 255, 255, 0.78),
        3px 3px 4px rgba(207, 207, 207, 0.5);
      border-radius: 10px;
      border: none;
      text-align: center;
    }
    input:focus {
      outline: none;
    }
    .label {
      font-size: 9px;
    }
    #number {
      cursor: not-allowed;
    }
  }
  .dialog-footer {
    .btnContainer {
      height: 5vh;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      .left,
      .right {
        width: 100px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        font-size: 9px;
        box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.78),
          3px 3px 4px rgba(207, 207, 207, 0.5);
        border-radius: 10px;
        text-align: center;
      }
      .left {
        color: rgba(252, 63, 63, 1);
      }
      .right {
        color: rgba(72, 227, 0, 1);
      }
    }
    .new {
      justify-content: center;
    }
  }
}
</style>