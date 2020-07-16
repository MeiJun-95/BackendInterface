const status = { success: true, data: null, code: 200, message: "请求成功" };
// function logout() {
//   return { ...status, message: "退出登陆成功" };
// }

// module.exports = logout;

function logout(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { ...status, message: "退出登陆成功" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = logout;
// mock文件在node环境下运行，不能使用export default 输出模块
// 要使用commonjs
