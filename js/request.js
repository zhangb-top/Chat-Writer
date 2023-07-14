const instance = axios.create({
  baseURL: 'https://api.chatanywhere.com.cn'
})

// 密钥
let apiKey = ''

const loading = document.querySelector('.loading-container')

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    config.headers['Authorization'] = `Bearer ${apiKey}`
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    return config
  },
  function (error) {
    // 对请求错误做些什么
    hideLoading()
    return Promise.reject(error)
  }
)

// 响应拦截器（注意：响应拦截器也应该绑定给 instance 实例）
instance.interceptors.response.use(
  response => {
    hideLoading()
    return response
  },
  error => {
    hideLoading()
    return Promise.reject(error)
  }
)

/**
 * 展示加载效果
 */
function showLoading() {
  loading.classList.add('active')
}

/**
 * 隐藏加载效果
 */
function hideLoading() {
  loading.classList.remove('active')
}