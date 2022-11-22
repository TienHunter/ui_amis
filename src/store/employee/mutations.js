const mutations = {
   /**
    * set title cho EmployeeDetail component
    * @param {*} state
    * @param {*} title
    * Author VDTIEN(13/11/2022)
    */
   SET_EMPLOYEE_DETAIL_TITLE(state, title) {
      state.employeeDetailTitle = title;
   },

   /**
    * ẩn/ hiện EmployeeDetail Component
    * @param {*} state
    * Author VDTIEN(13/11/2022)
    */
   TOGGLE_EMPLOYEE_DETAIL(state) {
      state.isEmployeeDetail = !state.isEmployeeDetail;
   },

   /**
    * ẩn/ hiện icon loading
    * @param {*} state
    * Author VDTIEN(13/11/2022)
    */
   TOGGLE_LOADING(state) {
      state.isLoading = !state.isLoading;
   },

   /**
    * ẩn/ hiện cảnh báo
    * @param {*} state
    * Author VDTIEN(13/11/2022)
    */
   TOGGLE_ALERT(state) {
      state.isAlert = !state.isAlert;
   },

   /**
    * toggle checkbox thêm/ xóa employeeID vào listEmployeeID
    * @param {*} state
    * @param {*} employeeID
    * Author VDTIEN(13/11/2022)
    */
   TOGGLE_CHECKED_EMPLOYEES(state, employeeID) {
      if (!state.checkedEmployeeIDs.includes(employeeID)) {
         state.checkedEmployeeIDs.push(employeeID);
      } else {
         state.checkedEmployeeIDs = state.checkedEmployeeIDs.filter(
            (item) => item !== employeeID
         );
      }
   },

   /**
    * set danh sách nhân viên theo phân trang
    * @param {*} state
    * @param {*} payload
    * Author VDTIEN(13/11/2022)
    */
   SET_EMPLOYEES(state, payload) {
      state.employeeList = [...payload.Data];
      state.totalRecords = payload.TotalRecords;
      state.totalPages = payload.TotalPages;
      state.checkedEmployeeIDs = [];
   },

   /**
    * Set các tham số cho bộ lọc
    * @param {*} state
    * @param {*} payload
    */
   SET_FILTER(state, payload) {
      state.filter.pageSize = payload.pageSize;
      state.filter.pageNumber = payload.pageNumber;
      state.filter.employeeFilter = payload.employeeFilter;
   },

   /**
    * làm rỗng danh sách checked employee
    * @param {*} state
    * Author VDTIEN(13/11/2022)
    */
   SET_EMPLTY_CHECKED_EMPLOYEES(state) {
      state.checkedEmployeeIDs = [];
   },

   /**
    * set chế dộ của form (cất, sửa, cất và thêm)
    * @param {*} state
    * @param {*} payload
    * Author VDTIEN(13/11/2022)
    */
   SET_FORM_MODE(state, payload) {
      state.formMode = payload;
   },

   /**
    * set tham số cho alert component
    * @param {*} state
    * @param {*} payload
    * Author VDTIEN(13/11/2022)
    */
   SET_ALERT(state, payload) {
      state.alert.type = payload.type;
      state.alert.message = payload.message;
      state.alert.action = payload.action;
   },

   /**
    * set các property cho employeeDetail
    * @param {*} state
    * @param {*} payload
    * Author VDTIEN(13/11/2022)
    */
   SET_EMPLOYEE(state, payload) {
      state.employee = { ...payload };
      state.preEmployee = { ...payload };
   },

   /**
    * set các property cho employeeDetail trước khi thay đổi
    * @param {*} state
    * @param {*} payload
    * Author VDTIEN(13/11/2022)
    */
   SET_PRE_EMPLOYEE(state) {
      state.preEmployee = { ...state.employee };
   },

   /**
    * set mã nhân viên mới nhất cho employee state
    * @param {*} state
    * @param {*} payload
    */
   SET_NEW_EMPLOYEE_CODE(state, payload) {
      state.employee.EmployeeCode = payload;
      state.preEmployee.EmployeeCode = payload;
   },
   // formMode
   // filter
   // employeeList
   // employee
   // totalRecords
   // totalPages
};
export default mutations;
