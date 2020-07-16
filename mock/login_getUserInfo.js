const t_user = {
  // super_admin: {
  //   username: "super_admin",
  //   password: "111",
  //   user_id: "1",
  //   role: ["super_admin", "admin"],
  //   token: "super_admin"
  //   // avatar: Random.dataImage("200x200", "super_admin")
  // },
  // admin: {
    username: "admin",
    password: "222",
    user_id: "2",
    role: ["admin"],
    token: "admin"
    // avatar: Random.dataImage("200x200", "admin")
  // },
  // user: {
  //   username: "user",
  //   password: "333",
  //   user_id: "3",
  //   role: ["user"],
  //   token: "user"
  //   // avatar: Random.dataImage("200x200", "user")
  // }
};
const status = { success: true, data: null, code: 200, message: "请求成功" };
// function getUserInfo(token) {
//   for (let item in t_user) {
//     if (item[token] === token) {
//       return { ...status, data: item };
//     } else {
//       return { ...status, code: 401, success: false, message: "Token expired" };
//     }
//   }
// }

function getUserInfo(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { ...status, data: t_user };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = getUserInfo;
