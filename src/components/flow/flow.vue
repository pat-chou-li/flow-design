<template>
  <div class="allContainer">
    <!-- <div class="topContainer">
      <div class="topleftContainer">
        <img class="bank" src="../../static/bank.png" alt="">
        <div class="deliver"></div>
        <img class="back" src="../../static/back.png" alt="">
        <div class="deliver"></div>
        <div class="serverText">{{serverName}}</div>
      </div>
    </div> -->
    <mynav :content="'在这里可以对产品进行服务流程编排，默认连线表示成功后的流向，点击连线可以使连线变红，表示失败后的流向'" :pageName="serverName"></mynav>
    <div class="bottomContainer">
      <div class="left">
        <div class="menuContainer">
        </div>
        <div class="deliverContainer">
          <img class="deliverImage" src="../../static/deliver.png" alt="">
        </div>
        <div class="modelContainer">
          <div class="switch">
            <div class="first">
              <svg class="icon" v-if="switchFlag == 1">
                <use xlink:href="#icon-red1"></use>
              </svg>
              <svg class="icon" @click="switchPanel(1)" v-else>
                <use xlink:href="#icon-black1"></use>
              </svg>
            </div>
            <div class="deliver"></div>
            <div class="second">
              <svg class="icon" v-if="switchFlag == 2">
                <use xlink:href="#icon-red2"></use>
              </svg>
              <svg class="icon" @click="switchPanel(2)" v-else>
                <use xlink:href="#icon-black2"></use>
              </svg>
            </div>
            <div class="deliver"></div>
            <div class="third">
              <svg class="icon" v-if="switchFlag == 3">
                <use xlink:href="#icon-red3"></use>
              </svg>
              <svg class="icon" @click="switchPanel(3)" v-else>
                <use xlink:href="#icon-black3"></use>
              </svg>
            </div>
          </div>
          <div class="panel">
            <div class="first" v-if="switchFlag == 1">
              <div class="name"> 名称: <input type="text" v-model="flowTemplateName"></div>
              <div class="btn" @click="saveTemplate()">保存为模板</div>
            </div>
            <div class="second" v-if="switchFlag == 2">
              <div class="modelTop">
                <div class="modelText">可用模板</div>
                <div class="modelSearch">
                  <div class="el-icon-search"></div>
                  <input @input="fliter()" v-model="modelSearchInput" type="text" name="name">
                </div>
              </div>
              <div class="modelBottom">
                <div class="item" :key="item.id" v-for="(item,index) in currentModelData">
                  <div class="el-icon-copy-document"></div>
                  <div class="itemText" @click="chooseModel(index)">{{item.modelName}}</div>
                  <div class="delete" @click="deleteTemplate(item)">x</div>
                </div>
              </div>
            </div>
            <div class="three" v-if="switchFlag == 3"></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div id="container"></div>
      </div>
      <div class="right">
        <div class="attr">
          <div class="title">
            <div class="titleText">详细属性</div>
          </div>
          <div class="cptContainer"></div>
        </div>
        <div class="testRes">
          <div class="resTop">
            <div class="el-icon-picture-outline-round"></div>
            <div class="resText">
              测试结果
            </div>
          </div>
          <div class="resDeliver"></div>
          <div class="resBottom">
            {{testRes}}
          </div>
        </div>
        <div class="lastButton">
          <div class="button test" @click="test()">测试</div>
          <div class="button next" @click="finish()">下一步</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Addon, Graph, Shape } from '@antv/x6';
import { create } from "@/utils/create.js"
import qs from 'qs'
import place from '../server/place.vue'
import noAttr from '../server/noAttr.vue'
const X6 = { Graph }
export default {
  data () {
    return {
      currentNode: null,
      currentNodeVm: null,
      serverName: "服务编排页面",
      flowTemplateName: '',
      switchFlag: 1,
      testRes: '尚未测试',
      modelSearchInput: '',
      modelData: [{
        id: 1,
        modelName: '余额宝',
        graph: ''
      }],
      currentModelData: [],
      commodityId: '',
      serviceFlowId: '',
      firstFlag: false
    };
  },

  components: {
    place
  },

  created: function () {
    //读取模板
    this.readTemplate();
  },

  mounted: function () {
    this.commodityId = this.$route.query.id
    //配置
    const setting = {
      container: document.getElementById('container'),
      height: 730,
      width: 1100,
      background: {
        color: 'rgb(242,242,242)'
      },
      grid: {
        size: 10,
        visible: true
      },
      snapline: true, //对齐线
      //剪切板
      clipboard: {
        enabled: true,
      },
      //启用键盘快捷键
      keyboard: {
        enabled: true,
        global: true,
      },
      resizing: {
        enabled: true, //启用大小编辑
      },
      selecting: {
        enabled: true,
        //rubberband: true, // 启用框选
        showNodeSelectionBox: true
      },
      //滚轮缩放
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      scroller: {
        enabled: true,
        pannable: true,
      },
      connecting: {
        //吸附半径
        snap: {
          radius: 20,
        },
        //不允许链接空白处
        allowBlank: false,
        //不允许重复链接
        allowMulti: false,
        //不允许循环链接
        allowLoop: false,
        //不允许链接到点上(只能链接到port上)
        allowNode: false,
        //不允许链接到线上
        allowEdge: false,
        connector: {
          name: 'rounded',
          args: {
            radius: 20,
          },
        },
      },
    }
    //创建画布
    const graph = new X6.Graph(setting);
    this.graph = graph
    //启用复制黏贴
    this.graph.bindKey('ctrl+c', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    })

    this.graph.bindKey('ctrl+v', () => {
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 })
        this.graph.cleanSelection()
        this.graph.select(cells)
      }
      return false
    })
    //左侧菜单
    const stencil = new Addon.Stencil({
      title: '搜索',
      target: graph,
      search: (cell, keyword, groupName, stencil) => {
        if (keyword) {
          return cell.attr('text/text').includes(keyword)
        }
        return true
      },
      collapsable: true, //分组是否可折叠
      stencilGraphWidth: 200,
      stencilGraphHeight: 500,
      stencilGraphPadding: 10,
      groups: [
        {
          name: "group1",
          title: "起始点",
          graphHeight: 100,
        }, {
          name: 'group2',
          title: '原子服务',
          graphHeight: 218,
        }
      ],
      layoutOptions: {
        columns: 2,
        rowHeight: 'compact'
      }
    })
    let left = document.getElementsByClassName('menuContainer')[0];
    left.appendChild(stencil.container)
    //此处自定义原子服务节点
    const start = new Shape.Circle({
      width: 60,
      height: 60,
      tools: [
        {
          name: 'button-remove',  // 工具名称
          args: { x: 50, y: 5 }, // 工具对应的参数
        },
      ],
      attrs: {
        circle: { fill: 'white', strokeWidth: 1, stroke: 'rgba(201, 201, 4, 1)' },
        text: { text: '开始', fill: 'rgba(201, 201, 4, 1)' },
      },
      ports: {
        groups: {
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: 'orange',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          }
        },
        items: [
          {
            id: 'port1',
            group: 'out',
          }
        ],
      },
      data: {
        type: '开始',
      },
    })
    const fail = new Shape.Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: '失败', fill: 'red' },
      },
      ports: {
        groups: {
          in: {
            position: 'top',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          }
        ],
      }
    })
    const success = new Shape.Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: 'white', strokeWidth: 1, stroke: 'rgba(5, 171, 66, 1)' },
        text: { text: '成功', fill: 'rgba(5, 171, 66, 1)' },
      },
      tools: [
        {
          name: 'button-remove',  // 工具名称
          args: { x: 50, y: 5 }, // 工具对应的参数
        },
      ],
      ports: {
        groups: {
          in: {
            position: 'top',
            attrs: {
              circle: {
                r: 3,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          }
        ],
      },
      data: {
        type: '成功',
      },
    })
    const serverStyle = {
      width: 85,
      height: 30,
      tools: [
        {
          name: 'button-remove',  // 工具名称
          args: { x: 5, y: 5 }, // 工具对应的参数
        },
      ],
      ports: {
        groups: {
          in: {
            position: 'top',
            attrs: {
              circle: {
                r: 2,
                magnet: true,
                stroke: 'orange',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 2,
                magnet: true,
                stroke: 'orange',
                strokeWidth: 1,
                fill: '#fff',
              }
            }
          },
          failOut: {
            position: 'left',
            attrs: {
              circle: {
                r: 2,
                magnet: true,
                stroke: 'orange',
                strokeWidth: 1,
                fill: '#fff',
              }
            }
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'out',
          },
          {
            id: 'port3',
            group: 'failOut',
          },
        ],
      }
    }
    const server1 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '地域审查',
        places: []
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '地域审查', fill: 'black', fontSize: 12 },
      },
    })
    const server2 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '证件审查'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '证件审查', fill: 'black', fontSize: 12 },
      },
    })
    const server3 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '用户信息检验'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '用户信息检验', fill: 'black', fontSize: 12 },
      },
    })
    const server4 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '白名单购买控制'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '白名单购买控制', fill: 'black', fontSize: 12 },
      },
    })
    const server5 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '用户标签控制'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '用户标签控制', fill: 'black', fontSize: 12 },
      },
    })
    const server6 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '利息计算'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '利息计算', fill: 'black', fontSize: 12 },
      },
    })
    const server7 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '库存锁定'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '库存锁定', fill: 'black', fontSize: 12 },
      },
    })
    const server8 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '库存释放'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '库存释放', fill: 'black', fontSize: 12 },
      },
    })
    const server9 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '库存更新'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '库存更新', fill: 'black', fontSize: 12 },
      },
    })
    const server10 = new Shape.Rect({
      ...serverStyle,
      data: {
        type: '日志录入'
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '日志录入', fill: 'black', fontSize: 12 },
      },
    })
    graph.on('edge:click', ({ e, x, y, edge, view }) => {
      if (edge.type == false) {
        edge.attr('line/stroke', 'black')
        edge.type = true
      } else {
        edge.attr('line/stroke', 'red')
        edge.type = false
      }
    })
    //更改选定节点
    graph.on('node:click', ({ e, x, y, node, view }) => {
      //先保存并销毁上次选中的节点属性
      if (this.currentNode) {
        this.saveData();
        let dom = document.getElementsByClassName('cptContainer')[0];
        dom.innerHTML = ""
      }
      //根据新选择节点创建新组件
      let nodeName = node.attr('text/text');
      if (nodeName == "地域审查") {
        //第一个参数是组件名,第二个参数是props
        this.currentNodeVm = create(place, { id: node.id, nodeData: node.data })
        this.currentNode = node
      } else {
        this.currentNodeVm = create(noAttr, { id: node.id })
        this.currentNode = node
      }
    })
    //此处将原子服务加入左侧列表
    stencil.load([start, success], 'group1')
    stencil.load([server1, server2, server3, server4, server5, server6, server7, server8, server9, server10], 'group2')
    this.readServiceFlow()
  },


  methods: {
    readServiceFlow () {
      this.axios({
        method: 'get',
        url: "3/atom/getServiceFLow",
        params: { commodityId: this.commodityId }
      })
        .then(res => {
          if (res.data.data != null) {
            this.serviceFlowId = res.data.data.serviceFlowId
            console.log(this.serviceFlowId)
            let graph = res.data.data.hashCode
            this.graph.fromJSON(JSON.parse(graph))
          } else {
            console.log("初次插入！")
            this.firstFlag = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    readTemplate () {
      this.axios.get('3/atom/getAllServiceFlowTemplate')
        .then(res => {
          this.modelData = []
          for (let i = 0; i < res.data.data.length; i++) {
            this.modelData.push({
              id: res.data.data[i].serviceFlowTemplateId,
              modelName: res.data.data[i].flowTemplateName,
              graph: res.data.data[i].flowContent
            })
          }
          this.initSearch();
        })
    },
    deleteTemplate (item) {
      this.axios.get('3/atom/deleteServiceFlowTemplate', { params: { 'id': item.id } })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('删除成功');
            this.readTemplate()
          }
        })
    },
    saveData () {
      if (this.currentNode) {
        if (this.currentNode.data.type == "地域审查") {
          this.currentNode.data.places = this.currentNodeVm._data.dynamicValidateForm.domains
        }
      }
    },
    switchPanel (target) {
      this.switchFlag = target
      this.readTemplate()
    },
    initSearch () {
      this.currentModelData = []
      for (let i = 0; i < this.modelData.length; i++) {
        this.currentModelData.push(this.modelData[i])
      }
    },
    fliter () {
      this.currentModelData = [];
      let value = this.modelSearchInput;
      for (let i = 0; i < this.modelData.length; i++) {
        if (this.modelData[i].modelName.match(value))
          this.currentModelData.push(this.modelData[i]);
      }
    },
    test () {
      this.testRes = "测试通过"
    },
    saveTemplate () {
      this.saveData();
      let graph = this.graph.toJSON()
      graph = JSON.stringify(graph)
      let data = qs.stringify({
        flowTemplateName: this.flowTemplateName,
        flowContent: graph
      })
      this.axios({
        method: 'post',
        url: '3/atom/insertServiceFlowTemplate',
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(res => {
        this.$message.success("保存成功")
      }).catch(res => {
        this.$message.success("保存失败，请重试")
      })
    },
    finish () {
      if (this.commodityId != 0 && !this.commodityId) {
        this.$message.error("当前不属于任何商品的编排页面！")
        return
      }
      this.saveData();
      let nodes = this.graph.getNodes();
      let edges = this.graph.getEdges();
      let map = new Map();
      //将不存在的失败节点推入map
      map.set('fail', {
        'next': null,
        'failNext': null,
        'data': { 'type': '失败' },
        'isEnd': true
      })
      let startNode;
      //初始化所有节点，将id和type加入map
      for (let i = 0; i < nodes.length; i++) {
        let id = nodes[i].id;
        let type = nodes[i].data.type;
        if (type == '开始') {
          startNode = id;
        }
        if (type == '地域审查') {
          let banPlaces = [];
          for (let item of nodes[i].data.places) {
            banPlaces.push(item.value);
          }
          map.set(id, { 'next': null, failNext: 'fail', data: { type, places: banPlaces }, isEnd: false });
        }
        else if (type != '成功') {
          map.set(id, { 'next': null, failNext: 'fail', data: nodes[i].data, isEnd: false });
        }
        else {
          map.set(id, { 'next': null, failNext: null, data: nodes[i].data, isEnd: true });
        }
      }
      for (let i = 0; i < edges.length; i++) {
        let source = edges[i].store.data.source.cell;
        let target = edges[i].store.data.target.cell;
        let type = edges[i].type;
        if (type == undefined) type = true;
        //获取节点的data，加入next属性和failNext属性
        let sourceData = map.get(source);
        if (type) {
          sourceData.next = target;
        }
        else {
          sourceData.failNext = target;
        }
      }
      //将map转为object
      var obj = Object.create(null);

      var iterator = map.keys();
      for (var i = 0; i < map.size; i++) {
        var key = iterator.next().value;
        obj[key] = map.get(key);
      }
      let flowContent = JSON.stringify({ startNode, 'states': obj })
      let graph = this.graph.toJSON()
      graph = JSON.stringify(graph)
      //首次插入
      if (this.firstFlag) {
        let data = qs.stringify({
          commodityId: this.commodityId,
          flowContent: flowContent,
          hashCode: graph
        })
        this.axios({
          method: 'post',
          url: '3/atom/addServiceFLow',
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res => {
          this.$message.success("保存成功")
          console.log(res)
          this.$router.push('/commodity')
        }).catch(res => {
          this.$message.success("保存失败，请重试")
        })
      } else {
        let data = qs.stringify({
          serviceFlowId: this.serviceFlowId,
          flowContent: flowContent,
          hashCode: graph
        })
        this.axios({
          method: 'post',
          url: '3/atom/updateServiceFlow',
          data: data,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res => {
          this.$message.success("修改成功")
          console.log(res)
          this.$router.push('/commodity')
        }).catch(res => {
          this.$message.success("修改失败，请重试")
        })
      }
    },
    chooseModel (index) {
      let graph = JSON.parse(this.currentModelData[index].graph)
      this.graph.fromJSON(graph)
    }
  }
}

</script>
<style>
.x6-graph-scroller {
  overflow: hidden !important;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<style lang='scss' scoped>
.allContainer {
  .topContainer {
    background: rgba(255, 255, 255, 1);
    height: 4.3vh;
    .topleftContainer {
      height: 100%;
      display: flex;
      align-items: center;
      .bank {
        margin-left: 0.67vw;
        width: 100px;
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
      }
      .serverText {
        color: rgba(0, 0, 0, 0.9);
        font-size: 13px;
        margin-left: 0.8vw;
        font-weight: 600;
      }
    }
  }
  .bottomContainer {
    height: 95.6vh;
    display: flex;
    background-color: rgb(242, 242, 242);
    .left {
      flex: 15;
      position: relative; //子绝父相
      border-radius: 0 10px 10px 0;
      background: rgba(247, 247, 247, 1);
      box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
      z-index: 999;
      .menuContainer {
        height: 68%;
        width: 100%;
      }
      .deliverContainer {
        height: 3%;
        background: rgba(247, 247, 247, 1);
        .deliverImage {
          width: 100%;
        }
      }
      .modelContainer {
        height: 26%;
        width: 100%;
        .switch {
          width: 90%;
          height: 18%;
          margin: 7% 0 0 5%;
          background: white;
          border-radius: 10px;
          box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5) !important;
          box-shadow: 3px 3px 4px rgba(222, 222, 222, 0.5) !important;
          display: flex;
          align-items: center;
          justify-content: center;
          .first,
          .second,
          .third {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .deliver {
            width: 0px;
            height: 55%;
            border: 0.1px solid rgba(217, 87, 87, 1);
          }
          .icon {
            cursor: pointer;
          }
        }
        .panel {
          width: 90%;
          height: 68%;
          background: white;
          margin-top: 8%;
          margin-left: 5%;
          border-radius: 10px;
          box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5) !important;
          box-shadow: 3px 3px 4px rgba(222, 222, 222, 0.5) !important;
          .first {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .name {
              margin-top: 2vh;
              margin-left: 2vw;
            }
            input {
              width: 60%;
              margin-left: 0.2vw;
              border-color: #878787;
              border-style: solid;
              border-top-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 1px;
              border-left-width: 0px;
            }
            input:focus {
              outline: none;
              border-color: #878787;
              border-style: solid;
              border-top-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 1.5px;
              border-left-width: 0px;
            }
            .btn {
              width: 157px;
              height: 36px;
              margin-top: 2vh;
              line-height: 36px;
              color: white;
              border-radius: 5px;
              text-align: center;
              cursor: pointer;
              background: linear-gradient(
                to right,
                rgba(255, 0, 0, 0.75),
                rgba(255, 107, 33, 0.75)
              );
            }
          }
          .second {
            height: 100%;
            width: 100%;
            .modelTop {
              padding-left: 1vw;
              height: 25%;
              display: flex;
              .modelText {
                flex: 1;
                color: rgba(0, 0, 0, 0.9);
                font-size: 12px;
                font-weight: 600;
                line-height: 4vh;
              }
              .modelSearch {
                height: 100%;
                flex: 2;
                display: flex;
                align-items: center;
                input {
                  width: 70%;
                  margin-left: 0.2vw;
                  border-color: #878787;
                  border-style: solid;
                  border-top-width: 0px;
                  border-right-width: 0px;
                  border-bottom-width: 1px;
                  border-left-width: 0px;
                }
                input:focus {
                  outline: none;
                  border-color: #878787;
                  border-style: solid;
                  border-top-width: 0px;
                  border-right-width: 0px;
                  border-bottom-width: 1.5px;
                  border-left-width: 0px;
                }
              }
            }
            .modelBottom {
              height: 60%;
              width: 95%;
              overflow: auto;
              .item {
                margin-left: 2vw;
                display: flex;
                .itemText {
                  margin-left: 0.5vw;
                  font-size: 10px;
                  cursor: pointer;
                }
                .delete {
                  float: right;
                  margin-left: auto;
                  margin-right: 1vw;
                  font-size: 10px;
                  color: red;
                  cursor: pointer;
                }
              }
              &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                background-color: rgba(255, 255, 255, 0.8);
              }
              &::-webkit-scrollbar {
                width: 5px;
                background-color: rgba(0, 0, 0, 0);
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px #979090;
                background-color: #555;
              }
            }
          }
        }
      }
    }
    .middle {
      flex: 70;
      overflow: hidden;
    }
    .right {
      height: 100;
      flex: 15;
      position: relative;
      .attr {
        height: 64.5vh;
        border-radius: 10px 0 0 10px;
        background: rgba(247, 247, 247, 1);
        box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.2);
        z-index: 999;
        overflow-y: auto;
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.8);
        }
        &::-webkit-scrollbar {
          width: 5px;
          background-color: rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px #979090;
          background-color: #555;
        }
        .title {
          height: 3.2vh;
          border-radius: 10px 0 0 0;
          background: rgba(237, 237, 237, 1);
          display: flex;
          justify-content: center;
          .titleText {
            width: 33%;
            text-align: center;
            font-size: 12px;
            line-height: 3.2vh;
            border-bottom: 3px solid rgba(217, 87, 87, 1);
          }
        }
      }
      .testRes {
        height: 22.1vh;
        width: 100%;
        margin-top: 1vh;
        padding-top: 1vh;
        padding-left: 1vw;
        box-sizing: border-box;
        border-radius: 10px 0 0 10px;
        background: rgba(247, 247, 247, 1);
        box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.2);
        z-index: 999;
        .resTop {
          height: 10%;
          display: flex;
          .resText {
            margin-left: 1vw;
            font-size: 10px;
            font-weight: 600;
          }
        }
        .resDeliver {
          display: block;
          height: 2px;
          width: 90%;
          margin: 7px 0;
          background-color: #dcdfe6;
          position: relative;
        }
        .resBottom {
          font-size: 10px;
        }
      }
      .lastButton {
        height: 5vh;
        margin-top: 1vh;
        width: 100%;
        display: flex;
        .button {
          width: 47%;
          background: rgba(255, 255, 255, 1);
          box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          font-family: '思源黑体';
          text-align: center;
          line-height: 5vh;
          cursor: pointer;
        }
        .next {
          margin-left: 0.5vw;
          color: rgba(204, 24, 24, 1);
        }
      }
    }
  }
}
</style>

<style>
.x6-widget-stencil {
  height: 64.5vh !important;
  background-color: rgba(247.35, 247.35, 247.35, 1) !important;
  box-shadow: 4px 4px 4px rgba(232, 232, 232, 0.5) !important;
  box-shadow: -4px -4px 4px rgba(255, 255, 255, 0.5) !important;
  border-radius: 0 10px 10px 10px !important;
}
.x6-widget-stencil-title {
  margin-top: 5% !important;
}
.x6-widget-stencil-title {
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5) !important;
  box-shadow: 3px 3px 4px rgba(222, 222, 222, 0.5) !important;
  border-radius: 10px !important;
  width: 90% !important;
  height: 3.2vh !important;
  line-height: 3.2vh !important;
  margin-left: 5%;
  overflow: visible !important;
}

.x6-widget-stencil-group-title {
  /* height: 3.2vh !important;
  line-height: 3.2vh !important; */
  background-color: rgba(255, 255, 255, 1) !important;
}
.x6-widget-stencil-group {
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.5) !important;
  box-shadow: 3px 3px 4px rgba(222, 222, 222, 0.5) !important;
  border-radius: 10px !important;
  width: 90% !important;
  line-height: 3.2vh !important;
  margin-left: 5%;
  margin-bottom: 5%;
}

/* 左部菜单的小箭头 */
.x6-widget-stencil-title::before {
  top: 3px !important;
}
</style>