<template>
  <div class="allContainer">
    <div class="topContainer">
      <div class="topleftContainer">
        <img class="bank" src="../../static/bank.png" alt="">
        <div class="deliver"></div>
        <img class="back" src="../../static/back.png" alt="">
        <div class="deliver"></div>
        <div class="serverText">{{serverName}}</div>
      </div>
    </div>
    <div class="bottomContainer">
      <div class="left">
        <div class="menuContainer">
        </div>
        <div class="deliverContainer">
          <img class="deliverImage" src="../../static/deliver.png" alt="">
        </div>
        <div class="modeContainer">
          <div class="switch">
            <div class="first">
            </div>
            <div class="second">
            </div>
            <div class="three">

            </div>
          </div>
          <div class="panel">
            <div class="first"></div>
            <div class="second"></div>
            <div class="three"></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div id="container"></div>
      </div>
      <div class="right">
        <div class="title">详细属性</div>
        <div class="cptContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Addon, Graph, Shape } from '@antv/x6';
import { create } from "@/utils/create.js"
import place from '../server/place.vue'
const X6 = { Graph }
export default {
  data () {
    return {
      currentNode: null,
      currentNodeVm: null,
      serverName: "基金服务"
    };
  },

  components: {
    place
  },

  computed: {},

  mounted: function () {
    //配置
    const setting = {
      //设置
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
      keyboard: true, //启用键盘快捷键
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
    //渲染数据
    //graph.fromJSON(this.data)
    //拖拽生成节点
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
      }
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
      }
    })
    const serverStyle = {
      width: 85,
      height: 30,
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
        type: '地域审查',
        places: []
      },
      attrs: {
        rect: { fill: 'white', stroke: '#c0c0c0', strokeWidth: 1 },
        text: { text: '地域审查', fill: 'black', fontSize: 12 },
      },
    })
    const server3 = new Shape.Rect({
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
    const server4 = new Shape.Rect({
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
    const server5 = new Shape.Rect({
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
    const server6 = new Shape.Rect({
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
    const server7 = new Shape.Rect({
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
    const server8 = new Shape.Rect({
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
    const server9 = new Shape.Rect({
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
    const server10 = new Shape.Rect({
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
    graph.on('edge:click', ({ e, x, y, edge, view }) => {
      if (edge.type == false) {
        edge.attr('line/stroke', 'black')
        edge.type = true
      } else {
        edge.attr('line/stroke', 'red')
        edge.type = false
      }
    })
    //此处将原子服务加入左侧列表
    graph.on('node:click', ({ e, x, y, node, view }) => {
      //先保存并销毁上次选中的节点属性
      if (this.currentNode) {
        this.saveData();
        let dom = document.getElementsByClassName('cptContainer')[0];
        dom.innerHTML = ""
      }

      let nodeName = node.attr('text/text');
      if (nodeName == "地域审查") {
        this.currentNodeVm = create(place, { id: node.id, nodeData: node.data })
        this.currentNode = node
      }
    })
    stencil.load([start, success], 'group1')
    stencil.load([server1, server2, server3, server4, server5, server6, server7, server8, server9, server10], 'group2')
  },


  methods: {
    saveData () {
      if (this.currentNode.data.type == "地域审查") {
        this.currentNode.data.places = this.currentNodeVm._data.dynamicValidateForm.domains
      }
    }
  }
}

</script>
<style>
.x6-graph-scroller {
  overflow: hidden !important;
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
      .modeContainer {
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
      background: skyblue;
      .title {
        text-align: center;
        background: pink;
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