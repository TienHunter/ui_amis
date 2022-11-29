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
          <div class="batch-action d-flex" style="flex-direction: column">
            <button class="btn-batch" @click.stop="toggleBatchAction">
              <span class="batch-action-title">Thực hiện hàng loạt</span>
              <div
                class="icon icon--arrow-up-black"
                :style="
                  checkedEmployeeIDs.length > 0 ? 'opacity:1' : 'opacity:0.5'
                "
              ></div>
            </button>
            <ul
              class="list-batch-action"
              v-show="checkedEmployeeIDs.length > 0 && isShowBatchAction"
            >
              <li class="batch-delete batch-action-item" @click="deleteBatch">
                Xóa
              </li>
            </ul>
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
            <div class="icon-wrapper" title="Lấy lại dữ liệu" @click="loadData">
              <div class="icon icon--refresh"></div>
            </div>

            <div
              class="icon-wrapper"
              @click="exportToExcel"
              title="Xuất ra Excel"
            >
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
  <MsToastMessage v-if="isToast" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Alert, AlertAction } from "@/enums";
import { AlertMsg } from "@/i18n";
import MsButton from "@/components/base/MsButton/MsButton.vue";
import MsInput from "@/components/base/MsInput/MsInput.vue";
import EmployeeTable from "@/views/employee/EmployeeTable/EmployeeTable.vue";
import EmployeePaging from "../EmployeePaging/EmployeePaging.vue";
import EmployeeDetail from "../EmployeeDetail/EmployeeDetail.vue";
import EmployeeAlert from "../EmployeeAlert/EmployeeAlert.vue";
import MsToastMessage from "@/components/base/MsToastMessage/MsToastMessage.vue";
export default {
  components: {
    MsButton,
    MsInput,
    EmployeeTable,
    EmployeePaging,
    EmployeeDetail,
    EmployeeAlert,
    MsToastMessage,
  },
  created() {
    const me = this;
    me.getEmployees();
    me.setDepartments();
    document.addEventListener("click", function () {
      me.isShowBatchAction = false;
    });
  },
  computed: {
    ...mapGetters([
      "employeeList",
      "checkedEmployeeIDs",
      "isEmployeeDetail",
      "employee",
      "isAlert",
      "filter",
      "isToast",
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
      "initPreEmployee",
      "exportToExcel",
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
      me.isShowBatchAction = false;
      me.setAlert({
        type: Alert.WARNING,
        message: [AlertMsg.ConfirmDeleteBatch],
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

    /**
     * ẩn hiện list batch action
     * Author: VDTIEN (14/11/2022)
     */
    toggleBatchAction() {
      const me = this;
      if (me.checkedEmployeeIDs.length > 0) {
        me.isShowBatchAction = !me.isShowBatchAction;
      }
    },

    /**
     * load lại dữ liệu khi click refresh
     * Author: VDTIEN (14/11/2022)
     */
    loadData() {
      const me = this;
      me.setFilter({
        pageSize: 10,
        pageNumber: 1,
        employeeFilter: "",
      });
      me.getEmployees();
    },
  },
  data() {
    return {
      isStore: false,
      isShowBatchAction: false,
    };
  },
};
</script>

<style>
@import url(./EmployeeList.css);
</style>