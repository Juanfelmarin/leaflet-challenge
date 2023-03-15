function createMap(Earthquake_map) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create streetmap layer.
  let quakemaps = {
    "Quake Map": streetmap
  };

  // Create earthquake layer.
  let overlayMaps = {
    "Earthquake": Earthquake_map
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [23.6345, 102.55],
    zoom: 4,
    layers: [streetmap, Earthquake_map]
  });

  // Create a layer control, and pass it quakeMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(quakemaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

//Create the createMarkers function.
function quakeMarkers(response) {

  //Pass to layer
  let quakelayer = L.layerGroup();

  //create fuction that pulls magnitude and location in popup
  function onEachFeature(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }

  //pass above information into map 
  L.geoJSON(response, {
      onEachFeature,
  }).addTo(quakelayer)

  createMap(quakelayer)

}

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(function(response) {
  quakeMarkers(response)
  console.log(response)
})


