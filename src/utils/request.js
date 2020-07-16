// 对axios二次封装，处理一些成功或错误的公共信息
import axios from "axios";
import { notification } from "ant-design-vue";//错误的一些友好提示

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({
        // jsx
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误 <span style="color: red">{status}</span> : {options.url}
          </div>
        ),
        description: statusText
      });
      return Promise.reject(error); //这里再返回Promise.reject，目的：如果失败，不再进入.then方法中。
    });
}

export default request;
