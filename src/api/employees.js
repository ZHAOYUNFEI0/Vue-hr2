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
