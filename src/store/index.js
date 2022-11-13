import { createStore } from "vuex";
import employee from "./employee";
const store = createStore({
   modules: {
      employee,
   },
});
export default store;
