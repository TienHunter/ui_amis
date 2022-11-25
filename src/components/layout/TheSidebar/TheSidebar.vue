<template>
  <div class="sidebar" :class="{ 'sidebar--collapse': isCollapseSidebar }">
    <ul class="sidebar-content">
      <li class="sidebar-item d-flex selected" :title="Sidebar.general">
        <div class="icon icon--general icon--general--selected"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.general
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.cash">
        <div class="icon icon--cash"></div>
        <span class="sidebar-text hide-text-ellipsis">{{ Sidebar.cash }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.deposits">
        <div class="icon icon--deposits"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.deposits
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.purchase">
        <div class="icon icon--purchase"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.purchase
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.sell">
        <div class="icon icon--sell"></div>
        <span class="sidebar-text hide-text-ellipsis">{{ Sidebar.sell }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.invoiceManagement">
        <div class="icon icon--billManagement"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.invoiceManagement
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.warehouse">
        <div class="icon icon--warehouse"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.warehouse
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.tools">
        <div class="icon icon--tools"></div>
        <span class="sidebar-text hide-text-ellipsis">{{ Sidebar.tools }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.fixedAssets">
        <div class="icon icon--fixedAssets"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.fixedAssets
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.tax">
        <div class="icon icon--tax"></div>
        <span class="sidebar-text hide-text-ellipsis">{{ Sidebar.tax }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.price">
        <div class="icon icon--price"></div>
        <span class="sidebar-text hide-text-ellipsis">{{ Sidebar.price }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.synthetic">
        <div class="icon icon--synthetic"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.synthetic
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.budget">
        <div class="icon icon--budget"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.budget
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.report">
        <div class="icon icon--report"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.report
        }}</span>
      </li>
      <li class="sidebar-item d-flex" :title="Sidebar.financialAnalysis">
        <div class="icon icon--financialAnalysis"></div>
        <span class="sidebar-text hide-text-ellipsis">{{
          Sidebar.financialAnalysis
        }}</span>
      </li>
    </ul>
  </div>
</template>
 
 <script>
import { mapGetters } from "vuex";
import { Sidebar } from "@/i18n";
export default {
  computed: {
    ...mapGetters(["isCollapseSidebar"]),
  },
  data() {
    return {
      Sidebar,
    };
  },
};
</script>
 
 <style>
@import "./TheSidebar.css";
</style>