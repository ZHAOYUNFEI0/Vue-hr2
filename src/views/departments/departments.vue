<template>
  <div class="department-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-row type="flex" style="height: 40px;" justify="space-between" align="middle">
          <!-- 左侧 -->
          <el-col :span="20">
            <i class="el-icon-s-home" />
            <span>河北工程技术学院</span>
          </el-col>
          <!-- 右侧操作 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>
                <span>负责人</span>
              </el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="hAdd('')">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 树形结构 -->
        <el-tree :data="list" :expand-on-click-node="false">
          <template #default="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
              <!-- 左侧 -->
              <el-col :span="20">
                {{ data.name }}
              </el-col>
              <!-- 右侧 -->
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <el-col>{{ data.manager }}</el-col>
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hAdd(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hEdit(data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item v-if="data.children.length === 0" @click.native="hDel(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>

    </div>

    <!-- 弹窗 -->
    <el-dialog
      v-if="showDialog"
      :title="isEdit ? '编辑' : '新增部门'"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="hDialogclose"
    >
      <AddorEdit :id="curId" ref="refDeptDialog" :origin-list="originList" :is-edit="isEdit" @success="hSuccess" @close="hClose" />
    </el-dialog>
  </div>
</template>

<script>
// 树形结构api
import { getDepartments, delDepartment } from '@/api/departments'

// 转换树形结构工具
import { tranListToTreeData } from '@/utils/index'

// 弹窗
import AddorEdit from './deptDialog.vue'

export default {
  components: {
    AddorEdit
  },
  data() {
    return {
      // 依赖一份树形数据
      list: [],
      showDialog: false,
      curId: '',
      // 是否处于编辑状态
      isEdit: false,
      originList: []
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    // 获取树形数据
    async loadDepartments() {
      const res = await getDepartments()
      // 截取第一条数据
      res.data.depts.shift()
      this.list = res.data.depts
      // console.log(this.list)
      this.originList = res.data.depts.map(item => {
        const id = item.id
        const name = item.name
        const code = item.code
        const pid = item.pid
        return { id, name, code, pid }
      })
      this.list = tranListToTreeData(res.data.depts)
    },

    // 添加
    hAdd(id) {
      // 显示弹窗
      this.showDialog = true
      // 更新当前操作的id
      this.curId = id
      // 点击添加设为false
      this.isEdit = false
    },

    // 确定后关闭弹窗，更新数据
    hSuccess() {
      this.showDialog = false
      // 从新渲染数据
      this.loadDepartments()
    },

    // 编辑
    hEdit(id) {
      // 显示弹窗
      this.showDialog = true
      this.curId = id
      this.isEdit = true
    },

    // 删除
    hDel(id) {
      this.$confirm('确定删除该部门吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发送请求
        await delDepartment(id)
        // 从新获取数据
        this.loadDepartments()
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
    },

    // 关闭弹窗
    hClose() {
      this.showDialog = false
      this.isEdit = false
      console.log(1111)
    },

    // dialog关闭事件
    hDialogClose() {
      this.$refs.refDeptDialog.resetForm()
    }
  }
}
</script>
