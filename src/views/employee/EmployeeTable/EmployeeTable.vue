<template>
  <div class="wrapper-table">
    <table id="tblEmployee">
      <thead>
        <tr>
          <th style="min-width: 40px; width: 40px" class="th-anchor">
            <input
              type="checkbox"
              @change="checkedAllRecord"
              ref="checkedAllRecord"
              :checked="falseCheckAll"
            />
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.EmployeeCode }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.EmployeeName }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.Gender }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.DateOfBirth }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.IdentityNumber }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.PositionName }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.DepartmentName }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.BankAccountNumber }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.BankName }}
          </th>
          <th style="min-width: 160px; width: 160px" class="hide-text-ellipsis">
            {{ FIELD_NAME.BankBranchName }}
          </th>
          <th style="min-width: 120px" class="th-anchor th-anchor--end">
            {{ FIELD_NAME.Action }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in employeeList"
          :key="index"
          @dbclick="onClickEditEmployee(item.EmployeeID)"
        >
          <td class="td-anchor td-anchor--start">
            <input
              type="checkbox"
              :value="item.EmployeeID"
              @change="toggleCheckedEmployeeIDs(item.EmployeeID)"
            />
          </td>
          <td>
            {{ convertNullString(item.EmployeeCode) }}
          </td>
          <td>{{ convertNullString(item.EmployeeName) }}</td>
          <td>{{ convertNullString(item.GenderName) }}</td>
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
          >
            <span class="" @click="onClickEditEmployee(item.EmployeeID)"
              >Sửa</span
            >

            <button
              type="button"
              class="btn-dropdown"
              :style="indexRe === index ? 'bordeColor:#0075c0' : ''"
              style="position: relative"
              @click.stop="handleToggleDropdownAction(index)"
            >
              <ul v-show="indexRe === index" class="dropdownlist">
                <li class="dropdown__item">Nhân bản</li>
                <li
                  class="dropdown__item"
                  @click="onClickDeleteRecord(item.EmployeeID)"
                >
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
    ]),
  },
  methods: {
    ...mapActions(["toggleCheckedEmployeeIDs"]),

    convertNullString(str) {
      return str ? str : "";
    },

    convertDateOfBirth(date) {
      if (this.checkForamtDate(date)) {
        if (date) {
          date = new Date(date);
          let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          let month =
            date.getMonth() < 9 ? "0" + date.getMonth() : date.getMonth() + 1;
          let year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
      }
      return "";
    },
    /**
     * @param {string} date
     * @returns kiểm tra đầu vào đúng định dạng không
     * author VDTien(23/10/2022)
     */
    checkForamtDate(date) {
      return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
    },
    handleToggleDropdownAction(index) {
      if (this.indexRe === index) {
        this.indexRe = -1;
      } else {
        this.indexRe = index;
      }
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