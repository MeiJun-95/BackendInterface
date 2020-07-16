// import Mock from "mockjs";
// import { getParams } from "@/utils";

// const { Random } = Mock;

const t_user = {
  super_admin: {
    username: "super_admin",
    password: "111",
    user_id: "1",
    role: ["super_admin", "admin"],
    token: "super_admin"
    // avatar: Random.dataImage("200x200", "super_admin")
  },
  admin: {
    username: "admin",
    password: "222",
    user_id: "2",
    role: ["admin"],
    token: "admin"
    // avatar: Random.dataImage("200x200", "admin")
  },
  user: {
    username: "user",
    password: "333",
    user_id: "3",
    role: ["user"],
    token: "user"
    // avatar: Random.dataImage("200x200", "user")
  }
};

const status = { success: true, data: null, code: 200, message: "请求成功" };

// Mock.login("/login/login").replay((username, password) => {
//   return new Promise((resolve, reject) => {
//     let user = null;
//     let hasUser = t_user.some(item => {
//       if (item.username === username && item.password === password) {
//         user.token = item.username.token;
//         return true;
//       }
//     });
//     if (hasUser) {
//       resolve({ ...status, data: user.token });
//     } else {
//       reject({ ...status, success: false, message: "账户或密码错误" });
//     }
//   });
// });

function login(username, password) {
  for (let item in t_user) {
    if (item[username] === username && item[password] === password) {
      return { ...status, data: { token: item[username].token } };
    } else {
      return { ...status, success: false, message: "账户或密码错误" };
    }
  }
}

function getUserInfo(token) {
  for (let item in t_user) {
    if (item[token] === token) {
      return { ...status, data: item };
    } else {
      return { ...status, code: 401, success: false, message: "Token expired" };
    }
  }
}

const logout = () => {
  return { ...status, message: "退出登陆成功" };
};

export default {
  login,
  getUserInfo,
  logout
};
// module.exports = {
//   login,
//   getUserInfo,
//   logout
// }
