import request from "@/utils/request";

export function userLoginApi(username, password) {
  const params = { username, password };
  return request({
    url: "/login/login",
    method: "post",
    data: params
  });
}

/**
 * 用户退出登陆
 * @param {*}
 * @returns {Promise}
 */
export function userLogOutApi(token) {
  return request({
    url: "/login/loginout",
    method: "get",
    data: token
  });
}

/**
 * 获取用户信息
 * @param {*}
 * @returns {Promise}
 */
export function getUserInfoApi() {
  return request({
    url: "/login/getUserInfo",
    method: "get"
  });
}
