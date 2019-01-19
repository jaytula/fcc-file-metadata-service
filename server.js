'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
// require and use "multer"...

var app = express();

var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname+'-'+Date.now())
  }
})
var upload = multer({storage})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let result = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  
  res.json(result)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
