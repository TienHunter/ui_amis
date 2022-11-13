const mutations = {
   SET_EMPLOYEE_DETAIL_TITLE(state, title) {
      state.employeeDetailTitle = title;
   },
   TOGGLE_EMPLOYEE_DETAIL(state) {
      state.isEmployeeDetails = !state.isEmployeeDetails;
   },
   TOGGLE_LOADING(state) {
      state.isLoading = !state.isLoading;
   },
   TOGGLE_ALERT(state) {
      state.isAlert = !state.isAlert;
   },
   TOGGLE_CHECKED_EMPLOYEES(state, employeeID) {
      if (!state.checkedEmployeeIds.includes(employeeID)) {
         state.checkedEmployeeIds.push(employeeID);
      } else {
         const checkedEmployeeIds = [...state.checkedEmployeeIds];
         checkedEmployeeIds.filter((item) => item !== employeeID);
         state.checkedEmployeeIds = [...checkedEmployeeIds];
      }
   },
   SET_EMPLOYEES(state, payload) {
      state.employeeList = payload.Data;
      state.totalEmployees = payload.TotalRecords;
      state.totalPages = payload.TotalPages;
      state.checkedEmployeeIds = [];
   },
   SET_FILTER(state, payload) {
      state.filter.pageSize = payload.pageSize;
      state.filter.pageNumber = payload.pageNumber;
      state.filter.employeeFilter = payload.employeeFilter;
   },
   // formMode
   // filter
   // employeeList
   // employee
   // totalEmployees
   // totalPages
};
export default mutations;
