import { AlertAction, Alert, FIELD_NAME, GENDER } from "@/i18n";
const state = {
   isLoading: false,
   isEmployeeDetail: false,
   employeeDetailTitle: "Thêm khách hàng",
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
      type: Alert.SUCCESS,
      message: "",
      action: AlertAction.DEFAULT,
   },
   FIELD_NAME,
   GENDER,
};

export default state;
