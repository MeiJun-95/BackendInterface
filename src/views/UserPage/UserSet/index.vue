<template>
  <a-card class="user-set" :bordered="false">
    <a-menu
      style="width: 256px"
      :default-selected-keys="['1']"
      mode="vertical"
      class="menu"
      @click="handle"
    >
      <a-menu-item class="menu-item" title="basic" key="1"
        >基本设置</a-menu-item
      >
      <a-menu-item class="menu-item" title="security" key="2"
        >安全设置</a-menu-item
      >
    </a-menu>
    <UserSetBasic class="tab" v-if="currentTab === '1'" />
    <UserSetSecurity class="tab" v-else />
  </a-card>
</template>

<script>
import UserSetBasic from "./UserSetBasic";
import UserSetSecurity from "./UserSetSecurity";

export default {
  name: "UserSet",

  components: {
    UserSetBasic,
    UserSetSecurity
  },

  data() {
    return {
      currentTab: "1"
    };
  },
  methods: {
    handle(item) {
      this.currentTab = item.key;
      // console.log("item", item) //item {key: "2", keyPath: ["2"],item,domEvent}
    }
  }
};
</script>

<style>
.user-set {
  display: flex;
  padding: 0px;
}
.menu {
  padding: 0;
  float: left;
}
.menu-item {
  margin: 0;
}
.tab {
  margin-left: 300px;
  padding: 8px 40px;
}
</style>
