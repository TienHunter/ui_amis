import * as employeeRequest from "../../services/employeeService";
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
         } else commit("SET_EMPLOYEES", {});
         dispatch("toggleLoading");
      } catch (error) {
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
   toggleCheckedEmployeeIDs({ commit }, employeeID) {
      commit("TOGGLE_CHECKED_EMPLOYEES", employeeID);
   },
};
export default actions;
