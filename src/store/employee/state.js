import { AlertAction, Alert, GENDER } from "@/enums";
import { FIELD_NAME } from "@/i18n";
const state = {
   isLoading: false,
   isEmployeeDetail: false,
   isCollapseSidebar: false,
   employeeDetailTitle: FIELD_NAME.ADD_EMPLOYEE,
   isAlert: false,
   formMode: 0,
   filter: {
      pageSize: 10,
      pageNumber: 1,
      employeeFilter: "",
   },
   employeeList: [],
   employee: {},
   preEmployee: {},
   totalRecords: 0,
   totalPages: 0,
   checkedEmployeeIDs: [],
   alert: {
      type: Alert.SUCCESS,
      message: "",
      action: AlertAction.DEFAULT,
   },
   FIELD_NAME,
   GENDER,
};

export default state;
