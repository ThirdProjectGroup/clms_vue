<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" >
      <el-form-item label="标题">
        <el-input v-model="page.params.question_title" placeholder="请输入问题的关键字" clearable />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="page.params.question_author" placeholder="请输入提问人" clearable />
      </el-form-item>
      <el-form-item label="是否解决">
        <el-select v-model="page.params.question_mark" placeholder="问题状态" width="80" clearable filterable>
          <el-option label="未解决" :value="0" />
          <el-option label="已解决" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除">
        <el-select v-model="page.params.question_status" placeholder="问题状态" width="80" clearable filterable>
          <el-option label="未删除" :value="0" />
          <el-option label="已删除" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.question_time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  size="mini" @click="getByPage">查询</el-button>
        <el-button type="success"  size="mini" @click="refresh">刷新</el-button>
        <el-button type="primary" size="mini"   @click="openAddDialog">添加</el-button>
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
      <el-table-column prop="question_id" label="#" width="55" align="center" />
      <el-table-column prop="question_title" label="问题标题" width="150" align="center" show-overflow-tooltip />
      <el-table-column prop="question_content" label="问题内容" width="300" align="center" show-overflow-tooltip />
      <el-table-column prop="question_author" label="作者" width="100" align="center" />
      <el-table-column prop="question_good" label="点赞量" sortable="custom" width="100" align="center"  />
      <el-table-column prop="answer_count" label="答复数" sortable="custom" width="100" align="center"  />
      <el-table-column prop="question_time" label="提问时间" sortable="custom" width="200" align="center"  />
      <el-table-column prop="update_time" label="修改时间" sortable="custom" width="200" align="center"  />
      <el-table-column prop="enable" label="是否解决" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.question_mark === 0" type="danger">未解决</el-tag>
          <el-tag v-else>已解决</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="是否删除" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.question_status === 0" type="danger">未删除</el-tag>
          <el-tag v-else>已删除</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="改变状态" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.question_mark === 0" size="mini" type="success" @click="toIsSolve(scope.row.question_id)">设置为已解决</el-button>
          <el-button v-if="scope.row.question_mark === 1" size="mini" type="warning" @click="toNoSlove(scope.row.question_id)">设置为未解决</el-button>
          <el-button v-if="scope.row.question_status === 0" size="mini" type="danger" @click="toDelete(scope.row.question_id)">删除</el-button>
          <el-button v-if="scope.row.question_status === 1" size="mini" type="success" @click="toRestore(scope.row.question_id)">恢复</el-button>
        </template>
      </el-table-column>
       <el-table-column label="操作"  width="80" align="center">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="toUpdate(scope.row.question_id)">编辑</el-button>
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

    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <question-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>
    <!-- 修改弹窗 :question="question" 用于传递参数对象-->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <question-update :question="question" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />
    </el-dialog>

  </div>
</template>

<script>
// 导 入 api 接 口 定 义 的 方 法
import questionApi from '@/api/answer_question/question'
// 导入组件
import QuestionAdd from './Add'
import QuestionUpdate from './Update'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    QuestionAdd,
    QuestionUpdate
  },
  data() {
    return {
      question_time: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'question_time', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      question: {
        question_id: ''
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
      questionApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
    // 恢复搜索框
    refresh() {
      this.$router.go(0);
    },
    // 条件排序
    changeSort(value) {
      if (value.order) {
        this.page.sortColumn = value.prop
        if ( value.order.startsWith('asc')) {
          this.page.sortMethod = 'asc'
        }else if (value.order.startsWith('desc')) {
          this.page.sortMethod = 'desc'
        }else{
          this.page.sortMethod = 'asc'
        }
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
      this.$message.success('操作成功!')
      this.getByPage()
    },
    // 操作部分相关方法
    // 修改
    toUpdate(id) {
      questionApi.get(id).then(res => {
        this.question = res.data
        this.updateDialog = true
      })
    },

    // 设置为 已解决
    toIsSolve(id) {
      this.$confirm('是否修改问题状态:已解决？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.isSolve(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消!'
        })
      })
    },
    // 设置为 未解决
    toNoSlove(id) {
      this.$confirm('是否设置问题状态:未解决？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.noSolve(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消!'
        })
      })
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.delete(id).then(res => {
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
       // 恢复
    toRestore(id) {
      this.$confirm('是否恢复已删除的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.restore(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
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
    }
  }
}
</script>
