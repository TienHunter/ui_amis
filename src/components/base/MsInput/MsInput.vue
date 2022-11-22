<template>
  <div :class="[{ 'input-wrapper': inputLabel }, inputWidth]">
    <label :title="tooltip" class="label-input" style="position: relative">
      {{ inputLabel }}
      <span v-show="inputRequired" style="color: red">(*)</span>
    </label>
    <div class="input-container">
      <input
        :type="inputType"
        class="input"
        :class="{ 'input-error': errorMess, 'input-icon': icon }"
        :placeholder="placeholder"
        :tabindex="tabIndex"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value.trim())"
        v-on:keyup="$emit('keyup')"
      />
      <div v-if="icon" class="icon" :class="icon"></div>

      <span v-if="errorMess" class="msg-input-error" :title="errorMess">{{
        errorMess
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputWidth: String,
    inputLabel: String,
    tooltip: String,
    inputRequired: Boolean,
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: String,
    icon: String,
    errorMess: String,
    tabIndex: Number,
    inputType: String,
  },
  emits: ["update:modelValue", "keyup"],
  methods: {},
};
</script>

<style>
@import url(../../../styles/_input.css);
@import url(../../../styles/_icon.css);
.input-wrapper label > .icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>