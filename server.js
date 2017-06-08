var express = require('express');
var app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

console.log('Listening on port 8080');
app.listen(8080);
