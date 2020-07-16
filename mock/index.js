import Mock from "mockjs";
import login from "./login";

// configure the Ajax request latency
Mock.setup({
  timeout: 1000
});

// login
Mock.mock(/\/login\/login/, "post", login.login);
Mock.mock(/\/login\/logout/, "post", login.logout);
Mock.mock(/\/login\/info\.*/, "get", login.getUserInfo);

// dashboard

export default Mock;
