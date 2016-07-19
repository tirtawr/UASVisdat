var express     = require('express');
var app         = express();

app.get('/', function (req, res) {
    console.log(req.headers);
    res.send('oke bro');
});



app.listen(3002, function () {
    console.log('listening on port', 3002);
});
