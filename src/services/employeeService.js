import { httpEmployee } from "@/utils/httpRequest";
const getEmployees = async (
   pageeSize = 20,
   pageNumber = 1,
   keyWord = "",
   sort = ""
) => {
   let limit = pageeSize,
      offset = (pageNumber - 1) * pageeSize;
   let res = await httpEmployee.get(
      `filter?limit=${limit}&offset=${offset}&keyWord=${keyWord}&sort=${sort}`
   );
   return res.data;
};
const deleteEmployee = async (employeeID) => {
   let res = await httpEmployee.delete(`${employeeID}`);
   return res.data;
};
const deleteBatchEmployee = async (listEmployeeID) => {
   let res = await httpEmployee.post("deleteBatch", listEmployeeID);
   return res.data;
};
const getEmployeeCodeMax = async () => {
   let res = await httpEmployee.get("EmployeeCodeMax");
   return res.data;
};
const createEmployee = async (employee) => {
   let res = await httpEmployee.post("", employee);
   return res.data;
};

const updateEmployee = async (employee) => {
   let res = await httpEmployee.put(`${employee.EmployeeID}`, employee);
   return res.data;
};
export {
   getEmployees,
   deleteEmployee,
   deleteBatchEmployee,
   getEmployeeCodeMax,
   createEmployee,
   updateEmployee,
};
