import { createStore } from "vuex";
import employee from "./employee";
import department from "./department";
const store = createStore({
   modules: {
      employee,
      department,
   },
});
export default store;
