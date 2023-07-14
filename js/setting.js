const settingDoms = {
  settingBtn: document.querySelector('.setting'),
  formKey: document.querySelector('.form-key'),
  body: document.body,
  closeBtn: document.querySelector('.close'),
  confirmBtn: document.querySelector('.btns .confirm')
}

const settingIptDoms = {
  apiKey: document.querySelector('.apiKey-ipt')
}

settingIptDoms.apiKey.value = apiKey

// 点击设置，打开输入框
settingDoms.settingBtn.addEventListener('click', function () {
  settingDoms.formKey.classList.add('active')
  settingDoms.body.classList.add('mark')
})

// 点击 × 关闭输入框
settingDoms.closeBtn.addEventListener('click', close)
// 关闭函数
function close() {
  settingDoms.formKey.classList.remove('active')
  settingDoms.body.classList.remove('mark')
}

// 点击确认
settingDoms.confirmBtn.addEventListener('click', function () {
  apiKey = settingIptDoms.apiKey.value
  close()
  if (apiKey === '') return showTip('密钥为空将无法使用')
  showTip('设置成功')
})