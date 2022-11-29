<template>
  <div class="wrapper">
    <TheHeader />
    <div class="container">
      <TheSidebar />
      <TheMain />
    </div>
  </div>
  <div class="wrapper-loadding" v-show="isLoading">
    <div class="icon-loading"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheHeader from "./components/layout/TheHeader/TheHeader.vue";
import TheSidebar from "./components/layout/TheSidebar/TheSidebar.vue";
import TheMain from "./components/layout/TheMain/TheMain.vue";
export default {
  name: "App",
  components: { TheHeader, TheSidebar, TheMain },
  computed: {
    ...mapGetters(["isLoading"]),
  },
};
</script>

<style>
@import url(./styles/base.css);
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
.wrapper-loadding {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.348);
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-loadding .icon-loading {
  background: url(./assets/loading.svg) no-repeat center;
  height: 40px;
  width: 40px;
  animation: loading linear 0.8s infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
