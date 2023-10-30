import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
import "./no-active.css";
export const NoActive = () => {
  return (
    <div className="NoActive">
      <i className="fa-solid fa-bolt icon"></i>
      <h1>{lotinKirilOtkazish("Siz hozir ishlamayabsiz.")}</h1>
      <p>
        {lotinKirilOtkazish(`Ishlashni xoxlasangiz, "Mening Hisobim" sahifasiga o'tib, "Ishni
        Boshlash" - tugmasini bosing.`)}
      </p>
    </div>
  );
};
