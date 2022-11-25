<template>
  <div class="header d-flex">
    <div
      class="header__left d-flex"
      :style="isCollapseSidebar ? 'display:none' : ''"
    >
      <div class="header-left__button">
        <div class="icon icon--option"></div>
      </div>
      <div class="header-left__logo"></div>
    </div>
    <div class="header__right d-flex">
      <div
        class="toggle-sidebar d-flex"
        :class="{ 'collapse-sidebar': isCollapseSidebar }"
      >
        <div class="icon icon--menu" @click="toggleCollapseSidebar"></div>
      </div>
      <div class="header-right__title d-flex">
        <span
          class="hide-text-ellipsis"
          title="CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUY PHÚC"
          >CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUY PHÚC
        </span>
        <div class="icon icon--chervon-down"></div>
      </div>
      <div class="header-right__icons d-flex">
        <div class="header-right__icon d-flex">
          <div class="icon icon--message"></div>
        </div>
        <div class="header-right__icon d-flex">
          <div class="icon icon--questioon"></div>
        </div>
        <div class="header-right__icon d-flex">
          <div class="icon icon--bell"></div>
        </div>
      </div>
      <div class="header-right__user d-flex">
        <div class="header-user__avatar">
          <div class="icon icon--no-avatar"></div>
        </div>
        <p class="header-user__name">Vũ Đình Tiến</p>
        <div class="icon icon--chervon-down"></div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isCollapseSidebar"]),
  },
  methods: {
    ...mapActions(["toggleCollapseSidebar"]),
  },
};
</script>
 <style>
@import "./TheHeader.css";
</style>
 