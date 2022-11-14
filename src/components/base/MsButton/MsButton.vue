<template>
  <button
    class="btn"
    :class="{
      'btn-primary': isPrimary,
      'btn-sub': isSecondary,
      'btn-disable': isDisable,
      'btn-danger': isDanger,
    }"
    :tabindex="tabIndex"
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
    isDanger: {
      type: Boolean,
      default: false,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    tabIndex: Number,
  },
};
</script>

 