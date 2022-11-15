import axios from "axios";

export const httpEmployee = axios.create({
   baseURL: `http://localhost:5106/api/v1/Employees/`,
   headers: {
      Authorization: "Bearer {token}",
   },
});
export const httpDepartment = axios.create({
   baseURL: `http://localhost:5106/api/v1/Departments/`,
   headers: {
      Authorization: "Bearer {token}",
   },
});
