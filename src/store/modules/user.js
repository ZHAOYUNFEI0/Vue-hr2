import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    // 从本地获取token
    token: getToken() || null
  },
  mutations: {
    serToken(state, Token) {
      // 设置token
      state.token = Token

      // 本地存储token
      setToken(Token)
    },

    // 删除token
    removeToken(state) {
      state.token = null
      // 删除本地token
      removeToken()
    }
  },
  actions: {}
}
