const indexDoms = {
  tip: document.querySelector('.tip'),
  menuBtn: document.querySelector('.menu'),
  leftMenu: document.querySelector('.left-menu'),
  closeMenuBtn: document.querySelector('.close-menu'),
  abilities: document.querySelectorAll('.ability')
}

if (!apiKey) showTip('第一次使用记得添加密钥哦')

/**
 * 菜单按钮点击事件
 */
indexDoms.menuBtn.addEventListener('click', function (e) {
  e.stopPropagation()
  // 展示按钮
  indexDoms.leftMenu.classList.add('show')
  // 为 body 绑定点击事件，点击body则关闭 menu
  document.addEventListener('click', function (e) {
    if (!e.target.className.includes('menu')) {
      indexDoms.leftMenu.classList.remove('show')
    }
  })
})

/**
 * 每个菜单项的点击事件
 */
indexDoms.leftMenu.addEventListener('click', function (e) {
  if (e.target.className.includes('menu-item')) {
    const active = this.querySelector('.active')
    active.classList.remove('active')
    e.target.classList.add('active')
    indexDoms.abilities[active.dataset.index].classList.remove('active')
    indexDoms.abilities[e.target.dataset.index].classList.add('active')
    indexDoms.leftMenu.classList.remove('active')
    indexDoms.leftMenu.classList.remove('show')
  }
})

/**
 * 关闭菜单按钮
 */
indexDoms.closeMenuBtn.addEventListener('click', function () {
  indexDoms.leftMenu.classList.remove('show')
})

/**
 * 展示提示
 * @param {String} message 提示词
 */
function showTip(message) {
  indexDoms.tip.textContent = message
  indexDoms.tip.classList.add('active')
  // 展示3秒
  setTimeout(() => {
    indexDoms.tip.classList.remove('active')
  }, 3000)
}

/**
 * 复制函数
 * @param {*} dom 复制对象
 */
async function copy(dom) {
  const range = document.createRange()
  range.selectNodeContents(dom)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  try {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      // 当前设备是移动设备
      const successful = document.execCommand('copy');
      const msg = successful ? '复制成功' : '复制失败'
      showTip(msg)
    } else {
      await navigator.clipboard.writeText(dom.textContent)
      showTip('复制成功')
    }
  } catch (err) {
    showTip('复制失败')
  }
  selection.removeAllRanges()
}