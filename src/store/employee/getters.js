const getters = {
   isLoading: (state) => state.isLoading,
   isEmployeeDetails: (state) => state.isEmployeeDetails,
   employeeDetailTitle: (state) => state.employeeDetailTitle,
   isAlert: (state) => state.isAlert,
   formMode: (state) => state.formMode,
   filter: (state) => state.filter,
   employeeList: (state) => state.employeeList,
   employee: (state) => state.employee,
   totalEmployees: (state) => state.totalEmployees,
   totalPages: (state) => state.totalPages,
   checkedEmployeeIds: (state) => state.checkedEmployeeIds,
   FIELD_NAME: (state) => state.FIELD_NAME,
};
export default getters;
