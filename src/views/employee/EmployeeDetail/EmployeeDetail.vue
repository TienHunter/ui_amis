<template>
  <div class="dialog-wrapper">
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
          <button type="button" title="Đóng (ESC)" @click="onClickBtnClose">
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
                  ref="EmployeeName"
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
                    :tabIndex="4"
                  />
                </label>
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
                  :inputWidth="'width-40'"
                  v-model="employee.DateOfBirth"
                  :errorMess="errors.DateOfBirth"
                  :tabIndex="6"
                />

                <div class="flex-1 wrapper-input" style="padding-bottom: 16px">
                  <label class="label-input" style="padding-bottom: unset">
                    {{ FIELD_NAME.Gender }}
                  </label>
                  <div class="d-flex" style="margin: 8px 0">
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.MALE"
                          v-model="employee.Gender"
                          tabIndex="7"
                        />
                        {{ FIELD_NAME.GenderName.MALE }}
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.FEMALE"
                          v-model="employee.Gender"
                        />
                        {{ FIELD_NAME.GenderName.FEMALE }}
                      </label>
                    </div>
                    <div class="input-radio-wrapper">
                      <label class="wrapper-radiobox">
                        <input
                          type="radio"
                          class="mr-8"
                          name="gender"
                          :value="GENDER.OTHER"
                          v-model="employee.Gender"
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
            ref="btnCancel"
          />
        </div>
        <div class="dialog-footer__right d-flex">
          <MsButton :title="'Cất'" :isSecondary="true" :tabIndex="18" />
          <MsButton
            :title="'Cất và thêm'"
            :isPrimary="true"
            :tabIndex="19"
            ref="StoreAndAdd"
          />
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
  mounted() {
    this.$refs.EmployeeCode.$el.querySelector("input").focus();
  },
  computed: {
    ...mapGetters([
      "isEmployeeDetail",
      "employeeDetailTitle",
      "employee",
      "FIELD_NAME",
      "GENDER",
    ]),
  },
  methods: {
    ...mapActions(["toggleEmployeeDetail"]),

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
      e.preventDefault();
      if (e.shiftKey && e.which == 9) {
        this.$refs.btnCancel.$el.focus();
      }
      if (!e.shiftKey && e.which == 9) {
        this.$refs.EmployeeName.$el.querySelector("input").focus();
      }
    },

    onClickBtnClose() {
      const me = this;
      me.toggleEmployeeDetail();
    },
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