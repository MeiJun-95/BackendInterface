import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";  //查找数组或对象中符合条件的值
import { notification } from "ant-design-vue"; //组件中的方法：友好提示
import NProgress from "nprogress"; //路由加载时的友好提示
import "nprogress/nprogress.css"; //样式
import NotFound from "../views/404";
import Forbidden from "../views/403";
import { check, isLogin } from "../utils/auth";
// import Home from "../views/Home.vue";
// import { format } from "url";
// import RenderRouterView from "../components/RenderRouterView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user", // 嵌套路由：登录页、注册页
    meta: { authority: ["user", "admin"] },
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "form" */ "../layouts/BasicLayout"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "setting", title: "仪表盘" },
        component: { render: h => h("router-view") }, // render函数是渲染一个视图，然后提供给el挂载，如果没有render，页面上什么都没有。    h是createElement的别名，vue生态系统的通用管理
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        meta: { icon: "setting", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "/user-page",
        name: "userPage",
        meta: { icon: "setting", title: "个人页" },
        component: { render: h => h("router-view") },
        // component: () => {
        //   import(
        //     /* webpackChunkName: "form" */ "../views/UserPage/UserCenter"
        //   );
        // },
        children: [
          {
            path: "/user-page/user-center",
            name: "userCenter",
            meta: { title: "个人中心" },
            component: () =>
              import(
                /* webpackChunkName: "user-center" */ "../views/UserPage/UserCenter"
              )
          },
          {
            path: "/user-page/user-set",
            name: "userSet",
            meta: { title: "个人设置" },
            component: () =>
              import(
                /* webpackChunkName: "user-set" */ "../views/UserPage/UserSet"
              )
          }
        ]
      },
      // {
      //   name: "Documentation",
      //   path: "/external-link",
      //   meta: {
      //     title: "文档",
      //     icon: "md-open",
      //     href:
      //       "https://liuvigongzuoshi.github.io/vue-iview-admin-template/"
      //   }
      // }
      {
        path: "/403",
        name: "403",
        hideInMenu: true,
        component: Forbidden
      },
      {
        path: "*",
        name: "404",
        hideInMenu: true,
        component: NotFound
      }
    ]
  }
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {  // 全局前置守卫，在进入每一个路由之前都会调用这个回调，访问网页的情况进行相应的跳转，例如：初次登入，不能访问除登录页面外的页面，已登录会自动跳转自首页等等。
  if (to.path !== from.path) {  //只有路由改变时，才有进度条；如果路由不变，没有进度条：更新主题时不要进度条。
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority); //matched:当前路由匹配到的所有路有记录（路由路径）
  // 也可以使用：const record=to.matched.some(record => record.meta.authority，
  // console.log("to.matched:",to.matched)
  if (record && !check(record.meta.authority)) {//如果找到这条路由记录，校验这条路由的权限（是否是user或admin）如果效验失败:
    if (!isLogin() && to.path !== "/user/login") {  //检查是否登录：如果没登录 跳转登录页
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {   //如果登录(说明没有权限），跳转403
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next(); // 确保一定要调用 next()
});

router.afterEach(() => {  //全局后置守卫：每一次路由跳转后都会执行其中的回调。场景：多用于路由跳转后的相应页面操作。对跳转后的页面进行例如滚动条回调0 0 位置、更新页面title、懒加载结束等等
  NProgress.done();
});

export default router;
