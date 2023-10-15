import Cookies from "js-cookie";
import { error_notify } from "../../notify";
export const errorHandler = (error, changeActive) => {
  let response = error.response;
  if (response.status == 401) {
    error_notify("Qaytadan tizimga kiring!");
    setTimeout(() => {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
    }, 2100);
  }

  if (response.status == 400) {
    error_notify("So'rov xato yuborildi!");
  }

  if (response.status == 403) {
    if (
      response.data.error == "Ushbu haydovchi hozirda active holatida emas!"
    ) {
      error_notify("Siz hozir ishda emassiz!");
      return changeActive();
    }
  }
};
