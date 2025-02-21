const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const MODES = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
}

const isProd = process.env.NODE_ENV === MODES.PRODUCTION;

const plugins = [
  new HTMLWebpackPlugin({
    template: "./src/index.twig",
  }),
  new CopyPlugin({
    patterns: [
      {from: path.resolve(__dirname, "src/assets/images"), to: "assets/images"}
    ]
  })
]

if (isProd) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: "[name].[ext]",
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.twig$/,
        loader: "twig-loader",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  },
  plugins,
  devServer: {
    static: './dist',
    hot: false,
    open: true,
    liveReload: true,
  },
};
