import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";
import VueHighlightJS from "vue-highlightjs";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
  Row,
  Col,
  Card,
  Avatar,
  Cascader
} from "ant-design-vue";
import Authorized from "./components/Authorized";  //权限校验组件。Vue.component注册
import Auth from "./directives/auth";//权限校验指令 Vue.use注册
import "highlight.js/styles/github.css";
// import queryString from "query-string";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Avatar);
Vue.use(Cascader);

Vue.component("Authorized", Authorized);//注册或获取全局组件
Vue.use(Auth);//注册插件
Vue.use(VueI18n);
Vue.use(VueHighlightJS);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1516240_wior5yv271i.js" // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
