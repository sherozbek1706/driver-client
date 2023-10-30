import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
import "./payment.css";
export const Payment = () => {
  return (
    <div className="Payment">
      <i className="fa-solid fa-wallet icon"></i>
      <h1>{lotinKirilOtkazish("Mablag'  Yetarli Emas!")}</h1>
      <p>
        {lotinKirilOtkazish(
          `Bizning adminlarga murojaat qilishingizni so'raymiz. Adminlar sizning 
          hisobingizni to'ldirishinggizga yordam berishadi!`
        )}
      </p>
    </div>
  );
};
