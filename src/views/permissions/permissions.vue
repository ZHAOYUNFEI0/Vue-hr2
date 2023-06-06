<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table :data="list" row-key="id" border>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button v-if="scope.row.type === 1" type="text" @click="hAdd(2,scope.row.id)">添加</el-button>
              <el-button type="text" @click="hEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="hDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 添加权限-弹窗 -->
    <el-dialog :visible.sync="showDialog" :title="isEdit?'编辑':'添加'" @close="resetForm">
      <!-- 表单内容 -->
      <el-form label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getPermissionList, addPermission, delPermission, updatePermission, getPermissionDetail } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      showDialog: false,
      isEdit: false
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 获取权限列表
    async loadPermissionList() {
      const res = await getPermissionList()
      this.list = tranListToTreeData(res.data)
    },
    hAdd(type, id) {
      this.isEdit = false
      this.showDialog = true
      // 记录当前添加的关键信息
      this.formData.type = type
      this.formData.pid = id
    },
    hSubmit() {
      this.isEdit ? this.doEdit() : this.doAdd()
    },
    async doAdd() {
      try {
        const res = await addPermission(this.formData)
        console.log(res)

        this.showDialog = false
        this.loadPermissionList()
        this.$message.success('添加成功')
      } catch (err) {
        console.log(err)
        this.$message.error('添加失败')
      }
    },
    // 当弹层关闭时，重置表单
    resetForm() {
      // 1. 重置表单
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    },

    // 删除
    async doDel(id) {
      try {
        const res = await delPermission(id)
        console.log(res)

        this.loadPermissionList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      }
    },
    // 用户点击删除
    hDel(id) {
    // alert(id)
      this.$confirm('你确定要删除吗？').then(() => {
        this.doDel(id)
      }).catch(() => {

      })
    },
    // 用户点击了编辑
    async hEdit(id) {
      this.isEdit = true
      // alert(id)
      // 1. 根据id去获取详情
      const res = await getPermissionDetail(id)
      console.log('从后端返回的权限点详情数据是', res)
      // 2. 填充在表单中
      this.formData = res.data
      // 3. 显示弹层
      this.showDialog = true
    },
    async doEdit() {
      try {
        const res = await updatePermission(this.formData)
        console.log(res)

        this.showDialog = false
        this.loadPermissionList()
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
        this.$message.error('修改失败')
      }
    }
  }
}
</script>
