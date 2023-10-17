const articleIptDoms = {
  theme: document.querySelector('.theme-ipt'),
  wordsCount: document.querySelector('.words-count-ipt'),
  keywords: document.querySelector('.keywords-ipt'),
  style: document.querySelector('.style-ipt'),
  language: document.querySelector('#article-language')
}

const articleDoms = {
  submitBtn: document.querySelector('.submit-btn'),
  resetBtn: document.querySelector('.reset-btn'),
  result: document.querySelector('.result'),
  article: document.querySelector('.article'),
  copyBtn: document.querySelector('.copy-btn'),
  recreateBtn: document.querySelector('.recreate-btn'),
}

const articleData = {
  model: "gpt-3.5-turbo-0301",
  messages: [
    {
      role: "user",
      content: ""
    }
  ],
  // 使用什么采样温度，介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。
  temperature: 0.8
}

// "生成" 按钮点击事件
articleDoms.submitBtn.addEventListener('click', async function () {
  // 判断表单项是否为空
  if (isEmpty()) return showTip('表单项不能为空')
  articleData.messages[0].content = `当涉及到${articleIptDoms.theme.value}时，我需要一篇${articleIptDoms.wordsCount.value}字的${articleIptDoms.style.value}，主题是${articleIptDoms.theme.value}，关键词包括${articleIptDoms.keywords.value}，请你使用${articleIptDoms.language.value}回答我`
  // 清空表单
  reset()
  // 生成文章
  createArticle()
})

// "重置" 按钮点击事件
articleDoms.resetBtn.addEventListener('click', reset)

// 复制事件
articleDoms.copyBtn.addEventListener('click', function () {
  copy(articleDoms.article)
})

// 重新生成文章事件
articleDoms.recreateBtn.addEventListener('click', createArticle)

// 生成文章
async function createArticle() {
  // 隐藏按钮组
  hideBtns()
  // 展示加载动画
  loadingStartAnimation()
  // 调用接口
  try {
    const { data: res } = await chatAPI(articleData)
    // 隐藏加载动画
    loadingEndAnimation()
    if (!res.id) return showTip('生成失败')
    // 显示文章
    articleDoms.article.textContent = res.choices[0].message.content
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
  for (const key in articleIptDoms) {
    if (Object.hasOwnProperty.call(articleIptDoms, key)) {
      articleIptDoms[key].value = ''
    }
  }
}

/**
 * 判断表单选项是否有一个为空
 */
function isEmpty() {
  let flag = false
  for (const key in articleIptDoms) {
    if (Object.hasOwnProperty.call(articleIptDoms, key)) {
      if (articleIptDoms[key].value.trim() === '') {
        articleIptDoms[key].nextElementSibling.nextElementSibling.style.color = 'red'
        flag = true
      } else {
        articleIptDoms[key].nextElementSibling.nextElementSibling.style.color = '#fff'
      }
    }
  }
  return flag
}

/**
 * 加载时候的展示效果
 */
function loadingStartAnimation() {
  articleDoms.submitBtn.disabled = true
  articleDoms.submitBtn.classList.add('disabled')
  // 禁止result盒子滚动
  articleDoms.result.classList.add('active')
}

/**
 * 加载完成的展示效果
 */
function loadingEndAnimation() {
  articleDoms.submitBtn.disabled = false
  articleDoms.submitBtn.classList.remove('disabled')
  // 允许result盒子滚动
  articleDoms.result.classList.remove('active')
}

/**
 * 展示 复制和重新生成 按钮
 */
function showBtns() {
  articleDoms.copyBtn.style.display = 'block'
  articleDoms.recreateBtn.style.display = 'block'
}

/**
 * 隐藏 复制和重新生成 按钮
 */
function hideBtns() {
  articleDoms.copyBtn.style.display = 'none'
  articleDoms.recreateBtn.style.display = 'none'
}