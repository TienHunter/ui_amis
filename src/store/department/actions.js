import * as departmentRequest from "@/services/departmentService";
const actions = {
   async setDepartments({ commit }) {
      try {
         let res = await departmentRequest.getDepartments();
         commit("SET_DEPARTMENTS", res);
      } catch (error) {
         console.log(error);
      }
   },
};
export default actions;
