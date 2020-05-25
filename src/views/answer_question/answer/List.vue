<template>
  <!-- 加载 -->
  <div>

    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" align="center">
      <el-form-item label="答复人">
        <el-input v-model="page.params.answer_author" placeholder="请输入答复人" clearable />
      </el-form-item>
      <el-form-item label="是否采纳">
        <el-select v-model="page.params.answer_mark" placeholder="是否采纳" width="80" clearable filterable>
          <el-option label="未采纳" :value="0" />
          <el-option label="已采纳" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除">
        <el-select v-model="page.params.answer_status" placeholder="是否删除" width="80" clearable filterable>
          <el-option label="未删除" :value="0" />
          <el-option label="已删除" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.answer_time"
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
        <el-button type="primary"  @click="getByPage">查询</el-button>
        <el-button type="primary"  @click="refresh">刷新</el-button>
        <el-button type="success" class="add-button"  @click="openAddDialog">添加</el-button>
      </el-form-item>
    </el-form>



    <el-table
      :data="page.list"
      border
      fit
      style="width: 100%"
      @sort-change="changeSort"
    >
      <el-table-column prop="answer_id" label="#"  width="55" align="center"> </el-table-column>
      <el-table-column prop="question_id" label="问题id" width="80" align="center"> </el-table-column>
      <el-table-column prop="answer_author" label="答复人" width="100" align="center"> </el-table-column>
      <el-table-column prop="answer_content" label="内容" width="400" show-overflow-tooltip align="center"> </el-table-column>
      <el-table-column prop="answer_good" label="点赞数量"  sortable="custom" width="110" align="center"> </el-table-column>
      <el-table-column prop="answer_time" label="答复时间"  sortable="custom" align="center"> </el-table-column>
      <el-table-column prop="answer_update" label="更新时间" sortable="custom" align="center"> </el-table-column>
      <el-table-column prop="answer_mark" label="是否采纳" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.answer_mark === 0" type="danger">未采纳</el-tag>
          <el-tag v-else>已采纳</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="answer_status" label="是否删除" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.answer_status === 0" type="success">未删除</el-tag>
          <el-tag v-else type="danger">已删除</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="改变状态" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.answer_mark === 0" size="mini" type="success" @click="toIsAdopt(scope.row.answer_id)">设置为已采纳</el-button>
          <el-button v-if="scope.row.answer_mark === 1" size="mini" type="warning" @click="toNoAdopt(scope.row.answer_id)">设置为未采纳</el-button>
          <el-button v-if="scope.row.answer_status === 0" size="mini" type="danger" @click="toDelete(scope.row.answer_id)">删除</el-button>
          <el-button v-if="scope.row.answer_status === 1" size="mini" type="success" @click="toRestore(scope.row.answer_id)">恢复</el-button>
        </template>
      </el-table-column>
       <el-table-column label="操作"  width="80" align="center">
        <template slot-scope="scope">
          <el-button  type="primary"  size="mini" @click="toUpdate(scope.row.answer_id)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      background
      align="center"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      :current-page="page.currentPage"
      :page-sizes="[5,10,15,30]"
      :page-size="page.pageSize"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="添加" :visible.sync="addDialog">
      <answer-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="updateDialog">
      <answer-update :answer="answer" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />
    </el-dialog>

  </div>
</template>

<script>
// 导入api接口定义的方法
import answerApi from '@/api/answer_question/answer'
// 导入组件
import AnswerAdd from './Add'
import AnswerUpdate from './Update'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    AnswerAdd,
    AnswerUpdate
  },
  data() {
    return {
      answer_time: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'answer_time', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      answer: {
        answer_id: ''
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
    // 设置每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getByPage()
    },
    // 设置当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    },
    // 分页方法
    getByPage() {
      answerApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
        // this.$message.success(res.msg)
      })
    },
    // 刷 新 页 面
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
      answerApi.get(id).then(res => {
        this.answer = res.data
        this.updateDialog = true
      })
    },
    // 设置为 已采纳
    toIsAdopt(id) {
      this.$confirm('是否设置答复状态:已采纳？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        answerApi.isAdopt(id).then(res => {
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
    // 设置为 未采纳
    toNoAdopt(id) {
      this.$confirm('是否设置答复状态:未采纳？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        answerApi.noAdopt(id).then(res => {
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
        answerApi.delete(id).then(res => {
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
        answerApi.restore(id).then(res => {
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
