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
      state.employeeList = payload.data;
      state.totalRecords = payload.totalRecords;
      state.totalPages = payload.totalPages;
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
   // totalRecords
   // totalPages
};
export default mutations;
