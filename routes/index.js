const menuitems = require("../config/menu");
const crawling = require("../lib/crawling");
const tokenSet = require("../config/key");
const express = require("express");
const router = express.Router();
const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
const token = tokenSet.token;

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
        const restaurantsObj = crawling.getRestaurants(event.text);
        restaurantsObj.then((restaurants) => {
          web.chat
            .postMessage({
              channel: event.channel,
              text: `============================================\n[오늘의 맛집 ${restaurants.title}] \n카테고리: ${restaurants.category} \n전화번호: ${restaurants.telephone} \n주소: ${restaurants.roadAddress} \n관련링크: ${restaurants.link}\n============================================`,
            })
            .then((result) => {
              console.log("Message sent: " + result.ts);
            });
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
