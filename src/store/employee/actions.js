import * as employeeRequest from "../../services/employeeService";
const actions = {
   async getEmployees({ dispatch, commit, state }) {
      let res = await employeeRequest.getEmployees(
         state.filter.pageSize,
         state.filter.pageNumber,
         state.filter.employeeFilter
      );
      dispatch("TOGGLE_LOADING");
      if (res) {
         commit("SET_EMPLOYEES", res);
      } else commit("SET_EMPLOYEES", {});
      dispatch("TOGGLE_LOADING");
   },
};
export default actions;
