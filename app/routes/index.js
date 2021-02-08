module.exports = function(app,conf) {
  const crypto = require('crypto');
  const axios  = require('axios');
  
  const key = crypto.scryptSync(conf.key, 'salt', 24);
  const baseUrl = 'https://api.telegram.org/bot'+conf.bot_token;
  var isNotSetWebhook = true;
  var bot_name = "";
  
  app.get("/:token", (req,res) => {
    try{
        var token = req.params.token;
        const chat_id = aesDecrypt(token,key)
        const msg = req.query.text;
        const pm = req.query.parse_mode
        if(pm === "Markdown" || pm ==="md") pm = "MarkdownV2";
        if(pm === "html") pm = "HTML"
        if(msg){
            var payload = {
                "chat_id" : chat_id,
                "text" : msg,
                "parse_mode": pm
            };
            post2tgbot(payload);
            res.send("Success");
        } else {
            res.send("Please attach the message!")
        };
    } catch(e) {
        res.send(e)
      }
  });
  app.post("/:token", (req,res) => {
    try{
        var token = req.params.token;
        const chat_id = aesDecrypt(token,key)
        const msg = req.body.text;
        var pm = req.body.parse_mode
        if(pm === "Markdown" || pm ==="md") pm = "MarkdownV2";
        if(pm === "html") pm = "HTML"
        if(msg){
            var payload = {
                "chat_id" : chat_id,
                "text" : msg,
                "parse_mode": pm || "MarkdownV2"
            };
            post2tgbot(payload);
            res.send("Success");
        } else {
            res.send("Please attach the message!")
        };
    } catch(e) {
        res.send(e)
      }
  });
  app.post("/", (req, res) => {
    var message = req.body.message;
    if(message.text==="/start") {
        var chat_id = message.chat.id;
        var token = aesEncrypt(chat_id.toString(),key);
        var payload = {
            "chat_id" : chat_id,
            "text" : "你的Token：\n" + token + "\n使用方式；发送get/post请求到\n"+"https://"+req.hostname+"/"+token+"\n"+"参数内容\n\"text\":\"Content you want to send\""
        };
        post2tgbot(payload);
        res.send(payload);
    } else {
        console.log("Unknown Error!")
        res.send("Unknown Error!")
    };
  });
  app.get("/",(req, res) => {
    if(isNotSetWebhook) {
      const host = "https://"+req.hostname;
      setWebhook(host)
    }
    console.log("Variable isNotSetWebhook is "+isNotSetWebhook)
    if(!bot_name){
      var url = baseUrl + '/getMe'
      axios.get(url)
        .then(nestedRes => {
          bot_name = nestedRes.data.result.username;
          res.redirect("https://t.me"+"/"+bot_name)
        }).catch(err => {
          console.log(err);
        })
    } else {
      res.redirect("https://t.me"+"/"+bot_name)
    }
  })
  function aesEncrypt(data, key) {
    const cipher = crypto.createCipheriv('aes192', key,Buffer.alloc(16, 0));
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  };
  function aesDecrypt(encrypted, key) {
      const decipher = crypto.createDecipheriv('aes192', key,Buffer.alloc(16, 0));
      var decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
  };
  function post2tgbot(payload){
      var url = baseUrl + '/sendMessage'
      axios.post(url, payload)
      .then(res => {
          console.log(`状态码: ${res.status}`)
      }).catch(error => {
          console.error(error)
      })
  };
  function setWebhook(host){
    var url = baseUrl + '/setWebhook';
    axios.get(url,{
      params : {
        "url" : host
      }
    }).then(res => {
      var temp = !res.data.result;
      isNotSetWebhook = temp;
      return temp;
    }).catch(err => {
      console.log(err);
    })
  };
};