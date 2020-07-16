<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout class="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <!-- 是否在左边；主题颜色；自定义trigger，null为隐藏；是否可收起；当前收起状态；宽度 -->
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'setting' : 'setting'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <!-- sider的收缩按钮在header中设置，按钮的icon根据收缩状态显示不同，点击更换收缩状态 -->
          <!-- v-auth="['admin']"：权限指令 -->
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 24px 24px 0">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
    <!-- 权限校验组件：主题抽屉：只有管理员才能设置 -->
  </div>
</template>

<script>
// 引入模板
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
// import Logo from "../assets/logo.svg";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
    // Logo
  }
};
</script>

<style scoped lang="less">
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;

  &:hover {
    background: #eeeeee;
  }
}
.logo {
  //   position: relative;
  height: 64px;
  //   padding-left: 24px;
  overflow: hidden;   //为了在sider不显示时，文字不超出宽度。
  line-height: 64px;
  // background: #002140;
  text-align: center;
}

.nav-theme-dark .logo {
  color: #ffffff;
}
</style>
