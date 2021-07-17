const menuitems = require("../config/menu");
const crawling = require("../lib/crawling");

const express = require("express");
const router = express.Router();
const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
const token = "xoxb-2297933827824-2280457853732-XWOio2xG6RfQGY4WiPzWpxIQ";

// Initialize
const web = new WebClient(token);
/* GET home page. */
router.use(express.json()).post("/", function (req, res, next) {
  let body = req.body;
  let event = body.event;

  if (body.type === "event_callback") {
    console.log(event);
    if (event.type === "message") {
      if (event.text === "메뉴추천") {
        console.log(`메시지 수신 channel:${event.channel}, user:${event.user}`);
        const menuList = menuitems.menuList;
        const menuPick =
          menuList[Math.floor(Math.random() * (menuList.length + 1))];
        web.chat
          .postMessage({
            channel: event.channel,
            text: `오늘 메뉴는 ${menuPick} 어떠세요?`,
          })
          .then((result) => {
            console.log("Message sent: " + result.ts);
          });
        res.sendStatus(200);
      } else if (event.text.slice(-2) === "맛집") {
        const restaurants = crawling.getRestaurants(event.text);
        web.chat
          .postMessage({
            channel: event.channel,
            text: `====================================\n[오늘의 맛집 ${restaurants[0].title}] \n카테고리: ${restaurants[0].category} \n전화번호: ${restaurants[0].telephone} \n주소: ${restaurants[0].roadAddress} \n관련링크: ${restaurants[0].link}\n====================================`,
          })
          .then((result) => {
            console.log("Message sent: " + result.ts);
          });
        res.sendStatus(200);
      }
    }
  } else if (body.type === "url_verification") {
    // URL 검증을 위한 처리
    console.log("url verification");
    res.send(body.challenge);
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
