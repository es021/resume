var HOST = window.location.host;
var isProd = HOST.indexOf("localhost") <= -1 || HOST.indexOf("5500") >= 0;
var ASSET_ROOT = isProd ? "/public/asset" : "/asset";

function MainLoadAsset(version) {
  console.log("Start Load Asset", version);
  console.log(window.location.host);
  console.log("isProd", isProd);

  // init dom
  var body = document.getElementsByTagName("body")[0];
  var head = document.getElementsByTagName("head")[0];
  var app_load = document.getElementById("app-loading");
  var app_load_img = document.getElementById("app-loading-img");

  // define asset to load -------------------------------------------------------------------------
  var jsToLoad = [ASSET_ROOT + "/js/main.bundle.js"];
  var cssToLoad = [
    ASSET_ROOT + "/lib/fontawesome/css/all.min.css",
    ASSET_ROOT + "/css/main.bundle.css"
  ];

  // load css -------------------------------------------------------------------------
  cssToLoad.map(function(d, i) {
    var callback = null;
    if (i === 0) {
      // once loading css finish show the loader gif
      callback = function() {
        app_load_img.removeAttribute("hidden");
      };
    }
    loadAsset("css", d, callback);
  });

  // load Javascript -------------------------------------------------------------------------

  var jsLoaded = 0;
  jsToLoad.map(function(d, i) {
    loadAsset("js", d, function() {
      jsLoaded++;
      if (jsLoaded >= jsToLoad.length) {
        // hide the loading
        app_load.style["opacity"] = "0";
        app_load_img.style["opacity"] = "0";
        setTimeout(function() {
          app_load.style["display"] = "none";
        }, 500);
        // showAppError();
      }
    });
  });

  //show loading until the main bundle finish load
  function loadAsset(type, url, callback) {
    var asset = null;
    if (type === "js") {
      asset = document.createElement("script");
      asset.type = "text/javascript";
    } else if (type === "css") {
      asset = document.createElement("link");
      asset.rel = "stylesheet";
    }

    if (asset.readyState) {
      //IE
      asset.onreadystatechange = function() {
        if (asset.readyState === "loaded" || asset.readyState === "complete") {
          asset.onreadystatechange = null;
          if (callback !== null) {
            callback();
          }
        }
      };
    } else {
      //Others
      asset.onload = function() {
        if (callback !== null) {
          callback();
        }
      };
    }

    if (type === "js") {
      asset.src = url + "?v=" + version;
      body.appendChild(asset);
    } else if (type === "css") {
      asset.href = url + "?v=" + version;
      head.appendChild(asset);
    }
  }
}

const VERSION = "v1";
MainLoadAsset(VERSION);
