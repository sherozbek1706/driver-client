import { Link } from "react-router-dom";
import "./have-order.css";
export const HaveOrder = ({ id }) => {
  return (
    <div className="HaveOrder">
      <i className="fa-solid fa-truck-fast icon"></i>
      <h1>Tugatilmagan buyurtma mavjud!</h1>
      <p>
        Ishlashni xoxlasangiz, "Buyutmaga o'tish" tugmasini bosib, buyurtmani
        bajarib bo'lib "Buyurtmani tugatish" - tugmasini bosing.
      </p>
      <Link to={"/orders/" + id}>Buyutmaga o'tish</Link>
    </div>
  );
};
