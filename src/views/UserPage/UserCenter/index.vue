<template>
  <a-row class="user-center">
    <a-col class="user-center__user-pane" :xs="24" :sm="24" :md="24" :lg="7">
      <UserPane />
    </a-col>
    <a-col
      class="user-center__project-pane"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="17"
    >
      col-12
    </a-col>
  </a-row>
</template>

<script>
import UserPane from "./UserPane";

export default {
  name: "UserCenter",
  components: { UserPane }
};
</script>

<style></style>
