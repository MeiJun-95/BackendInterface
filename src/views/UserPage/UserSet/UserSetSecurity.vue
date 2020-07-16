<template>
  <div class="user-set-security">
    <div class="user-set-security__title">安全设置</div>
    <a-form class="user-set-security__form" :form="form">
      <a-form-item
        label="旧密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
      >
        <a-input
          v-decorator="[
            'passwordOld',
            {
              rules: [{ required: true, message: '密码不能为空' }]
            }
          ]"
          @blur="validateOldPassword"
          placeholder="请输入旧密码"
          type="password"
        />
      </a-form-item>

      <a-form-item
        label="新密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '密码不能为空' },
                { validator: this.validatePass, trigger: 'blur' },
                {
                  message: '密码不能小于六位多余十二位',
                  min: 6,
                  max: 12
                }
              ]
            }
          ]"
          placeholder="请输入新密码"
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                { required: true, message: '密码不能为空' },
                { validator: this.validatePassCheck, trigger: 'blur' },
                {
                  message: '密码不能小于六位多余十二位',
                  min: 6,
                  max: 12
                }
              ]
            }
          ]"
          @blur="handleConfirmBlur"
          placeholder="请再次输入新密码"
          type="password"
        />
      </a-form-item>
    </a-form>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" @click="handleSubmit" :loading="passwordSubmit"
        >更改密码</a-button
      >
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: "UserSetSecurity",

  data() {
    this.form = this.$form.createForm(this);
    return {
      confirmDirty: false,
      passwordSubmit: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  computed: {
    truepasswordOld() {
      return this.$store.state.user.user.info.password;
    },
    userInfo() {
      return this.$store.state.user.user.info;
    }
  },
  mounted() {
    console.log("pw", this.truepasswordOld);
  },
  methods: {
    // validateOldPassword(rule, value, callback){
    //                console.log(rule,value,callback)
    //               }
    // handleOldPassword(){
    //   this.form.getFieldValue((err, values) => {
    //     if(!err){
    //       console.log(values)
    //     }

    //   })
    // },

    validateOldPassword() {
      const value = this.form.getFieldValue("passwordOld");
      console.log(value);
      if (value !== this.truepasswordOld) {
        alert("密码输入不正确！");
        console.log("this.truepasswordOld:", this.truepasswordOld);
        this.form.setFieldsValue({ passwordOld: "" });
        this.form.validateFields(["passwordOld"], { force: true });
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },

    validatePassCheck(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback(new Error("两次输入不一致！"));
      }
    },

    validatePass(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },

    handleSubmit() {
      const { form, $store, userInfo } = this;
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.passwordSubmit = true;
          let password = values.password;
          $store.dispatch({
            type: "user/submitUserInfo",
            payload: {
              ...userInfo,
              password
            }
          });
          this.passwordSubmit = false;
          this.$Message.success("信息更新成功~");
          alert("信息更新成功")
        }
      });
    }
    // validatePass(rule, value, callback) {
    //   if (this.formData.passwdCheck !== "")
    //     this.$refs.form.validateField("passwdCheck");
    //   callback();
    // },

    // validatePassCheck(rule, value, callback) {
    //   if (value !== this.formData.passwd) {
    //     callback(new Error("两次输入不一致！"));
    //   } else {
    //     callback();
    //   }
    // },

    // onOk() {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       let params = {
    //         passwordold: this.formData.passwdOld,
    //         password: this.formData.passwdCheck
    //       };
    //       this.passwordSubmit = true;
    //       this.$emit("on-submit", params);
    //       this.$refs.form.resetFields();
    //       this.passwordSubmit = false;
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less">
.user-set-security {
  &__title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__form {
    width: 350px;
    .ivu-form-item-label {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;

      &::before {
        content: "";
      }
    }
  }
}
</style>
