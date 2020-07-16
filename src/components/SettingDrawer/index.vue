<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'setting' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <div>
          <h2>整体风格定制</h2>
          <a-radio-group
            :value="$route.query.navTheme || 'dark'"
            @change="e => handleSettingChange('navTheme', e.target.value)"
          >
          <!-- 将改变的主题信息值存入路由中，获取信息也从路由中获取 -->
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <br />
          <br />
          <h2>导航模式</h2>
          <a-radio-group
            :value="$route.query.navLayout || 'left'"
            @change="e => handleSettingChange('navLayout', e.target.value)"
          >
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    // 吧这个值同步到路由上
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$router.query, [type]: value } });  //保留原来的信息，并且+上添加的主题信息
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
