<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form ref="ruleForm" label-width="220px">
      <!--手机 -->

      <el-form-item label="手机">
        <el-input v-model="userInfo.mobile" :disabled="true" style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <UploadImg v-model="userInfo.staffPhoto" />
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hSave">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user.js'
import { saveUserDetailById } from '@/api/employees.js'
import UploadImg from './UplpadImg.vue'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      userId: this.$route.query.id,
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      imageUrl: ''
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    async loadUserDetailById() {
      try {
        const res = await getUserDetailById(this.$route.query.id)
        // console.log('getUserDetailById', res)
        this.userInfo = res.data
      } catch (err) {
        console.log('getUserDetailById', err)
      }
    },

    // 保存
    async doSave() {
      try {
        const res = await saveUserDetailById(this.userInfo)
        console.log('保存个人信息之后的结果是', res)
        // 1. 提示
        this.$message.success('保存成功')
        // 2. 回到列表页
        this.$router.back()
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    hSave() {
      this.doSave()
    },
    upload(params) {
      console.log(params)
    },
    beforeAvatarUpload() {}
  }
}
</script>

<style scoped lang="scss">
  .user-info{
    padding-top:20px;
  }
</style>
