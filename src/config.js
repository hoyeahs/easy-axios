export default {
  baseUrl: '',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest(data) {
    return data
  },
  transformResponse: [
    (response) => response.data,
    (error) => Promise.reject(error),
  ],
  timeout: 0,
  validateStatus(statusCode) {
    return statusCode < 500
  },
  params: null,
  data: null,
  method: 'GET',
  cache: false,
}
