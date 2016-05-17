// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoidGlydGF3ciIsImEiOiJjaW5yYzkydjExMGp3dWlramtiaHdmNWphIn0.V5IbaPvJ6hp_HjTqTw8kHg';
// Create a map in the div #map
var map = L.mapbox.map('map', 'tirtawr.04ok4cf2');

setFocusJakarta();

var disabledAttrs = []
var jumAsian = 0;
var jumWestern = 0;

$("input:checkbox").prop('checked', true);

$(".checkbox").change(function() {
  var temp = [];
  $('input[type=checkbox]:checked').each(function() {
    switch (this.value) {
      case 'jakpus':
        temp.push('Kota Jakarta Pusat');
        break;
      case 'jakbar':
        temp.push('Kota Jakarta Barat');
        break;
      case 'jaktim':
        temp.push('Kota Jakarta Timur');
        break;
      case 'jaksel':
        temp.push('Kota Jakarta Selatan');
        break;
      case 'jakut':
        temp.push('Kota Jakarta Utara');
        break;
      default:
        temp.push(this.value);
      }
  });
  disabledAttrs = temp;
  console.log(disabledAttrs);


});

var mapFilter = function(feature) {
  var found = 0;
  for (var i = 0; i < disabledAttrs.length; i++) {
    if(feature.properties.map_name.indexOf(disabledAttrs[i]) > -1 ){
      console.log('FOUND(',disabledAttrs[i],') - ', feature.properties.map_name);
      found++;
    }
  }

  if (found > 2) {
    if(feature.properties.map_name.split(' | ')[0] == "Asian"){
      jumAsian++;
    }else{
      jumWestern++;
    }
    return true;
  }else{
    return false;
  }
}

function applyFilter(filter) {
  jumAsian = 0;
  jumWestern = 0;
  var featureLayer = map.featureLayer
    // hide all markers
    .setFilter(filter)
    .addTo(map);

  console.log("Asian = ", jumAsian);
  console.log("Western = ", jumWestern);
  $("#western-number").text(jumWestern);
  $("#asian-number").text(jumAsian);
}

function eraseAllMarkers() {
  var featureLayer = map.featureLayer
    // hide all markers
    .setFilter(function(feature) {
      console.log(feature);
      return false;
    })
    .addTo(map);
  // map.featureLayer._geojson = [];
}

function setFocusJakarta() {
    map.setView({lat: -6.2299817054481945, lng: 106.81320190429686}, 11);
    // map.setZoom(10.5);
    //zoom: 10.5}
}

function setFocusJakut() {
    map.setView({lat: -6.134239715767222, lng: 106.82212829589844}, 13);
    // map.setZoom(11.773478782067437);
    //zoom: 11.773478782067437}
}

function setFocusJaksel() {
    map.setView({lat: -6.284074198612733, lng: 106.82830810546875}, 13);
    // map.setZoom(11.151744867053921);
    //zoom: 11.151744867053921}
}

function setFocusJakbar() {
    map.setView({lat: -6.217524283001418, lng: 106.76170349121094}, 13);
    // map.setZoom(11.60407740066572);
    //zoom: 11.60407740066572}
}

function setFocusJaktim() {
    map.setView({lat: -6.1835635111822365, lng: 106.87585830688477}, 14);
    // map.setZoom(11.023910716780312);
    //zoom: 11.023910716780312}
}

function setFocusJakpus() {
    map.setView({lat: -6.1815155556003045, lng: 106.82526111602783}, 14.5);
    // map.setZoom(11.543122856962093);
    //zoom: 11.543122856962093}
}
