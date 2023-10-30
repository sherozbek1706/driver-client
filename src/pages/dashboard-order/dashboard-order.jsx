import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-order.css";
import "../../assets/dashboard.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Empty, Loader } from "../../components";
import { Link } from "react-router-dom";
import { socket } from "../../App";
export const DashboarOrder = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("/order/open");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("get_action_order", (data) => {
      setLoading(true);
      handleRenderData(url);
    });
    setLoading(true);
    handleRenderData("/order");
  }, [url, socket]);

  const handleRenderData = async () => {
    console.log(url);
    try {
      const response = await axiosAdmin.get(url);
      if (response.status == 200) {
        const base = response.data.data.sort((a, b) => {
          return b.id - a.id;
        });
        setData(base);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const handleRemoveOrder = async (id) => {
    try {
      const response = await axiosAdmin.delete("/order/" + id);
      if (response.status == 200) {
        success_notify("Buyutma o'chirildi!");
        handleRenderData();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardOrder">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Orders Settings Panel"} />

            <div className="DashboardHeadOption">
              <button
                className={`DashboardHeadOption__button ${
                  url == "/order" ? "DashboardHeadOption__active" : ""
                }
                `}
                onClick={() => setUrl("/order")}
              >
                <i className="fa-solid fa-table-list icon"></i>
                All Orders
              </button>
              <button
                className={`DashboardHeadOption__button ${
                  url == "/order/open" ? "DashboardHeadOption__active" : ""
                }
                `}
                onClick={() => setUrl("/order/open")}
              >
                <i className="fa-solid fa-lock-open icon"></i>
                Opened
              </button>
              <button
                className={`DashboardHeadOption__button ${
                  url == "/order/progress" ? "DashboardHeadOption__active" : ""
                }
                `}
                onClick={() => setUrl("/order/progress")}
              >
                <i className="fa-solid fa-spinner icon"></i>
                Progressed
              </button>
              <button
                className={`DashboardHeadOption__button ${
                  url == "/order/close" ? "DashboardHeadOption__active" : ""
                }
                `}
                onClick={() => setUrl("/order/close")}
              >
                <i className="fa-solid fa-lock icon"></i>
                Closed
              </button>
              <Link
                to="/dashboard/order/add"
                className="DashboardHeadOption__button"
              >
                <i className="fa-solid fa-plus icon"></i>
                Create Order
              </Link>
            </div>

            <div className="DashboardOrder__list">
              <div className="DashboardOrder__row_head">
                <p className="DashboardOrderRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardOrderRow__address_id">
                  <b>ADDRESS ID</b>
                </p>
                <p className="DashboardOrderRow__admin_name">
                  <b>ADMIN NAME</b>
                </p>
                <p className="DashboardOrderRow__phone_number">
                  <b>PHONE NUMBER</b>
                </p>
                <p className="DashboardOrderRow__status">
                  <b>STATUS</b>
                </p>
              </div>
            </div>
            <div className="DashboardOrder__list">
              {data.length == 0 ? (
                <Empty />
              ) : (
                data.map((item) => (
                  <div className="DashboardOrder__row" key={item.id}>
                    <p className="DashboardOrderRow__id">{item.id}</p>
                    <p className="DashboardOrderRow__address_id">
                      {item.address_id || "UNKW"}
                    </p>
                    <p className="DashboardOrderRow__admin_name">
                      {item.admin_name || "UNKW"}
                    </p>
                    <p className="DashboardOrderRow__phone_number">
                      {item.phone_number}
                    </p>
                    <p className={"DashboardOrderRow__status " + item.status}>
                      {item.status || "UNKW"}
                    </p>
                    <div className="DashboardOrderRow__option">
                      <Link to={"/dashboard/order/edit/" + item.id}>
                        <i className="fa-solid fa-pen-to-square icon"></i>
                      </Link>
                      <i
                        className="fa-solid fa-trash icon"
                        onClick={() => handleRemoveOrder(item.id)}
                      ></i>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
