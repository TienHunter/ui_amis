<template>
  <div class="wrapper-input" :class="inputWidth">
    <label
      :title="isTooltip ? inputLabel : ''"
      :class="inputLabel ? 'label-input' : ''"
    >
      {{ inputLabel }}
      <span v-show="inputRequired" style="color: red">(*)</span>
      <input
        :type="inputType"
        class="input"
        :class="{ 'input-error': errorMess, 'input-icon': icon }"
        :placeholder="placeholder"
        :tabindex="tabIndex"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-on:keyup="$emit('keyup')"
      />
      <div v-if="icon" class="icon" :class="icon"></div>
      <span v-if="errorMess" class="msg-input-error hide-text-ellipsis">{{
        errorMess
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
    placeholder: String,
    icon: String,
    errorMess: String,
    tabIndex: Number,
  },
  emits: ["update:modelValue", "keyup"],
  methods: {},
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
</style>