<template>
  <div class="dialog-wrapper">
    <div class="dialog-container">
      <div class="dialog__header d-flex">
        <div class="dialog-header__title mr-12">Thông tin nhân viên</div>
        <div class="dialog-header__option d-flex">
          <label class="wrapper-checkbox row-8">
            <input class="input-checkbox" type="checkbox" />
            Là khách hàng
          </label>
          <label class="wrapper-checkbox row-8">
            <input class="input-checkbox" type="checkbox" />
            Là Nhà cung cấp
          </label>
        </div>
        <div class="dialog-header__action d-flex ml-auto">
          <button type="button" class="mr-8">
            <div class="icon icon--help"></div>
          </button>
          <button type="button">
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
                  :inputRequired="'required'"
                  v-model="employee.EmployeeCode"
                  :errorMess="errors.EmployeeCode"
                  :tabIndex="2"
                />
                <MsInput
                  :inputLabel="'Tên'"
                  :inputWidth="'flex-1'"
                  :inputRequired="'required'"
                  v-model="employee.EmployeeName"
                  :errorMess="errors.EmployeeName"
                  :tabIndex="3"
                />
              </div>
              <div class="wrapper-input">
                <label class="label-input">
                  {{ FIELD_NAME.DepartmentName }}
                  <span style="color: red">(*)</span>
                  <MsComboBox
                    :errorMess="errors.DepartmentName"
                    :className="'department-list'"
                    :selectedItem="employee.DepartmentName"
                    @selectAction="selectDepartment"
                    :tabIndex="6"
                  />
                </label>
              </div>
              <MsInput
                :inputLabel="'Chức danh'"
                v-model="employee.EmployeePosition"
                :errorMess="errors.EmployeePosition"
                :tabIndex="9"
              />
            </div>
            <div class="form-content__right">
              <div class="d-flex row-8">
                <MsInput
                  :inputLabel="'Ngày sinh'"
                  :inputType="'date'"
                  :inputWidth="'width-40'"
                  v-model="employee.DateOfBirth"
                  :errorMess="errors.DateOfBirth"
                  :tabIndex="4"
                />

                <div class="flex-1 wrapper-input" style="padding-bottom: 16px">
                  <label class="label-input" style="padding-bottom: unset">
                    Giới tính
                  </label>
                  <div class="d-flex" style="margin: 8px 0">
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          value="0"
                          v-model="employee.Gedner"
                        />
                        Nam
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          value="1"
                          v-model="employee.Gedner"
                        />
                        Nữ
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          value="2"
                          v-model="employee.Gedner"
                        />
                        Khác
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex row-8">
                <MsInput
                  :inputLabel="'Số CMND'"
                  :inputWidth="'width-60'"
                  v-model="employee.IdentityNumber"
                  :errorMess="errors.IdentityNumber"
                  :tabIndex="7"
                />
                <MsInput
                  :inputLabel="'Ngày cấp'"
                  :inputType="'date'"
                  :inputWidth="'flex-1'"
                  v-model="employee.IdentityDate"
                  :errorMess="errors.IdentityDate"
                  :tabIndex="8"
                />
              </div>
              <MsInput
                :inputLabel="'Nơi cấp'"
                v-model="employee.IdentityPlace"
                :errorMess="errors.IdentityPlace"
                :tabIndex="10"
              />
            </div>
          </div>
          <div class="form-content__bottom m-pb-12">
            <MsInput
              :inputLabel="'Địa chỉ'"
              v-model="employee.Address"
              :errorMess="errors.Address"
              :tabIndex="11"
            />
            <div class="d-flex row-8">
              <MsInput
                :inputLabel="'ĐT di động'"
                :inputWidth="'width-25'"
                v-model="employee.TelephoneNumber"
                :errorMess="errors.TelephoneNumber"
                :tabIndex="12"
              />
              <MsInput
                :inputLabel="'ĐT cố định'"
                :inputWidth="'width-25'"
                v-model="employee.PhoneNumber"
                :errorMess="errors.PhoneNumber"
                :tabIndex="13"
              />
              <MsInput
                :inputLabel="'Email'"
                :inputWidth="'width-25'"
                v-model="employee.Email"
                :errorMess="errors.Email"
                :tabIndex="14"
              />
              <div class="width-25"></div>
            </div>
            <div class="d-flex row-8">
              <MsInput
                :inputLabel="'Tài khoản ngân hàng'"
                :inputWidth="'width-25'"
                v-model="employee.BankAccountNumber"
                :errorMess="errors.BankAccountNumber"
                :tabIndex="15"
              />
              <MsInput
                :inputLabel="'Tên ngân hàng'"
                :inputWidth="'width-25'"
                v-model="employee.BankName"
                :errorMess="errors.BankName"
                :tabIndex="16"
              />
              <MsInput
                :inputLabel="'Chi nhánh'"
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
          <MsButton :title="'Hủy'" :isSecondary="true" />
        </div>
        <div class="dialog-footer__right d-flex">
          <MsButton :title="'Cất'" :isSecondary="true" />
          <MsButton :title="'Cất và thêm'" :isPrimary="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MsButton from "@/components/base/MsButton/MsButton.vue";
import MsInput from "@/components/base/MsInput/MsInput.vue";
import MsComboBox from "@/components/base/MSComboBox/MsComboBox.vue";
export default {
  components: {
    MsButton,
    MsInput,
    MsComboBox,
  },
  computed: {
    ...mapGetters([
      "isEmployeeDetails",
      "employeeDetailTitle",
      "employee",
      "FIELD_NAME",
    ]),
  },
  methods: {
    ...mapActions(["toggleEmployeeDetail"]),
  },
  data() {
    return {
      errors: {},
    };
  },
};
</script>

<style>
</style>