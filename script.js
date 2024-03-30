import * as Cesium from "./CesiumTestApp.js";

// If we click on Google Tiles on the dropdown menu, we remove the current viewer and initialize a new one with Google photorealistic tiles.
document
  .getElementById("switch-to-google")
  .addEventListener("click", async () => {
    Cesium.RemoveViewer();
    await Cesium.InitializeGoogleViewer();
  });
// If we click on ArcGIS on the dropdown menu, we remove the current viewer and initialize a new one with ArcGIS.
document
  .getElementById("switch-to-arcgis")
  .addEventListener("click", async () => {
    Cesium.RemoveViewer();
    await Cesium.InitializeArcGISViewer();
  });

Cesium.InitializeArcGISViewer();

Cesium.AskToHire();
