<template>
  <div>
    <el-card>
      <!-- 搜索栏 模糊查询-->
      <el-form :inline="true" :model="page" class="demo-form-inline" >
        <el-form-item label="用户名">
          <el-input v-model="page.params.name" placeholder="请输入问题的关键字" clearable />
        </el-form-item>
        <el-select style="width:8%" v-model="page.params.college_id" placeholder="学院">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
        <el-select style="width:8%" v-model="page.params.class_id" placeholder="班级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
        <el-select style="width:8%" v-model="page.params.group_id" placeholder="分组">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" size="mini" @click="getByPage">查询</el-button>
          <el-button type="success" size="mini" @click="openAddDialog">添加</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table
        :data="page.list"
        border
        fit
        style="width: 100%"
        @sort-change="changeSort"
      >
        <el-table-column prop="user_id" label="#" width="55" align="center" />
        <el-table-column prop="user_name" label="用户名" width="150" align="center" show-overflow-tooltip />
        <el-table-column prop="user_college_id" label="学院id" width="80"
                         :filters="[{text: 1, value: 1}, {text: 2, value: 2}, {text: 3, value: 3}]"
                         :filter-method="filterCollege"
                         align="center"/>
        <el-table-column prop="user_class_id" label="班级id" width="80"
                         :filters="[{text: 1, value: 1}, {text: 2, value: 2}, {text: 3, value: 3}]"
                         :filter-method="filterClass"
                         align="center" />
        <el-table-column prop="user_group_id" label="组id" width="80"
                         :filters="[{text: 1, value: 1}, {text: 2, value: 2}, {text: 3, value: 3}]"
                         :filter-method="filterGroup"
                         align="center"/>
        <el-table-column prop="user_avatar" label="头像" width="100" align="center"  />
        <el-table-column prop="user_birthday" :formatter="dateFormat" label="生日" width="150" align="center"  />
        <el-table-column prop="user_phone" label="手机号" width="150" align="center"  />
        <el-table-column prop="user_remark" label="备注" width="200" align="center"  />
        <el-table-column prop="status" label="状态" width="50" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.status === 1">在线</el-tag>
            <el-tag size="mini" type="info" v-if="scope.row.status === 0">离线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini" @click="toUpdate(scope.row.user_id)">修改</el-button>
            <el-button  type="danger" size="mini" @click="toDelete(scope.row.user_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        align="center"
        class="pagination"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page.currentPage"
        :page-sizes="[5,10,20,50]"
        :page-size="page.pageSize"
        :total="page.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <user-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>
    <!-- 修改弹窗 :question="question" 用于传递参数对象-->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <user-update :form="user" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />
    </el-dialog>
  </div>
</template>

<script>
// 导 入 api 接 口 定 义 的 方 法
import userApi from '@/api/users/user'
// 导入组件
import UserAdd from './userAdd'
import UserUpdate from './userUpdate'
import * as fecha from 'element-ui/lib/utils/date'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    UserAdd,
    UserUpdate
  },
  data() {
    return {
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: []// 数据
      },
      user: {
        user_id: ''
      },
      loading: true, // 控制是否显示加载效
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
  },
  // 定义方法
  methods: {
    // 每页大小改变
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage()
    },
    // 当前页跳转
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    },
    // 分页方法 调用封装的方法 getByPage()
    getByPage() {
      userApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
    // 恢复搜索框
    refresh() {
      this.$router.go(0);
    },
    // 操作部分相关方法
    // 修改
    toUpdate(id) {
      userApi.get(id).then(res => {
        this.user = res.data
        this.updateDialog = true
      })
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
    },
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), 'yyyy-MM-dd') : ''
    },
    filterCollege(value, row) {
      return row.user_college_id === value
    },
    filterClass(value, row) {
      return row.user_class_id === value
    },
    filterGroup(value, row) {
      return row.user_group_id === value
    }
  }
}
</script>
