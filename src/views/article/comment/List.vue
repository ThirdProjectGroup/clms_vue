<template>
  <!-- 加载 -->
  <div>

    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" align="center">
      <el-form-item label="评论者">
        <el-input v-model="page.params.user_name" placeholder="请输入评论者" clearable />
      </el-form-item>
      <el-form-item label="文章id">
        <el-input v-model="page.params.article_id" placeholder="请输入编号" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="page.params.comment_time"
          type="daterange"
          align="right"
          unlink-panels
          :default-time="['00:00:00', '23:59:59']"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="getByPage">查询</el-button>
        <el-button type="primary"  @click="refresh">刷新</el-button>
      </el-form-item>
    </el-form>



    <el-table
      :data="page.list"
      border
      fit
      style="width: 100%"
      @sort-change="changeSort"
    >
      <el-table-column prop="comment_id" label="评论id"  width="80" align="center"> </el-table-column>
      <el-table-column prop="user_name" label="评论者" width="100" align="center"> </el-table-column>
      <el-table-column prop="comment_pid" label="父级评论id" width="100" align="center"> </el-table-column>
      <el-table-column prop="article_id" label="文章id" width="80" align="center"> </el-table-column>
      <el-table-column prop="comment_content" label="评论内容" width="400" align="center" show-overflow-tooltip > </el-table-column>
      <el-table-column prop="comment_like" label="点赞数"  sortable="custom" width="100" align="center"> </el-table-column>
      <el-table-column prop="comment_time" label="评论时间"  sortable="custom" width="200" align="center"> </el-table-column>
      <el-table-column label="操作"  width="80" align="center">
        <template slot-scope="scope">
          <el-button  type="primary"  size="mini" @click="toDelete(scope.row.comment_id)">删除</el-button>
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

  </div>
</template>

<script>
// 导入api接口定义的方法
import commentApi from '@/api/article/comment'
export default {
  data() {
    return {
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'comment_time', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      comment: {
        comment_id: ''
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
      commentApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
        // this.$message.success(res.msg)
      })
    },
    // 刷 新 页 面
    refresh() {
      this.$router.go(0)
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
    // 删除
    toDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
