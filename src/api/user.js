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

export function getUserProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {
  return
}
