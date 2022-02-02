<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" size="mini" class="demo-dynamic">
    <el-form-item prop="id" label="id">
      <el-input v-model="dynamicValidateForm.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'禁止购买地域' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }">
      <el-input v-model="domain.value"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain">新增域名</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
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
 
<style>
.el-form-item__label {
  float: unset !important;
  margin-left: 20px;
}
.el-form-item__content {
  margin-left: 20px !important;
  width: 80%;
}
</style>