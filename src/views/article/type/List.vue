<template>
  <div>
    <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" >
      <el-form-item label="类型名称">
        <el-input v-model="page.params.type_name" placeholder="请输入类型名称" clearable />
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
      <el-table-column prop="type_id" label="类型id" width="80" align="center" />
      <el-table-column prop="type_name" label="类型名称" width="300" align="center"/>
      <el-table-column prop="article_count" label="文章篇数" sortable="custom" width="200" align="center"/>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="toUpdate(scope.row.type_id)">编辑</el-button>
          <el-button  type="primary" size="mini" @click="toDelete(scope.row.type_id)">删除</el-button>
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
      <type-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>
    <!-- 修改弹窗 :question="question" 用于传递参数对象-->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <type-update :type="type" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />
    </el-dialog>

  </div>
</template>

<script>
// 导 入 api 接 口 定 义 的 方 法
import typeApi from '@/api/article/type'
// 导入组件
import TypeAdd from './Add'
import TypeUpdate from './Update'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    TypeAdd,
    TypeUpdate
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
        list: [], // 数据
        sortColumn: 'type_id', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      type: {
        type_id: ''
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
      typeApi.getByPage(this.page).then(res => {
        this.page = res.data
        console.log('abcdefg',res)
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
      // alert("zhixingl")
      typeApi.get(id).then(res => {
        this.type = res.data
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
        typeApi.delete(id).then(res => {
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
    }
  }
}
</script>
