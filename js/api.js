// 列出模型
function getModelsAPI() {
  return instance.get('/v1/models')
}

// 生成聊天消息的自动完成
function chatAPI(bodyData) {
  return instance.post('/v1/chat/completions', bodyData)
}