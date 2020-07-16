<template>
  <div>
    <a-layout>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Footer from "./Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style></style>
