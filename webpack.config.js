const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/dist";

module.exports = (env, argv) => {
   const isDev = argv.mode !== "prod";

   return {
      entry: [SRC_DIR + "/index.tsx"],
      output: {
         path: DIST_DIR,
         publicPath: "/"
      },
      devtool: isDev && "source-map",
      devServer: {
         port: 3000,
         contentBase: DIST_DIR
      },
      resolve: {
         extensions: [".js", ".jsx"]
      },
      module: {
         rules: [
            // js
            {
               test: /\.(js|jsx|tsx)$/,
               exclude: /node_modules/,
               use: {
                  loader: "babel-loader"
               }
            },
            // CSS
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
                           localIdentName: "[local]_[hash:base64:5]"
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
            },
         ]
      },
      plugins: [
         new webpack.HotModuleReplacementPlugin(),
         new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
         }),
         new HtmlWebpackPlugin({
            filename: `${DIST_DIR}/index.html`,
            template: `${SRC_DIR}/index.html`
         })
      ]
   };
};
