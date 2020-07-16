<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <!-- selectedKeys：当前选中菜单项的key数组；  openKeys：当前展开的 SubMenu 菜单项 key 数组。对应的值和router关联 -->
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <!-- 用路由的路径做key -->
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <!-- 父菜单（↑）；  子菜单（↓）  如果没有孩子，直接在父组件中渲染出来，否则递归渲染 -->
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from "./SubMenu";
import { check } from "../utils/auth"; //路由管理用户权限
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
    // route.path 变化时，同步更改下面两个属性
  },
  data() {
    // 生成菜单数据menuData时，存一个路由和key的关系map，selectedKeys就可以根据路由直接从map中找
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes); //可以获取router.js里定义的所有路由
    return {
      // collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  updated() {
    console.log("selectedKeys:", this.selectedKeys, "openKeys:", this.openKeys);
    console.log("selectedKeysMap:", this.selectedKeysMap, "openKeysMap:", this.openKeysMap);
    console.log("this.$route:", this.$route);
    console.log("this.$router:", this.$router);
  },

  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        } //如果存在meta并且存在authority权限属性：检查是否符合用户权限，如果不符合用户权限（某些路由某些用户无法查看），则退出，不进行menuData的收集
        if (item.name && !item.hideInMenu) {
          //有name并且不隐藏   1级菜单
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            // 孩子：   有孩子，并且孩子不隐藏，递归调用
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]); //该菜单在满足有子菜单和需要显示子菜单的连个条件下，将该菜单下的所有子菜单进行递归，拿到所有的子菜单作为该菜单的子菜单
          } else {
            //item.hideChildrenInMenu=true  这里主要处理分布表单，分布表单不显示在nav中，但是如果当前路由在分布表单的1/2/3步时，key应该是他的父级上
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          //根路由，没有name（不显示），但是如果有孩子，孩子显示
          !item.hideInMenu && //需要显示的菜单
          !item.hideChildrenInMenu && //菜单下的子菜单不需要隐藏
          item.children //该菜单有子菜单
        ) {
          menuData.push(
            //递归得到所有的子菜单并push到数组中
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
