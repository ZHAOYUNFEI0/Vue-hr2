<template>
  <div style="margin-top: 20px;">
    <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { formatExcelDate } from '@/utils/index.js'
import UploadExcel from '@/components/UploadExcel'
import { importEmployee } from '@/api/employees'
export default {

  name: 'Import',
  components: {
    UploadExcel
  },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      const data = this.tranExcel(results)
      this.doImport(data)
      this.tableData = results
      this.tableHeader = header
    },

    // 处理返回的表格数据
    tranExcel(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      return results.map(item => {
        const enObj = {}
        const zhKeys = Object.keys(item) // ['姓名'，‘手机号]

        zhKeys.forEach(zhKey => {
          const enKey = mapInfo[zhKey]

          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            enObj[enKey] = new Date(formatExcelDate(item[zhKey]))
          } else {
            enObj[enKey] = item[zhKey]
          }
        })

        return enObj
      })
    },

    // 导入Excel数据
    async doImport(data) {
      try {
        await importEmployee(data)
        this.$message.success('导入成功')
        // 成功后 后退
        this.$router.back()
      } catch (err) {
        console.log(err)
        this.$message.error('导入失败')
      }
    }
  }
}
</script>
