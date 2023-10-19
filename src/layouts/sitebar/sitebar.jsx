import "./sitebar.css";
import { Link, useLocation } from "react-router-dom";
export const Sitebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="Sitebar">
      <div className="Sitebar__menu">
        <Link to={"/"}>
          <i
            className={`fa-solid fa-house icon ${
              pathname == "/" ? "active" : ""
            }`}
          ></i>
        </Link>
      </div>
      <div className="Sitebar__menu">
        <Link to={"/maps"}>
          <i
            className={`fa-solid fa-map-location-dot icon ${
              pathname == "/maps" ? "active" : ""
            }`}
          ></i>
        </Link>
      </div>
      <div className="Sitebar__menu">
        <Link to={"/orders"}>
          <i
            className={`fa-solid fa-car icon ${
              pathname == "/orders" ? "active" : ""
            }`}
          ></i>
        </Link>
      </div>
      <div className="Sitebar__menu">
        <Link to={"/news"}>
          <i
            className={`fa-solid fa-newspaper icon ${
              pathname == "/news" ? "active" : ""
            }`}
          ></i>
        </Link>
      </div>
      <div className="Sitebar__menu">
        <Link to={"/profile"}>
          <i
            className={`fa-solid fa-circle-user icon ${
              pathname == "/profile" ? "active" : ""
            }`}
          ></i>
        </Link>
      </div>
    </div>
  );
};
