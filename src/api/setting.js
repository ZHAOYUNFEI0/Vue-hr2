import request from '@/utils/request'

/**
 * 公司设置-获取所有角色api
 * @param {*} params 发送 页码，每页条数
 * @returns
 */
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

/**
 *  公司设置-根据id删除角色
 * @param {*} id 角色id
 * @returns
 */
export function deleteRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

/**
 *  公司设置-新增角色
 * @param {*} data 传入角色信息
 * @returns
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 *  根据id编辑角色
 * @param {*} data
 * @returns
 */
export function undateRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

/**
 * 公司设置-获取角色详情
 * @param {*} id
 * @returns
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 公司设置-给角色分配权限
 * @param {*} data
 * @returns
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
