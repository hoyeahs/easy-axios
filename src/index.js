'use strict'

// 导入默认配置
import config from './config.js'

// 所有支持的方法
export const getMethods = ['GET', 'DELETE', 'HEAD', 'OPTIONS']
export const postMethods = ['POST', 'PUT']

/*
 * Axios类实现
 */
export default class Axios {
  constructor(url, options) {
    this.url = url
    this.options = { ...config, ...options }
    return this.request(url)
  }

  // 请求函数
  request() {
    let { method = 'GET', data, ...rest } = this.options
    let url = rest.baseUrl ? rest.baseUrl + this.url : this.url
    method = method.toUpperCase()

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      getMethods.indexOf(method) > -1 &&
        (url += `${url.indexOf('?') === -1 ? '?' : '&'}${getParams(
          rest.params,
        )}${rest.cache ? '&rdm=' + Math.random() : ''}`)

      xhr.open(method, url, true)

      xhr.onreadystatechange = () => {
        const { status, readyState } = xhr
        const state = rest.validateStatus(status)
        if (!state) {
          return reject({ status, response: xhr.response, request: xhr })
        }
        if (readyState === 4) {
          const { status, statusText, responseText } = xhr
          const data = JSON.parse(responseText)

          resolve({ status, statusText, data, request: xhr })
        }
      }

      xhr.withCredentials = !!rest.withCredentials

      xhr.timeout = rest.timeout
      xhr.ontimeout = (e) => reject(e)

      // 设置请求头
      if (rest.header) {
        Object.keys(rest.header).forEach((key) => {
          xhr.setRequestHeader(key, rest.header[key])
        })
      }

      postMethods.indexOf(method) > -1 && (data = rest.transformRequest(data))

      xhr.send(data)
    }).then(...rest.transformResponse)
  }
}


Axios.defaultConfig = config

function getParams(params) {
  let result = ''
  if (params && params.toString() === '[object Object]') {
    Object.keys(params).forEach((key) => (result += `&${key}=${params[key]}`))
    result = result.substring(1)
  }
  return result
}
