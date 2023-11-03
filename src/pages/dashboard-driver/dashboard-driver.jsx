import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { socket } from "../../App";
import { Loader } from "../../components";
import { DashboardHeader } from "../../components/dashboard-header/dashboard-header";
import { DashboardSidebar, DriverModal } from "../../layouts";
import {
  axiosAdmin,
  errorHandler,
  error_notify,
  success_notify,
} from "../../shared";
import "./dashboard-driver.css";
import { formatmoney } from "../../utils";
export const DashboardDriver = () => {
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("active");
  const [data, setData] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    socket.on("get_action_driver", (data) => {
      fetchData();
      setLoading(true);
    });
    fetchData();
    setLoading(true);
  }, [socket, pathname]);

  const handleClickActive = async () => {
    try {
      setLoading(true);

      if (option == "all") {
        setOption("active");
      } else if (option == "active") {
        setOption("all");
      }

      const response = await axiosAdmin.get(
        option == "all" ? "/driver" : "/driver/active"
      );

      if (response.status == 200) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(
        pathname == "/dashboard/driver" ? "/driver" : "/driver/removed"
      );
      if (response.status == 200) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleRemoveDriver = async (id) => {
    try {
      const response = await axiosAdmin.delete("/driver/" + id);
      if (response.status == 200) {
        success_notify("Haydovchi bloklandi!");
        fetchData();
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

  const handleUnRemove = async (id) => {
    try {
      const response = await axiosAdmin.delete("/driver/un/" + id);
      if (response.status == 200) {
        success_notify("Haydovchi tiklandi!");
        fetchData();
      }
    } catch (error) {
      error_notify(error.message);
      errorHandler(error);
    }
  };

  const changeOpen = () => {
    setOpen(false);
  };

  const visiblityChangeModal = (id) => {
    setDriverId(id);

    setOpen(true);
  };

  return (
    <Fragment>
      {open ? (
        <DriverModal user={driverId} changeOpen={() => changeOpen()} />
      ) : null}
      <div className="DashboardConfig">
        <DashboardSidebar />
        <div className="DashboardDriver">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <DashboardHeader title={"Driver Setting Panel"} />

              <div className="DashboardHeadOption">
                {pathname == "/dashboard/driver" ? (
                  <Fragment>
                    <button
                      className="DashboardHeadOption__button"
                      onClick={handleClickActive}
                    >
                      {option == "all" ? (
                        <Fragment>
                          <i className="fa-solid fa-user-tie icon"></i>
                          All
                        </Fragment>
                      ) : (
                        <Fragment>
                          <i className="fa-solid fa-star icon"></i>
                          Active
                        </Fragment>
                      )}
                    </button>
                    <Link
                      to="/dashboard/blocked/driver"
                      className="DashboardHeadOption__button"
                    >
                      <i className="fa-solid fa-ban icon"></i>
                      Blocked
                    </Link>
                    <Link
                      to="/dashboard/driver/add"
                      className="DashboardHeadOption__button"
                    >
                      <i className="fa-solid fa-plus icon"></i>
                      Create Driver
                    </Link>
                  </Fragment>
                ) : (
                  <Link
                    to="/dashboard/driver"
                    className="DashboardHeadOption__button"
                  >
                    <i className="fa-solid fa-chevron-left icon"></i>
                    Back to "Drivers Panel"
                  </Link>
                )}
              </div>

              <div className="DashboardDriver__list">
                <div className="DashboardDriver__row">
                  <p className="DashboardDriverRow__id">
                    <b>ID</b>
                  </p>
                  <p className="DashboardDriverRow__fullname">
                    <b>FULL NAME</b>
                  </p>
                  <p className="DashboardDriverRow__username">
                    <b>USERNAME</b>
                  </p>

                  <p className="DashboardDriverRow__phone_number">
                    <b>TEL NUMBER</b>
                  </p>
                  <p className="DashboardDriverRow__car_id">
                    <b>CAR</b>
                  </p>
                  <p className="DashboardDriverRow__balans">
                    <b>BALANS</b>
                  </p>
                  <p className="DashboardDriverRow__active">
                    <b>ACTIVE</b>
                  </p>
                </div>
              </div>
              <div className="DashboardDriver__list">
                {data.map((item) => (
                  <div className="DashboardDriver__row" key={item.id}>
                    <p className="DashboardDriverRow__id">{item.id}</p>
                    <p className="DashboardDriverRow__fullname">
                      {item.first_name}
                      {"  "}
                      {item.last_name}
                    </p>
                    <p className="DashboardDriverRow__username">
                      {item.username}
                    </p>
                    <p className="DashboardDriverRow__phone_number">
                      {item.phone_number}
                    </p>
                    <p className="DashboardDriverRow__car_id">
                      {item.car_id || "UNKW"}
                    </p>
                    <p className="DashboardDriverRow__balans">
                      {formatmoney(item.balans)}
                    </p>
                    <p className="DashboardDriverRow__active">
                      {item.active ? "Ishda" : "Ishda emas!"}
                    </p>
                    <div className="DashboardDriverRow__option">
                      {pathname == "/dashboard/driver" ? (
                        <Fragment>
                          {" "}
                          <Link to={"/dashboard/driver/pay/" + item.id}>
                            <i className="fa-solid fa-money-bill-1-wave icon"></i>
                          </Link>
                          <i
                            className="fa-solid fa-eye icon"
                            onClick={() => visiblityChangeModal(item.id)}
                          ></i>
                          <Link to={"/dashboard/driver/edit/" + item.id}>
                            <i className="fa-solid fa-pen-to-square icon"></i>
                          </Link>
                          <i
                            className="fa-solid fa-ban icon"
                            onClick={() => handleRemoveDriver(item.id)}
                          ></i>{" "}
                        </Fragment>
                      ) : (
                        <i
                          className="fa-solid fa-unlock icon"
                          onClick={() => handleUnRemove(item.id)}
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
    </Fragment>
  );
};
