const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODES = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
}

const PATHS = {
  DIST: path.resolve(__dirname, 'dist'),
}

const isProd = process.env.NODE_ENV === MODES.PRODUCTION;

const plugins = [
  new HTMLWebpackPlugin({
    template: "./src/index.twig",
  }),
]

if (isProd) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: PATHS.DIST,
    publicPath: PATHS.DIST,
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: "/asseis/images/[name].[ext]",
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.twig$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
          }
        ]
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
