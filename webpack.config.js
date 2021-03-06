/*
 * This configuration works for react-router-dom setup
 * use npm run dev to development (hotload- webpack)
 * npm run build to build
 * npm run serve to serve the built directory --- (server.js)
 *
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "app");
const CSS_DIR = "asset/css/";
const JS_DIR = "asset/js/";

var allowProdMap = false;
var isProd = false;
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "production-local"
) {
  isProd = true;
}

console.log(process.env.NODE_ENV);

// create Entry --------------------------------------
var buildDevEntryPoint = function(entryPoint) {
  return [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    entryPoint
  ];
};

const entryPoint = {
  //main: ['babel-core/polyfill', APP_DIR + "/index.jsx"]
  main: APP_DIR + "/index.jsx"
  //,loading: APP_DIR + "/loading.jsx"
};

var entry;
if (isProd) {
  entry = entryPoint;
} else {
  entry = {
    main: buildDevEntryPoint(entryPoint.main)
  };
}

// create Plugins --------------------------------------
var plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new ExtractTextPlugin(CSS_DIR + "[name].bundle.css", {
    allChunks: false
  })
];

// Optimize and Minimize for Production
if (isProd && !allowProdMap) {
  plugins = plugins.concat([
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(), //deprecated
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),

    //need to configure express
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]);
}

var jsxLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/
};
if (isProd) {
  jsxLoader.loader = "babel-loader";
  jsxLoader.query = {
    presets: ["es2015", "react", "modern-browsers"],
    plugins: ["transform-es2015-modules-commonjs"]
  };
} else {
  jsxLoader.loader = "babel-loader";
}

const cssLoader = {
  test: /\.css$/,
  loader: "style-loader!css-loader"
};
const scssLoader = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
};
// create Moduile --------------------------------------
module.exports = {
  entry: entry,
  devtool: isProd && !allowProdMap ? false : "source-map", // false -- bigger
  //devtool: 'source-map', // false -- bigger
  plugins: plugins,
  module: {
    loaders: [jsxLoader, cssLoader, scssLoader]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: JS_DIR + "[name].bundle.js"
  },
  devServer: {
    // this is for react-router-dom
    historyApiFallback: true,
    contentBase: "./public",
    hot: true
  }
};
