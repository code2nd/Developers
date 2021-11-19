const path = require("path");
const glob = require("glob-all");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
// const { writeFile } = require("fs");

module.exports = {
  babel: {
    plugins: [["import", { libraryName: "antd", style: "css" }]],
  },
  webpack: {
    /* plugins: {
      add: [
        new PurgeCSSPlugin({
          paths: glob.sync(
            [
              path.resolve(__dirname, "./src/"),
              path.resolve(__dirname, "./*.html"),
            ],
            { nodir: true }
          ),
          safelist: function () {
            return {
              standard: ["html", "body"],
            };
          },
        }),
      ],
    }, */
    configure: (webpackConfig, { env, paths }) => {
      /* writeFile("webpack.json", JSON.stringify(webpackConfig, 4), (err) => {
        if (err) {
          console.log(err);
        }
      }); */

      /* const loadersConfig = webpackConfig.module.rules[1].oneOf;
      loadersConfig[2].options.babelrc = true;
      loadersConfig[3].options.babelrc = true; */

      // webpackConfig.devtool = false;
      // webpackConfig.mode = "production";

      return webpackConfig;
    },
  },
};
