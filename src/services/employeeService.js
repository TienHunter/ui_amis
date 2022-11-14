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
      console.error(error);
   }
};
const deleteEmployee = async (employeeID) => {
   try {
      let res = await httpEmployee.delete(`/${employeeID}}`);
      return res.data;
   } catch (error) {
      console.log(error);
   }
};
export { getEmployees, deleteEmployee };
