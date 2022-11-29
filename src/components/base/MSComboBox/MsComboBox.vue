<template>
  <div class="combobox">
    <div class="input-container">
      <input
        class="input"
        type="text"
        :value="selectedItemText"
        readonly
        :tabindex="tabIndex"
        :class="{ 'input-error': errorMess }"
      />
      <button
        :tabindex="tabIndex"
        type="button"
        class="combobox-button d-flex-auto"
        @click.stop="toggleList"
      >
        <div
          class="icon icon--arrow-up-black"
          :style="
            isShowList
              ? 'transform: rotate(180deg);transition: 0.2s linear;'
              : 'transform: rotate(0);transition: 0.2s linear;'
          "
        ></div>
      </button>
      <span v-if="errorMess" class="msg-input-error" :title="errorMess">
        {{ errorMess }}
      </span>
    </div>

    <div class="combobox-data" :class="className" v-if="isShowList">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="data-item"
        :class="{ checked: selectedItem == item.value }"
        @click="emitItem(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["className", "dataList", "errorMess", "tabIndex", "selectedItem"],
  computed: {
    selectedItemText() {
      const me = this;
      for (let i = 0; i < me.dataList.length; i++) {
        if (me.selectedItem == me.dataList[i].value) return me.dataList[i].text;
      }
      return "";
    },
  },
  emits: ["selectAction"],
  created() {
    const me = this;
    window.addEventListener("click", function () {
      me.isShowList = false;
    });
  },
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
@import url(./MsComboBox.css);
</style>