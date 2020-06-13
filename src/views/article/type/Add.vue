<template>
  <div>
    <!--添加表单  -->
    <el-form ref="addForm" :model="type" label-width="100px" size="mini">
      <el-form-item label="类型名称">
        <el-input v-model="type.type_name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导 入 api 接 口 定 义 的 方 法
import typeApi from '@/api/article/type'
export default {
  data() {
    return {
      type: {}
    }
  },
  methods: {
    // 添加 确认
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      typeApi.save(this.type).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.type = {}
        this.$emit('getByPage')
      })
    },
    close() {
      this.$emit('closeAddDialog')
      this.type = {}
    }
  }
}
</script>
