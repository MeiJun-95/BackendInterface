<template>
  <a-layout class="login-wrapper" ref="bg">
    <div class="login-content">
      <div class="login-header">
        <img src="~@/assets/images/logo.png" alt="logo" class="logo" />
        <span class="title">{{ siteName }}</span>
      </div>
      <a-card class="login-main" title="账户密码登录">
        <login-form :loading="loading" @on-success-valid="submit"></login-form>
        <p class="mark">
          <span>用户名：admin</span>
          <span>密码：123456</span>
        </p>
      </a-card>
    </div>
  </a-layout>
</template>

<script>
import LoginForm from "../../components/LoginForm";
import CanvasNest from "canvas-nest.js";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    LoginForm
  },

  data() {
    return {
      loading: false,
      siteName: "Vue ZMJ",
      canvasNest: null,
      canvasNestConfig: {
        color: "44, 140, 240",
        pointColor: "246, 228, 188",
        count: 220,
        zIndex: 0,
        opacity: 0.8
      }
    };
  },

  mounted() {
    this.canvasNest = new CanvasNest(this.$refs.bg.$el, this.canvasNestConfig);
  },

  beforeDestroy() {
    this.canvasNest.destroy();
  },

  methods: {
    //     emitEmpty() {
    //       this.$refs.userNameInput.focus();
    //       this.userName = "";
    //     }
    //   }
    ...mapActions("user", ["userLogin"]),

    submit({ username, password }) {
      // if (username == "admin" && password == "123456") {
      //   this.$router.push({ path: "/" });
      // }
      console.log(username, password)
      this.loading = true;
      this.userLogin({ username, password })
        .then(response => {
          console.log('response',response)
          this.loading = false;
          // this.$Message.success("登陆成功~");
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
.login-wrapper {
  height: 100vh;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}

.login-content {
  z-index: 1;
  flex: 1;
  padding-top: 150px;
}

.login-header {
  padding: 15px 0;
  font-size: 30px;
  font-weight: 500;
  text-align: center;

  .logo {
    height: 45px;
    margin: 0 15px;
    vertical-align: top;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
  }
}

.login-main {
  width: 368px;
  margin: 50px auto;
  font-size: 16px;
  text-align: center;
  padding: 20px 0;

  p {
    color: #666;
  }
}

.mark {
  color: #ccc;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

</style>
