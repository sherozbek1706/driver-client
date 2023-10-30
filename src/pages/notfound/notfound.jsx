import { Link } from "react-router-dom";
import "./notfound.css";
export const NotFound = ({ id }) => {
  return (
    <div className="NotFound">
      <i className="fa-solid fa-circle-xmark icon"></i>
      <h1>Sahifa mavjud emas!</h1>
      <p>
        Istasangiz, "Asosiy sahifa" tugmasini bosib, qaytadan urinib
        ko'rishingiz mumkin!
      </p>
      <Link to={"/"}>Asosiy sahifa</Link>
    </div>
  );
};
