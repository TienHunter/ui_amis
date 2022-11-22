const getters = {
   isLoading: (state) => state.isLoading,
   isEmployeeDetail: (state) => state.isEmployeeDetail,
   employeeDetailTitle: (state) => state.employeeDetailTitle,
   isAlert: (state) => state.isAlert,
   formMode: (state) => state.formMode,
   filter: (state) => state.filter,
   employeeList: (state) => state.employeeList,
   employee: (state) => state.employee,
   totalRecords: (state) => state.totalRecords,
   totalPages: (state) => state.totalPages,
   checkedEmployeeIDs: (state) => state.checkedEmployeeIDs,
   FIELD_NAME: (state) => state.FIELD_NAME,
   GENDER: (state) => state.GENDER,
   alert: (state) => state.alert,
   preEmployee: (state) => state.preEmployee,
};
export default getters;
