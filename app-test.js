const Request = require("request");

Request.post({
  uri: "http://192.168.3.133:8081",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify([{ longUrl: "ABCDEF1234567890" }, { Name: "XYZ" }])
});

/*
let reply_token = "1234";

let options = {
  url: "http://192.168.0.12",
  method: "POST",
  json: {
    longUrl: "http://www.google.com/"
  }
};

Request(options, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Print the shortened url.
  }
});
*/
//Request.get("http://192.168.0.12/?a=b", (error, response, mbody) => {});

/*
Request.get(
  "https://api.monday.com:443/v1/boards/265544485/pulses.json?api_key=ac1e2f909c3ab322275cfdcbc019904b",
  (error, response, mbody) => {
    let monday = JSON.parse(mbody);

    let msg = [];

    monday.forEach(function(md) {
      msg.push({
        type: "text",
        text: md.pulse.name
      });
    });

    let body = JSON.stringify({
      replyToken: reply_token,
      messages: msg
    });

    console.info(body);
  }
);
*/
/*
var rp = require("request-promise");

var options = {
  uri:
    "https://api.monday.com:443/v1/boards/265544485/pulses.json?api_key=ac1e2f909c3ab322275cfdcbc019904b",
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true // Automatically parses the JSON string in the response
};

rp(options)
  .then(function(repos) {
    //console.info(repos);

    let msg = [];

    repos.forEach(function(md) {
      msg.push({
        type: "text",
        text: md.pulse.name
      });
    });

    console.info(msg);
  })
  .catch(function(err) {
    // API call failed...
  });
*/
