import request from '@/utils/request'

/**
 *  组织架构-获取下拉部门负责人数据
 * @returns 返回人名
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 *  组织架构-添加点击确定保存数据
 * @param {*} data
 * @returns
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * 员工管理-获取员工列表
 * @param {*} page
 * @param {*} size
 * @returns
 */
export function getEmployeeList(page, size) {
  return request({
    methods: 'get',
    url: '/sys/user',
    params: { page, size }
  })
}

/**
 * 员工管理-根据id删除员工
 * @param {*} id 传入员工id
 * @returns
 */
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: '/sys/user/' + id
  })
}

/**
 * 员工管理-添加员工
 * @param {*} data 转入员工信息
 * @returns
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 员工管理-导入Excel
 * @param {*} data
 * @returns
 */
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
