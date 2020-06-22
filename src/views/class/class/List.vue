<template>
  <!-- 加载 -->
  <div>

    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline">
      <el-form-item label="班级">
        <el-input v-model="page.params.class_name" placeholder="请输入班级" clearable />
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
      <el-table-column prop="class_id" label="班级id"  width="80" align="center"> </el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="200" align="center" show-overflow-tooltip > </el-table-column>
      <el-table-column prop="class_count" label="班级人数" width="200" align="center" show-overflow-tooltip > </el-table-column>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button  type="primary"  size="mini" @click="toDelete(scope.row.class_id)">删除</el-button>
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
import classApi from '@/api/class/class'
export default {
  data() {
    return {
      // 定义page对象
       page: {
         currentPage: 1, // 当前页
         pageSize: 10, // 每页显示条数
         totalPage: 0, // 总页数
         totalCount: 0, // 总条数
         params: {}, //查询参数对象
         list: [], // 数据
         sortColumn: 'class_id', // 排序列
         sortMethod: 'asc' // 排序方式
       },
      //classData: [],
      class: {
        class_id: ''
      },
      loading: true, // 控制是否显示加载效
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
    //  classApi.getAll().then(res => {
    //     this.classData = res.data
    //     // this.loading = false
    //     console.log(res)
    //     // this.$message.success(res.msg)
    //   })
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
      classApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
        console.log(res)
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
        // console.log(value)
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
      // console.log(this.page)
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
        classApi.delete(id).then(res => {
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
