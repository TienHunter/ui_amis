<template>
  <div class="wrapper">
    <TheHeader />
    <div class="container">
      <TheSidebar />
      <TheMain />
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader/TheHeader.vue";
import TheSidebar from "./components/layout/TheSidebar/TheSidebar.vue";
import TheMain from "./components/layout/TheMain/TheMain.vue";
export default {
  name: "App",
  components: { TheHeader, TheSidebar, TheMain },
};
</script>

<style>
@import url(./styles/_base.css);
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 800px;
  height: 100vh;
}
.container {
  display: flex;
  height: calc(100% - var(--height-header));
}
</style>
