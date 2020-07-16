// const t_user = {
//   super_admin: {
//     userName: "super_admin",
//     passWord: "111",
//     user_id: "1",
//     role: ["super_admin", "admin"],
//     token: "super_admin"
//     // avatar: Random.dataImage("200x200", "super_admin")
//   },
//   admin: {
//     userName: "admin",
//     passWord: "222",
//     user_id: "2",
//     role: ["admin"],
//     token: "admin"
//   },
function login(method,params) {
  let res = null;
  if (params.username == "admin" && params.password == "123") {
    res = {data:123};
  } else {
    res = {data:2343};
  }
  return res;
}

//   user: {
//     userName: "user",
//     passWord: "333",
//     user_id: "3",
//     role: ["user"],
//     token: "user"
//     // avatar: Random.dataImage("200x200", "user")
//   }
// };
// const status = { success: true, data: null, code: 200, message: "请求成功" };
// function login(username, password) {
//   for (let item in t_user) {
//     if (item.userName === username && item.passWord === password) {
//       return { ...status, data: item.token };
//     } else {
//       return new Error( '账户或密码错误' )
//       // return { ...status, success: false, message: "账户或密码错误" };
//     }
//   }
// }
// }
// function login(username,password){
//   let user = null
//   let hasUser = t_user.some(item=>{
//     if (item.username === username && item.password === password) {
//       user.token = item.username.token;
//       console.log("哪一个对象：",item)
//       return true;
//     }
//   })
//   if (hasUser) {
//     return { ...status, data: user.token };
//   } else {
//     return { ...status, success: false, message: "账户或密码错误" };
//   }
// }

// function getUserInfo(method) {
//   let res = null;
//   switch (method) {
//     case "POST":
//       res = { ...status, data: t_user }
//       break;
//     default:
//       res = null;
//   }
//   return res;
// }

// let user = null;
// let hasUser = t_user.some(item => {
//   if (item.username === username && item.password === password) {
//     user.token = item.username.token;
//     return true;
//   }
// });
// if (hasUser) {
//   resolve({ ...status, data: user.token });
// } else {
//   reject({ ...status, success: false, message: "账户或密码错误" });
// }
// })
module.exports = login;
