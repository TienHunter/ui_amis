const getters = {
   isLoading: (state) => state.isLoading,
   isEmployeeDetails: (state) => state.isEmployeeDetails,
   employeeDetailTitle: (state) => state.employeeDetailTitle,
   isAlert: (state) => state.isAlert,
   formMode: (state) => state.formMode,
   filter: {
      pageSize: (state) => state.filter.pageSize,
      pageNumber: (state) => state.filter.pageNumber,
      employeeFilter: (state) => state.filter.employeeFilter,
   },
   employeeList: (state) => state.employeeList,
   employee: (state) => state.employee,
   totalEmployees: (state) => state.totalEmployees,
   totalPages: (state) => state.totalPages,
   checkedEmployeeIds: (state) => state.checkedEmployeeIds,
};
export default getters;
