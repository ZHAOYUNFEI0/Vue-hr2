<template>
  <div class="department-container">
    <div class="app-container">
      <!-- 头部 -->
      <PageTools>
        <template #left>
          <span>本月：社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/employees/import')">导入excel</el-button>
          <el-button type="danger" size="small" @click="hExport">导出excel</el-button>
          <el-button type="primary" size="small" @click=" showDialog = true ">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 中间信息 -->
      <el-card style="margin-top: 10px;">
        <el-table :data=" list " :default-sort=" { prop: 'workNumber' } " border>
          <el-table-column label="序号" type="index" width="50px" />

          <el-table-column label="姓名" prop="username" />

          <el-table-column label="工号" prop="workNumber" />

          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot=" scope ">
              {{ formatEmployment(scope.row.formOfEmployment) }}
            </template>
          </el-table-column>

          <el-table-column label="部门" prop="departmentName" />

          <el-table-column sortable label="入职时间" prop="timeOfEntry" />

          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push(`/employees/detail?id=${scope.row.id}`)">查看</el-button>
              <el-button type="text">分配角色</el-button>
              <el-button type="text" @click=" Hdel(scope.row.id) ">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center;"
          :page-sizes=" [5, 10, 15, 20] "
          :page-size=" 100 "
          layout="total, sizes, prev, pager, next, jumper"
          :total=" total "
          :current-page=" currentPage4 "
          @size-change=" Hsize "
          @current-change=" Hpage "
        />
      </el-card>
      <!-- 添加弹窗 -->
      <el-dialog title="添加员工" :visible.sync=" showDialog ">
        <addorEdit v-if=" showDialog " @success=" hSuccess " @close=" close " />
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
      }).catch(() => { })
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
    },
    // 导出功能
    hExport() {
      import('@/vendor/Export2Excel').then(async excel => {
        // 发ajax请求，获取数据
        const res = await getEmployeeList(this.page, this.size)
        const list = res.data.rows
        console.log('从后端获取的数据', list)

        const { header, data } = this.formatData(list)
        // excel表示导入的模块对象
        console.log(header, data)
        excel.export_json_to_excel({
          // header: ['姓名', '工资'], // 表头 必填
          header: header, // 表头 必填
          data: data,
          // data: [
          //   ['刘备11111111111111', 100],
          //   ['关羽', 500]
          // ], // 具体数据 必填
          filename: 'excel-list', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    formatData(list) {
      const map = {
        'id': '编号',
        'password': '密码',
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门',
        'staffPhoto': '头像地址'
      }
      console.log(list)
      let header = []
      // header = ['id', 'mobile', 'username', .....]
      // data = [
      //     ['65c2', '1380000002', '管理员', ....],
      //     ['65c3', '1380000003', '孙财', ....],
      // ]
      let data = []
      // 开始代码
      // 找到一个元素
      const one = list[0]
      if (!one) {
        return { header, data }
      }
      header = Object.keys(one).map(key => {
        return map[key]
      })
      const hireTypEnmu = { '1': '正式', '2': '非正式' }

      // data把list中每一个对象转成 对应的value数组
      data = list.map(obj => {
        // 把  Obj['formOfEmployment']: 1 , 2   ---> '正式'， '非正式'
        const key = obj['formOfEmployment'] // 1, 2
        obj['formOfEmployment'] = hireTypEnmu[key] // hireTypEnmu:{1:'正式', '2':'非正式' }

        return Object.values(obj)
      })

      return { header, data }
    }
  }
}
</script>

<style scoped></style>
