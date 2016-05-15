// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoidGlydGF3ciIsImEiOiJjaW5yYzkydjExMGp3dWlramtiaHdmNWphIn0.V5IbaPvJ6hp_HjTqTw8kHg';
// Create a map in the div #map
var map = L.mapbox.map('map', 'tirtawr.04ok4cf2');

setFocusJakarta();




// mapboxgl.accessToken = 'pk.eyJ1IjoidGlydGF3ciIsImEiOiJjaW5yYzkydjExMGp3dWlramtiaHdmNWphIn0.V5IbaPvJ6hp_HjTqTw8kHg';
// // L.mapbox.map('map', 'tirtawr.04ok4cf2');
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/dark-v9',
//     center: [106.84110234745356, -6.217047026044142],
//     zoom: 10.5
// });
//
// map.addSource('restaurant-data', {
//     type: 'geojson',
//     url: 'https://a.tiles.mapbox.com/v4/tirtawr.04ok4cf2/features.json?access_token=pk.eyJ1IjoidGlydGF3ciIsImEiOiJjaW5yYzkydjExMGp3dWlramtiaHdmNWphIn0.V5IbaPvJ6hp_HjTqTw8kHg'
// });
//
function eraseAllMarkers() {
  var featureLayer = L.mapbox.featureLayer(geojson)
    // hide all markers
    .setFilter(function() { return false; })
    .addTo(map);
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
