// import { userLoginApi, userLogOutApi, getUserInfoApi } from "../../api/login";
import { userLogOutApi, getUserInfoApi } from "../../api/login";
import request from "../../utils/request";
import router from "../../router";

const state = {
  user: {
    token: "123456",
    role: [],
    info: {
      username: "zmj",
      email: "zmjqq.com",
      password: "123",
      phone: "617889457",
      address: "浙江杭州",
      residences: ["浙江", "杭州", "西湖区"],
      position: "前端开发工程师",
      department: "xx平台-前端开发部门-520小组"
    }
  }
  //   token: "",
  //   user: null,
  //   userId: "",
  //   //   rights: [],
  //   roles: []
};

const mutations = {
  SET_USER_INFO: (state, info) => {
    //SET_USER
    state.user = info;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  setUserId: (state, userId) => {
    state.userId = userId;
  },

  saveUserInfo(state, { payload }) {
    state.user.info = {
      ...state.user.info,
      ...payload
    };
  }
};

const actions = {
  async submitUserInfo({ commit }, { payload }) {
    await request({
      url: "/api/userinfo",
      method: "POST",
      data: payload
    });
    commit("saveUserInfo", payload);
    router.push("user-center");
  },

   userLogin:async ({ commit }, { username, password })=> {
    try{
      const response = await request({
        url: "/api/login/login",
        method: "get",
        params: { username, password }
      });
      if(response){
        console.log('resss',response,username, password)
          commit("SET_TOKEN", response.data);
      }
      return response
    } catch(err){
      console.log(err)
      return err
    }
    
  },
  // userLogin({ commit }, { username, password }) {
  //   request({
  //     url: "/api/login/login",
  //     method: "get",
  //     params: { username, password }
  //   })
  //     .then(response => {
  //       console.log("rep", response);
  //       if (response.data) {
  //         commit("SET_TOKEN", response.data);
  //       }
  //       return response;
  //     })
  //     .catch(err => {
  //       return err;
  //     });
    // return new Promise((resolve, reject) => {
    //   userLoginApi(username, password)
    //     .then(response => {
    //       commit("SET_TOKEN", response.data.token);
    //       //   setToken(token); //如果有缓存直接获取缓存
    //       resolve();
    //     })
    //     .catch(err => {
    //       reject(err);
    //     });
    // });

  //   userLogin({ commit }, payload) {
  //     return new Promise((resolve, reject) => {
  //       request({
  //         url: "/api/login/login",
  //         method: "POST",
  //         data: payload
  //       })
  //         .then(response => {
  //           console.log("mock返回response：", response);
  //           const { token } = response.data; //解构出token
  //           if (token) {
  //             commit("setToken", token);
  //             console.log("userLogin.response:", response);
  //             resolve(response);
  //           }
  //         })
  //         .catch(err => {
  //           console.log(err);
  //           reject(err);
  //         });
  //     });
  //   },
  getUserInfo({ commit, state }) {
    const token = state.token;
    return new Promise((resolve, reject) => {
      getUserInfoApi(token)
        .then(res => {
          const { code, data } = res;
          if (code !== 200) reject();
          commit("SET_USER_INFO", data);
          commit("SET_ROLE", data.role);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  //   async getUserInfo({ commit, state }) {
  //     await request({
  //       url: "/api/login/getUserInfo",
  //       method: "GET",
  //       data: state.token
  //     })
  //       .then(response => {
  //         const { code, data } = response;
  //         if (code === 401) return false;
  //         commit("setRoles", data.role);
  //         commit("setUser", data);
  //         return data;
  //       })
  //       .catch(err => {
  //         console.log(err) // eslint-disable-line
  //         return err;
  //       });
  //   },
  userLogOut({ commit }) {
    return new Promise((resolve, reject) => {
      userLogOutApi()
        .then(res => {
          if (res.code === 200) {
            commit("SET_TOKEN", "");
            commit("SET_ROLE", []);
            commit("SET_USER_INFO", null);
            // removeToken();
            resolve();
          } else {
            reject(res.code);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  //   async userLogOut({ commit }) {
  //     await request({
  //       url: "/api/login/logout",
  //       method: "GET"
  //     })
  //       .then(response => {
  //         if (response.code === 200) {
  //           commit("setToken", "");
  //           commit("setRoles", []);
  //           commit("setUser", null);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err) // eslint-disable-line
  //         return err;
  //       });
  //   }

  //   resetToken({ commit }) {
  //     return new Promise(resolve => {
  //       commit("SET_TOKEN", "");
  //       commit("SET_RIGHTS", []);
  //       commit("SET_ROLES", []);
  //       commit("SET_USER", null);
  //       removeToken();
  //       resolve();
  //     });
  //   }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
