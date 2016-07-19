var csv = require("fast-csv");
var csvWriter = require('csv-write-stream');
var fs = require('fs');





var newTabKecamatan = function(filename, cb) {
  console.log('reading data');
  var tabKecamatan = [];
  csv
  .fromPath(filename, {headers: true})
  .on("data", function(data){
    console.log(data.name);
    if(!hasKecamatanExisted(tabKecamatan, data.kecamatan)){
      tabKecamatan.push({'name':data.kecamatan, 'kota':data.kota,'restaurants_asian':[], 'restaurants_western':[]})
    }
    insertRestaurant(tabKecamatan, data);

    })
    .on("end", function(){
      console.log("done reading");
      cb(tabKecamatan);
    });
}

var newTabKota = function(filename, cb) {
  console.log('reading data');
  var tabKota = [];
  csv
  .fromPath(filename, {headers: true})
  .on("data", function(data){
    console.log(data.name);
    if(!hasKecamatanExisted(tabKota, data.kota)){
      tabKota.push({'name':data.kota, 'restaurants_asian':[], 'restaurants_western':[]})
    }
    insertRestaurantByKota(tabKota, data);

    })
    .on("end", function(){
      console.log("done reading");
      cb(tabKota);
    });
}

var hasKecamatanExisted = function(tabKecamatan, kecamatan){
  for (var i = 0; i < tabKecamatan.length; i++) {
    if(tabKecamatan[i].name == kecamatan){
      return true;
      break;
    }
  }
  return false;
}

var insertRestaurant = function(tabKecamatan, restaurant){
  for (var i = 0; i < tabKecamatan.length; i++) {
    if(tabKecamatan[i].name == restaurant.kecamatan){
      if(restaurant.type == 'eastern'){
        tabKecamatan[i].restaurants_western.push(restaurant);
      }else{
        tabKecamatan[i].restaurants_asian.push(restaurant);
      }

      break;
    }
  }
}

var insertRestaurantByKota = function(tabKota, restaurant){
  for (var i = 0; i < tabKota.length; i++) {
    if(tabKota[i].name == restaurant.kota){
      if(restaurant.type == 'eastern'){
        tabKota[i].restaurants_western.push(restaurant);
      }else{
        tabKota[i].restaurants_asian.push(restaurant);
      }

      break;
    }
  }
}

var max100 = function(number){
  if(number>100){
    return 100;
  }else{
    return number;
  }
}

var writeTabelKecamatan = function(fileName, tabKecamatan){
  console.log('Writing Tabel Kecamatan')
  var writer = csvWriter({ headers: ['nama_kecamatan','nama_kota','jml_western','jml_asian','avg_cost_western','avg_cost_asian','presentase_western','presentase_asian','opacity_western','opacity_asian']});
  writer.pipe(fs.createWriteStream(fileName));

  for (var i = 0; i < tabKecamatan.length; i++) {
    console.log('START Kecamatan' + tabKecamatan[i].name);

    var totalAsianCost = 0;
    var totalWesternCost = 0;
    var averageCostAsian = 0;
    var averageCostWestern = 0;
    var totalWesternRestaurant = tabKecamatan[i].restaurants_western.length;
    var totalAsianRestaurant = tabKecamatan[i].restaurants_asian.length;
    var totalRestaurants = totalAsianRestaurant + totalWesternRestaurant;

    for (var j = 0; j < totalAsianRestaurant; j++) {
      averageCostAsian += tabKecamatan[i].restaurants_asian[j].avg_cost / (j+1);
    }
    for (var j = 0; j < totalWesternRestaurant; j++) {
      averageCostWestern += tabKecamatan[i].restaurants_western[j].avg_cost / (j+1);
    }

    if(i==0){
        console.log('Data Kecamatan = ', JSON.stringify(tabKecamatan[i]));
        console.log('Total asia = ' + totalAsianRestaurant);
        console.log('Total western = ' + totalWesternRestaurant);
    }

    writer.write([
      tabKecamatan[i].name,
      tabKecamatan[i].kota,
      totalWesternRestaurant,
      totalAsianRestaurant,
      Math.round(averageCostWestern),
      Math.round(averageCostAsian),
      Math.round(totalWesternRestaurant / totalRestaurants * 100),
      Math.round(totalAsianRestaurant / totalRestaurants * 100),
      max100(totalWesternRestaurant * 2),
      max100(totalAsianRestaurant * 2)
    ]);
    console.log('END Kecamatan' + tabKecamatan[i].name);
  }


}



newTabKecamatan("restaurantsWithArea.csv", function(tabKecamatan) {
    writeTabelKecamatan('tabelKecamatan.csv', tabKecamatan)
});

// newTabKota("restaurantsWithArea.csv", function(tabKota) {
//     writeTabelKecamatan('tabelKota.csv', tabKota)
// });
