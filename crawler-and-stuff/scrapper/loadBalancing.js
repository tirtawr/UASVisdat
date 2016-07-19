// var request = require('request');
var request = require('sync-request');

var runTest = function(i){
  var url = 'http://128.199.124.123:8080/v2/ping/hello`';
  var res = request('GET', url);
  if (res.statusCode == 415) {
    console.log('OKE', i);
  }else{
    console.log('---FAILED---');
  }

}

for (var i = 0; i < 5000; i++) {
  runTest(i);
}
