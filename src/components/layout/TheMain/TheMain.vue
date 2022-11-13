<template>
  <EmployeeList />
</template>

<script>
import EmployeeList from "@/views/employee/EmployeeList/EmployeeList.vue";
export default {
  components: { EmployeeList },
};
</script>

<style>
.main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding: 24px;
  background-color: #eceef1;
}
</style>