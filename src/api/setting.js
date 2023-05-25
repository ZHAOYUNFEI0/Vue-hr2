import request from '@/utils/request'

/**
 * 公司设置-获取所有角色spi
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
