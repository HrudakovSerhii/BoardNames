const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/dist";

module.exports = (env, argv) => {
   const isDev = argv.mode !== "prod";

   return {
      entry: {
         app: `${SRC_DIR}/index.jsx`
      },
      output: {
         path: DIST_DIR,
         chunkFilename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
         filename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
         publicPath: "/"
      },
      devtool: "inline-source-map",
      devServer: {
         port: 3000,
         contentBase: DIST_DIR
      },
      resolve: {
         modules: ["src", "node_modules"],
         extensions: [".js", ".jsx"]
      },
      externals: "/node_modules",
      module: {
         rules: [
            // js
            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,
               use: {
                  loader: "babel-loader"
               }
            },
            // css
            {
               test: /\.(scss|sass|css)$/,
               include: SRC_DIR,
               exclude: /node_modules/,
               use: [
                  isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                  {
                     loader: "css-loader",
                     options: {
                        modules: {
                           localIdentName: "[local]_[name]_[fullhash:base64:5]"
                        },
                        sourceMap: true
                     }
                  },
                  {
                     loader: "sass-loader",
                     options: {
                        sourceMap: true
                     }
                  }
               ]
            },
            // HTML
            {
               test: /\.(html)$/,
               exclude: /node_modules/,
               use: {
                  loader: "html-loader",
                  options: { minimize: true }
               }
            },
            // Files
            {
               test: /\.(woff2?|ttf|eot)$/,
               use: [
                  {
                     loader: "file-loader",
                     options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "/fonts/"
                     }
                  }
               ]
            }
         ]
      },
      plugins: [
         new webpack.HotModuleReplacementPlugin(),
         new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css"
         }),
         new HtmlWebpackPlugin({
            filename: `${DIST_DIR}/index.html`,
            template: `${SRC_DIR}/index.html`
         })
      ]
   };
};
