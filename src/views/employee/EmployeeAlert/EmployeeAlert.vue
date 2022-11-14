<template>
  <div class="alert-wrapper">
    <div class="alert-container">
      <div class="alert-body">
        <div class="alert-body__left">
          <div
            v-if="alert.type == Alert.WARNING"
            class="icon icon-warning"
          ></div>
          <div v-if="alert.type == Alert.DANGER" class="icon icon-danger"></div>
          <div v-if="alert.type == Alert.INFO" class="icon icon-question"></div>
          <div
            v-if="alert.type == Alert.SUCCESS"
            class="icon icon-success"
          ></div>
        </div>
        <div class="alert-body__right">
          {{ alert.message }}
        </div>
      </div>
      <div class="alert-footer">
        <div
          v-if="alert.type == Alert.WARNING"
          class="alert-warning-delete-footer"
        >
          <MsButton
            :title="'Không'"
            :isSecondary="true"
            @click="toggleAlert"
            tabindex="2"
          />
          <MsButton :title="'Có'" @click="confirmClick" tabindex="1" />
        </div>

        <div
          v-if="alert.type == Alert.DANGER || alert.type == Alert.SUCCESS"
          class="alert-danger-footer"
        >
          <button @click="toggleAlert" class="btn btn-close" tabindex="1">
            Đóng
          </button>
        </div>

        <div v-if="alert.type == 'question'" class="alert-question-footer">
          <MsButton
            :title="'Hủy'"
            :isSecondary="true"
            @click="toggleAlert"
            tabindex="3"
          />
          <div class="btn-action">
            <MsButton
              :title="'Không'"
              :isSecondary="true"
              @click="closeAll"
              tabindex="2"
            />
            <MsButton :title="'Có'" @click="confirmClick" tabindex="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { AlertAction, Alert } from "@/i18n";
import MsButton from "@/components/base/MsButton/MsButton.vue";
export default {
  components: { MsButton },
  emits: ["setIsStore"],
  computed: { ...mapGetters(["alert"]) },
  methods: {
    ...mapActions([
      "toggleAlert",
      "deleteEmployee",
      "deleteBatchEmployee",
      "getEmployees",
      "toggleEmployeeDetail",
    ]),

    /**
     * xác nhận cất hoặc xóa nhân viên
     * Author: VDTIEN (14/11/2022)
     */
    confirmClick() {
      const me = this;
      me.toggleAlert();
      if (me.alert.action == AlertAction.CONFIRM_STORE) {
        me.$emit("setIsStore");
      }
      if (me.alert.action == AlertAction.CONFIRM_DELETE) {
        me.deleteEmployee();
      }
      if (me.alert.action == AlertAction.CONFIRM_DELETE_BATCH) {
        me.deleteBatchEmployee();
      }
    },
    /**
     * chọn không xóa nhân viện
     * Author: VDTIEN (14/11/2022)
     */
    closeAll() {
      const me = this;
      me.toggleAlert();
      me.toggleEmployeeDetail();
    },
  },
  data() {
    return {
      AlertAction: AlertAction,
      Alert: Alert,
    };
  },
};
</script>

<style>
</style>