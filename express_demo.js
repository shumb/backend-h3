//express_demo.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   console.log(req.originalUrl);
   res.send('Hello World by Mac');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
