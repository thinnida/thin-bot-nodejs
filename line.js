const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = process.env.PORT || 4000;

const { LineClient } = require("messaging-api-line");

const client = LineClient.connect({
  accessToken:
    "mV1oF68NiUFkaKWF6i26rPNOPzuxavRRYj5Y1m/5dHfYep8Lr8chKhwIDQCUlCUA4wNt+4AJUKSmoLYXkqz2aKbU1KQhxGCYOBHJDLJ1VCW0BWS8QWxbcIF6oi446fZxdnKGyZtwj9JNvuw1wDiSwgdB04t89/1O/w1cDnyilFU=",
  channelSecret: ""
});

const { Line } = require("messaging-api-line");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0];
  reply(reply_token, msg);
  res.sendStatus(200);
});

app.listen(port);

function reply(reply_token, msg) {
  let userId = msg.source.userId;
  let txt = msg.message.text;

  switch (txt.toLowerCase()) {
    case "knowledge":
      client.reply(reply_token, [
        Line.createText(
          "https://medium.com/educate/line-bot-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-messaging-api-c6f461634342\n\nhttps://medium.com/linedevth/tagged/api\n\nhttps://medium.com/linedevth/%E0%B8%88%E0%B8%B3-action-%E0%B9%84%E0%B8%94%E0%B9%89-%E0%B9%83%E0%B8%8A%E0%B9%89-action-%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-%E0%B9%83%E0%B8%99-line-messaging-api-99cccc824dcb\n\nhttps://medium.com/ingkwan/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-line-bot-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-node-js-aiml-a-beginners-guide-b7708b0b2440\n\nhttps://medium.com/linedevth/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A-message-%E0%B9%83%E0%B8%99-line-%E0%B8%97%E0%B8%B5%E0%B9%88-line-bot-%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89-%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%84%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89-c1bc479944d2\n\nhttps://medium.com/@benz20003/chat-bot-%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%86-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-line-messaging-api-php-nodejs-heroku-%E0%B9%81%E0%B8%9A%E0%B8%9A-step-by-step-943322819854"
        ),
        Line.createText(
          "https://developers.line.biz/en/docs/messaging-api/message-types/#message-types\n\nhttps://developers.line.biz/en/reference/messaging-api/\n\nhttps://developers.line.biz/en/docs/messaging-api/using-rich-menus/"
        ),
        Line.createText("https://www.npmjs.com/package/messaging-api-line")
      ]);

      break;
    case "debug":
      client.reply(reply_token, [Line.createText(JSON.stringify(msg))]);

      break;

    case "user id":
      client.reply(reply_token, [Line.createText("Your User id : " + userId)]);

      break;
    case "echo":
      client.reply(reply_token, [Line.createText("You type : " + txt)]);

      break;
    case "image":
      client.reply(reply_token, [
        Line.createImage({
          originalContentUrl:
            "https://www.silkspan.com/carinsur/images/emp.jpg",
          previewImageUrl:
            "https://www.silkspan.com/carinsur/images/emp-all.jpg"
        })
      ]);

      break;
    case "video":
      client.reply(reply_token, [
        Line.createVideo({
          originalContentUrl:
            "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_10mb.mp4",
          previewImageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg"
        })
      ]);

      break;
    case "button":
      client.reply(reply_token, [
        Line.createButtonTemplate("this is a template", {
          thumbnailImageUrl:
            "https://www.line-stickers.com/wp-content/uploads/2017/05/Brown-Cony-in-Lee-Min-Hos-LINE-Love-.png",
          title: "Menu",
          text: "Please select",
          actions: [
            {
              type: "postback",
              label: "Buy",
              data: "action=buy&itemid=123"
            },
            {
              type: "postback",
              label: "Add to cart",
              data: "action=add&itemid=123"
            },
            {
              type: "uri",
              label: "View detail",
              uri: "http://example.com/page/123"
            }
          ]
        })
      ]);

      break;
    case "confirm":
      client.reply(reply_token, [
        Line.createConfirmTemplate("this is a confirm template", {
          text: "Are you sure?",
          actions: [
            {
              type: "message",
              label: "Yes",
              text: "yes"
            },
            {
              type: "message",
              label: "No",
              text: "no"
            }
          ]
        })
      ]);

      break;

    case "carousel":
      client.reply(reply_token, [
        Line.createCarouselTemplate("this is a confirm template", [
          {
            thumbnailImageUrl:
              "https://gemismyname.com/wp-content/uploads/2015/11/line-mascot.png",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=111"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=111"
              },
              {
                type: "uri",
                label: "View detail",
                uri:
                  "https://gemismyname.com/wp-content/uploads/2015/11/line-mascot.png"
              }
            ]
          },
          {
            thumbnailImageUrl:
              "https://banner2.kisspng.com/20180527/ukr/kisspng-brown-bear-sticker-line-friends-rabbit-5b0acd3928c194.196883631527434553167.jpg",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=222"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=222"
              },
              {
                type: "uri",
                label: "View detail",
                uri:
                  "https://banner2.kisspng.com/20180527/ukr/kisspng-brown-bear-sticker-line-friends-rabbit-5b0acd3928c194.196883631527434553167.jpg"
              }
            ]
          }
        ])
      ]);

      break;
    default:
      client.reply(reply_token, [
        Line.createText(
          "Please select menu or type\n- Debug\n- User ID\n- Echo\n- Image\n- Video\n- Button\n- Confirm\n- Carousel\n- Knowledge",
          {
            quickReply: {
              items: [
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Debug",
                    text: "Debug"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "User ID",
                    text: "User ID"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Echo",
                    text: "Echo"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Image",
                    text: "Image"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Video",
                    text: "Video"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Button",
                    text: "Button"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Confirm",
                    text: "Confirm"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Carousel",
                    text: "Carousel"
                  }
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "Knowledge",
                    text: "Knowledge"
                  }
                }
              ]
            }
          }
        )
      ]);
  }
}
