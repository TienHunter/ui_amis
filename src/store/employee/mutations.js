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
      if (!state.checkedEmployeeIDs.includes(employeeID)) {
         state.checkedEmployeeIDs.push(employeeID);
      } else {
         state.checkedEmployeeIDs = state.checkedEmployeeIDs.filter(
            (item) => item !== employeeID
         );
      }
   },
   SET_EMPLOYEES(state, payload) {
      state.employeeList = payload.data;
      state.totalRecords = payload.totalRecords;
      state.totalPages = payload.totalPages;
      state.checkedEmployeeIDs = [];
   },
   SET_FILTER(state, payload) {
      state.filter.pageSize = payload.pageSize;
      state.filter.pageNumber = payload.pageNumber;
      state.filter.employeeFilter = payload.employeeFilter;
   },
   SET_EMPLTY_CHECKED_EMPLOYEES(state) {
      state.checkedEmployeeIDs = [];
   },
   // formMode
   // filter
   // employeeList
   // employee
   // totalRecords
   // totalPages
};
export default mutations;
