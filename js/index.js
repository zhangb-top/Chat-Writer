const iptDoms = {
  theme: document.querySelector('.theme-ipt'),
  wordsCount: document.querySelector('.words-count-ipt'),
  keywords: document.querySelector('.keywords-ipt'),
  style: document.querySelector('.style-ipt')
}

const doms = {
  submitBtn: document.querySelector('.submit-btn'),
  resetBtn: document.querySelector('.reset-btn'),
  tip: document.querySelector('.tip'),
  result: document.querySelector('.result'),
  article: document.querySelector('.article'),
  copyBtn: document.querySelector('.copy-btn'),
  recreateBtn: document.querySelector('.recreate-btn'),
}

showTip('使用前记得添加密钥哦')

const bodyData = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "assistant",
      content: ""
    }
  ],
  // 使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。
  temperature: 0.8
}

// "生成" 按钮点击事件
doms.submitBtn.addEventListener('click', async function () {
  // 判断表单项是否为空
  if (isEmpty()) return showTip('表单项不能为空')
  bodyData.messages[0].content = `当涉及到${iptDoms.theme.value}时，我需要一篇${iptDoms.wordsCount.value}字的${iptDoms.style.value}，主题是${iptDoms.theme.value}，关键词包括${iptDoms.keywords.value}。`
  // 清空表单
  reset()
  // 生成文章
  createArticle()
})

// "重置" 按钮点击事件
doms.resetBtn.addEventListener('click', reset)

// 复制事件
doms.copyBtn.addEventListener('click', async function () {
  try {
    await navigator.clipboard.writeText(doms.article.textContent)
    showTip('复制成功')
  } catch (err) {
    showTip('复制失败')
  }
})

// 重新生成文章事件
doms.recreateBtn.addEventListener('click', createArticle)

// 生成文章
async function createArticle() {
  // 隐藏按钮组
  hideBtns()
  // 展示加载动画
  loadingStartAnimation()
  // 调用接口
  try {
    const { data: res } = await chatAPI(bodyData)
    // 隐藏加载动画
    loadingEndAnimation()
    if (!res.id) return showTip('生成失败')
    // 显示文章
    doms.article.textContent = res.choices[0].message.content
    // 隐藏按钮组
    showBtns()
  } catch {
    loadingEndAnimation()
    return showTip('密钥错误')
  }
}

/**
 * 重置表单
 */
function reset() {
  for (const key in iptDoms) {
    if (Object.hasOwnProperty.call(iptDoms, key)) {
      iptDoms[key].value = ''
    }
  }
}

/**
 * 判断表单选项是否有一个为空
 */
function isEmpty() {
  let flag = false
  for (const key in iptDoms) {
    if (Object.hasOwnProperty.call(iptDoms, key)) {
      if (iptDoms[key].value.trim() === '') {
        iptDoms[key].nextElementSibling.nextElementSibling.style.color = 'red'
        flag = true
      } else {
        iptDoms[key].nextElementSibling.nextElementSibling.style.color = '#fff'
      }
    }
  }
  return flag
}

/**
 * 展示提示
 * @param {String} message 提示词
 */
function showTip(message) {
  doms.tip.textContent = message
  doms.tip.classList.add('active')
  // 展示2秒
  setTimeout(() => {
    doms.tip.classList.remove('active')
  }, 3000)
}

/**
 * 加载时候的展示效果
 */
function loadingStartAnimation() {
  doms.submitBtn.disabled = true
  doms.submitBtn.classList.add('disabled')
  // 禁止result盒子滚动
  doms.result.style.overflow = 'hidden'
  doms.result.classList.add('active')
}

/**
 * 加载完成的展示效果
 */
function loadingEndAnimation() {
  doms.submitBtn.disabled = false
  doms.submitBtn.classList.remove('disabled')
  // 允许result盒子滚动
  doms.result.style.overflow = 'scroll'
  doms.result.classList.remove('active')
}

/**
 * 展示 复制和重新生成 按钮
 */
function showBtns() {
  doms.copyBtn.style.display = 'block'
  doms.recreateBtn.style.display = 'block'
}

/**
 * 隐藏 复制和重新生成 按钮
 */
function hideBtns() {
  doms.copyBtn.style.display = 'none'
  doms.recreateBtn.style.display = 'none'
}


