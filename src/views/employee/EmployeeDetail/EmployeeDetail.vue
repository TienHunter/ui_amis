<template>
  <div class="dialog-wrapper" ref="employeeDetail">
    <div class="dialog-container">
      <div class="dialog__header d-flex">
        <div class="dialog-header__title mr-12">{{ employeeDetailTitle }}</div>
        <div class="dialog-header__option d-flex">
          <label class="wrapper-checkbox row-8">
            <input class="input-checkbox" type="checkbox" />
            {{ FIELD_NAME.IsCustomer }}
          </label>
          <label class="wrapper-checkbox row-8">
            <input class="input-checkbox" type="checkbox" />
            {{ FIELD_NAME.IsProvider }}
          </label>
        </div>
        <div class="dialog-header__action d-flex ml-auto">
          <button type="button" class="mr-8" title="Trợ giúp">
            <div class="icon icon--help"></div>
          </button>
          <button
            type="button"
            title="Đóng (ESC)"
            @click="onClickBtnClose"
            tabIndex="21"
            ref="btnClose"
          >
            <div class="icon icon--close"></div>
          </button>
        </div>
      </div>
      <form id="employeeForm" class="d-flex dialog__body">
        <div class="form__content">
          <div class="form-content__top">
            <div class="form-content__left mr-24">
              <div class="d-flex row-8">
                <MsInput
                  @keydown="focusLast"
                  ref="EmployeeCode"
                  :inputLabel="FIELD_NAME.EmployeeCode"
                  :inputWidth="'width-40'"
                  :inputRequired="true"
                  v-model="employee.EmployeeCode"
                  :errorMess="errors.EmployeeCode"
                  :tabIndex="2"
                />
                <MsInput
                  :inputLabel="FIELD_NAME.EmployeeName"
                  :inputWidth="'flex-1'"
                  :inputRequired="true"
                  v-model="employee.EmployeeName"
                  :errorMess="errors.EmployeeName"
                  :tabIndex="3"
                  ref="EmployeeName"
                />
              </div>
              <div class="input-wrapper">
                <label class="label-input">
                  {{ FIELD_NAME.DepartmentName }}
                  <span style="color: red">(*)</span>
                </label>
                <MsComboBox
                  :errorMess="errors.DepartmentName"
                  :className="'department-list'"
                  :dataList="departmentList"
                  :selectedItem="employee.DepartmentID"
                  @selectAction="selectDepartment"
                  :tabIndex="4"
                />
              </div>
              <MsInput
                :inputLabel="FIELD_NAME.JobPositionName"
                v-model="employee.JobPositionName"
                :errorMess="errors.JobPositionName"
                :tabIndex="5"
              />
            </div>
            <div class="form-content__right">
              <div class="d-flex row-8">
                <MsInput
                  :inputLabel="FIELD_NAME.DateOfBirth"
                  :inputType="'date'"
                  :placeholder="'dd/mm/yyyy'"
                  :inputWidth="'width-40'"
                  v-model="employee.DateOfBirth"
                  :errorMess="errors.DateOfBirth"
                  :tabIndex="6"
                />

                <div class="flex-1 input-wrapper" style="padding-bottom: 16px" >
                  <label class="label-input" style="padding-bottom: unset">
                    {{ FIELD_NAME.Gender }}
                  </label>
                  <div class="d-flex" style="margin: 8px 0">
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox" >
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.MALE"
                          v-model="employee.Gender"
                          :tabIndex="7"
                        />
                        {{ FIELD_NAME.GenderName.MALE }}
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox" >
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.FEMALE"
                          v-model="employee.Gender"
                          :tabIndex="7"
                        />
                        {{ FIELD_NAME.GenderName.FEMALE }}
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox" >
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.OTHER"
                          v-model="employee.Gender"
                          :tabIndex="7"
                        />
                        {{ FIELD_NAME.GenderName.OTHER }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex row-8">
                <MsInput
                  :inputLabel="FIELD_NAME.IdentityNumber"
                  :inputWidth="'width-60'"
                  v-model="employee.IdentityNumber"
                  :errorMess="errors.IdentityNumber"
                  :tabIndex="8"
                  :tooltip="'Số chứng minh nhân dân'"
                />
                <MsInput
                  :inputLabel="FIELD_NAME.IdentityDate"
                  :inputType="'date'"
                  :inputWidth="'flex-1'"
                  v-model="employee.IdentityDate"
                  :errorMess="errors.IdentityDate"
                  :tabIndex="9"
                />
              </div>
              <MsInput
                :inputLabel="FIELD_NAME.IdentityPlace"
                v-model="employee.IdentityPlace"
                :errorMess="errors.IdentityPlace"
                :tabIndex="10"
              />
            </div>
          </div>
          <div class="form-content__bottom m-pb-12">
            <MsInput
              :inputLabel="FIELD_NAME.Address"
              v-model="employee.Address"
              :errorMess="errors.Address"
              :tabIndex="11"
            />
            <div class="d-flex row-8">
              <MsInput
                :inputLabel="FIELD_NAME.PhoneNumber"
                :inputWidth="'width-25'"
                v-model="employee.TelephoneNumber"
                :errorMess="errors.TelephoneNumber"
                :tabIndex="12"
              />
              <MsInput
                :inputLabel="FIELD_NAME.TelephoneNumber"
                :inputWidth="'width-25'"
                v-model="employee.PhoneNumber"
                :errorMess="errors.PhoneNumber"
                :tabIndex="13"
              />
              <MsInput
                :inputLabel="FIELD_NAME.Email"
                :inputWidth="'width-25'"
                v-model="employee.Email"
                :errorMess="errors.Email"
                :tabIndex="14"
              />
              <div class="width-25"></div>
            </div>
            <div class="d-flex row-8">
              <MsInput
                :inputLabel="FIELD_NAME.BankAccountNumber"
                :inputWidth="'width-25'"
                v-model="employee.BankAccountNumber"
                :errorMess="errors.BankAccountNumber"
                :tabIndex="15"
              />
              <MsInput
                :inputLabel="FIELD_NAME.BankName"
                :inputWidth="'width-25'"
                v-model="employee.BankName"
                :errorMess="errors.BankName"
                :tabIndex="16"
              />
              <MsInput
                :inputLabel="FIELD_NAME.BankBranchName"
                :inputWidth="'width-25'"
                v-model="employee.BankBranchName"
                :errorMess="errors.BankBranchName"
                :tabIndex="17"
              />
              <div class="width-25"></div>
            </div>
          </div>
        </div>
      </form>
      <div class="dialog__footer d-flex">
        <div class="dialog-footer__left">
          <MsButton
            :title="'Hủy'"
            :isSecondary="true"
            :tabIndex="20"
            @click="toggleEmployeeDetail"
            @keydown="focusFirst"
            @keyup.enter="toggleEmployeeDetail"
            ref="btnCancel"
          />
        </div>
        <div class="dialog-footer__right d-flex">
          <MsButton
            :title="'Cất'"
            :isSecondary="true"
            :tabIndex="18"
            @keyup.enter="saveData"
            @click="saveData"
          />
          <MsButton
            :title="'Cất và thêm'"
            :isPrimary="true"
            :tabIndex="19"
            ref="StoreAndAdd"
            @keyup.enter="saveAddData"
            @click="saveAddData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { FORM_MODE, Alert, AlertAction } from "@/enums";
import { AlertMsg, ErrorMsg } from "@/i18n";
import MsButton from "@/components/base/MsButton/MsButton.vue";
import MsInput from "@/components/base/MsInput/MsInput.vue";
import MsComboBox from "@/components/base/MsComboBox/MsComboBox.vue";
export default {
  components: {
    MsButton,
    MsInput,
    MsComboBox,
  },
  props: ["isStore"],
  emits: ["confirmStoreDone"],

  created() {
    const me = this;
    me.departments.forEach((element) => {
      let item = {};
      item.value = element.DepartmentID;
      item.text = element.DepartmentName;
      me.departmentList.push(item);
    });
  },
  mounted() {
    const me = this;
    me.$refs.EmployeeCode.$el.querySelector("input").focus();
    document.addEventListener("keydown", me.escKeydown);
  },
  unmounted() {
    const me = this;
    document.removeEventListener("keydown", me.escKeydown);
  },
  watch: {
    /**
     * lưu bản ghi khi bấm lưu thay đổi
     * Author: VDTIEN (14/11/2022)
     */
    isStore() {
      const me = this;
      if (me.isStore == true) {
        me.saveData();
        me.toggleAlert();
        me.$emit("confirmStoreDone");
      }
    },
  },
  computed: {
    ...mapGetters([
      "isEmployeeDetail",
      "employeeDetailTitle",
      "employee",
      "FIELD_NAME",
      "GENDER",
      "formMode",
      "alert",
      "departments",
      "preEmployee",
    ]),
  },
  methods: {
    ...mapActions([
      "toggleEmployeeDetail",
      "setFormMode",
      "addEmployee",
      "editEmployee",
      "setAlert",
      "toggleAlert",
    ]),

    /**
     * tab từ nút Hủy lên input employeeCode
     * shift tab từ nút Hủy về nút Cất và thêm
     *   @param {*} e
     * Author: VDTIEN (14/11/2022)
     */
    focusFirst(e) {
      e.preventDefault();
      if (e.shiftKey && e.which == 9) {
        this.$refs.StoreAndAdd.$el.focus();
      }
      if (!e.shiftKey && e.which == 9) {
        this.$refs.EmployeeCode.$el.querySelector("input").focus();
      }
    },

    /**
     * tab từ input employeeCode sang input employeeNam
     * shift tab từ input employeeCode về nút Hủy
     *   @param {*} e
     * Author: VDTIEN (14/11/2022)
     */
    focusLast(e) {
      // e.preventDefault();
      if (e.shiftKey && e.which == 9) {
        this.$refs.btnClose.focus();
      }
      // if (!e.shiftKey && e.which == 9) {
      //   this.$refs.EmployeeName.$el.querySelector("input").focus();
      // }
    },
    /**
     * bắt sự kiện click vào btnClose
     */
    onClickBtnClose() {
      const me = this;
      if (JSON.stringify(me.employee) == JSON.stringify(me.preEmployee)) {
        me.toggleEmployeeDetail();
      } else {
        me.setAlert({
          type: Alert.INFO,
          message: [AlertMsg.ConfirmStore],
          action: AlertAction.CONFIRM_STORE,
        });
      }
    },

    /**
     * bắt sự kiện onclick Cất button
     * Author: VDTIEN (14/11/2022)
     */
    saveData() {
      const me = this;
      me.storeEmployee();
    },

    /**
     * bắt sự kiện onclick Cất và thêm fbutton
     * Author: VDTIEN (14/11/2022)
     */
    saveAddData() {
      const me = this;
      if (me.formMode == FORM_MODE.STORE) {
        me.setFormMode(FORM_MODE.STORE_AND_ADD);
      }
      if (me.formMode == FORM_MODE.EDIT) {
        me.setFormMode(FORM_MODE.EDIT_AND_ADD);
      }
      me.storeEmployee();
    },

    /**
     * combobox chọn phòng ban
     * @param {String} departmentName
     * Author: VDTIEN (14/11/2022)
     */
    selectDepartment(department) {
      const me = this;
      me.employee.DepartmentID = department.value;
      me.employee.DepartmentName = department.text;
    },
    /**
     * Validator dữ liệu
     * Author: VDTIEN (14/11/2022)
     */
    validateData() {
      const me = this;
      let isValid = false;
      // Xóa mesage lỗi trước đó
      me.errors = {};

      // Mã không được để trống
      let checkEmployeeCodeEmpty =
        !me.employee.EmployeeCode ||
        (me.employee.EmployeeCode && !me.employee.EmployeeCode.trim());
      if (checkEmployeeCodeEmpty) {
        me.errors.EmployeeCode = ErrorMsg.EmployeeCodeEmppty;
      } else {
        if (!me.employee.EmployeeCode.match(/^(NV-)(\d+)$/)) {
          me.errors.EmployeeCode = ErrorMsg.EmployeeCodeFormat;
        }
      }

      // Tên không được để trống
      let checkEmployeeNameEmpty =
        !me.employee.EmployeeName ||
        (me.employee.EmployeeName && !me.employee.EmployeeName.trim());
      if (checkEmployeeNameEmpty) {
        me.errors.EmployeeName = ErrorMsg.EmployeeNameEmpty;
      }

      // Đơn vị không được để trống
      if (!me.employee.DepartmentName) {
        me.errors.DepartmentName = ErrorMsg.DepartmentEmpty;
      }

      // Ngày sinh không được lớn hơn hiện tại
      if (me.employee.DateOfBirth) {
        let currentDate = new Date().getTime();
        let dof = Date.parse(me.employee.DateOfBirth);
        if (dof > currentDate) {
          me.errors.DateOfBirth = ErrorMsg.DateOfBirth;
        }
      }

      // Ngày cấp không được lớn hơn hiện tại
      if (me.employee.IdentityDate) {
        let currentDate = new Date().getTime();
        let identityDate = Date.parse(me.employee.DateOfBirth);
        if (identityDate > currentDate) {
          me.errors.IdentityDate = ErrorMsg.IdentityDate;
        }
      }

      // Email không được lớn hơn hiện tại
      if (me.employee.Email && me.employee.Email.trim()) {
        var mailFormat =
          /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
        if (!me.employee.Email.match(mailFormat)) {
          me.errors.Email = ErrorMsg.Email;
        }
      }

      // Kiểm tra xem có lỗi nào không
      if (Object.keys(me.errors).length == 0) {
        isValid = true;
      } else {
        me.setAlert({
          type: Alert.ERROR,
          message: [...Object.values(me.errors)],
        });
      }
      return isValid;
    },

    /**
     * cất dữ liệu nhân viên
     * Author: VDTIEN (14/11/2022)
     */
    storeEmployee() {
      const me = this;
      //validate dữ liệu
     // let isValid = me.validateData();
      let isValid = true;
      if (isValid) {
        if (
          me.formMode == FORM_MODE.STORE ||
          me.formMode == FORM_MODE.STORE_AND_ADD
        ) {
          //thêm nhân viên
          me.addEmployee();
        } else if (
          me.formMode == FORM_MODE.EDIT ||
          me.formMode == FORM_MODE.EDIt_AND_ADD
        ) {
          //sửa nhân viên
          me.editEmployee();
        }
      }
    },

    /**
     * bắt sự kiện bấm phím esc
     * Author: VDTIEN (14/11/2022)
     */
    escKeydown(e) {
      const me = this;
      if (e.keyCode == 27 || e.which == 27) {
        me.onClickBtnClose();
      }
    },
  },
  data() {
    return {
      errors: {},
      departmentList: [],
    };
  },
};
</script>

<style>
</style>