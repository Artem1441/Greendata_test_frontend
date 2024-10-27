const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/pages/_app.tsx", // app root path
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      // {
      //   test: /\.module\.scss$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: { modules: true },
      //     },
      //     "sass-loader",
      //   ],
      // },
      // {
      //   test: /\.scss$/,
      //   exclude: /\.module\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      // Правило для CSS Modules
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      // // Правило для обычных CSS и SCSS файлов (не CSS Modules)
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/, // Исключаем файлы, использующие CSS Modules
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "build"),
    port: 3000,
    open: true,
    hot: true,
  },
};
