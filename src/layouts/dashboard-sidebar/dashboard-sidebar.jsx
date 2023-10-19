import "./dashboard-sidebar.css";
import { Link, useLocation } from "react-router-dom";
export const DashboardSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="DashboardSidebar">
      <h1 className="DashboardSidebar__title">Dashboard Driver</h1>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-house icon"></i>
          Home
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/order"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/order" ? "active" : ""
          }`}
        >
          <i className="fa-brands fa-dropbox icon"></i>
          Order Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/model"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/model" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-sd-card icon"></i>
          Car Model Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/region"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/region" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-earth-americas icon"></i>
          Car Region Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/cars"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/cars" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-taxi icon"></i>
          Cars Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/address"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/address" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-map-location-dot icon"></i>
          Order Address Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link">
        <Link
          to={"/dashboard/driver"}
          className={`DashboardSidebar__href ${
            pathname == "/dashboard/driver" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-user-tie icon"></i>
          Drivers Panel
        </Link>
      </div>

      <div className="DashboardSidebar__link DashboardSidebar__skip">
        <Link to={"/dashboard/logout"} className="DashboardSidebar__href">
          <i className="fa-solid fa-arrow-right-from-bracket icon"></i>
          Login Out
        </Link>
      </div>
    </div>
  );
};
