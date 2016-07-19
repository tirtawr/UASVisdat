// var request = require('request');
//
// var url = 'https://developers.zomato.com/api/v1/search?entity_id=74&entity_type=city&start=0&count=20&cuisines=237&sort=cost&order=asc';
// var url2 = 'http://localhost:3002'
// request.get({
//   url: url2,
//   headers: {
//     'Accept': 'application/json',
//     'user_key': 'cdc8322bc8a39a3bac7c1daa69d759be',
//     'connection': 'keep-alive',
//     'user-agent': 'tito'
//   }
// }, function(err, response, body) {
//     console.log(body);
// });

var curl = require('curlrequest');

var url = 'https://developers.zomato.com/api/v1/search?entity_id=74&entity_type=city&start=0&count=20&cuisines=237&sort=cost&order=asc';


var options = {
    url: url,
    headers: {
        'Accept': 'application/json',
        'user_key': 'cdc8322bc8a39a3bac7c1daa69d759be'
        // 'connection': 'keep-alive',
        // 'user-agent': 'tito'
      }
};

curl.request(options, function (err, data) {
    console.log(data);
});
