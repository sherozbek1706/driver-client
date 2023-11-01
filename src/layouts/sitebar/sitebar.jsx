import { Fragment } from "react";
import "./sitebar.css";
import { Link, useLocation } from "react-router-dom";
export const Sitebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="sitebar-all">
      <nav className="nav">
        <ul className="nav-content">
          <li className="nav-list">
            <Link
              to={"/"}
              className={`link-item ${pathname == "/" ? "active" : ""}`}
            >
              <i className="fa-solid fa-house icon"></i>
              <span className="link-text">Uy</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link
              to={"/maps"}
              className={`link-item ${pathname == "/maps" ? "active" : ""}`}
            >
              <i className="fa-solid fa-map-location-dot icon"></i>
              <span className="link-text">Manzillar</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link
              to={"/orders"}
              className={`link-item ${pathname == "/orders" ? "active" : ""}`}
            >
              <i className="fa-solid fa-car icon"></i>
              <span className="link-text">Buyurtmalar</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link
              to={"/news"}
              className={`link-item ${pathname == "/news" ? "active" : ""}`}
            >
              <i className="fa-solid fa-newspaper icon"></i>
              <span className="link-text">Yangiliklar</span>
            </Link>
          </li>
          <li className="nav-list">
            <Link
              to={"/profile"}
              className={`link-item ${pathname == "/profile" ? "active" : ""}`}
            >
              <i className="fa-solid  fa-circle-user icon"></i>
              <span className="link-text">Sahifam</span>
            </Link>
          </li>

          <span className="indicator"></span>
        </ul>
      </nav>
    </div>
  );
};
