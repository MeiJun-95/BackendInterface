<template>
  <div class="user-set-basic">
    <div class="user-set-basic__title">基本设置</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="用户名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'nickname',
            {
              initialValue: userInfo.username,
              rules: [{ required: true, message: '请输入中文名' }]
            }
          ]"
          placeholder="请输入中文名"
        />
      </a-form-item>
      <a-form-item
        label="邮箱"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'email',
            {
              initialValue: userInfo.email,
              rules: [{ required: true, message: '请输入邮箱' }]
            }
          ]"
          placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item
        label="电话"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'phone',
            {
              initialValue: userInfo.phone,
              rules: [{ required: true, message: '请输入电话号码' }]
            }
          ]"
          placeholder="请输入电话号码"
        >
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="居住地">
        <a-cascader
          v-decorator="[
            'residence',
            {
              initialValue: userInfo.residences,
              rules: [{ type: 'array', required: true, message: '请选择地址' }]
            }
          ]"
          :options="residences"
        />
      </a-form-item>
      <a-form-item
        label="职位"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'position',
            {
              initialValue: userInfo.position,
              rules: [{ required: true, message: '请输入职位' }]
            }
          ]"
          placeholder="请输入职位"
        />
      </a-form-item>
      <a-form-item
        label="部门"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'department',
            {
              initialValue: userInfo.department,
              rules: [{ required: true, message: '请输入部门' }]
            }
          ]"
          placeholder="请输入部门"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" @click="handleSubmit">更新基本信息</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const residences = [
  {
    value: "浙江",
    label: "浙江",
    children: [
      {
        value: "杭州",
        label: "杭州",
        children: [
          {
            value: "西湖区",
            label: "西湖区"
          },
          {
            value: "滨江区",
            label: "滨江区"
          }
        ]
      },
      {
        value: "宁波",
        label: "宁波",
        children: [
          {
            value: "江北区",
            label: "江北区"
          },
          {
            value: "北仑去",
            label: "北仑去"
          }
        ]
      }
    ]
  },
  {
    value: "河南",
    label: "河南",
    children: [
      {
        value: "宛城区",
        label: "宛城区",
        children: [
          {
            value: "宛城区",
            label: "宛城区"
          },
          {
            value: "卧龙区",
            label: "卧龙区"
          }
        ]
      }
    ]
  }
];
export default {
  name: "UserSetBasic",

  data() {
    this.form = this.$form.createForm(this);
    return {
      residences,
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
    userInfo() {
      return this.$store.state.user.user.info;
    }
  },
  mounted(){
    console.log(this.userInfo)
  },
  methods: {
    handleSubmit() {
      const { form, $store } = this;
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('values,',values)
          $store.dispatch({
            type: "user/submitUserInfo",
            payload: {
              ...this.userInfo,
              ...values
            }
          });
          this.$Message.success("信息更新成功~");
        }
      });
    }
  }
};
</script>
