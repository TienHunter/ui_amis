<template>
  <div class="combobox">
    <input
      class="input"
      type="text"
      :value="selectedItem"
      readonly
      :tabindex="tabIndex"
    />
    <span v-if="errorMess" class="msg-input-error hide-text-ellipsis">{{
      errorMess
    }}</span>
    <div class="combobox-button d-flex-auto" @click="toggleList">
      <div class="icon icon--chervon-down"></div>
    </div>
    <div class="combobox-data" :class="className" v-if="isShowList">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="data-item"
        :class="{ checked: selectedItem == item }"
        @click="emitItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedItem", "className", "dataList", "errorMess", "tabIndex"],
  emits: ["selectAction"],
  methods: {
    /**
     * ẩn hiện combobox
     * Author:VDTIEN (14/11/2022)
     */
    toggleList() {
      const me = this;
      me.isShowList = !me.isShowList;
    },

    /**
     * trả item được chọn
     * @param {*} item
     * Author:VDTIEN (14/11/2022)
     */
    emitItem(item) {
      const me = this;
      me.toggleList();
      me.$emit("selectAction", item);
    },
  },
  data() {
    return {
      isShowList: false,
    };
  },
};
</script>

<style>
</style>