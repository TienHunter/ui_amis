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
            @keyup="searchEmployee"
            v-model="filter.employeeFilter"
          />
          <div class="main-content-tools d-flex">
            <div class="icon-wrapper" title="Refresh" @click="getEmployees">
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
  <EmployeeDetail
    v-if="isEmployeeDetail"
    :isStore="isStore"
    @confirmStoreDone="() => (this.isStore = false)"
  />
  <EmployeeAlert v-if="isAlert" @confirmStore="() => (this.isStore = true)" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Alert, AlertAction } from "../../../i18n";
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
    const me = this;
    me.getEmployees();
    me.setDepartments();
  },
  computed: {
    ...mapGetters([
      "employeeList",
      "checkedEmployeeIDs",
      "isEmployeeDetail",
      "employee",
      "isAlert",
      "filter",
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
      "setNewEmployeeCode",
      "setDepartments",
      "setFilter",
      "initValueForm",
    ]),

    /**
     * mở form ở chế độ store
     * Author: VDTIEN (14/11/2022)
     */
    openForm() {
      const me = this;
      me.toggleEmployeeDetail();
      me.initValueForm();
    },

    deleteBatch() {
      const me = this;
      me.setAlert({
        type: Alert.WARNING,
        message: "Bạn chắc chắn muốn xóa những nhân viên đã chọn !",
        action: AlertAction.CONFIRM_DELETE_BATCH,
      });
    },

    /**
     * Tìm kiếm nhân viên
     * Author: VDTIEN (14/11/2022)
     */
    searchEmployee() {
      const me = this;
      if (me.timer) {
        clearTimeout(me.timer);
        me.timer = null;
      }
      me.timer = setTimeout(() => {
        me.setFilter({
          pageSize: me.filter.pageSize,
          pageNumber: 1,
          employeeFilter: me.filter.employeeFilter,
        });
        me.getEmployees();
      }, 1000);
    },
  },
  data() {
    return {
      isStore: false,
    };
  },
};
</script>

<style>
@import url(./EmployeeList.css);
</style>