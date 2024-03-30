# Welcome!

Welcome to my Cesium.js Test Project. I appreciate the time you are taking to take a look at the project!

# How to run the Project:
You can either go here: https://github.com/jsevamo/CesiumDemo
or use the "CesiumTestApp.zip" and run a local build.

## What you will find in this Demo

I made sure this demo properly showcases that curated datasets, outside customer data, and third party services can interact seamlessly between each other. 

1. The demo loads with a custom ArcGIS viewer instance configured for ArcGIS services.
2. New York will Render in the frame on top of ArcGIS. This is a custom 3D Dataset that uses Cesium ion for tiling and hosting. 
3. Using ArcGIS as a third party data source, you'll see that we are rendering markers on the screen. Initially they are showing coffee shops around that New York area!
   You can click on them to get more information provided by the API.
4. Use the dropdown menu to query for other type of labels, like hotels or parks.
5. I found the Photorealistic Google 3D Tileset under a curated dataset inside Cesium ion. This renders the whole globe just like an instance of Google maps would. 
   You can use the "Switch to Google 3D Tiles" button to load a viewer on the fly that will switch to the Google 3D tileset.
6. Use the "Switch to ArcGIS Data - 3D New York" button to go back to the ArcGIS viewer. You can toggle back and forth. While I'm aware I could have used just one 
   viewer to display the data, I figured I'd add this small switching feature just for fun :)

## Steps to Run the Project Locally

We are going to be running a local server to run the app. We will be using Node.js and NPM for this.

1. Open the terminal. Ensure you have Node.js and NPM installed on your machine. You can check if they're installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

If these commands show you the versions of Node.js and NPM, respectively, you're good to go. If not, you'll need to download and install Node.js (which includes NPM) from the official Node.js website: https://nodejs.org/en

2. Navigate to the folder I provided that's called "CesiumTestApp" in the terminal.
Remember that you can do:

```bash
cd C:\Users\user\Desktop\CesiumTestApp
```
Replace the path with your own.

3. Initialize a new Node.js project. This step creates a package.json file.

```bash
npm init -y
```

4. To view the app, you'll need to serve the project directory over HTTP. One easy way to do this is by installing the http-server package globally:
```bash
npm install -g http-server
```

5. After installation, run http-server in the project directory:
```bash
http-server
```

6. Now we have a local web server. Open your web browser and go to http://localhost:8080 to see the demo running!


## Thanks!
I had a lot of fun putting this together. I made sure to heavily comment the .js code so that my thought process is available. 


