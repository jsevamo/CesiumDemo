// We create a variable 'viewer' that will hold the Cesium Viewer instance that we will toggle between in this example.
let viewer;

// Tokens for accessing ArcGIS and Cesium services. These are necessary for authorization when fetching resources from these services.
const arcGIS_token = "AAPK387c93dd6bad43f2b5b97e86814195512IERohxWTrRNRFkFJBz4OXyYn4wZ5v-vutXZla7kRVfhty5IbaGx415ixOLOgo8v";
const cesium_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMGU3YjBmOC1iNGVlLTQzNDMtYTUxZC1jZWQ4ODJkZTczODciLCJpZCI6MjA0MTIwLCJpYXQiOjE3MTE3NjI1ODl9.-_y-jUwqwSrMzaY4feT468Oe_HZ4T4MK4L1-lNxK490";
Cesium.Ion.defaultAccessToken = cesium_token;
Cesium.ArcGisMapService.defaultAccessToken = arcGIS_token;

// Configures an ArcGIS imagery provider for satellite imagery, disabling feature picking to improve performance.
const arcGisImagery = Cesium.ArcGisMapServerImageryProvider.fromBasemapType(Cesium.ArcGisBaseMapType.SATELLITE, {
    enablePickFeatures:false
    });

// Sets up an authentication manager for ArcGIS requests using the provided token.
const authentication = arcgisRest.ApiKeyManager.fromKey(arcGIS_token);

// Asynchronously initializes a viewer instance configured for ArcGIS services
export async function InitializeArcGISViewer() {

  viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(arcGisImagery),

    terrain: Cesium.Terrain.fromWorldTerrain(),
    timeline: false,
    animation: false,
    geocoder: false,
  });

   // Loads a custom 3D Tileset from Cesium ION and adds it to the scene.
   // I used this guy: https://sketchfab.com/3d-models/new-york-city-manhattan-372bc495b3a941308f4a3198bc45e17b
  const newYork3D_Dataset = await Cesium.Cesium3DTileset.fromIonAssetId(
    2521354
  );
  viewer.scene.primitives.add(newYork3D_Dataset);
  
  // We look at our custom New York 
  SetViewToNewYork(viewer);
  
  // Attach an event listener for the dropdown menu on the corner to handle user selection of places.
  document
    .getElementById("places-select")
    .addEventListener("change", ShowSelectedPlaces);

  ShowSelectedPlaces();
}

// Initializes a simpler Cesium Viewer with a default 3D Tileset, using the Google photorealistic tiles.
// I used one of Cesium's Curated 3D Tilesets that can be found under "My Assets" in the Cesium ION dashboard.
export async function InitializeGoogleViewer() 
{
  viewer = new Cesium.Viewer("cesiumContainer");

  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
  viewer.scene.primitives.add(tileset);

  SetViewToNewYork(viewer);
}

// Fetches and displays place information based on user selection from a dropdown, using ArcGIS geocoding services.
function ShowSelectedPlaces() {

    viewer.dataSources.removeAll()

    const category = document.getElementById("places-select").value;

    // Converts the current camera position from Cartesian to Cartographic coordinates (longitude, latitude, and height). 
    // I found this is necessary because the geocoding request needs geographic coordinates (in degrees) to specify the location around which to search for places.
    const cartographic = Cesium.Cartographic.fromCartesian(viewer.camera.position);  
    const center = [Cesium.Math.toDegrees(cartographic.longitude),Cesium.Math.toDegrees(cartographic.latitude)]

    // Now we perform a geocoding request to the ArcGIS REST API using the arcgisRest.geocode function. 
    // This request uses the `authentication` object for API access, specifies which attributes to return, 
    // the `category` of places to search for, the `location` around which to search, 
    // and the maximum number of locations to return.
    arcgisRest
    .geocode({
        authentication,
        outFields: "Place_addr,PlaceName", // attributes to be returned

        params: {
        category,
        location: center.join(','),
        maxLocations: 50
        }
    })
    .then((response) => {
        // The response contains a GeoJSON object with the locations found,
        const json = response.geoJson;
        
        Cesium.GeoJsonDataSource.load(json, {
            markerColor: Cesium.Color.ROYALBLUE,
            markerSize:48,
            clampToGround:true
        }).then((data)=>{
            // Add the GeoJSON data source to the viewer.
            viewer.dataSources.add(data)
            // We can select the first entry found, but I will disable this for now.
            //viewer.selectedEntity = data.entities.values[0]
        })
    })
}

// Look at New York City!
function SetViewToNewYork(viewer) {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-74.0134, 40.7, 500),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0.0,
    },
  });
}

// Destroys the viewer instance and cleans up resources, since we are switching between viewers in this example.
export function RemoveViewer() 
{
  if (viewer) {
      viewer.destroy();
      viewer = null;
  }
}

export function AskToHire() {
    console.log("Please hire me :)");
}



