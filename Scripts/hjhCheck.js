var axios = require("axios");
var qs = require("qs");

//注册地址:haojiahuo.live/auth/register?code=FErc
//便宜3.99 50g 签到每天1g-4g随机 速度快 提供小火箭下载共享账号

//好家伙机场邮箱
email = "";
//好家伙机场密码
passwd = "";

cookie = "";
function start() {
  console.log("开始执行机场签到,登陆中...");
  let body = qs.stringify({
    email,
    passwd,
    remember_me: "on",
  });
  let request = {
    method: "post",
    url: "https://haojiahuo.live/auth/login",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.84",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: body,
  };
  axios(request)
    .then(function (response) {
      if (response.data.ret == 1) {
        console.log("登录成功");
        this.cookie = response.headers["set-cookie"];
        //console.log(response.headers["set-cookie"]);
        console.log("获取Cookie成功,正在运行签到...");
        checkin();
      } else {
        console.log("登录失败" + response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function checkin() {
  var request = {
    method: "post",
    url: "https://haojiahuo.live/user/checkin",
    headers: {
      cookies: cookie,
      Cookie: cookie,
    },
  };

  axios(request)
    .then(function (response) {
      if (response.data.ret == 1) {
        console.log(
          "签到成功" +
            response.data.msg +
            "您的当前流量为" +
            response.data.trafficInfo["unUsedTraffic"]
        );
      } else {
        console.log(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//module.exports = start();

start();
