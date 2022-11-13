<template>
  <div class="wrapper-input" :class="inputWidth">
    <label :title="isTooltip ? inputLabel : ''">
      <span v-show="inputRequired" style="color: red">(*)</span>
      <input
        :type="inputType"
        :value="modelValue"
        class="input"
        :class="{ 'input-error': errorMessage }"
      />
      <div v-if="icon" class="icon" :class="icon"></div>
      <span v-if="errorMessage" class="msg-input-error hide-text-ellipsis">{{
        errorMessage
      }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    inputWidth: String,
    inputLabel: String,
    isTooltip: Boolean,
    inputRequired: Boolean,
    modelValue: String,
    icon: String,
  },
};
</script>

<style>
@import url(../../../styles/_input.css);
@import url(../../../styles/_icon.css);
.wrapper-input .icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.wrapper-input .icon:hover {
}
</style>