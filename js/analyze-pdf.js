const pdfIptDoms = {
  file: document.querySelector('#file')
}

const pdfDoms = {
  pdfName: document.querySelector('.pdf-name'),
  analysisResult: document.querySelector('.analysis-result'),
  copyBtn: document.querySelector('.analysis-result .copy-btn'),
  recreateBtn: document.querySelector('.analysis-result .recreate-btn'),
  text: document.querySelector('.analysis-result .text'),
  loading: document.querySelector('.analysis-result .loading-container')
}

const analyzePDFData = {
  model: "gpt-3.5-turbo-16k-0613",
  messages: [
    {
      role: "user",
      content: ""
    }
  ],
  temperature: 0.8
}

// 选取pdf文件事件
pdfIptDoms.file.addEventListener('change', function (event) {
  const file = event.target.files[0]
  if (!file) {
    return pdfDoms.pdfName.textContent = 'Please choose a pdf file'
  }
  pdfDoms.pdfName.textContent = file.name
  readPDF(file)
})

/**
 * 读取pdf文件
 * @param {*} file 
 */
function readPDF(file) {
  const fileReader = new FileReader();
  fileReader.onload = async function () {
    let pdf = {}
    try {
      const arrayBuffer = this.result
      pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    } catch (err) {
      pdfDoms.pdfName.textContent = 'Please choose a pdf file'
      showTip(err.message)
    }
    let content = ''
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      content += pageText + '\n'
    }
    analyzePDFData.messages[0].content = `现在你将扮演一个文字分析总结专家，你需要根据我给你的文字内容，准确无误的总结分析出这段文字，让我完全了解这段文字在说什么。要求使用罗列的形式。下面是文字内容：${content}`
    // 生成结果
    analyzePDF()
  }
  fileReader.readAsArrayBuffer(file)
}

/**
 * 分析pdf文件
 */
async function analyzePDF() {
  // 隐藏按钮组
  hidePDFBtns()
  // 展示加载动画
  pdfLoadingStartAnimation()
  // 调用接口
  try {
    const { data: res } = await chatAPI(analyzePDFData)
    // 隐藏加载动画
    pdfLoadingEndAnimation()
    if (!res.id) return showTip('生成失败')
    // 显示分析结果
    pdfDoms.text.textContent = res.choices[0].message.content
    // 显示按钮组
    showPDFBtns()
  } catch {
    pdfLoadingEndAnimation()
    showTip('密钥错误')
  }
}

/**
 * 点击复制按钮
 */
pdfDoms.copyBtn.addEventListener('click', function () {
  copy(pdfDoms.text)
})

/**
 * 点击重新生成按钮
 */
pdfDoms.recreateBtn.addEventListener('click', analyzePDF)

/**
 * 加载时候的展示效果
 */
function pdfLoadingStartAnimation() {
  pdfIptDoms.file.disabled = true
  // 禁止result盒子滚动
  pdfDoms.analysisResult.classList.add('active')
  pdfDoms.loading.classList.add('active')
}

/**
 * 加载完成的展示效果
 */
function pdfLoadingEndAnimation() {
  pdfIptDoms.file.disabled = false
  // 允许result盒子滚动
  pdfDoms.analysisResult.classList.remove('active')
  pdfDoms.loading.classList.remove('active')
}

/**
 * 展示 复制和重新生成 按钮
 */
function showPDFBtns() {
  pdfDoms.copyBtn.style.display = 'block'
  pdfDoms.recreateBtn.style.display = 'block'
}

/**
 * 隐藏 复制和重新生成 按钮
 */
function hidePDFBtns() {
  pdfDoms.copyBtn.style.display = 'none'
  pdfDoms.recreateBtn.style.display = 'none'
}