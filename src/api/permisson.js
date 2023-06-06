import request from '@/utils/request'

/**
 * 权限管理-获取权限列表
 * @param {*} params
 * @returns
 */
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

/**
 * 权限管理-新增权限
 * @param {*} data
 * @returns
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 *权限管理-更新权限
 * @param {*} data
 * @returns
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 权限管理-删除权限
 * @param {*} id
 * @returns
 */
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

/**
 * 权限管理-获取权限详情
 * @param {*} id
 * @returns
 */
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
