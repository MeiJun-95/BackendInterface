function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 66, 48, 80, 90, 100];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
// json中使用export default
// mock文件在node环境下运行，不能使用export default 输出模块
// 要使用commonjs
