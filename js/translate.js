const translateIptDoms = {
  processedLanguage: document.querySelector('#processed-language'),
  userTextarea: document.querySelector('#user-textarea')
}

const translateDoms = {
  assignTextarea: document.querySelector('#assign-textarea'),
  copyBtn: document.querySelector('.right-box .copy-btn'),
  translateBtn: document.querySelector('.translate-btn'),
  loading: document.querySelector('.right-box .loading-container')
}

const translateData = {
  model: "gpt-3.5-turbo-16k-0613",
  messages: [
    {
      role: "user",
      content: `请你将：${translateIptDoms.userTextarea.value}，翻译成${translateIptDoms.processedLanguage.value}，请你不要任意添加标点符号。如果遇到问句，你必须直接翻译，也不要写任何解释。如果要翻译的内容中存在地方名称等专有名词，你需要准确的把专有名词翻译出来，并且保持翻译后的句子意思不变。`
    }
  ],
  temperature: 0.8
}

/**
 * 输入框的输入事件
 */
for (const key in translateIptDoms) {
  if (Object.hasOwnProperty.call(translateIptDoms, key)) {
    translateIptDoms[key].addEventListener('input', function () {
      translateData.messages[0].content = `请你将：${translateIptDoms.userTextarea.value}，翻译成${translateIptDoms.processedLanguage.value}，请你不要任意添加标点符号。如果遇到问句，你必须直接翻译，也不要写任何解释。如果要翻译的内容中存在地方名称等专有名词，你需要准确的把专有名词翻译出来，并且保持翻译后的句子意思不变。`
    })
  }
}

/**
 * 点击翻译按钮
 */
translateDoms.translateBtn.addEventListener('click', function () {
  if (iptIsEmpty()) return showTip('表单项不能为空')
  getTranslateResult()
})

/**
 * 复制按钮点击事件
 */
translateDoms.copyBtn.addEventListener('click', function () {
  copy(translateDoms.assignTextarea)
})

/**
 * 翻译过程的基本逻辑
 */
async function getTranslateResult() {
  // 隐藏按钮组
  hideTranslateBtns()
  // 展示加载动画
  translateLoadingStartAnimation()
  // 调用接口
  try {
    const { data: res } = await chatAPI(translateData)
    // 隐藏加载动画
    translateLoadingEndAnimation()
    if (!res.id) return showTip('生成失败')
    // 显示翻译结果
    translateDoms.assignTextarea.value = res.choices[0].message.content
    // 显示按钮组
    showTranslateBtns()
  } catch {
    translateLoadingEndAnimation()
    showTip('密钥错误')
  }
}

/**
 * 加载时候的逻辑
 */
function translateLoadingStartAnimation() {
  translateDoms.translateBtn.disabled = true
  translateDoms.translateBtn.classList.add('disabled')
  translateDoms.assignTextarea.classList.add('active')
  translateDoms.loading.classList.add('active')
}

/**
 * 加载结束的逻辑
 */
function translateLoadingEndAnimation() {
  translateDoms.translateBtn.disabled = false
  translateDoms.translateBtn.classList.remove('disabled')
  translateDoms.assignTextarea.classList.remove('active')
  translateDoms.loading.classList.remove('active')
}

/**
 * 展示按钮
 */
function showTranslateBtns() {
  translateDoms.copyBtn.style.display = 'block'
}

/**
 * 隐藏按钮
 */
function hideTranslateBtns() {
  translateDoms.copyBtn.style.display = 'none'
}

/**
 *  检测输入框是否为空
 */
function iptIsEmpty() {
  let flag = false
  for (const key in translateIptDoms) {
    if (Object.hasOwnProperty.call(translateIptDoms, key)) {
      if (translateIptDoms[key].value.trim() === '') {
        flag = true
      }
    }
  }
  return flag
}