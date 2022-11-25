import * as employeeRequest from "../../services/employeeService";
import { AlertAction, Alert, FORM_MODE, GENDER } from "@/enums";
import { FIELD_NAME, AlertMsg } from "@/i18n";
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
    * thu phóng sidebar
    * @param {*} state
    * Author VDTIEN(13/11/2022)
    */
   toggleCollapseSidebar({ commit }) {
      commit("TOGGLE_COLLAPSE_SIDEBAR");
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
               message: AlertMsg.DeleteSuccess,
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
               message: AlertMsg.DeleteFailed,
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
               message: AlertMsg.DeleteSuccess,
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
               type: Alert.ERROR,
               message: AlertMsg.DeleteFailed,
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
         newEmployeeCode = "NV-" + newEmployeeCode;
         commit("SET_NEW_EMPLOYEE_CODE", newEmployeeCode);
      } catch (error) {
         console.log(error);
      }
   },

   /**
    * Thêm mới nhân viên
    * @param {*} param0
    * Author : VDTien (13/11/2022)
    */
   async addEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.createEmployee(state.employee);
         if (res) {
            //thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: AlertMsg.InsertSuccess,
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
               type: Alert.ERROR,
               message: AlertMsg.InsertFailed,
               action: AlertAction.DEFAULT,
            });
         }
      } catch (error) {
         console.log(error);

         hanldeException(dispatch, error);
      } finally {
         dispatch("toggleLoading");
      }
   },

   /**
    * Sửa thông tin nhân viên
    * @param {*} param0
    * Author: VDTien (13/11/2022)
    */
   async editEmployee({ dispatch, state }) {
      try {
         dispatch("toggleLoading");
         let res = await employeeRequest.updateEmployee(state.employee);
         if (res) {
            //thông báo thành công
            dispatch("setAlert", {
               type: Alert.SUCCESS,
               message: AlertMsg.UpdateSuccess,
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
               type: Alert.ERROR,
               message: AlertMsg.UpdateFailed,
               action: AlertAction.DEFAULT,
            });
         }
      } catch (error) {
         console.log(error);
         hanldeException(dispatch, error);
      } finally {
         dispatch("toggleLoading");
      }
   },
   /**
    * Khởi tạo câc giá trị ban đầu cho employeeDetail componentes
    * @param {*} param0
    * Author: VDTien (13/11/2022)
    */
   initValueForm({ dispatch }) {
      dispatch("setEmployeeDetailTitle", FIELD_NAME.ADD_EMPLOYEE);
      dispatch("setFormMode", FORM_MODE.STORE);
      dispatch("setEmployee", { Gender: GENDER.MALE });
      dispatch("setNewEmployeeCode");
   },

   async exportToExcel({ dispatch, state }) {
      try {
         let res = await employeeRequest.exportEmployeeToExcel(
            state.filter.employeeFilter
         );

         //https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
         // create file link in browser's memory
         const href = URL.createObjectURL(res);

         // create "a" HTML element with href to file & click
         const link = document.createElement("a");
         link.href = href;
         link.setAttribute("download", `Danh_sach_nhan_vien${Date.now()}.xlsx`); //or any other extension
         document.body.appendChild(link);
         link.click();

         // clean up "a" element & remove ObjectURL
         document.body.removeChild(link);
         URL.revokeObjectURL(href);
      } catch (error) {
         console.log(error);
         hanldeException(dispatch, error);
      }
   },
};
/**
 * Thông báo exception
 * @param {*} dispatch
 * @param {*} error
 * Author: VDTien (13/11/2022)
 */
function hanldeException(dispatch, error) {
   let message = error?.response?.data?.UserMsg ?? AlertMsg.Exceptiom;
   dispatch("setAlert", {
      type: Alert.EXCEPTION,
      message: message,
      action: AlertAction.DEFAULT,
   });
}
export default actions;
