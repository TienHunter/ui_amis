<template>
  <div class="main">
    <div class="main__header d-flex">
      <span class="main-header__title">Nhân viên</span>
      <div class="main-header__actions d-flex">
        <MsButton :isPrimary="true" title="Thêm nhân viên mới" />
      </div>
    </div>
    <div class="main__content">
      <div class="main-content__tools d-flex">
        <div class="main-content-tools__left">
          <div class="batch-excecution d-flex" style="flex-direction: column">
            <div class="d-flex">
              <div class="batch-excecution-title">Thực hiện hàng loạt:</div>
              <MsButton title="Xoa" />
            </div>
            <div style="align-self: flex-start; padding-left: 12px">
              Đã chọn : 0
            </div>
          </div>
        </div>
        <div class="d-flex">
          <MsInput
            :placeholder="'Tìm theo mã, tên nhân viên'"
            :icon="'icon--search'"
          />
          <div class="main-content-tools d-flex">
            <div class="icon-wrapper">
              <div class="icon icon--refresh"></div>
            </div>
            <div class="icon-wrapper">
              <div class="icon icon--excel"></div>
            </div>
          </div>
        </div>
      </div>
      <EmployeeTable />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MsButton from "@/components/base/MsButton/MsButton.vue";
import MsInput from "@/components/base/MsInput/MsInput.vue";
import EmployeeTable from "@/views/employee/EmployeeTable/EmployeeTable.vue";
export default {
  components: {
    MsButton,
    MsInput,
    EmployeeTable,
  },
  created() {
    this.getEmployees();
  },
  computed: {
    ...mapGetters(["employeeList"]),
  },
  methods: {
    ...mapActions(["getEmployees"]),
  },
};
</script>

<style>
@import url(./EmployeeList.css);
</style>