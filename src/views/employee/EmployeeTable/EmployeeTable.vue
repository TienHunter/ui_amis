<template>
  <div class="wrapper-table">
    <table id="tblEmployee">
      <thead>
        <tr>
          <th style="min-width: 40px; width: 40px" class="th-anchor">
            <input
              type="checkbox"
              @change="checkAll"
              ref="checkedAllRecord"
              :checked="
                employeeList.length == checkedEmployeeIDs.length &&
                employeeList.length > 0
              "
            />
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.EmployeeCode.toUpperCase()"
          >
            {{ FIELD_NAME.EmployeeCode.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.EmployeeName.toUpperCase()"
          >
            {{ FIELD_NAME.EmployeeName.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.Gender.toUpperCase()"
          >
            {{ FIELD_NAME.Gender.toUpperCase() }}
          </th>
          <th style="min-width: 160px; width: 160px" class="text-center">
            {{ FIELD_NAME.DateOfBirth.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            title="Số chứng minh nhân dân"
          >
            {{ FIELD_NAME.IdentityNumber.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.JobPositionName.toUpperCase()"
          >
            {{ FIELD_NAME.JobPositionName.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.DepartmentName.toUpperCase()"
          >
            {{ FIELD_NAME.DepartmentName.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.BankAccountNumber.toUpperCase()"
          >
            {{ FIELD_NAME.BankAccountNumber.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.BankName.toUpperCase()"
          >
            {{ FIELD_NAME.BankName.toUpperCase() }}
          </th>
          <th
            style="min-width: 160px; width: 160px"
            class=""
            :title="FIELD_NAME.BankBranchName.toUpperCase()"
          >
            {{ FIELD_NAME.BankBranchName.toUpperCase() }}
          </th>
          <th
            style="min-width: 120px; width: 120px"
            class="th-anchor th-anchor--end"
          >
            {{ FIELD_NAME.Action.toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in employeeList"
          :key="index"
          @dblclick="onClickEditEmployee(item)"
          :class="{
            'tr-checked': checkedEmployeeIDs.includes(item.EmployeeID),
          }"
        >
          <td class="td-anchor td-anchor--start" @dblclick.stop>
            <input
              type="checkbox"
              :value="item.EmployeeID"
              @change="checkedOne(item.EmployeeID)"
              :checked="checkedEmployeeIDs.includes(item.EmployeeID)"
            />
          </td>
          <td>
            {{ convertNullString(item.EmployeeCode) }}
          </td>
          <td>{{ convertNullString(item.EmployeeName) }}</td>
          <td>{{ converGenderName(item.Gender) }}</td>
          <td class="text-center">
            {{ convertDateOfBirth(item.DateOfBirth) }}
          </td>
          <td>{{ convertNullString(item.IdentityNumber) }}</td>
          <td>{{ convertNullString(item.JobPositionName) }}</td>
          <td>{{ convertNullString(item.DepartmentName) }}</td>
          <td>{{ convertNullString(item.BankAccountNumber) }}</td>
          <td>{{ convertNullString(item.BankName) }}</td>
          <td>{{ convertNullString(item.BankBranchName) }}</td>
          <td
            class="td-anchor td-anchor--end d-flex-auto"
            :style="indexRe === index ? 'z-index:1' : ''"
            @dblclick.stop
          >
            <span class="" @click="onClickEditEmployee(item)">Sửa</span>

            <button
              type="button"
              class="btn-dropdown"
              :style="indexRe === index ? 'bordeColor:#0075c0' : ''"
              style="position: relative"
              @click.stop="handleToggleDropdownAction(index)"
            >
              <ul v-show="indexRe === index" class="dropdownlist">
                <li
                  class="dropdown__item"
                  @click="onClickDuplicateEmployee(item)"
                >
                  Nhân bản
                </li>
                <li class="dropdown__item" @click="onClickDeleteRecord(item)">
                  Xóa
                </li>
              </ul>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  convertDateOfBirth,
  convertNullString,
  convertGenderName,
  convertDateInput
} from "@/utils/helper";
import { Alert, AlertAction, FORM_MODE } from "@/enums";
export default {
  created() {
    const me = this;
    window.addEventListener("click", function () {
      me.indexRe = -1;
    });
  },

  computed: {
    ...mapGetters([
      "FIELD_NAME",
      "employeeList",
      "checkedEmployeeIDs",
      "employee",
      "FIELD_NAME",
    ]),
  },
  methods: {
    ...mapActions([
      "toggleCheckedEmployeeIDs",
      "setEmptyCheckedEmployees",
      "setAlert",
      "setEmployee",
      "setEmployeeDetailTitle",
      "setFormMode",
      "toggleEmployeeDetail",
      "setNewEmployeeCode",
    ]),

    /**
     * kiểm tra vâ chuyển đổi định dạng ngày tháng
     * Author: VDTIEN (14/11/2022)
     */
    convertDateOfBirth: convertDateOfBirth,

    /**
     * chuyển đỏi hiển thị giá trị null
     * Author: VDTIEN (14/11/2022)
     */
    convertNullString: convertNullString,

    /**
     * chuyển mã giới tính sang dạng string
     */
    converGenderName: convertGenderName,
    /**
     * ản hiện dropdown xóa, nhân bản
     * @param {int} index
     * Author : VDTIEN (14/11/2022)
     */
    handleToggleDropdownAction(index) {
      if (this.indexRe === index) {
        this.indexRe = -1;
      } else {
        this.indexRe = index;
      }
    },
    /**
     * push or remove employeeID ra khỏi checkedEmployeeIds
     * @param {string} employeeId
     * Author: VDTIEN (14/11/2022)
     */
    checkedOne(employeeId) {
      const me = this;
      // console.log(employeeId);
      me.toggleCheckedEmployeeIDs(employeeId);
      // console.log(me.checkedEmployeeIDs)
      if (me.checkedEmployeeIDs.length == me.employeeList.length) {
        me.$refs.checkedAllRecord.checked = true;
      } else {
        me.$refs.checkedAllRecord.checked = false;
      }
    },
    /**
     * checked tất cả hoặc unchecked tất cả bản ghi
     * @param
     * Author: VDTIEN (14/11/2022)
     */
    checkAll(event) {
      const me = this;
      if (event.target.checked) {
        for (const emp of me.employeeList) {
          if (!me.checkedEmployeeIDs.includes(emp.EmployeeID)) {
            me.toggleCheckedEmployeeIDs(emp.EmployeeID);
          }
        }
      } else {
        me.setEmptyCheckedEmployees();
      }
    },

    /**
     * xử lý sự kiên onclick xóa employee ( alert, confirm)
     * @param {object} emp
     * Author: VDTIEN (14/11/2022)
     */
    onClickDeleteRecord(emp) {
      const me = this;
      me.setEmployee(emp);
      if (me.checkedEmployeeIDs.includes(emp.EmployeeID)) {
        me.toggleCheckedEmployeeIDs(emp.EmployeeID);
      }
      me.setAlert({
        type: Alert.WARNING,
        message: [
          `Bạn có thực sự muốn xóa Nhân viên <${emp.EmployeeCode}> không?`,
        ],
        action: AlertAction.CONFIRM_DELETE,
      });
    },

    /**
     * xử lý sự kiên onclick button thêm employee
     * @param {object} emp
     * Author: VDTIEN (14/11/2022)
     */
    onClickEditEmployee(emp) {
      if(emp?.DateOfBirth) {
        emp.DateOfBirth = convertDateInput(emp.DateOfBirth)
      }
      if(emp?.IdentityDate) {
        emp.IdentityDate = convertDateInput(emp.IdentityDate)
      }
      const me = this;
      me.setEmployeeDetailTitle(me.FIELD_NAME.EDIT_EMPLOYEE);
      me.setFormMode(FORM_MODE.EDIT);
      me.setEmployee(emp);
      me.toggleEmployeeDetail();
    },

    /**
     * xử lý sự kiên onclick button nhân bản employee
     * @param {object} emp
     * Author: VDTIEN (14/11/2022)
     */
    onClickDuplicateEmployee(emp) {
      const me = this;
      me.setEmployeeDetailTitle(me.FIELD_NAME.ADD_EMPLOYEE);
      me.setFormMode(FORM_MODE.STORE);
      me.setEmployee(emp);
      me.setNewEmployeeCode();
      me.toggleEmployeeDetail();
    },
  },
  data() {
    return {
      indexRe: -1,
    };
  },
};
</script>

<style>
@import url(./EmployeeTable.css);
</style>