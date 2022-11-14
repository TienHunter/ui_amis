const getters = {
   isLoading: (state) => state.isLoading,
   isEmployeeDetails: (state) => state.isEmployeeDetails,
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
};
export default getters;
