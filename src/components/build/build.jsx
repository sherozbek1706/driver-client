import "./build.css";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const Build = () => {
  return (
    <div className="Build">
      <i className="fa-solid fa-school icon"></i>
      <h1>{lotinKirilOtkazish("Sahifa Tayyorlanmoqda!")}</h1>
      <p>
        {lotinKirilOtkazish(
          "Hozirda ushbu sahifa, dasturlash jarayonida. Sahifa tayyor bo'lishi bilan xabar beriladi!"
        )}
      </p>
    </div>
  );
};
