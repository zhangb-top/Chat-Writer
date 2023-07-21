# Chat Writer

## 项目简介

Chat Writer是一个基于[GPT_API_free](https://github.com/chatanywhere/GPT_API_free)开发的一个专注于完成文字类编写工作的小工具，结合GPT_API_free提供的国内ChatGPT接口以及提供的免费key进行设计，使用HTMl、CSS、Javascript三种简单的前端语言进行开发，通过axios发送网络请求，来让ChatGPT完成我们的要求，真正实现了国内人纯小白也可以免费使用ChatGPT的功能完成文字类工作的能力。

## 项目功能

### 已完成

文章撰写：现阶段Chat Writer可以帮助各行各业的人完成各种文章的撰写，你只需要提供文章的主题、文章的类型（说明文、议论文、正式论文等等）、关键字、文章字数。Chat Writer就可以帮你完成一篇优秀的文章，当然如果不满意也可以重新生成，知道你满意为止。

全文翻译：2023-7-20，新增全文翻译效果，只需要提供文字的内容、文字的语种、要翻译成的语种。Chat Writer就可以帮你完成一份全文翻译的工作。

pdf分析功能：用户可以传入一个pdf文件，Chat Writer可以为你总结全文的内容，帮助你快速了解总结该pdf文件。由于测试数据较少，欢迎个人多多尝试pdf文件，如果遇到困难可以联系我。

### 计划开发

让Chat Writer真正的成为各行各业的小帮手

## 前提条件

1. 一个GitHub账号，访问 https://github.com/ 地址完整注册即可

2. 浏览器地址栏直接搜索 https://github.com/chatanywhere/GPT_API_free ，登录GitHub账号，领取免费的密钥

   ![gpt-api-free](http://cdn.zhangb.top/gpt-api-free.jpg)

> 注意：免费的密钥有频率限制，同一个密钥每小时请求不可以超过120次，所以免费的key请不要频繁使用Chat Writer（普通人来说足够用了）

## 项目演示

> 设置密钥：点击右上方的设置按钮，填入领取的密钥即可

<img src="http://cdn.zhangb.top/chatwriter-index.jpg" alt="chatwriter-index" style="zoom: 67%;" />

> 生成文章

<img src="http://cdn.zhangb.top/article.jpg" alt="article" style="zoom:33%;" />

> 翻译

<img src="http://cdn.zhangb.top/chatwriter-translate.jpg" alt="chatwriter-translate" style="zoom:33%;" />

> 解析pdf文件

<img src="http://cdn.zhangb.top/chatwriter-pdf.jpg" alt="chatwriter-pdf" style="zoom: 33%;" />

## 在线体验

https://zhangb-top.github.io/Chat-Writer/

## 本地运行

1. 第一步当然是Star啦

2. 克隆项目到本地

   ```bash
   git clone git@github.com:zhangb-top/Chat-Writer.git
   ```

3. 直接打开文件夹的index.html文件即可运行