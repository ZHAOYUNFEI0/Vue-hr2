<template>
  <div>
    <el-form ref="deptForm" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employees" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click.native="hSubmit">确定</el-button>
        <el-button size="small" @click.native="hClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 下拉获取部门负责人姓名
import { getEmployeeSimple } from '@/api/employees'
// 点击确定提交api
import { addDepartments } from '@/api/employees'

// 获取部门详情api
import { getDepartDetail, updateDepartments } from '@/api/departments'

export default {
  name: 'DeptDialog',
  props: {
    id: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    originList: {
      type: Array,
      required: true
    }
  },
  data() {
    // 自定义校验规则
    const validCode = (rule, value, callback) => {
      const existCodeList = this.originList.map(item => item.code)
      existCodeList.includes(value) ? callback(new Error('编码' + value + '已经存在')) : callback()
    }
    const validName = (rule, value, callback) => {
      const existNameList = this.originList.filter(item => item.pid === this.id).map(item => item.name)
      if (existNameList.includes(value)) {
        callback(new Error('名字' + value + '已存在'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      employees: [],
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.loadEmployee()
    this.loadDetail()
  },

  methods: {
    // 获取管理员名单
    async loadEmployee() {
      const res = await getEmployeeSimple()
      this.employees = res.data
    },

    // 点击确定发送请求保存
    async hSubmit() {
      // 兜底校验
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          this.isEdit ? this.doEdit() : this.doSubmit()
        }
      })
    },

    async doSubmit() {
      try {
        const res = await addDepartments({ ...this.form, pid: this.id })
        this.$message({ type: 'success', message: '新增成功' })
        console.log(res)
        this.$emit('success')
      } catch (err) {
        this.$message({ type: 'error', message: err })
      }
    },
    // 关闭弹窗
    hClose() {
      // 重置表单数据
      // 清空校验结果
      this.$refs.deptForm.resetFields()
      this.$emit('close')
    },

    //   获取当前部门详情
    async loadDetail() {
      if (this.isEdit) {
        const res = await getDepartDetail(this.id)
        this.form = res.data
      }
    },

    // 编辑保存
    async doEdit() {
      try {
        await updateDepartments(this.form)
        this.$message({ type: 'success', message: '修改成功' })
        this.$emit('success')
      } catch (err) {
        this.$message({ type: 'error', message: err })
      }
    },

    // 清空表单校验
    resetForm() {
      this.$refs.deptForm.resetFields()
      console.log('resetForm')
    }
  }

}
</script>

<style scoped>

</style>
