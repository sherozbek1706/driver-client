import { Fragment, useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar } from "../../layouts";
import "./dashboard-driver-orders.css";
import "../../assets/dashboard.css";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
export const DashboardDriverOrders = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("/driver-order/all");
      if (response.status == 200) {
        setData(response.data.data);
        console.log(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handlePaidOrder = async (id) => {
    try {
      const response = await axiosAdmin.patch("/driver-order/paid/" + id);
      if (response.status == 200) {
        success_notify("Buyurtma to'landi!");
        fetchData();
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

  // const handleRemoveModel = async (id) => {
  //   try {
  //     const response = await axiosAdmin.delete("/car-model/" + id);
  //     if (response.status == 200) {
  //       success_notify("Model o'chirildi!");
  //       fetchData();
  //     }
  //   } catch (error) {
  //     error_notify(error.message);
  //     errorHandler(error);
  //   }
  // };

  return (
    <div className="DashboardConfig">
      <DashboardSidebar />
      <div className="DashboardDriverOrders">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <DashboardHeader title={"Driver Orders Setting Panel"} />

            <div className="DashboardHeadOption">
              {/* <Link
              to="/dashboard/model/add"
              className="DashboardHeadOption__button"
            >
              <i className="fa-solid fa-plus icon"></i>
              Create Model
            </Link> */}
            </div>

            <div className="DashboardDriverOrders__list">
              <div className="DashboardDriverOrders__row_head">
                <p className="DashboardDriverOrdersRow__id">
                  <b>ID</b>
                </p>
                <p className="DashboardDriverOrdersRow__driver_id">
                  <b>DRIVER ID</b>
                </p>
                <p className="DashboardDriverOrdersRow__driver_username">
                  <b>DRIVER USERNAME</b>
                </p>
                <p className="DashboardDriverOrdersRow__order_id">
                  <b>ORDER ID</b>
                </p>
                <p className="DashboardDriverOrdersRow__order_address">
                  <b>ORDER ADDRESS</b>
                </p>
                <p className="DashboardDriverOrdersRow__paid">
                  <b>PAID</b>
                </p>
              </div>
            </div>
            <div className="DashboardDriverOrders__list">
              {data.map((item) => (
                <div className="DashboardDriverOrders__row" key={item.id}>
                  <p className="DashboardDriverOrdersRow__id">{item.id}</p>
                  <p className="DashboardDriverOrdersRow__driver_id">
                    {item.driver_id}
                  </p>
                  <p className="DashboardDriverOrdersRow__driver_username">
                    {item.driver_username}
                  </p>
                  <p className="DashboardDriverOrdersRow__order_id">
                    {item.order_id}
                  </p>
                  <p className="DashboardDriverOrdersRow__order_address">
                    {item.order_address}
                  </p>
                  <p
                    className={`DashboardDriverOrdersRow__paid ${
                      item.paid ? "active" : "noactive"
                    } `}
                  >
                    {item.paid ? "To'langan" : "To'lanmagan"}
                  </p>
                  <div className="DashboardDriverOrdersRow__option">
                    {/* <Link to={"/dashboard/model/edit/" + item.id}>
                      <i className="fa-solid fa-pen-to-square icon"></i>
                    </Link> */}
                    {item.paid ? null : (
                      <i
                        className="fa-solid fa-money-check-dollar icon"
                        onClick={(id) => handlePaidOrder(item.id)}
                      ></i>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
