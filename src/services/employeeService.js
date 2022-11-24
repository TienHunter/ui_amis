import { httpEmployee } from "@/utils/httpRequest";
const getEmployees = async (
   pageeSize = 20,
   pageNumber = 1,
   keyWord = "",
   sort = ""
) => {
   try {
      let limit = pageeSize,
         offset = (pageNumber - 1) * pageeSize;
      let res = await httpEmployee.get(
         `filter?limit=${limit}&offset=${offset}&keyWord=${keyWord}&sort=${sort}`
      );
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
const deleteEmployee = async (employeeID) => {
   try {
      let res = await httpEmployee.delete(`${employeeID}`);
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
const deleteBatchEmployee = async (listEmployeeID) => {
   try {
      let res = await httpEmployee.post("deleteBatch", listEmployeeID);
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
const getEmployeeCodeMax = async () => {
   try {
      let res = await httpEmployee.get("EmployeeCodeMax");
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
const createEmployee = async (employee) => {
   try {
      let res = await httpEmployee.post("", employee);
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

const updateEmployee = async (employee) => {
   try {
      let res = await httpEmployee.put(`${employee.EmployeeID}`, employee);
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
const exportEmployeeToExcel = async (keyword) => {
   try {
      let res = await httpEmployee.get("export", {
         responseType: "blob", // important
         params: {
            keyword: keyword,
         },
      });
      return res.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};
export {
   getEmployees,
   deleteEmployee,
   deleteBatchEmployee,
   getEmployeeCodeMax,
   createEmployee,
   updateEmployee,
   exportEmployeeToExcel,
};
