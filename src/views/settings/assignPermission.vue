<template>
  <div>
    <el-form>
      <el-form-item>
        <el-tree
          ref="refTree"
          :data="permissionData"
          :props="{ label: 'name' }"
          default-expand-all
          :show-checkbox="true"
          :check-strictly="true"
          node-key="id"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="hSave">确定</el-button>
        <el-button @click="hCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils/index'
import { getRoleDetail, assignPerm } from '@/api/setting'
export default {
  name: 'VuecliDemoApp',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      permissionData: []
    }
  },

  created() {
    this.loadPermissionList()
    this.loadPermissionByRoleId()
  },

  methods: {
    // 发送请求, 获取权限列表
    async loadPermissionList() {
      const { data } = await getPermissionList()
      //   转换树形结构
      this.permissionData = tranListToTreeData(data)
    },
    // 获取角色详情数据回填权限点
    async loadPermissionByRoleId() {
      const res = await getRoleDetail(this.id)
      this.$refs.refTree.setCheckedKeys(res.data.permIds)
    },
    async hSave() {
      const permIds = this.$refs.refTree.getCheckedKeys()
      // console.log('当前选中的节点数组是', permIds)
      await assignPerm({
        id: this.id,
        permIds
      })

      // 提示
      this.$message.success('保存角色的权限成功')
      // 关闭弹层
      this.hCancel()
    },
    hCancel() {
    // 通过父组件去关闭弹层
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
