import * as employeeRequest from "../../services/employeeService";
const actions = {
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
   toggleLoading({ commit }) {
      commit("TOGGLE_LOADING");
   },
};
export default actions;
