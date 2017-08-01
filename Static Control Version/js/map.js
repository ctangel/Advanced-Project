$(function () {
  // Leaflet map will not work if js runs before the dom has loaded
  // Basically, the jquery doc ready function runs after the dom has loaded so
  // the code below will work fine.
  // Alternatively, you can run the code below without the doc ready function
  // if you place this file's html script tag at the end of the html document.

  var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  });

  var refineries = JSON.parse(data);
  refineries = refineries.refineries;

  // Creates marker for each refinery. Returns an array of the markers created.
  var generateMarkers = function(refineries) {
    const markers = [];
    for (var i = 0; i < refineries.length; i++) {
      const lat = refineries[i].Coordinates.lat;
      const lng = refineries[i].Coordinates.lng;
      const tempMarker = L.marker([lat, lng])
      markers.push(tempMarker);
    }
    return markers;
  }

  // Binds popup for each marker
  var bindPopups = function(markers, refineries) {
    for (var i = 0; i < markers.length; i++) {
      const address = refineries[i].Address;
      const company = refineries[i].Company;
      const category = refineries[i].Category;
      markers[i].bindPopup("<h3>" + company + "</h3> <p>" + category + "</p> <p>" + address + "</p>");
    }
  }

  // Generated markers with binded popup for each refinery
  var generateRefineryMarkers = function(refineries) {
    const markers = generateMarkers(refineries);
    bindPopups(markers, refineries); // side effect
    return markers;
  }

  var markers = generateRefineryMarkers(refineries);

  // Adds Layers Control
  const refineryLayer = L.layerGroup(markers);
  const schoolLayer = L.geoJSON(dpsLocations)

  var baseMaps = {
    "Streets": streets
  }

  var overlayMaps = {
    "Refineries": refineryLayer,
    "Schools": schoolLayer
  }

  var mymap = L.map("map", {
    center: [42.3314, -83.0458],
    zoom: 10,
    layers: [streets, refineryLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
});
