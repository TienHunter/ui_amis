import { GENDER } from "@/enums";
function convertNullString(str) {
   return str ? str : "";
}

function convertDateOfBirth(date) {
   if (checkForamtDate(date)) {
      if (date) {
         date = new Date(date);
         let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
         let month =
            date.getMonth() < 9 ? "0" + date.getMonth() : date.getMonth() + 1;
         let year = date.getFullYear();
         return `${day}/${month}/${year}`;
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
};
