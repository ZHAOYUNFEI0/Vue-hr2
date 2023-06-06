<template>
  <el-calendar v-model="curDate" />
</template>

<script>
export default {
  data() {
    return {
      curDate: new Date()
    }
  }
}
</script>
