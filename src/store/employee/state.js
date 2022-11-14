import { ALERT_ACTION, FIELD_NAME } from "@/i18n";
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
   totalRecords: 0,
   totalPages: 0,
   checkedEmployeeIDs: [],
   alert: {
      type: "success",
      message: "",
      action: ALERT_ACTION.DEFAULT,
   },
   FIELD_NAME,
};

export default state;
