// 这个文件放权限校验函数

// 获取当前用户的权限：后台返回
export function getCurrentAuthority() {
  return ["admin"];
}

// 用来做校验：传入需要的权限，获得当前权限（用户），与需要的权限进行校验，
// 若当前用户在需要权限范围内，返回true，没有通过，返回false
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

// 判断登录 获得当前用户权限，并且用户权限不等于guest，认为已登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] != "guest";
}
