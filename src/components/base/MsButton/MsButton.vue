<template>
  <button
    class="btn"
    :class="{
      'btn-primary': isPrimary,
      'btn-sub': isSecondary,
      'btn-disable': isDisable,
    }"
  >
    {{ title }}
  </button>
</template>
 
 <script>
export default {
  props: {
    title: {
      type: String,
      default: "Button",
    },
    //  isIcon: {
    //    type: Boolean,
    //    default: false,
    //  },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
 
<style lang="css" scoped>
@import "./TheButton.css";
</style>
 