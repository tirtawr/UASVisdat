var fs          = require('fs');
var csvWriter = require('csv-write-stream')


var categories = ['american', 'bakery', 'bakmi', 'bakso', 'beverages', 'chinese', 'deserts', 'european', 'fastfood', 'indonesia', 'padang', 'pizza', 'seafood', 'steak', 'streetfood', 'sunda', 'sushi', 'western'];

function parseJson(jsonString){
   var retObj = {}
   try {
       retObj = JSON.parse(jsonString);
   } catch (e) {
       return false;
   }
   return retObj;
}


function parseFile(writer, fileName, cuisine) {
  console.log(fileName);

  var jsonStr = fs.readFileSync(fileName).toString()
  var searchResult = parseJson(jsonStr);

  console.log(searchResult);

  if(searchResult){
    for (restaurant of searchResult.restaurants) {
      var rst = restaurant.restaurant;
      console.log(rst.id);
      writer.write([rst.id,
        rst.name,
        cuisine,
        rst.location.locality,
        rst.location.latitude,
        rst.location.longitude,
        rst.user_rating.aggregate_rating,
        rst.currency,
        rst.average_cost_for_two,
        rst.url]);
    }
  }

};

function parseAllFiles(){

  var writer = csvWriter({ headers: ['id', 'name', 'cuisine', 'locality', 'lat', 'long', 'avg_rating', 'currency', 'cost_for_two', 'url']})
  writer.pipe(fs.createWriteStream('restaurants.csv'))

  for (category of categories) {
    for (var i = 1; i <= 5; i++) {
      parseFile(writer, 'sh/result/'+category+'-'+i+'.json', category);
      parseFile(writer, 'sh/result/'+category+'-'+i+'a.json', category);
    }
  }

  writer.end();
}

parseAllFiles();
