// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get('/api', (req, res) => {
//   const date = new Date();

//   res.json({
//     unix: date.getTime(),
//     utc: date.toUTCString()
//   });
// });

// app.get('/api/:date', (req, res) => {
//   const dateString = req.params.date;

//   let date;
//   if (!isNaN(dateString)) {
//     // 如果 dateString 是一个数字（Unix 时间戳）
//     date = new Date(parseInt(dateString));
//   } else {
//     // 如果 dateString 是一个字符串（日期格式）
//     date = new Date(dateString);
//   }

//   // 检查日期是否有效
//   if (isNaN(date.getTime())) {
//     res.json({ error: "Invalid Date" });
//   } else {
//     res.json({
//       unix: date.getTime(),
//       utc: date.toUTCString()
//     });
//   }
// });

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  let date;
  if (!dateString) {
    // 如果没有提供日期，使用当前日期
    date = new Date();
  } else {
    // 尝试解析提供的日期
    if (!isNaN(dateString)) {
      // 如果 dateString 是一个数字（Unix 时间戳）
      date = new Date(parseInt(dateString));
    } else {
      // 如果 dateString 是一个字符串（日期格式）
      date = new Date(dateString);
    }
  }

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
