<template>
  <div class="main">
    <div class="main__header d-flex">
      <span class="main-header__title">Nhân viên</span>
      <div class="main-header__actions d-flex">
        <MsButton
          :isPrimary="true"
          title="Thêm nhân viên mới"
          @click="openForm"
        />
      </div>
    </div>
    <div class="main__content">
      <div class="main-content__tools d-flex">
        <div class="main-content-tools__left">
          <div class="batch-excecution d-flex" style="flex-direction: column">
            <div class="d-flex">
              <div class="batch-excecution-title">Thực hiện hàng loạt:</div>
              <MsButton
                title="Xóa"
                :isDanger="true"
                :isDisable="!checkedEmployeeIDs.length"
                @click="deleteBatch"
              />
            </div>
            <div style="align-self: flex-start; padding-left: 12px">
              Đã chọn : {{ checkedEmployeeIDs.length }}
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
      <EmployeePaging />
    </div>
  </div>
  <EmployeeDetail v-if="isEmployeeDetail" />
  <EmployeeAlert v-if="isAlert" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GENDER, FORM_MODE, Alert, AlertAction } from "../../../i18n";
import MsButton from "@/components/base/MsButton/MsButton.vue";
import MsInput from "@/components/base/MsInput/MsInput.vue";
import EmployeeTable from "@/views/employee/EmployeeTable/EmployeeTable.vue";
import EmployeePaging from "../EmployeePaging/EmployeePaging.vue";
import EmployeeDetail from "../EmployeeDetail/EmployeeDetail.vue";
import EmployeeAlert from "../EmployeeAlert/EmployeeAlert.vue";
export default {
  components: {
    MsButton,
    MsInput,
    EmployeeTable,
    EmployeePaging,
    EmployeeDetail,
    EmployeeAlert,
  },
  created() {
    this.getEmployees();
  },
  computed: {
    ...mapGetters([
      "employeeList",
      "checkedEmployeeIDs",
      "isEmployeeDetail",
      "employee",
      "isAlert",
    ]),
  },
  methods: {
    ...mapActions([
      "getEmployees",
      "setEmployeeDetailTitle",
      "setFormMode",
      "toggleEmployeeDetail",
      "initEmployee",
      "setEmployee",
      "setAlert",
    ]),

    /**
     * mở form ở chế độ store
     * Author: VDTIEN (14/11/2022)
     */
    openForm() {
      const me = this;
      me.setEmployeeDetailTitle = "Thêm khách hàng";
      me.setFormMode(FORM_MODE.STORE);
      me.toggleEmployeeDetail();
      me.initEmployee({
        Gender: GENDER.MALE,
      });
    },

    deleteBatch() {
      const me = this;
      me.setAlert({
        type: Alert.WARNING,
        message: "Bạn chắc chắn muốn xóa những nhân viên đã chọn !",
        action: AlertAction.CONFIRM_DELETE_BATCH,
      });
    },
  },
};
</script>

<style>
@import url(./EmployeeList.css);
</style>