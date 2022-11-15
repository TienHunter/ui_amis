const mutations = {
   SET_EMPLOYEE_DETAIL_TITLE(state, title) {
      state.employeeDetailTitle = title;
   },
   TOGGLE_EMPLOYEE_DETAIL(state) {
      state.isEmployeeDetail = !state.isEmployeeDetail;
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
      state.employeeList = payload.Data;
      state.totalRecords = payload.TotalRecords;
      state.totalPages = payload.TotalPages;
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
   SET_FORM_MODE(state, payload) {
      state.formMode = payload;
   },
   INIT_EMPLOYEE(state, payload) {
      state.employee.Gender = payload.Gender;
   },
   SET_ALERT(state, payload) {
      state.alert.type = payload.type;
      state.alert.message = payload.message;
      state.alert.action = payload.action;
   },
   SET_EMPLOYEE(state, payload) {
      state.employee = payload;
   },
   SET_NEW_EMPLOYEE_CODE(state, payload) {
      state.employee.EmployeeCode = payload;
   },
   // formMode
   // filter
   // employeeList
   // employee
   // totalRecords
   // totalPages
};
export default mutations;
