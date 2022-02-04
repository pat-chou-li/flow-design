<template>
  <div class="place">
    <el-form ref="dynamicValidateForm" label-width="120px" size="mini" class="demo-dynamic">
      <el-form-item prop="id" label="id">
        <el-input v-model="id" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
    };
  },
  created () {
  },
  mounted () {
  },
  methods: {
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