import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入发送请求的接口
import { getProfile, login, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    // 从本地获取token
    token: getToken() || null,
    userInfo: {}
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
    },

    // 保存用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录请求，保存token
    async Login(context, val) {
      const res = await login(val)
      context.commit('serToken', res.data)
    },

    // 获取用户信息
    async getUserInfo(context) {
      const res = await getProfile()
      const res2 = await getUserDetailById(res.data.userId)
      context.commit('setUserInfo', { ...res.data, ...res2.data })
      return res.data.roles.menus
    },

    // 退出登录清除token，用户信息
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
      resetRouter()
    }
  }
}
