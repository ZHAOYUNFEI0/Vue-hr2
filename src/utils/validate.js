/**
 * 本js文件为正则校验规则文件
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 *  手机号正则校验
 * @param {*} str 传入手机号
 * @returns 返回校验结果布尔类型
 */
export function validMobile(str) {
  // 返回布尔值，test测试数据
  return /^1[3-9]\d{9}$/.test(str)
}
