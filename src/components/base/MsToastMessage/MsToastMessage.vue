<template>
  <div class="toast-wrapper" :class="classToast">
    <div class="toast-message">
      <div class="toast-icon"></div>
      <div class="toast-content">
        <span class="toast-title">{{ toast.title }}</span>
        <span class="toast-text"> {{ toast.content }}</span>
      </div>
      <!-- <a href="" class="toast-action">Hoàn tác</a> -->
      <button class="toast-icon toast-close" @click="closeToast">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</template>
 
 <script>
import { mapGetters, mapActions } from "vuex";
import { Alert } from "@/enums";
export default {
  created() {
    const me = this;
    switch (me.toast.type) {
      case Alert.SUCCESS:
        me.classToast = "toast-success";
        break;
      case Alert.INFO:
        me.classToast = "toast-info";
        break;
      case Alert.WARNING:
        me.classToast = "toast-warning";
        break;
      case Alert.ERROR:
        me.classToast = "toast-error";
        break;

      default:
        break;
    }
  },
  mounted() {
    const me = this;
    setTimeout(() => {
      me.closeToast();
    }, 3000);
  },
  computed: { ...mapGetters(["toast"]) },
  methods: {
    ...mapActions(["closeToast"]),
  },
  data() {
    return {
      classToast: "",
    };
  },
};
</script>
 }
 <style scoped>
@import url(./MsToastMessage.css);
</style>