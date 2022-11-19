import * as employeeRequest from "../../services/employeeService";
import { AlertAction, Alert, FORM_MODE, GENDER } from "@/i18n";
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
            let hasRecordsInPageEnd =
               (state.totalRecords % state.filter.pageSize
                  ? state.totalRecords % state.filter.pageSize
                  : state.filter.pageSize) - 1;
            dispatch("setFilter", {
               pageSize: state.filter.pageSize,
               pageNumber: hasRecordsInPageEnd ? state.filter.pageNumber : 1,
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
    * @param {*}     * @param {*} alert
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
            // kiểm tra xem con bản ghi ở trang cuối không
            let hasRecordsInPageEnd =
               (state.totalRecords % state.filter.pageSize
                  ? state.totalRecords % state.filter.pageSize
                  : state.filter.pageSize) - state.checkedEmployeeIDs.length;
            //load lại bộ lọc
            dispatch("setFilter", {
               pageSize: state.filter.pageSize,
               pageNumber: hasRecordsInPageEnd ? state.filter.pageNumber : 1,
               employeeFilter: state.filter.employeeFilter,
            });
            // load lại dữ liệu
            dispatch("getEmployees");
         } else {
            // thông báo lỗi
            dispatch("setAlert", {
               type: Alert.DANGER,
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
    * trả về employeeCode = "NV" + employeeCode max trong db
    * @param {*} param0
    * Author : VDTien (13/11/2022)
    */
   async setNewEmployeeCode({ commit }) {
      try {
         let newEmployeeCode = await employeeRequest.getEmployeeCodeMax();
         newEmployeeCode++;
         newEmployeeCode = "NV" + newEmployeeCode;
         commit("SET_NEW_EMPLOYEE_CODE", newEmployeeCode);
      } catch (error) {
         console.log(error);
      }
   },

   async addEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.createEmployee(state.employee);
         if (res) {
            //thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: "Thêm nhân viên thành công",
               action: AlertAction.DEFAULT,
            });
            //load lại dữ liệu
            state.employee.EmployeeID = res;
            state.employeeList.unshift({ ...state.employee });
            state.totalRecords++;
            dispatch("setEmployee", {});
            // Check mode
            if (state.formMode == FORM_MODE.STORE) {
               // Cất
               dispatch("toggleEmployeeDetail");
            } else {
               // Cất và thêm
               dispatch("initValueForm");
            }

            // dispatch("getEmployees");
         } else {
            dispatch("setAlert", {
               type: Alert.DANGER,
               message: "Thêm nhân viên thất bại",
               action: AlertAction.DEFAULT,
            });
         }
      } catch (error) {
         console.log(error);
         let message =
            error?.response?.data?.MoreInfo ??
            "Đã xảy ra lỗi, xin liên hệ với nhân viên";
         if (typeof message == "object") {
            message = Object.values(message)[0];
         }
         hanldeException(dispatch, message);
      } finally {
         dispatch("toggleLoading");
      }
   },

   async editEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.updateEmployee(state.employee);
         if (res) {
            //thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: "Sửa nhân viên thành công",
               action: AlertAction.DEFAULT,
            });
            dispatch("setEmployee", {});
            // Check mode
            if (state.formMode == FORM_MODE.EDIT) {
               // Cất
               dispatch("toggleEmployeeDetail");
            } else {
               // Cất và thêm
               dispatch("initValueForm");
            }

            //load lại dữ liệu
            dispatch("getEmployees");
         } else {
            dispatch("setAlert", {
               type: Alert.DANGER,
               message: "Sửa nhân viên thất bại",
               action: AlertAction.DEFAULT,
            });
         }
      } catch (error) {
         console.log(error);
         let message =
            error?.response?.data?.MoreInfo ??
            "Đã xảy ra lỗi, xin liên hệ với nhân viên";
         if (typeof message == "object") {
            message = Object.values(message)[0];
         }
         hanldeException(dispatch, message);
      } finally {
         dispatch("toggleLoading");
      }
   },
   /**
    * Khởi tạo câc giá trị ban đầu cho employeeDetail componentes
    * @param {*} param0
    */
   initValueForm({ dispatch }) {
      dispatch("setEmployeeDetailTitle", "Thêm khách hàng");
      dispatch("setFormMode", FORM_MODE.STORE);
      dispatch("setEmployee", { Gender: GENDER.MALE });
      dispatch("setNewEmployeeCode");
   },
};
function hanldeException(dispatch, payload) {
   dispatch("setAlert", {
      type: Alert.DANGER,
      message: payload,
      action: AlertAction.DEFAULT,
   });
}
export default actions;
