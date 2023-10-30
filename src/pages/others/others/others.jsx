import { Link } from "react-router-dom";
import "../../../assets/dashboard.css";
import { DashboardHeader } from "../../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../../layouts";
import "./others.css";
import { Fragment, useEffect, useState } from "react";
export const Others = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([
      {
        name: "Payments panel",
        route: "/dashboard/others/payments",
        icon: "fa-brands fa-amazon-pay icon",
      },
      {
        name: "Promo code panel",
        route: "/dashboard/other/promocode",
        icon: "fa-solid fa-crown icon",
      },
      {
        name: "Admins Panel",
        route: "/dashboard/others/admins",
        icon: "fa-solid fa-user-gear icon",
      },
    ]);
  }, []);

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardOthers">
        <DashboardHeader title={"Others Panels"} />

        {/* <div className="DashboardHeadOption">
          <Link
            to="/dashboard/order/add"
            className="DashboardHeadOption__button"
          >
            <i className="fa-solid fa-plus icon"></i>
            Create Others
          </Link>
        </div> */}

        <div className="DashboardOthersContent">
          <div className="DashboardOthersCloud">
            <div className="DashboardOthers__head">
              <h2 className="DashboardOthersHead__title">Additional Panels</h2>
            </div>
            <div className="DashboardOthers__panels">
              {list.map((item, idx) => (
                <Fragment key={idx}>
                  <Link className="DashboardOthersPanels__item" to={item.route}>
                    <i className={item.icon}></i>
                    {item.name}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
