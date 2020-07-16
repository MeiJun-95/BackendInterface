const path = require("path");
const webpack = require("webpack");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
  // lessUrl: "https://cdnjs.cloudflare.com/ajax/lib/less.js/2.7.2/less.min.js",
  // publicPath: ""
};

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") { //如果不是联调环境，使用mock数据
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_"); //获取文件名
            const mock = require(`./mock/${name}`); //获取mock文件
            const result = mock(req.method, req.params); //传入参数
            delete require.cache[require.resolve(`./mock/${name}`)]; //将缓存清理掉，否则数据更新并不显示
            return res.send(result);
          }
        }
      }
    }
  }
};
