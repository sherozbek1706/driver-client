import { Link } from "react-router-dom";
import "./have-order.css";
import { lotinKirilOtkazish } from "../../utils/functions/lotin-kiril";
export const HaveOrder = ({ id }) => {
  return (
    <div className="HaveOrder">
      <i className="fa-solid fa-truck-fast icon"></i>
      <h1>{lotinKirilOtkazish("Tugatilmagan buyurtma mavjud!")}</h1>
      <p>
        {lotinKirilOtkazish(`Ishlashni xoxlasangiz, "Buyutmaga o'tish" tugmasini bosib, buyurtmani
        bajarib bo'lib "Buyurtmani tugatish" - tugmasini bosing.`)}
      </p>
      <Link to={"/orders/" + id}>{lotinKirilOtkazish("Buyutmaga o'tish")}</Link>
    </div>
  );
};
