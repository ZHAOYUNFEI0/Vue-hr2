export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    serToken(state, Token) {
      // 设置token
      state.token = Token
    }
  },
  actions: {}
}
