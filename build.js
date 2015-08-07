var stealTools = require("steal-tools");

var buildPromise = stealTools.build({
  config: __dirname + "/package.json!npm"
}, {
  bundleAssets: {
    glob: "node_modules/place-my-order-assets/images/**/*"
  }
});

var cordovaOptions = {
  buildDir: "./build/cordova",
  id: "com.hello.world",
  name: "HelloWorld",
  platforms: ["ios", "android"],
  index: __dirname + "/cordova.html",
  glob: [
    "node_modules/steal/steal.production.js",
    "images/**/*"
  ]
};

var stealCordova = require("steal-cordova")(cordovaOptions);

// Check if the cordova option is passed.
var buildCordova = process.argv.indexOf("cordova") > 0;

if(buildCordova) {

  buildPromise.then(stealCordova.build).then(stealCordova.ios.emulate);

}

var nwOptions = {
  buildDir: "./build",
  platforms: ["osx"],
  glob: [
    "package.json",
    "nw.html",
    "node_modules/steal/steal.production.js",
    "images/**/*",
    "node_modules/place-my-order-assets/images/**/*"
  ]
};

var stealNw = require("steal-nw");

// Check if the cordova option is passed.
var buildNW = process.argv.indexOf("nw") > 0;

if(buildNW) {
  buildPromise = buildPromise.then(function(buildResult){
    stealNw(nwOptions, buildResult);
  });
}
