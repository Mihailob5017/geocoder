mapboxgl.accessToken =
  "pk.eyJ1IjoibWl4YWlsbzE0NiIsImEiOiJjazR5NXZmMTAwN253M2psajdyMjgxcXJ4In0.lzhP6E7KTHPPmYLkYPXRCA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [20.457273, 44.787197]
});

async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  
  const stores = data.data.map(store => {  
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [store.location.coordinates[0],store.location.coordinates[1]]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });
  loadLayer(stores);
}

getStores();
function loadLayer(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}
