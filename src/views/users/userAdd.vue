<template>
  <div>
    <!--添加表单  -->
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.user_password"></el-input>
      </el-form-item>
      <el-form-item label="学院id">
        <el-select v-model="form.user_college_id" placeholder="请选择学院id">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级id">
        <el-select v-model="form.user_class_id" placeholder="请选择班级id">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组id">
        <el-select v-model="form.user_group_id" placeholder="请选择分组id">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.user_avatar" />
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.user_birthday" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.user_phone" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input  type="textarea" v-model="form.user_remark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导 入 api 接 口 定 义 的 方 法
import userApi from '@/api/users/user'
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    // 添加 确认
    /**
     * 1、父组件可以使用 props 把数据传给子组件。
     * 2、子组件可以使用 $emit 触发父组件的自定义事件
     */
    onSubmit() {
      userApi.save(this.form).then(res => {
        this.$message.success(res.msg)
        this.$emit('closeAddDialog')
        this.form = {}
        this.$emit('getByPage')
      })
    },
    close() {
      this.$emit('closeAddDialog')
      this.form = {}
    }
  }
}
</script>
