<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
  >
    <el-form-item label="姓名:">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="hSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        id: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', triggler: 'blur' }],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    // 数据回填
    async loadUserDetailById() {
      const res = await getUserDetailById(this.$route.query.id)
      this.userInfo = res.data
    },
    // 发送数据保存
    async doEdit() {
      try {
        const res = await saveUserDetailById(this.userInfo)
        console.log('saveUserDetailById', res)
        this.$message.success('修改成功')
        // 保存数据
      } catch (err) {
        console.log('saveUserDetailById', err)
        this.$message.error('修改失败')
      }
    },
    // 点击更新 保存
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.doEdit()
        }
      })
    }
  }
}
</script>

