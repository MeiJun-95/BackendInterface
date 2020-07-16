<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @keydown.enter.native="handleSubmit"
  >
    <!-- @submit="handleSubmit" -->
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'passWord',
          {
            rules: [{ required: true, message: 'Please input your Password!' }]
          }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        @click="handleSubmit"
        type="primary"
        html-type="submit"
        class="login-form-button"
        :loading="loading"
      >
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        //   this.$refs.loginForm.validateFields((err, values) => {
        if (!err) {
          this.$emit("on-success-valid", {
            username: values.userName,
            password: values.passWord
          });
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
