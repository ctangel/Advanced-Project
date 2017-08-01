$(function () {
  // Leaflet map will not work if js runs before the dom has loaded
  // Basically, the jquery doc ready function runs after the dom has loaded so
  // the code below will work fine.
  // Alternatively, you can run the code below without the doc ready function
  // if you place this file's html script tag at the end of the html document.
  var mymap = L.map("map").setView([42.3314, -83.0458], 10);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  var refineries = JSON.parse(data);
  refineries = refineries.refineries;

  // Creates marker for each refinery. Returns an array of the markers created.
  var populateMap = function(refineries) {
    const markers = [];
    for (var i = 0; i < refineries.length; i++) {
      const lat = refineries[i].Coordinates.lat;
      const lng = refineries[i].Coordinates.lng;
      const tempMarker = L.marker([lat, lng]).addTo(mymap);
      markers.push(tempMarker);
    }
    return markers;
  }

  // Binds popup for each refinery
  var bindPopups = function(markers, refineries) {
    for (var i = 0; i < markers.length; i++) {
      const address = refineries[i].Address;
      const company = refineries[i].Company;
      const category = refineries[i].Category;
      markers[i].bindPopup("<h3>" + company + "</h3> <p>" + category + "</p> <p>" + address + "</p>");
    }
  }

  const markers = populateMap(refineries);
  bindPopups(markers, refineries);
});

//  You can condense the functions above into one neat package
//  var markers = [];
//  for (var i = 0; i < refineries.length; i++) {
//    var lat = refineries[i].Coordinates.lat;
//    var lng = refineries[i].Coordinates.lng;
//    var tempMarker = L.marker([lat, lng]).addTo(mymap);
//
//    var address = refineries[i].Address;
//    var company = refineries[i].Company;
//    var category = refineries[i].Category;
//    tempMarker.bindPopup("<h3>" + company + "</h3> <p>" + category + "</p> <p>" + address + "</p>");
//    markers.push(tempMarker);
//  }
