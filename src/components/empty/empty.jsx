import "./empty.css";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const Empty = () => {
  return (
    <div className="Empty">
      <i className="fa-solid fa-box-open icon"></i>
      <h1>{lotinKirilOtkazish("Buyurma topilmadi.")}</h1>
      <p>
        {lotinKirilOtkazish(
          "Topilishi bilan birinchi bo'lib sizga xabar berialdi, Sabr qiling!"
        )}
      </p>
    </div>
  );
};
