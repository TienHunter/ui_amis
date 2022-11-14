import * as employeeRequest from "../../services/employeeService";
import { AlertAction, Alert } from "@/i18n";
const actions = {
   /**
    * Lấy danh sách nhân viên theo bộ lọc và phân trang
    * @param {*} param0
    * Author: VDTien (13/11/2022)
    */
   async getEmployees({ dispatch, commit, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.getEmployees(
            state.filter.pageSize,
            state.filter.pageNumber,
            state.filter.employeeFilter
         );
         if (res) {
            commit("SET_EMPLOYEES", res);
         } else
            commit("SET_EMPLOYEES", {
               data: [],
               totalRecords: 0,
               totalPages: 0,
            });
         dispatch("toggleLoading");
      } catch (error) {
         console.log(error);
         dispatch("toggleLoading");
      }
   },

   /**
    * ẩn hiện loading
    * @param {*} param0
    * Author VDTien (13/11/2022)
    */
   toggleLoading({ commit }) {
      commit("TOGGLE_LOADING");
   },

   /**
    * Xử lý bộ lọc danh sách nhân viên
    * @param {*} param0
    * @param {object} filter
    * Author: VDTien (13/11/2022)
    */
   setFilter({ commit }, filter) {
      commit("SET_FILTER", filter);
   },

   /**
    * thêm hoặc bỏ employeeID ra khỏi danh sách employeeID
    * @param {*} param0
    * @param {*} employeeID
    * Author: VDTien (13/11/2022)
    */
   toggleCheckedEmployeeIDs({ commit }, employeeID) {
      commit("TOGGLE_CHECKED_EMPLOYEES", employeeID);
   },

   /**
    * làm rỗng danh sách employeeID checked
    * @param {*} param0
    * Author:VDTien (13/11/2022)
    */
   setEmptyCheckedEmployees({ commit }) {
      commit("SET_EMPLTY_CHECKED_EMPLOYEES");
   },
   /**
    * ẩn/ hiêm EmplouyeeDetail
    * @param {*} param0
    * Author : VDTien (13/11/2022)
    */
   toggleEmployeeDetail({ commit }) {
      commit("TOGGLE_EMPLOYEE_DETAIL");
   },

   /**
    * Set tiêu đê cho EmployeeDetal component
    * @param {*} param0
    * @param {String} title
    * Author: VDTien (13/11/2022)
    */
   setEmployeeDetailTitle({ commit }, title) {
      commit("SET_EMPLOYEE_DETAIL_TITLE", title);
   },

   /**
    * set chế độ thao tác EmployeeDetail (thêm, sửa,..)
    * @param {*} param0
    * @param {i18n} mode
    * Author: VDTien (13/11/2022)
    */
   setFormMode({ commit }, mode) {
      commit("SET_FORM_MODE", mode);
   },
   /**
    * Khỏi tạo giá trị ban đầu cho employee
    * @param {*} param0
    * @param {*} input
    * Author: VDTien (13/11/2022)
    */
   initEmployee({ commit }, input) {
      commit("INIT_EMPLOYEE", input);
   },
   /**
    * Ẩn / hiện alert
    * @param {*} param0
    * Author: VDTien (13/11/2022)
    */
   toggleAlert({ commit }) {
      commit("TOGGLE_ALERT");
   },

   async deleteEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.deleteEmployee(
            state.employee.EmployeeID
         );
         if (res) {
            // thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: "Xóa nhân viên thành công",
               action: AlertAction.DEFAULT,
            });
            //load lại bộ lọc
            dispatch("setFilter", {
               pageSize: state.filter.pageSize,
               pageNumber: 1,
               employeeFilter: state.filter.employeeFilter,
            });
            // load lại dữ liệu
            dispatch("getEmployees");
         } else {
            // thông báo lỗi
            dispatch("setAlert", {
               type: Alert.ERROR,
               message: "Xóa nhân viên thất bại",
               action: AlertAction.DEFAULT,
            });
         }
         dispatch("toggleLoading");
      } catch (error) {
         console.log(error);
         dispatch("toggleLoading");
      }
   },
   /**
    * Xử lí nội dung của cảnh báo
    * @param {*} context
    * @param {*} alert
    * Author: VDTien (13/11/2022)
    */
   setAlert({ dispatch, commit }, alert) {
      commit("SET_ALERT", alert);
      dispatch("toggleAlert");
   },

   /**
    * Set các value cho employee state
    * @param {*} param0
    * @param {*} employee
    * Author: VDTien (13/11/2022)
    */
   setEmployee({ commit }, employee) {
      commit("SET_EMPLOYEE", employee);
   },

   /**
    * Xóa hàng loạt employee
    * @param {*} param0
    * Author: VDTien (13/11/2022)
    */
   async deleteBatchEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.deleteBatchEmployee(
            state.checkedEmployeeIDs
         );
         if (res) {
            // thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: "Xóa nhân viên thành công",
               action: AlertAction.DEFAULT,
            });
            //load lại bộ lọc
            dispatch("setFilter", {
               pageSize: state.filter.pageSize,
               pageNumber: 1,
               employeeFilter: state.filter.employeeFilter,
            });
            // load lại dữ liệu
            dispatch("getEmployees");
         } else {
            // thông báo lỗi
            dispatch("setAlert", {
               type: Alert.ERROR,
               message: "Xóa nhân viên thất bại",
               action: AlertAction.DEFAULT,
            });
         }
         dispatch("toggleLoading");
      } catch (error) {
         console.log(error);
         handleException(error, dispatch);
         dispatch("toggleLoading");
      }
   },
};
/**
 * Xử lí lỗi
 * @param {*} error
 * @param {*} context
 */
const handleException = (error, dispatch) => {
   dispatch("toggleLoading");
   console.log(error);
   //thông báo có lỗi
   dispatch("setAlert", {
      type: Alert.DANGER,
      message: error.response.data.UserMsg,
      action: AlertAction.DEFAULT,
   });
};
export default actions;
