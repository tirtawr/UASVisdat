var csv = require("fast-csv");
var csvWriter = require('csv-write-stream');
var fs = require('fs');
var writenFileName = 'tabWestern.csv';

var readTable = function(readFileName, cb) {
  console.log('reading data');
  var tabData = [];
  csv
  .fromPath(readFileName, {headers: true})
  .on("data", function(data){
    console.log(data.name);
    tabData.push(data);

    })
    .on("end", function(){
      console.log("done reading");
      cb(tabData);
    });
}

var formatTable = function(tabData) {

  var writer = csvWriter({ headers: ['map_name','map_desc','lat','long']})
  writer.pipe(fs.createWriteStream(writenFileName));

  for (var i = 0; i < tabData.length; i++) {
    var map_desc = '<a href="' + tabData[i].url +  '">Link</a> ' + tabData[i].name;

    var cost = '';
    if (tabData[i].avg_cost >1400000) {
      cost = 'cost-14;'
    } else if (tabData[i].avg_cost >1300000) {
      cost = 'cost-13;'
    } else if (tabData[i].avg_cost >1200000) {
      cost = 'cost-12;'
    } else if (tabData[i].avg_cost >1100000) {
      cost = 'cost-11;'
    } else if (tabData[i].avg_cost >1000000) {
      cost = 'cost-10;'
    } else if (tabData[i].avg_cost >900000) {
      cost = 'cost-9';
    } else if (tabData[i].avg_cost >800000) {
      cost = 'cost-8';
    } else if (tabData[i].avg_cost >700000) {
      cost = 'cost-7';
    } else if (tabData[i].avg_cost >600000) {
      cost = 'cost-6';
    } else if (tabData[i].avg_cost >500000) {
      cost = 'cost-5';
    } else if (tabData[i].avg_cost >400000) {
      cost = 'cost-4';
    } else if (tabData[i].avg_cost >300000) {
      cost = 'cost-3';
    } else if (tabData[i].avg_cost >200000) {
      cost = 'cost-2';
    } else {
      cost = 'cost-1';
    }

    var map_name = 'Western' + ' | ' + tabData[i].cuisine + ' | ' + cost + ' | ' + tabData[i].kota;

    writer.write([
      map_name,
      map_desc,
      tabData[i].lat,
      tabData[i].long
    ]);
  }

};

readTable('restaurantsWithArea2.csv',formatTable);
