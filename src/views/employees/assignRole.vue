<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    // 用户的id 用来查询当前用户的角色信息
    employeeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const res = await getRoles({ pagr: 1, pagesize: 100 })
      this.list = res.data.rows
      const info = await getUserDetailById(this.employeeId)
      // 保存这个员工当前的已经有的角色
      this.roleIds = info.data.roleIds
    },
    async hSubmit() {
      // 保存分配角色
      await assignRoles({ id: this.employeeId, roleIds: this.roleIds })
      this.$message.success('分配成功')
      this.$emit('close')
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>

