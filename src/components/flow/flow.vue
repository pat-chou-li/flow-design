<template>
  <div class="allContainer">
    <div class="topContainer"></div>
    <div class="bottomContainer">
      <div class="left"></div>
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
      width: 1000,
      background: {
        color: '#f4f4f4',
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
      title: '组件',
      target: graph,
      search: (cell, keyword, groupName, stencil) => {
        if (keyword) {
          return cell.attr('text/text').includes(keyword)
        }
        return true
      },
      collapsable: true, //分组是否可折叠
      stencilGraphWidth: 250,
      stencilGraphHeight: 600,
      stencilGraphPadding: 10,
      groups: [
        {
          name: "group1",
          title: "起始点",
          graphHeight: 100
        }
        , {
          name: 'group2',
          title: '原子服务',
          graphHeight: 400
        }
      ],
      layoutOptions: {
        columns: 2
      }
    })
    let left = document.getElementsByClassName('left')[0];
    left.appendChild(stencil.container)
    //此处自定义原子服务节点
    const start = new Shape.Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: '开始', fill: 'white' },
      },
      ports: {
        groups: {
          out: {
            position: 'bottom',
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
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: '成功', fill: 'green' },
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
    const server1 = new Shape.Rect({
      width: 100,
      height: 50,
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: '地域审查接口', fill: 'white' },
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
          },
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          failOut: {
            position: 'left',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
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
      },
      data: {
        type: '地域审查接口',
        places: []
      }
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
      if (nodeName == "地域审查接口") {
        this.currentNodeVm = create(place, { id: node.id, nodeData: node.data })
        this.currentNode = node
      }
    })
    stencil.load([start, success], 'group1')
    stencil.load([server1], 'group2')
  },


  methods: {
    saveData () {
      if (this.currentNode.data.type == "地域审查接口") {
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
    background: gray;
    height: 3vh;
  }
  .bottomContainer {
    height: 97vh;
    display: flex;
    .left {
      flex: 1;
      background: skyblue;
      display: flex;
      position: relative; //子绝父相
    }
    .middle {
      flex: 3;
      overflow: hidden;
    }
    .right {
      height: 100;
      flex: 1;
      background: skyblue;
      .title {
        text-align: center;
        background: pink;
      }
    }
  }
}
</style>