import request from '@/utils/request'

/**
 *  组织架构-获取树形结构
 * @returns 返回树形结构数据
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 组织架构-根据id获取部门详情
 * @param {*} id 传入id
 * @returns
 */
export function getDepartDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}

/**
 * 组织架构-编辑-根据id编辑后保存
 * @param {*} data
 * @returns
 */
export function updateDepartments(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}

/**
 *  组织架构-删除，根据id删除部门
 * @param {*} id
 * @returns
 */
export function delDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
