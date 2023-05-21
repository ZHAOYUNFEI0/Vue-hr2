import request from '@/utils/request'

/**
 * 登录请求
 * @param {*} data 账号密码
 * @returns 返回token
 */
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

/**
 * 获取用户信息
 * @returns 返回用户信息
 */
export function getProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 根据id获取用于头像
 * @param {*} id 传入用户id
 * @returns 返回用户头像
 */
export function getUserDetailById(id) {
  return request({
    url: '/sys/user/' + id
  })
}

export function logout() {
  return
}
