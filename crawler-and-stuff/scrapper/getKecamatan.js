// var request = require('request');
var request = require('sync-request');
var csv = require("fast-csv");
var API_KEY = 'AIzaSyAlgj0oc4s_XssbrHOVRcBLeKM-VlXJqes';
var csvWriter = require('csv-write-stream');
var fs = require('fs');

var getKotaAndKecamatan = function(lat, long, cb){
  var retObj = {'kecamatan': false, 'kota': false};
  console.log('START  '+'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyAlgj0oc4s_XssbrHOVRcBLeKM-VlXJqes');
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyAlgj0oc4s_XssbrHOVRcBLeKM-VlXJqes';
  var res = request('GET', url);
  console.log('END  '+'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyAlgj0oc4s_XssbrHOVRcBLeKM-VlXJqes');
  // console.log(body);
  // if (!error && response.statusCode == 200) {
    var bodyObj = parseJson(res.getBody());
    var addrComponents = bodyObj.results[0].address_components;
    var kotaFound = false;
    var kecamatanFound = false;
    for (var i = 0; i < addrComponents.length; i++) {
      for (var j = 0; j < addrComponents[i].types.length; j++) {
        if(addrComponents[i].types[j] == 'administrative_area_level_3'){
            retObj.kecamatan = addrComponents[i].short_name;
            kecamatanFound = true;
        }
        if(addrComponents[i].types[j] == 'administrative_area_level_2'){
            retObj.kota = addrComponents[i].short_name;
            kotaFound = true;
        }
        if(kecamatanFound && kotaFound){
          break;
        }
      }
      if(kecamatanFound && kotaFound){
        break;
      }
    }

    cb(retObj.kecamatan, retObj.kota);
  // }


}

var parseJson = function(jsonString){
   var retObj = {}
   try {
       retObj = JSON.parse(jsonString);
   } catch (e) {
       return false;
   }
   return retObj;
}

var getAllKecamatansAndWriteToFile = function(fileName) {
  var writer = csvWriter({ headers: ['id', 'name', 'cuisine', 'type', 'kota', 'kecamatan', 'locality', 'lat', 'long', 'avg_rating', 'currency', 'avg_cost', 'url']})
  writer.pipe(fs.createWriteStream(fileName));

  csv
   .fromPath("restaurants2.csv", {headers: true})
   .on("data", function(data){

      //  console.log(data);
       getKotaAndKecamatan(data.lat, data.long, function(kota, kecamatan) {

         writer.write([data.id,
           data.name,
           data.cuisine,
           data.type,
           kota,
           kecamatan,
           data.locality,
           data.lat,
           data.long,
           data.avg_rating,
           data.currency,
           data.cost_for_two/2,
           data.url]);

         console.log(data.name);
       });

   })
   .on("end", function(){
      console.log("done");
   });
}

getAllKecamatansAndWriteToFile('restaurantsWithArea.csv');


// request.get('https://google.com', function (error, response, body) {
//   console.log(body);
// });
