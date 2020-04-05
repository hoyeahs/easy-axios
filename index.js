import Axios, { getMethods, postMethods } from './src/index.js'

const axios = Object.create(null)
const methods = [...getMethods, ...postMethods]

methods.forEach((method) => {
  // 配置覆盖
  method = method.toLocaleLowerCase()
  axios[method] = (url, options) => {
    options.method = method
    return new Axios(url, options)
  }
})

axios.createInstance = (options) => {
  const axios = Object.create(Axios.prototype)

  methods.forEach((method) => {
    method = method.toLocaleLowerCase()
    axios[method] = (url, opt) => {
      axios.options = { ...Axios.defaultConfig, ...options, ...opt }
      axios.options.method = method.toLocaleLowerCase()
      axios.url = url
      return axios.request(url)
    }
  })
  return axios
}

export default axios
