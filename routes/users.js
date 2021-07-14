var express = require('express');
var router = express.Router();

const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
// const token = process.env.SLACK_TOKEN;
const token = 'xoxb-2297933827824-2280457853732-XWOio2xG6RfQGY4WiPzWpxIQ';


// Initialize
const web = new WebClient(token);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});
router.post('/slack/events',(ctx)=>{
  const body = ctx.request.body;
    const event = body.event;

    if(body.type === 'event_callback'){
        //메세지 이벤트
        if(event.text === '가져와'){
            console.log(`수신 channel:${event.channel}, user: ${event.user}`);
            web.chat.postMessage({
                channel: event.channel,
                text: '가져올게요'
            }).then(result => {
                console.log('메세지 발신 : ' + result.ts);
            });
            ctx.status = 200;
        }
    } else if(body.type === 'url_verification'){
        //url 검증
        console.log('url verification');
        ctx.body = body.challenge;
    } else {
        ctx.status = 200;
    }
})

module.exports = router;
