import { GENDER } from "@/enums";

/**
 * hiển thị chuổi rỗng khi giá trị null
 * Author : VDTien (13/11/2022)
 */
function convertNullString(str) {
   return str ? str : "";
}

/**
 * convert date về dạng dd/mm/yyyy
 * @param {*} date
 * @returns
 * Author : VDTien (13/11/2022)
 */
function convertDateOfBirth(date) {
   if (checkForamtDate(date)) {
      if (date) {
         date = new Date(date);
         let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
         let month =
            date.getMonth() < 9
               ? "0" + (date.getMonth() + 1)
               : date.getMonth() + 1;
         let year = date.getFullYear();
         return `${day}/${month}/${year}`;
      }
   }
   return "";
}

/**
 * convert date về dạng yyyy-mm-dd để map vào input date
 * @param {*} date
 * @returns
 * Author : VDTien (13/11/2022)
 */
function convertDateInput(date) {
   if (checkForamtDate(date)) {
      if (date) {
         date = new Date(date);
         let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
         let month =
            date.getMonth() < 9
               ? "0" + (date.getMonth() + 1)
               : date.getMonth() + 1;
         let year = date.getFullYear();
         return `${year}-${month}-${day}`;
      }
   }
   return "";
}
/**
 * @param {string} date
 * @returns kiểm tra đầu vào đúng định dạng không
 * author VDTien(23/10/2022)
 */
function checkForamtDate(date) {
   return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
}

/**
 * map mã giới tính với tên hiển thị giới tính
 * @param {*} Gender
 * @returns
 * Author : VDTien (13/11/2022)
 */
function convertGenderName(Gender) {
   let GenderName = "";
   switch (Gender) {
      case GENDER.MALE:
         GenderName = "Nam";
         break;
      case GENDER.FEMALE:
         GenderName = "Nữ";
         break;
      case GENDER.OTHER:
         GenderName = "Khác";
         break;
      default:
         GenderName = "";
         break;
   }
   return GenderName;
}
export {
   convertNullString,
   convertDateOfBirth,
   checkForamtDate,
   convertGenderName,
   convertDateInput,
};
