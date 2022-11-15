import { httpDepartment } from "@/utils/httpRequest";

const getDepartments = async () => {
   try {
      let res = await httpDepartment.get();
      return res.data;
   } catch (error) {
      console.log(error);
   }
};
export { getDepartments };
