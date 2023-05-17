import axios from 'axios'

const service = axios.create({

  // 基地址
  baseURL: '',

  // 请求超时的等待时间
  timeout: 5000

})

export default service
