## MilkyBot

### 一键部署

若对Telegrambot有一定了解，那么请准备好机器人的 `Token` 直接一键部署。

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://dashboard.heroku.com/new?template=https://github.com/Ermaotie/MilkyBot)

### 简介

[Server酱](http://sc.ftqq.com/)公众号发布公告，微信官方可能加大对模板消息的限制，而ServerChan正是基于其模板消息。作者也说明了ServerChan可能会在一个未知的时间关闭，我使用ServerChan有很长一段时间，在这里也向作者Easy表示感谢与敬意。

MilkyBot是一个基于`TelegramBot` 的发送信息的小工具，供我个人使用就目前情况而言完全足够。它目前能够通过`get/post`方式发送消息。

#### 优势

* 免去了设置[`Webhook`](https://core.telegram.org/bots/api#setwebhook)的操作
* 提供了简单加密`chat_id`
* 支持markdown以及HTML

### 部署流程

1.  点击[创建你的机器人](https://t.me/botfather)，在`/botfather`对话中输入`/newbot`指令，并按要求操作。重要的是要获取到你的机器人的  **Token**

2. [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://dashboard.heroku.com/new?template=https://github.com/Ermaotie/MilkyBot) 

   输入机器人的`token`

   `KEY`为加密时所需要的密钥，密钥不同，生成的用户Token就不同。

3. 等待部署完成，访问你APP，默认应为：

   `your-appname.herokuapp.com`

   即可自动完成`webhook`的设置。

4. 点击`Send Message` 与你的机器人建立联系，并在聊天框输入或点击`/start`。

5. 获取到的链接即可使用。

### 使用方法

`get/post`含有你`Token`的链接：

`https://your-appname.herokuapp.com/<your token>`

##### 参数：

| 参数名     |           内容            |
| ---------- | :-----------------------: |
| text       |       your content        |
| parse_mode | Markdown, HTML,text(默认) |





#### To DO

* 频道订阅
* ~~markdown消息类型支持~~（已支持，同时支持html）



如果觉得这个项目不错，不妨点个星星，这是对我最大的激励！

