import { ALERT_ACTION } from "@/i18n";

const state = {
   isLoading: false,
   isEmployeeDetails: false,
   employeeDetailTitle: "",
   isAlert: false,
   formMode: 0,
   filter: {
      pageSize: 10,
      pageNumber: 1,
      employeeFilter: "",
   },
   employeeList: [],
   employee: {},
   totalEmployees: 0,
   totalPages: 0,
   checkedEmployeeIds: [],
   alert: {
      type: "success",
      message: "",
      action: ALERT_ACTION.DEFAULT,
   },
};

export default state;
