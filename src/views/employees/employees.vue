<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        员工管理
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuecliDemoApp',
  data() {
    return {

    }
  },

  created() {
    console.log(this.$router.app._route)
  },

  methods: {

  }
}
</script>

<style scoped>

</style>
