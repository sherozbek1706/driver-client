import { error_notify, info_notify, warning_notify } from "../../notify";
export const errorHandler = (error, callFunction) => {
  let response = error?.response;

  if (response?.status === 401) {
    error_notify("Qaytadan tizimga kiring!");
    localStorage.clear();
    window.location.assign("/login");
  }

  if (error.message === "Network Error") {
    error_notify("Malumoatlar kelmayabdi!");
  }

  if (response?.status === 400) {
    error_notify("So'rov xato yuborildi!");

    if (response?.data.error === "Bunday buyurtma mavjud emas!") {
      return callFunction();
    }
  }

  if (response?.status === 403) {
    if (
      response?.data.error === "Ushbu haydovchi hozirda active holatida emas!"
    ) {
      return callFunction();
    }
    if (response?.data.error === "Buyurtmani o'chirish mumkin emas!") {
      info_notify("bajarilgan buyurtmani o'chirish mumkin emas!");
    }

    if (response?.data.error === "Ushbu haydovchi hozirda blok holatida!") {
      warning_notify("Admin sizni bloklagan!");
      window.location.assign("/");
      localStorage.clear();
    }
  }

  // if (response.status === 402) {
  //   if (response.data.error === "Mablag' yetarli emas!") {
  //     return callFunction();
  //   }
  // }
};
