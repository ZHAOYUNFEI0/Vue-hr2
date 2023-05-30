<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile" />
      </el-form-item>

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="ruleForm.timeOfEntry"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择入职时间"
        />
      </el-form-item>

      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="ruleForm.workNumber" />
      </el-form-item>

      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="ruleForm.departmentName" @focus="hFocus" />
        <div v-if="showTree" class="tree-box">
          <el-tree :data="treeData" :props="{ label: 'name' }" @node-click="hNodeClick" />
        </div>
      </el-form-item>

      <el-form-item label="转正时间">
        <el-date-picker
          v-model="ruleForm.correctionTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择转正时间"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="hSubmit">确定</el-button>
        <el-button @click="hClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import EmployeeEnum from '@/constant/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  name: 'EmpDialog',

  data() {
    return {
      ruleForm: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: null, // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号部门为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]

      },
      hireType: EmployeeEnum.hireType,
      showTree: false
    }
  },
  created() {
  },
  methods: {
    hSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.doAdd()
        }
      })
    },
    hClose() {
      this.$emit('close')
    },
    // 获取树形结构数据
    async loadDepartments() {
      try {
        const res = await getDepartments()
        res.data.depts.shift() // 去掉第一个元素（公司名）
        //   转换树形结构
        this.treeData = tranListToTreeData(res.data.depts)
        this.showTree = true
      } catch (err) {
        console.log(err)
      }
    },
    hFocus() {
      this.loadDepartments()
    },
    hNodeClick(data) {
      if (data.children.length) {
        return
      }
      this.ruleForm.departmentName = data.name
      this.showTree = false
    },
    // 点击确定发送请求
    async doAdd() {
      try {
        const res = await addEmployee(this.ruleForm)
        console.log(res)
        this.$message.success('添加成功')
        this.$emit('success')
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    }

  }
}
</script>
