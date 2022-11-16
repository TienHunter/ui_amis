<template>
  <div class="table_pagination d-flex">
    <div class="pagination__left">
      Tổng số:
      <b> {{ totalRecords }} </b>
      bản ghi
    </div>
    <div class="pagination__right d-flex">
      <div class="record-in-page">
        <MsComboBox
          :dataList="[
            '10 bản ghi trên 1 trang',
            '20 bản ghi trên 1 trang',
            '30 bản ghi trên 1 trang',
            '50 bản ghi trên 1 trang',
            '100 bản ghi trên 1 trang',
          ]"
          :className="'page-size-list'"
          :selectedItem="filter.pageSize + ' bản ghi trên 1 trang'"
          @selectAction="selectPageSize"
        />
      </div>
      <div
        class="pagination-right__action d-flex ml-12 mr-12"
        v-if="totalPages > 0"
      >
        <span
          class="btn-pagination btn-pagination__prev"
          v-if="totalPages > 1"
          :class="filter.pageNumber == 1 ? 'no-click-paginate' : ''"
          @click="onClickPreviousPage"
        >
          Trước
        </span>
        <ul class="page-list d-flex" v-if="totalPages < 6">
          <li
            class="page-item"
            v-for="(page, index) in totalPages"
            :key="index"
            :class="index + 1 === filter.pageNumber ? 'page-item--current' : ''"
            @click="onClickPage(index + 1)"
          >
            {{ index + 1 }}
          </li>
        </ul>
        <ul v-else class="d-flex page-list">
          <li
            class="page-item"
            :class="1 === filter.pageNumber ? 'page-item--current' : ''"
            @click="onClickPage(1)"
          >
            1
          </li>
          <li class="page-item" v-show="filter.pageNumber > 3">...</li>
          <!-- pageNumber = 1 || 2 || 3 -->
          <ul
            v-if="
              filter.pageNumber == 1 ||
              filter.pageNumber == 2 ||
              filter.pageNumber == 3
            "
            class="page-list d-flex"
          >
            <li
              class="page-item"
              :class="{ 'page-item--current': filter.pageNumber == 2 }"
              @click="onClickPage(2)"
            >
              2
            </li>
            <li
              class="page-item"
              :class="{ 'page-item--current': filter.pageNumber == 3 }"
              @click="onClickPage(3)"
            >
              3
            </li>
            <li class="page-item" @click="onClickPage(4)">4</li>
          </ul>

          <!-- pageNumber = totalPages-3 || -2|| -1 -->
          <ul
            v-else-if="
              filter.pageNumber == totalPages ||
              filter.pageNumber == totalPages - 1 ||
              filter.pageNumber == totalPages - 2
            "
            class="d-flex page-list"
          >
            <li class="page-item" @click="onClickPage(totalPages - 3)">
              {{ totalPages - 3 }}
            </li>
            <li
              class="page-item"
              :class="{
                'page-item--current': filter.pageNumber == totalPages - 2,
              }"
              @click="onClickPage(totalPages - 2)"
            >
              {{ totalPages - 2 }}
            </li>
            <li
              class="page-item"
              :class="{
                'page-item--current': filter.pageNumber == totalPages - 1,
              }"
              @click="onClickPage(totalPages - 1)"
            >
              {{ totalPages - 1 }}
            </li>
          </ul>

          <ul v-else class="d-flex page-list">
            <li class="page-item" @click="onClickPage(filter.pageNumber - 1)">
              {{ filter.pageNumber - 1 }}
            </li>
            <li class="page-item page-item--current">
              {{ filter.pageNumber }}
            </li>
            <li class="page-item" @click="onClickPage(filter.pageNumber + 1)">
              {{ filter.pageNumber + 1 }}
            </li>
          </ul>
          <li v-if="filter.pageNumber < totalPages - 2" class="page-item">
            ...
          </li>
          <li
            class="page-item"
            :class="{ 'page-item--current': filter.pageNumber == totalPages }"
            @click="onClickPage(totalPages)"
          >
            {{ totalPages }}
          </li>
        </ul>

        <span
          class="btn-pagination btn-pagination__last"
          v-if="totalPages > 1"
          :class="filter.pageNumber == totalPages ? 'no-click-paginate' : ''"
          @click="onClickNextPage"
        >
          Sau
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import MsComboBox from "@/components/base/MSComboBox/MsComboBox.vue";
export default {
  components: {
    MsComboBox,
  },
  computed: {
    ...mapGetters(["filter", "totalRecords", "totalPages"]),
  },
  methods: {
    ...mapActions(["setFilter", "getEmployees"]),

    /**
     * chọn số lượng bản ghi mỗi trang
     * @param {int} pageSize
     * Author: VDTIEN (14/11/2022)
     */
    selectPageSize(pageSize) {
      pageSize = pageSize.split(" ")[0];
      const me = this;
      me.setFilter({
        pageSize: pageSize,
        pageNumber: 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
    },

    /**
     * chọn trang bất kỳ
     * @param {int} pageSize
     * Author: VDTIEN (14/11/2022)
     */
    onClickPage(pageNumber) {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: pageNumber,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
    },

    /**
     * chọn trang trước
     * Author: VDTIEN (14/11/2022)
     */
    onClickPreviousPage() {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: me.filter.pageNumber - 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
    },

    /**
     * chọn trang sau
     * Author: VDTIEN (14/11/2022)
     */
    onClickNextPage() {
      const me = this;
      me.setFilter({
        pageSize: me.filter.pageSize,
        pageNumber: me.filter.pageNumber + 1,
        employeeFilter: me.filter.employeeFilter,
      });
      me.getEmployees();
    },
  },
};
</script>

<style>
</style>