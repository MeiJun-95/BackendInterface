<template>
  <a-card hoverable style="width: 300px">
    <img
      slot="cover"
      alt="example"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593516590386&di=1ae5dc90e9366baa2f6214c00e04f91c&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft015e76ec26f1a4c7ef.jpg"
    />
    <a-card-meta title="" class="card-body">
      <a-avatar
        class="avatar_img"
        slot="avatar"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1496288268,388599681&fm=26&gp=0.jpg"
      />
      <template slot="description">
        <p class="avatar_name">{{ userInfo.username }}</p>
        <div class="description">
          <p class="description_item">
            <span class="description_item-title">
              职位:
            </span>
            <span class="description_item-detail">{{ userInfo.position }}</span>
          </p>
          <p class="description_item">
            <span class="description_item-title">
              部门:
            </span>
            <span class="description_item-detail">{{
              userInfo.department
            }}</span>
          </p>
          <p class="description_item">
            <span class="description_item-title">
              地区:
            </span>
            <span class="description_item-detail"
              >{{ userInfo.residences[0] }}-{{ userInfo.residences[1] }}-{{
                userInfo.residences[2]
              }}</span
            >
          </p>
          <p>
            <span class="description_item-title">
              邮箱:
            </span>
            <span class="description_item-detail">{{ userInfo.email }}</span>
          </p>
          <p>
            <span class="description_item-title">
              手机号:
            </span>
            <span class="description_item-detail">{{ userInfo.phone }}</span>
          </p>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  name: "UserPane",
  props: {},
  computed: {
    userInfo() {
      return this.$store.state.user.user.info;
    }
  },
  mounted() {
    console.log(this.userInfo);
  }
};
</script>

<style lang="less" scoped>
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar_img {
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 50%;
}

.avatar_name {
  font-size: 20px;
  font-weight: bolder;
  line-height: 1.5;
  color: #515a6e;
  margin: 10px;
  text-align: center;
}

.description {
  margin-top: 16px;
}
.description_item {
  line-height: 20px;
  margin-bottom: 15px;
}

.description_item-title {
  margin-right: 10px;
  color: #003;
}
</style>
