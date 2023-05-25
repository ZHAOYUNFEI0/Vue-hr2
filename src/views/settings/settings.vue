<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        <el-tabs value="first">
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            </el-row>
            <!-- 下方表格 -->
            <el-table
              :data="roles"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                width="180"
              />
              <el-table-column
                prop="name"
                label="角色名称"
                width="180"
              />
              <el-table-column
                prop="description"
                label="描述"
              />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)"
                  >分配权限</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="hDelete(scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="hCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// 获取所有角色api
import { getRoles, deleteRole } from '@/api/setting'

export default {
  name: 'Setting',
  data() {
    return {
      tableData: [],
      roles: [],
      pageParams: {
        page: 1,
        pagesize: 5
      },
      total: 111,
      currentPage4: 1
    }
  },

  created() {
    this.loadRoles()
  },

  methods: {
    // 获取所有角色
    async loadRoles() {
      const res = await getRoles(this.pageParams)
      // console.log(res)
      this.total = res.data.total
      this.roles = res.data.rows
    },

    handleSizeChange(val) {
      // console.log('每页4条', val)
      this.pageParams.pagesize = val
      this.loadRoles()
    },
    hCurrentChange(val) {
      // console.log('当前页：1', val)
      this.pageParams.page = val
      this.loadRoles()
    },

    // 删除角色
    hDelete(id) {
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteRole(id)
        console.log(res)
        if (this.roles.length === 1) {
          this.pageParams.page--
          if (this.pageParams.page <= 0) {
            this.pageParams.page = 1
          }
        }
        this.loadRoles()
        this.$message({
          type: 'success',
          message: '删除成功!'
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

<style scoped>
  .block{
    margin-left:250px
  }
</style>
