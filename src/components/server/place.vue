<template>
  <div class="place">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" size="mini" class="demo-dynamic">
      <el-form-item prop="id" label="id">
        <el-input v-model="dynamicValidateForm.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'禁止购买地域' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }">
        <el-input v-model="domain.value" placeholder="请输入不带“省”和“市”的省份名"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增禁止购买地域</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  props: {
    id: {
      default: null
    },
    nodeData: {
      default: null
    }
  },
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        id: this.id
      }
    };
  },
  created () {
    let num = 1

    const timer = setInterval(() => {
      this.data = num++
    }, this.duration)

    this.$once("hook: beforeDestroy", () => clearInterval(timer))
  },
  mounted () {
    this.dynamicValidateForm.domains = []
    for (let item in this.nodeData.places) {
      this.dynamicValidateForm.domains.push({
        value: this.nodeData.places[item].value
      })
    }
  },
  methods: {
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
  }
};
</script>
 
<style lang="scss">
.el-form-item__label {
  float: unset !important;
  margin-left: 20px !important;
}
.el-form-item__content {
  margin-left: 20px !important;
  width: 80% !important;
}
.el-button:focus,
.el-button:hover {
  color: #ff4040 !important;
  border-color: #ffc6c6 !important;
  background-color: #ffecec !important;
}
</style>