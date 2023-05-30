<template>
  <div class="department-container">
    <div class="app-container">
      <!-- 头部 -->
      <PageTools>
        <template #left>
          <span>本月：社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">导入excel</el-button>
          <el-button type="danger" size="small">导出excel</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 中间信息 -->
      <el-card style="margin-top: 10px;">
        <el-table
          :data="list"
          :default-sort="{prop:'workNumber'}"
          border
        >
          <el-table-column label="序号" type="index" width="50px" />

          <el-table-column label="姓名" prop="username" />

          <el-table-column label="工号" prop="workNumber" />

          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="scope">
              {{ formatEmployment(scope.row.formOfEmployment) }}
            </template>
          </el-table-column>

          <el-table-column label="部门" prop="departmentName" />

          <el-table-column sortable label="入职时间" prop="timeOfEntry" />

          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="text">查看</el-button>
              <el-button type="text">分配角色</el-button>
              <el-button type="text" @click="Hdel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center;"
          :page-sizes="[5, 10, 15,20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page="currentPage4"
          @size-change="Hsize"
          @current-change="Hpage"
        />
      </el-card>
      <!-- 添加弹窗 -->
      <el-dialog title="添加员工" :visible.sync="showDialog">
        <addorEdit v-if="showDialog" @success="hSuccess" @close="close" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/constant/employees'
import addorEdit from './empDialog.vue'
export default {
  name: 'Employess',
  components: {
    PageTools,
    addorEdit
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      total: 0,
      currentPage4: 1,
      showDialog: false
    }
  },

  created() {
    this.loadEmployeeList()
  },

  methods: {
    // 获取员工列表
    async loadEmployeeList() {
      const res = await getEmployeeList(this.page, this.size)
      this.list = res.data.rows
      this.total = res.data.total
    },
    // 渲染正式非正式
    formatEmployment(num) {
      // 从hireType中 通过id找到对应的元素的value
      const i = num * 1
      const item = EmployeeEnum.hireType.find(it => it.id === i)
      if (item) {
        return item.value
      } else {
        return '不能确定'
      }
      // return  ? '正式' : '非正式'
    },

    Hsize(val) {
      this.size = val
      this.loadEmployeeList()
    },
    Hpage(val) {
      this.page = val
      this.loadEmployeeList()
    },
    // 根据id删除员工
    Hdel(id) {
      this.$confirm('确认删除吗？').then(async() => {
        const res = await delEmployee(id)
        if (this.list.length === 1) {
          this.page--
          if (this.page <= 0) {
            this.page = 1
          }
        }
        this.loadEmployeeList()
        this.$message.success(res.message)
      }).catch(() => {})
    },

    // 关闭弹窗
    close() {
      this.showDialog = false
      this.loadEmployeeList()
    },
    hSuccess() {
      this.total++
      this.page = Math.ceil(this.total / this.size)
      this.loadEmployeeList()
    }
  }
}
</script>

<style scoped>

</style>
