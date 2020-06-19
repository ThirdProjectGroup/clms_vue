<template>
  <div>

      <!-- 搜索栏 模糊查询-->
    <el-form :inline="true" :model="page" class="demo-form-inline" align="center">
      <el-form-item label="报告类型">
        <el-input v-model="page.params.report_type" placeholder="请输入类型" clearable />
      </el-form-item>
      <el-form-item label="报告内容">
        <el-input v-model="page.params.report_content" placeholder="请输入关键内容" clearable />
      </el-form-item>
      <el-form-item label="起始日期">
          <el-date-picker
            v-model="page.params.create_time"
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
        <el-table-column prop="report_id" label="#" width="55" align="center" />
        <el-table-column prop="report_type" label="报告类型" width="150" align="center" show-overflow-tooltip />
        <el-table-column prop="report_content" label="报告内容" width="300" align="center" show-overflow-tooltip />
        <el-table-column prop="report_difficulty" label="遇到的困难" width="100" align="center" />
        <el-table-column prop="report_way" label="解决办法" sortable="custom" width="100" align="center"  />
        <el-table-column prop="report_experience" label="心得体会" sortable="custom" width="100" align="center"  />
        <el-table-column prop="report_nextplan" label="下次计划" sortable="custom" width="200" align="center"  />
        <el-table-column prop="create_time" label="创建时间" sortable="custom" width="200" align="center"  />
        <el-table-column prop="update_time" label="更新时间" width="100" align="center"/>
        <el-table-column prop="is_checked" label="是否批阅" width="100" align="center">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.is_checked === 0" type="danger">未批阅</el-tag>
                <el-tag v-else>已批阅</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="改变状态" width="220" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.is_checked === 0" size="mini" type="success" @click="toIsCheck(scope.row.report_id)">设置为已批阅</el-button>
                <el-button v-if="scope.row.is_checked === 1" size="mini" type="warning" @click="toNoCheck(scope.row.report_id)">设置为未批阅</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作"  width="80" align="center">
            <template slot-scope="scope">
                <el-button  type="primary" size="mini" @click="toUpdate(scope.row.report_id)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 底部页面跳转 -->
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
// 导 入 api 接 口 定 义 的 方 法
import reportApi from '@/api/reports/report'
export default {
    data(){
        return {
            page:{
                currentPage: 1, // 当前页
                pageSize: 5, // 每页显示条数
                totalPage: 0, // 总页数
                totalCount: 0, // 总条数
                params: {}, // 查询参数对象
                list: [], // 数据
                sortColumn: 'create_time', // 排序列
                sortMethod: 'asc' // 排序方式
            }
        }
    },
    // 初始化函数
    created(){
        this.getByPage()
    },
    // 方法
    methods:{
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
        //“刷新”按钮
        refresh() {
            this.$router.go(0)
        },
        // 分页方法
        getByPage() {
          reportApi.getByPage(this.page).then(res => {
            this.page = res.data
            this.loading = false
            console.log(res)
            // this.$message.success(res.msg)
          })
        },
        //“操作”相关的方法
            //编辑
            toupdate(id){
            },
        //“改变状态”相关的方法
            //设置为“已批阅”
            toIsCheck(id){

            },
            //设置为“未批阅”
            toNoCheck(id){
                
            }
    }
}
</script>